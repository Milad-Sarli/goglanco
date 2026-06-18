import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { ContactHeroSection } from "@/components/sections/contact/contact-hero-section";
import { ContactMapSection } from "@/components/sections/contact/contact-map-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our rug restoration experts. We're here to help with all your rug repair and restoration needs.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Goglanco",
    description: "Connect with our rug restoration experts for all your repair and restoration needs.",
    images: ["/og-contact.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Goglanco",
    description: "Connect with our rug restoration experts.",
    images: ["/og-contact.svg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Contact Us", url: "https://goglanco.com/contact" },
      ]} />
      <main className="min-h-screen">
        <ContactHeroSection />
        <ContactSection />
        <ContactMapSection />
      </main>
    </>
  );
} 