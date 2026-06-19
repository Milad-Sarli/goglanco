import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { CustomPageView } from "@/components/page-views/services/custom-page-view";

export const metadata: Metadata = {
  title: "Custom Rug Services in San Jose, CA | Bespoke Rug Design & Repair",
  description: "Custom rug services in San Jose, CA. Bespoke rug design, custom sizing, fringe work, and tailored rug solutions for your home or business. Expert craftsmanship since 1996. Free estimates.",
  alternates: {
    canonical: "/services/custom",
  },
  openGraph: {
    title: "Custom Rug Services in San Jose, CA | Goglanco",
    description: "Custom rug services in San Jose. Bespoke design, custom sizing, and tailored rug solutions.",
    images: ["/og-custom-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Rug Services in San Jose, CA | Goglanco",
    description: "Custom rug services in San Jose, CA.",
    images: ["/og-custom-service.svg"],
  },
};

export default function CustomPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Services", url: "https://goglanco.com/services" },
        { name: "Custom Rugs", url: "https://goglanco.com/services/custom" },
      ]} />
      <ServiceJsonLd
        name="Custom Rugs"
        description="Custom rug services in San Jose, CA. Bespoke rug design, custom sizing, fringe work, and tailored rug solutions with expert craftsmanship since 1996."
        image="/og-custom-service.svg"
        url="https://goglanco.com/services/custom"
      />
      <CustomPageView />
    </>
  );
}
