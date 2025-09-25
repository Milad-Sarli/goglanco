import { Metadata } from "next";
import { RepairServiceView } from "@/components/page-views/repair-service-view";
import { Main } from "next/document";

export const metadata: Metadata = {
  title: "Rug Repair Services | Goglanco.com | Expert Restoration",
  description: "Professional rug repair services by Goglanco. We specialize in restoring damaged rugs, fixing fringe, patching holes, and repairing worn areas of oriental and Persian rugs.",
  keywords: "rug repair, carpet restoration, oriental rug repair, Persian rug fixing, rug fringe repair, rug hole patching",
  openGraph: {
    title: "Rug Repair Services | Goglanco.com | Expert Restoration",
    description: "Professional rug repair services by Goglanco. We specialize in restoring damaged rugs, fixing fringe, patching holes, and repairing worn areas of oriental and Persian rugs.",
    images: ["/og-repair-service.jpg"],
  },
};

export default function RepairServicePage() {
  return  <RepairServiceView />;
}