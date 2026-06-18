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

  useEffect(() => {
    const button = avatarButtonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
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

  useEffect(() => {
    const dropdown = dropdownMenuRef.current;
    if (!dropdown) return;

    if (isOpen) {
      gsap.fromTo(dropdown,
        {
          opacity: 0,
          y: -8,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

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
    { icon: HelpCircle, label: 'Help & Support', href: '/profile?tab=support' },
  ];

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        ref={avatarButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative flex items-center justify-center rounded-full',
          isScrolled ? 'border border-border/50 hover:border-foreground/30' : 'border border-white/50 hover:border-white/80',
          'transition-all duration-300 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-foreground/20',
          'w-10 h-10 p-0',
          variant === 'mobile' && 'w-9 h-9'
        )}
      >
        <Avatar className={variant === 'mobile' ? 'w-8 h-8' : 'w-9 h-9'}>
          <AvatarImage src={user.avatar || undefined} alt={user.name} />
          <AvatarFallback className={cn(
            'font-medium',
            isScrolled ? 'bg-muted text-foreground' : 'bg-white/20 text-white',
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
              'absolute top-full mt-2 z-50',
              'bg-background/95 backdrop-blur-xl border border-border/50',
              'rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden',
              'w-[260px]',
              'right-0'
            )}
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
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
              {menuItems.map((item) => (
                <Link href={item.href} key={item.label}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
                      'text-sm text-left hover:bg-muted/80',
                      'transition-colors duration-200'
                    )}
                    onClick={() => setIsOpen(false)}
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
                  signOut();
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
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