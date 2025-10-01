'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  Bell,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface UserAvatarProps {
  className?: string;
  isScrolled?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut?: () => void;
  variant?: 'default' | 'mobile';
}

export function UserAvatar({ 
  className, 
  isScrolled, 
  user = { name: "John Doe", email: "john@example.com" },
  onSignOut,
  variant = 'default'
}: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const getDropShadow = () => {
    if (isScrolled) {
      return 'shadow-sm';
    }
    return 'shadow-none';
  };

  const getAvatarStyles = () => {
    const baseStyles = [
      'relative flex items-center justify-center rounded-full',
      'border-2 border-border/30 hover:border-primary/50',
      'transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-primary/20',
      getDropShadow()
    ];

    if (variant === 'mobile') {
      return [
        ...baseStyles,
        'w-10 h-10 p-0'
      ];
    }

    return [
      ...baseStyles,
      'w-12 h-12 p-0'
    ];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // GSAP animations for avatar button
  useEffect(() => {
    const button = avatarButtonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
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
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Dropdown animation
  useEffect(() => {
    const dropdown = dropdownMenuRef.current;
    if (!dropdown) return;

    if (isOpen) {
      gsap.fromTo(dropdown, 
        { 
          opacity: 0, 
          y: -20, 
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.3, 
          ease: "power2.out" 
        }
      );
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: CreditCard, label: 'Billing', href: '/billing' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
  ];

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        ref={avatarButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          getAvatarStyles(),
          className
        )}
      >
        <Avatar className={variant === 'mobile' ? 'w-8 h-8' : 'w-10 h-10'}>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className={cn(
            'font-medium bg-primary text-primary-foreground',
            variant === 'mobile' ? 'text-xs' : 'text-sm'
          )}>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {isOpen && ( 
          <div
              ref={dropdownMenuRef}
              className={cn(
                'absolute right-0 top-full mt-2 w-64',
                'bg-background/95 backdrop-blur-md border border-border/50',
                'dark:bg-background/98 dark:border-border/30',
                'rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden z-50'
              )}
            >
            {/* User Info Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link href={item.href} key={item.label}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                      'text-sm text-left hover:bg-muted/70 dark:hover:bg-muted/50',
                      'transition-colors duration-200'
                    )}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              ))}
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-border/50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignOut?.();
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                  'text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30',
                  'transition-colors duration-200'
                )}
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}