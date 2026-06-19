import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { ColorRestorationPageView } from "@/components/views/color-restoration-page-view";

export const metadata: Metadata = {
  title: "Rug Color Restoration in San Jose, CA | Revive Faded Rugs",
  description: "Professional rug color restoration services in San Jose, CA. Revive faded, sun-damaged, and discolored rugs with expert dyeing and color matching. All rug types. Free estimates.",
  alternates: {
    canonical: "/services/color-restoration",
  },
  openGraph: {
    title: "Rug Color Restoration in San Jose, CA | Goglanco",
    description: "Professional rug color restoration in San Jose. Revive faded and sun-damaged rugs with expert dyeing.",
    images: ["/og-color-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Color Restoration in San Jose, CA | Goglanco",
    description: "Professional rug color restoration services in San Jose, CA.",
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
        description="Professional rug color restoration services in San Jose, CA. Revive faded, sun-damaged, and discolored rugs with expert dyeing and color matching techniques."
        image="/og-color-service.svg"
        url="https://goglanco.com/services/color-restoration"
      />
      <ColorRestorationPageView />
    </>
  );
}
