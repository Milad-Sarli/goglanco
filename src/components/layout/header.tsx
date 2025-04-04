'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from "motion/react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileMenu } from "./mobile-menu";
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

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
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const isDark = theme === 'dark';


  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const getTextColor = () => {
    if (isScrolled) {
      return isDark ? '!text-white' : 'text-gray-900';
    }
    // When not scrolled, use white text for dark mode and dark text for light mode
    return isDark ? 'text-white' : 'text-gray-900';
  };

  const getButtonStyle = () => {
    if (isScrolled) {
      return isDark ? 'text-white border-white hover:bg-white/10' : 'text-gray-900 border-gray-900 hover:bg-gray-900/10';
    }
    return isDark 
      ? 'text-white border-white hover:bg-white/10' 
      : 'text-gray-900 border-gray-900 hover:bg-gray-900/10';
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? isDark 
            ? 'bg-gray-900/80 backdrop-blur-md shadow-sm' 
            : 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-bold text-2xl bg-white/40 rounded-full px-2">
            <span className={cn(
              'transition-colors duration-300',
              isDark 
                ? 'text-white' 
                : 'text-gray-900',
              !isScrolled && isDark && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
            )}>
              Goglanco
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  'text-base',
                  getTextColor(),
                  !isScrolled && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
                )}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                <Link href="/portfolio" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    'text-base',
                    getTextColor(),
                    !isScrolled && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
                  )}>
                    Portfolio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    'text-base',
                    getTextColor(),
                    !isScrolled && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
                  )}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    'text-base',
                    getTextColor(),
                    !isScrolled && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
                  )}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className={cn(
                'hidden md:inline-flex',
                getButtonStyle(),
                !isScrolled && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
              )}
            >
              Get Free Estimate
            </Button>
            <div className={cn(
              !isScrolled && 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'
            )}>
              <ThemeToggle />
            </div>
            <MobileMenu isScrolled={isScrolled} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MenuIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
} 