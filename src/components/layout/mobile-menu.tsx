'use client';

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isScrolled: boolean;
}

const menuItems = [
  { title: 'Services', href: '/services' },
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const services = [
  { title: 'Rug Repair', href: '/services/repair' },
  { title: 'Deep Cleaning', href: '/services/cleaning' },
  { title: 'Restoration', href: '/services/restoration' },
  { title: 'Color Restoration', href: '/services/color-restoration' },
  { title: 'Fringe Repair', href: '/services/fringe-repair' },
  { title: 'Custom Rugs', href: '/services/custom' },
];

export function MobileMenu({ isScrolled }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true); 
  }, []);

  const getButtonStyle = () => {
    if (!mounted) return 'text-gray-900 border-gray-900 hover:bg-gray-900/10'; // Default for SSR
    
    if (!isScrolled) {
      return isDark ? 'text-white border-white hover:bg-white/10' : 'text-gray-900 border-gray-900 hover:bg-gray-900/10';
    }
    return isDark ? 'text-white border-white hover:bg-white/10' : 'text-gray-900 border-gray-900 hover:bg-gray-900/10';
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'md:hidden z-50 relative right-0 mr-0',
            getButtonStyle() 
          )}
          style={{ position: 'relative', right: '0px' }}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <nav className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Link href="/" className="font-bold text-2xl" onClick={handleLinkClick}>
              Goglanco
            </Link>
          </div>
          
          <div className="flex-grow overflow-y-auto py-6">
            <div className="px-6 mb-6">
              <div className="text-sm font-semibold text-gray-500 mb-2">Main Menu</div>
              <ul className="space-y-3">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-lg font-medium hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="px-6">
              <div className="text-sm font-semibold text-gray-500 mb-2">Our Services</div>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (menuItems.length + index) * 0.1 }}
                  >
                    <Link
                      href={service.href}
                      className="block text-lg font-medium hover:text-primary transition-colors"
                      onClick={handleLinkClick}
                    >
                      {service.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 border-t">
            <Button className="w-full" size="lg" onClick={handleLinkClick}>
              Get Free Estimate
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
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