import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { RepairServiceView } from "@/components/page-views/repair-service-view";

export const metadata: Metadata = {
  title: "Rug Repair in San Jose, CA | Expert Rug Repair Services",
  description: "Professional rug repair services in San Jose, CA. Fringe repair, hole patching, reweaving, and restoration of oriental and Persian rugs. 30+ years experience. Free estimates.",
  alternates: {
    canonical: "/services/repair",
  },
  openGraph: {
    title: "Rug Repair Services in San Jose, CA | Goglanco",
    description: "Expert rug repair in San Jose. Fringe repair, hole patching, reweaving for oriental and Persian rugs. Free estimates.",
    images: ["/og-repair-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Repair in San Jose, CA | Goglanco",
    description: "Expert rug repair services in San Jose, CA. Fringe repair, hole patching, reweaving.",
    images: ["/og-repair-service.svg"],
  },
};

export default function RepairServicePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Services", url: "https://goglanco.com/services" },
        { name: "Rug Repair", url: "https://goglanco.com/services/repair" },
      ]} />
      <ServiceJsonLd
        name="Rug Repair"
        description="Professional rug repair services in San Jose, CA. Fringe repair, hole patching, reweaving, and restoration of oriental and Persian rugs with 30+ years of experience."
        image="/og-repair-service.svg"
        url="https://goglanco.com/services/repair"
      />
      <RepairServiceView />
    </>
  );
}
