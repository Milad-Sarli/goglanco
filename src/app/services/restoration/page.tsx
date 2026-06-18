import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { RestorationPageView } from "@/components/views/restoration-page-view";

export const metadata: Metadata = {
  title: "Rug Restoration Services",
  description: "Professional rug restoration services for damaged rugs. Restore the beauty and integrity of your valuable rugs with our expert techniques.",
  alternates: {
    canonical: "/services/restoration",
  },
  openGraph: {
    title: "Rug Restoration Services | Goglanco",
    description: "Professional rug restoration services for damaged rugs.",
    images: ["/og-restoration-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Restoration Services | Goglanco",
    description: "Professional rug restoration services for damaged rugs.",
    images: ["/og-restoration-service.svg"],
  },
};

export default function RestorationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Services", url: "https://goglanco.com/services" },
        { name: "Rug Restoration", url: "https://goglanco.com/services/restoration" },
      ]} />
      <ServiceJsonLd
        name="Rug Restoration"
        description="Professional rug restoration services for damaged rugs. Restore the beauty and integrity of your valuable rugs with our expert techniques."
        image="/og-restoration-service.svg"
        url="https://goglanco.com/services/restoration"
      />
      <RestorationPageView />
    </>
  );
}