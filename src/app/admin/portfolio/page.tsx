import { Metadata } from "next";
import { PortfolioItemsList } from "@/components/admin/portfolio/portfolio-items-list";
import { CreatePortfolioItemButton } from "@/components/admin/portfolio/create-portfolio-item-button";
import { Sidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "Portfolio Management | Admin",
  description: "Manage portfolio items and gallery content",
};

export default function PortfolioAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="md:pl-[280px]">
        <main className="container mx-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Portfolio Management</h1>
            <CreatePortfolioItemButton />
          </div>
          <PortfolioItemsList />
        </main>
      </div>
    </div>
  );
} 