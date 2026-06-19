import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { RestorationPageView } from "@/components/views/restoration-page-view";

export const metadata: Metadata = {
  title: "Rug Restoration in San Jose, CA | Professional Rug Restoration",
  description: "Expert rug restoration services in San Jose, CA. Restore damaged, worn, and aged rugs to their original beauty. Oriental, Persian, and antique rug specialists. Free estimates.",
  alternates: {
    canonical: "/services/restoration",
  },
  openGraph: {
    title: "Rug Restoration Services in San Jose, CA | Goglanco",
    description: "Expert rug restoration in San Jose. Restore damaged, worn, and aged rugs to their original beauty.",
    images: ["/og-restoration-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Restoration in San Jose, CA | Goglanco",
    description: "Expert rug restoration services in San Jose, CA.",
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
        description="Expert rug restoration services in San Jose, CA. Restore damaged, worn, and aged rugs to their original beauty with traditional and modern techniques."
        image="/og-restoration-service.svg"
        url="https://goglanco.com/services/restoration"
      />
      <RestorationPageView />
    </>
  );
}
