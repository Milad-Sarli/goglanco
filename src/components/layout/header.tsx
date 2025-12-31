'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from "motion/react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown } from 'lucide-react';
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
  { title: 'Rug Repair', href: '/services/repair' },
  { title: 'Deep Cleaning', href: '/services/cleaning' },
  { title: 'Restoration', href: '/services/restoration' },
  { title: 'Color Restoration', href: '/services/color-restoration' },
  { title: 'Fringe Repair', href: '/services/fringe-repair' },
  { title: 'Custom Rugs', href: '/services/custom' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const { isLoggedIn } = useAuth();

  // Only run client-side effects after component is mounted
  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const getTextColor = () => {
    if (!mounted) return 'text-foreground'; // Default for SSR
    
    if (isScrolled) {
      return 'text-foreground';
    }
    // When not scrolled, use white text for dark mode and dark text for light mode
    return 'text-foreground';
  };

  // تابع getButtonStyle حذف شد چون استفاده نمی‌شود

  const getHeaderBg = () => {
    if (!mounted) return 'bg-transparent'; // Default for SSR
    
    if (isScrolled) {
      return 'bg-background/80 backdrop-blur-md shadow-sm';
    }
    return 'bg-transparent';
  }

  const getLogoTextColor = () => {
    if (!mounted) return 'text-foreground'; // Default for SSR
    
    return 'text-foreground';
  }

  const getDropShadow = () => {
    if (!mounted) return ''; // Default for SSR
    
    return !isScrolled ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]' : '';
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        getHeaderBg()
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-between h-20 w-full">
          <Link href="/" className="font-bold text-2xl bg-background/40 rounded-full px-2">
            <span className={cn(
              'transition-colors duration-300',
              getLogoTextColor(),
              getDropShadow()
            )}>
              Goglanco
            </span> 
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger asChild className={cn(
                   'text-base', 'cursor-pointer' , 
                   getTextColor(),
                   getDropShadow()
                 )}>
                   <Link href="/services" className="flex items-center">
                     Services
                     <ChevronDown className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
                   </Link>
                 </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                    {services.map((service) => (
                      <li key={service.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/portfolio" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'text-base',
                      getTextColor(),
                      getDropShadow()
                    )}
                  >
                    Portfolio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/about" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'text-base',
                      getTextColor(),
                      getDropShadow()
                    )}
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    href="/contact" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'text-base',
                      getTextColor(),
                      getDropShadow()
                    )}
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <WeekendConsultationModal>
              <Button
                variant="default"
                className={cn(
                  'hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground',
                  getDropShadow() 
                )}
              >
                Get Free Estimate 
              </Button>
            </WeekendConsultationModal>
            
            {/* Authentication Components */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <UserAvatar isScrolled={isScrolled} />
              ) : (
                <SigninButton isScrolled={isScrolled} />
              )}
            </div>
            
            <div className={cn(
              getDropShadow() , 
              'relative left-4'
            )}>
              <ThemeToggle />
            </div>
            <div className="relative right-5">
              <MobileMenu isScrolled={isScrolled} />
            </div>
          </div> 
        </div>
      </div>
    </motion.header>
  );
}