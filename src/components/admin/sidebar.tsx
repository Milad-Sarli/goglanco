'use client';

import { Home, Settings, Image, Users, MessageSquare, Box, LogOut, Menu, X, Moon, Sun, FileText, Images } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Hero Section", href: "/admin/hero", icon: Image },
  { name: "About", href: "/admin/about", icon: FileText },
  { name: "Portfolio", href: "/admin/portfolio", icon: Images },
  { name: "Services", href: "/admin/services", icon: Box },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

// Simple theme toggle component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Button variant="ghost" size="sm" className="w-8 h-8 p-0" />;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-8 h-8 p-0"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 md:hidden z-40">
        <Button 
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <span className="ml-4 text-lg font-semibold">Goglanco Admin</span>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 w-[280px] h-screen bg-white border-r border-gray-200",
          "dark:bg-gray-800 dark:border-gray-700",
          "transition-transform duration-300 ease-in-out transform",
          "md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-semibold dark:text-white">
                Goglanco Admin
              </span>
            </Link>
            <ThemeToggle />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 mr-3",
                      isActive ? "text-primary-foreground" : "text-gray-500 dark:text-gray-400"
                    )} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Content padding for mobile header */}
      <div className="h-16 md:h-0" />
    </>
  );
} 