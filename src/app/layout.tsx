import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { LayoutProvider } from "@/components/layout/layout-provider";
import { AuthProvider } from "@/components/auth/auth-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goglanco | Professional Rug Repair & Restoration Services",
  description: "Expert rug repair, cleaning, and restoration services. Specialized in oriental rugs, Persian carpets, and all types of textile restoration.",
  keywords: "rug repair, carpet restoration, oriental rug cleaning, Persian carpet repair, professional rug services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen flex flex-col w-full overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
