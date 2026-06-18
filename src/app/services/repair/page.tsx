import { Metadata } from "next";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/json-ld";
import { RepairServiceView } from "@/components/page-views/repair-service-view";

export const metadata: Metadata = {
  title: "Rug Repair Services",
  description: "Professional rug repair services by Goglanco. We specialize in restoring damaged rugs, fixing fringe, patching holes, and repairing worn areas of oriental and Persian rugs.",
  alternates: {
    canonical: "/services/repair",
  },
  openGraph: {
    title: "Rug Repair Services | Goglanco",
    description: "Professional rug repair services. Specializing in fringe repair, hole patching, and restoration of oriental and Persian rugs.",
    images: ["/og-repair-service.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Repair Services | Goglanco",
    description: "Professional rug repair services for oriental and Persian rugs.",
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
        description="Professional rug repair services by Goglanco. We specialize in restoring damaged rugs, fixing fringe, patching holes, and repairing worn areas of oriental and Persian rugs."
        image="/og-repair-service.svg"
        url="https://goglanco.com/services/repair"
      />
      <RepairServiceView />
    </>
  );
}