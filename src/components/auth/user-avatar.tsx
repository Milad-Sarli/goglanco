'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Bell,
  HelpCircle,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useAuth } from './auth-context';

interface UserAvatarProps {
  className?: string;
  isScrolled?: boolean;
  variant?: 'default' | 'mobile';
}

export function UserAvatar({ 
  className, 
  isScrolled, 
  variant = 'default'
}: UserAvatarProps) {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

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

  // Don't render if no user
  if (!user) {
    return null;
  }

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

  const menuItems = [
    { icon: User, label: 'Profile', href: '/profile?tab=profile' },
    { icon: Settings, label: 'Settings', href: '/profile?tab=settings' },
    { icon: MessageSquare, label: 'Reviews', href: '/profile?tab=reviews' },
    { icon: ClipboardList, label: 'Requests', href: '/profile?tab=requests' },
    { icon: Bell, label: 'Notifications', href: '/profile?tab=notifications' },
    { icon: HelpCircle, label: 'Help & Support', href: '/profile?tab=support' },
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
                // Base positioning - mobile first approach
                'absolute top-full mt-2 z-50',
                'bg-background/95 backdrop-blur-md border border-border/50',
                'dark:bg-background/98 dark:border-border/30',
                'rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden',
                // Mobile optimized positioning and sizing - reduced width
                'left-1/2 -translate-x-1/2 w-[240px] max-w-[calc(100vw-1rem)]',
                // Tablet and desktop positioning
                'md:left-auto md:right-0 md:translate-x-0 md:w-64'
              )}
            >
            {/* User Info Header */}
            <div className="p-3 border-b border-border/50 md:p-4">
              <div className="flex items-center gap-2 md:gap-3">
                <Avatar className="w-10 h-10 md:w-10 md:h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-sm truncate">{user.name}</p>
                  <p className="text-xs md:text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 md:p-2">
              {menuItems.map((item) => (
                <Link href={item.href} key={item.label}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 md:gap-3 px-3 md:px-3 py-2.5 md:py-2 rounded-lg',
                      'text-sm md:text-sm text-left hover:bg-muted/70 dark:hover:bg-muted/50',
                      'transition-colors duration-200 min-h-[40px] md:min-h-auto'
                    )}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              ))}
            </div>

            {/* Sign Out */}
            <div className="p-2 md:p-2 border-t border-border/50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className={cn(
                  'w-full flex items-center gap-3 md:gap-3 px-3 md:px-3 py-2.5 md:py-2 rounded-lg',
                  'text-sm md:text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30',
                  'transition-colors duration-200 min-h-[40px] md:min-h-auto'
                )}
              >
                <LogOut className="w-4 h-4 md:w-4 md:h-4 flex-shrink-0" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}