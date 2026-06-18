import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { CleaningServiceView } from "@/components/page-views/cleaning-service-view";

export const metadata: Metadata = {
  title: "Deep Cleaning Services",
  description: "Professional deep cleaning services for all types of rugs. Our expert cleaning process removes dirt, stains, odors, and allergens while preserving your rug's beauty and integrity.",
  alternates: {
    canonical: "/services/cleaning",
  },
  openGraph: {
    title: "Deep Cleaning Services | Goglanco",
    description: "Professional deep cleaning for all types of rugs. Stain removal, odor elimination, and expert care.",
    images: ["/og-cleaning-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Cleaning Services | Goglanco",
    description: "Professional deep cleaning for all types of rugs.",
    images: ["/og-cleaning-service.svg"],
  },
};

export default function CleaningServicePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Services", url: "https://goglanco.com/services" },
        { name: "Cleaning", url: "https://goglanco.com/services/cleaning" },
      ]} />
      <ServiceJsonLd
        name="Rug Cleaning"
        description="Professional deep cleaning services for all types of rugs. Our expert cleaning process removes dirt, stains, odors, and allergens while preserving your rug's beauty and integrity."
        image="/og-cleaning-service.svg"
        url="https://goglanco.com/services/cleaning"
      />
      <CleaningServiceView />
    </>
  );
}