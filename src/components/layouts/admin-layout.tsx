import { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="md:pl-[280px]">
        <main className="container mx-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
} 