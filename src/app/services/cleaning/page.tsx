import { Metadata } from "next";
import { CleaningServiceView } from "@/components/page-views/cleaning-service-view";

export const metadata: Metadata = {
  title: "Deep Cleaning Services | Goglanco.com | Professional Rug Cleaning",
  description: "Professional deep cleaning services for all types of rugs. Our expert cleaning process removes dirt, stains, odors, and allergens while preserving your rug's beauty and integrity.",
  keywords: "rug deep cleaning, carpet cleaning service, oriental rug washing, Persian rug cleaning, stain removal, odor elimination",
  openGraph: {
    title: "Deep Cleaning Services | Goglanco.com | Professional Rug Cleaning",
    description: "Professional deep cleaning services for all types of rugs. Our expert cleaning process removes dirt, stains, odors, and allergens while preserving your rug's beauty and integrity.",
    images: ["/og-cleaning-service.jpg"],
  },
};

export default function CleaningServicePage() {
  return <CleaningServiceView />;
}