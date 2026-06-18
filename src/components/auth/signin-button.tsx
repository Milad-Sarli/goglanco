'use client';

import { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.03,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
        variant="ghost"
        size={variant === 'mobile' ? 'default' : 'default'}
        onClick={handleClick}
        className={cn(
          'h-10 px-4 rounded-full font-medium text-[15px]',
          isScrolled ? 'text-foreground hover:bg-muted/80' : 'text-white hover:bg-white/10',
          'transition-all duration-300',
          variant === 'mobile' && 'w-full justify-start',
          className
        )}
      >
        <LogIn className="w-4 h-4 mr-2" />
        <span>Sign In</span>
      </Button>

      <SigninModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}