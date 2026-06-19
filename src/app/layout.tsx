import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { LayoutProvider } from "@/components/layout/layout-provider";
import { AuthProvider } from "@/components/auth/auth-context";
import { LocalBusinessJsonLd } from "@/components/json-ld";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://goglanco.com";

export const metadata: Metadata = {
  title: {
    default: "Goglanco | Professional Rug Repair & Restoration Services",
    template: "%s | Goglanco",
  },
  description: "Expert rug repair, cleaning, and restoration services. Specialized in oriental rugs, Persian carpets, and all types of textile restoration.",
  keywords: "rug repair, carpet restoration, oriental rug cleaning, Persian carpet repair, professional rug services",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Goglanco",
    title: "Goglanco | Professional Rug Repair & Restoration Services",
    description: "Expert rug repair, cleaning, and restoration services since 1996. Specialized in oriental rugs, Persian carpets, and all types of textile restoration in San Jose, CA.",
    url: "https://goglanco.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Goglanco - Expert Rug Repair, Restoration & Cleaning Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goglanco | Professional Rug Repair & Restoration Services",
    description: "Expert rug repair, cleaning, and restoration services since 1996. Specialized in oriental rugs, Persian carpets in San Jose, CA.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "TkfCEzoO4h1nzCg_16qex6yJIwRslyKeVTIschXt5RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen flex flex-col w-full overflow-x-hidden`} suppressHydrationWarning>
        <LocalBusinessJsonLd />
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
