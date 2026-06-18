'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from "motion/react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileMenu } from "./mobile-menu";
import { cn } from '@/lib/utils';
import { WeekendConsultationModal } from '@/components/weekend-consultation-modal';
import { SigninButton } from '@/components/auth/signin-button';
import { UserAvatar } from '@/components/auth/user-avatar';
import { useAuth } from '@/components/auth/auth-context';

const services = [
  { title: 'Rug Repair', href: '/services/repair', description: 'Expert repair for all rug types' },
  { title: 'Deep Cleaning', href: '/services/cleaning', description: 'Professional deep cleaning services' },
  { title: 'Restoration', href: '/services/restoration', description: 'Restore beauty to old rugs' },
  { title: 'Color Restoration', href: '/services/color-restoration', description: 'Revive faded colors' },
  { title: 'Fringe Repair', href: '/services/fringe-repair', description: 'Precision fringe work' },
  { title: 'Custom Rugs', href: '/services/custom', description: 'Bespoke rug designs' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const getHeaderBg = () => {
    if (!mounted) return 'bg-transparent';
    if (isScrolled) {
      return 'bg-background/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]';
    }
    return 'bg-transparent';
  };

  const getTextColor = () => {
    if (!mounted) return 'text-white';
    if (isScrolled) return 'text-foreground';
    return 'text-white';
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        getHeaderBg()
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className={cn(
                'text-2xl font-bold tracking-tight transition-colors duration-300',
                getTextColor()
              )}>
                Goglanco
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-[2px] bg-white"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    'h-10 px-4 text-[15px] font-medium rounded-full transition-all duration-300',
                    'hover:bg-muted/80',
                    getTextColor()
                  )}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[520px] p-5">
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <NavigationMenuLink key={service.href} asChild>
                          <Link
                            href={service.href}
                            className="block rounded-xl p-4 transition-all duration-200 hover:bg-muted/80 group/link"
                          >
                            <div className="font-medium text-[15px] mb-1 group-hover/link:text-primary transition-colors">
                              {service.title}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {['Portfolio', 'About', 'Contact'].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className={cn(
                        'inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-all duration-300',
                        'hover:bg-muted/80',
                        getTextColor()
                      )}
                    >
                      {item}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <WeekendConsultationModal>
              <Button
                variant="default"
                className={cn(
                  'hidden sm:inline-flex h-10 px-6 rounded-full font-medium text-[15px]',
                  'bg-white text-black hover:bg-white/90',
                  'transition-all duration-300 shadow-sm hover:shadow-md'
                )}
              >
                Get Free Estimate
              </Button>
            </WeekendConsultationModal>

            <div className="flex items-center gap-1">
              {isLoggedIn ? (
                <UserAvatar isScrolled={isScrolled} />
              ) : (
                <SigninButton isScrolled={isScrolled} />
              )}
            </div>

            <ThemeToggle isScrolled={isScrolled} />

            <MobileMenu isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}