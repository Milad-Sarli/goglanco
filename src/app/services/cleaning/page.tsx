import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { CleaningServiceView } from "@/components/page-views/cleaning-service-view";

export const metadata: Metadata = {
  title: "Rug Cleaning in San Jose, CA | Professional Deep Cleaning",
  description: "Professional rug deep cleaning services in San Jose, CA. Removes dirt, stains, odors, and allergens from oriental, Persian, and handmade rugs. Safe, eco-friendly methods. Free estimates.",
  alternates: {
    canonical: "/services/cleaning",
  },
  openGraph: {
    title: "Rug Cleaning Services in San Jose, CA | Goglanco",
    description: "Professional rug deep cleaning in San Jose. Stain removal, odor elimination, and expert care for all rug types.",
    images: ["/og-cleaning-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Cleaning in San Jose, CA | Goglanco",
    description: "Professional rug deep cleaning services in San Jose, CA.",
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
        description="Professional rug deep cleaning services in San Jose, CA. Removes dirt, stains, odors, and allergens while preserving your rug's beauty and integrity."
        image="/og-cleaning-service.svg"
        url="https://goglanco.com/services/cleaning"
      />
      <CleaningServiceView />
    </>
  );
}
