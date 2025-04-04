import { Metadata } from "next";
import { ContactHeroSection } from "@/components/sections/contact/contact-hero-section";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";
import { ContactMapSection } from "@/components/sections/contact/contact-map-section";
import { ContactInfoSection } from "@/components/sections/contact/contact-info-section";

export const metadata: Metadata = {
  title: "Contact Us | Goglanco.com",
  description: "Get in touch with our rug restoration experts. We're here to help with all your rug repair and restoration needs.",
  keywords: "rug repair contact, carpet restoration contact, rug repair location, contact rug experts",
  openGraph: {
    title: "Contact Us | Goglanco.com",
    description: "Connect with our rug restoration experts for all your repair and restoration needs.",
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <ContactMapSection />
    </main>
  );
} 