'use client';

import { Home, Settings, Image, Users, MessageSquare, Box, LogOut, Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Hero Section", href: "/admin/hero", icon: Image },
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        className="fixed top-4 left-4 z-50 md:hidden" 
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 py-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 px-2">
            <Link href="/admin" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Goglanco Admin
              </span>
            </Link>
            <ThemeToggle />
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 text-base font-medium rounded-lg",
                    isActive 
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary-foreground" : "text-gray-500 dark:text-gray-400")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 