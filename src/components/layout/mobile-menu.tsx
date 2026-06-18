'use client';

import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { WeekendConsultationModal } from '@/components/weekend-consultation-modal';
import { Menu } from 'lucide-react';

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
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const getButtonStyle = () => {
    if (!mounted) return 'text-white';
    if (isScrolled) return 'text-foreground hover:bg-muted/80';
    return 'text-white hover:bg-white/10';
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'lg:hidden h-10 w-10 rounded-full',
            getButtonStyle()
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
        <nav className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <Link href="/" className="text-xl font-bold tracking-tight" onClick={handleLinkClick}>
              Goglanco
            </Link>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-6">
            {/* Main Menu */}
            <div className="px-6 mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Menu
              </p>
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center py-3 text-[17px] font-medium',
                        'text-foreground hover:text-primary transition-colors duration-200',
                        'border-b border-border/30'
                      )}
                      onClick={handleLinkClick}
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="px-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Services
              </p>
              <ul className="space-y-1">
                {services.map((service, index) => (
                  <motion.li
                    key={service.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (menuItems.length + index) * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={service.href}
                      className={cn(
                        'flex items-center py-2.5 text-sm',
                        'text-muted-foreground hover:text-foreground transition-colors duration-200'
                      )}
                      onClick={handleLinkClick}
                    >
                      {service.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <WeekendConsultationModal className="w-full" />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}