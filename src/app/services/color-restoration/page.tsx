import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { ColorRestorationPageView } from "@/components/views/color-restoration-page-view";

export const metadata: Metadata = {
  title: "Color Restoration Services",
  description: "Professional color restoration services for your faded rugs. Restore the vibrant colors and beauty of your valuable rugs with our expert techniques.",
  alternates: {
    canonical: "/services/color-restoration",
  },
  openGraph: {
    title: "Color Restoration Services | Goglanco",
    description: "Professional color restoration services for faded rugs.",
    images: ["/og-color-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Restoration Services | Goglanco",
    description: "Professional color restoration services for faded rugs.",
    images: ["/og-color-service.svg"],
  },
};

export default function ColorRestorationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Services", url: "https://goglanco.com/services" },
        { name: "Color Restoration", url: "https://goglanco.com/services/color-restoration" },
      ]} />
      <ServiceJsonLd
        name="Color Restoration"
        description="Professional color restoration services for your faded rugs. Restore the vibrant colors and beauty of your valuable rugs with our expert techniques."
        image="/og-color-service.svg"
        url="https://goglanco.com/services/color-restoration"
      />
      <ColorRestorationPageView />
    </>
  );
}