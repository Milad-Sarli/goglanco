'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function AdminHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">View Site</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 