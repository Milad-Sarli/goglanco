import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { ServicesPageView } from "@/components/page-views/services-page-view";

export const metadata: Metadata = {
  title: "Rug Repair, Cleaning & Restoration Services in San Jose, CA",
  description: "Professional rug repair, deep cleaning, restoration, and color revival services in San Jose, CA. Serving oriental, Persian, and handmade rugs since 1996. Free estimates available.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Expert Rug Care Services | Goglanco San Jose",
    description: "Professional rug repair, cleaning, restoration, and maintenance services in San Jose, CA. Free estimates.",
    images: ["/og-services.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Rug Care Services | Goglanco San Jose",
    description: "Professional rug repair, cleaning, restoration services in San Jose, CA.",
    images: ["/og-services.svg"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Services", url: "https://goglanco.com/services" },
      ]} />
      <ServiceJsonLd
        name="Expert Rug Care Services"
        description="Professional rug repair, deep cleaning, restoration, and color revival services in San Jose, CA. Serving oriental, Persian, and handmade rugs since 1996."
        image="/og-services.svg"
        url="https://goglanco.com/services"
      />
      <ServicesPageView />
    </>
  );
}
