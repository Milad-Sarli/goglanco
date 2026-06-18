import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { CustomPageView } from "@/components/page-views/services/custom-page-view";

export const metadata: Metadata = {
  title: "Custom Rug Services",
  description: "Tailored rug services designed to meet your specific needs and requirements.",
  alternates: {
    canonical: "/services/custom",
  },
  openGraph: {
    title: "Custom Rug Services | Goglanco",
    description: "Tailored rug services designed to meet your specific needs and requirements.",
    images: ["/og-custom-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Rug Services | Goglanco",
    description: "Tailored rug services designed to meet your specific needs.",
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
        description="Tailored rug services designed to meet your specific needs and requirements."
        image="/og-custom-service.svg"
        url="https://goglanco.com/services/custom"
      />
      <CustomPageView />
    </>
  );
}