'use client';

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

// Metadata can't be used in client components, so we need to remove it
// export const metadata = {
//   title: "Admin Dashboard | Goglanco",
//   description: "Admin dashboard for Goglanco website management",
// };

// This ensures admin layout is completely separate from main layout
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="min-h-screen">
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 