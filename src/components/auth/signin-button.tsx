'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from "motion/react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { SigninModal } from './signin-modal';

interface SigninButtonProps {
  className?: string;
  isScrolled?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'mobile';
}

export function SigninButton({ className, isScrolled, onClick, variant = 'default' }: SigninButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const getDropShadow = () => {
    return !isScrolled ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]' : '';
  };

  useEffect(() => {
    const button = buttonRef.current;
    const icon = iconRef.current;

    if (!button || !icon) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(icon, {
        x: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(icon, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getButtonStyles = () => {
    const baseStyles = [
      'flex items-center gap-2 rounded-full',
      'border border-border/50 bg-background/80 backdrop-blur-sm',
      'hover:bg-primary hover:text-primary-foreground hover:border-primary',
      'dark:border-border/30 dark:bg-background/90',
      'dark:hover:bg-primary dark:hover:text-primary-foreground',
      'transition-all duration-300 ease-in-out',
      'font-medium shadow-sm',
      getDropShadow()
    ];

    if (variant === 'mobile') {
      return [
        ...baseStyles,
        'px-3 py-2 text-xs',
        'w-full justify-center'
      ];
    }

    return [
      ...baseStyles,
      'px-4 py-2 text-sm'
    ];
  };

  const handleClick = () => {
    setIsModalOpen(true);
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Button
        ref={buttonRef}
        variant="outline"
        size={variant === 'mobile' ? 'sm' : 'sm'}
        onClick={handleClick}
        className={cn(
          getButtonStyles(),
          className
        )}
      >
        <LogIn ref={iconRef} className="w-4 h-4" />
        <span>Sign In</span>
      </Button>
      
      <SigninModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}