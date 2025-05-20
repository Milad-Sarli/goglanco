import { Metadata } from "next";
import { PortfolioView } from "@/components/page-views/portfolio-view";

export const metadata: Metadata = {
  title: "Portfolio | Goglanco.com | Rug Restoration Projects",
  description: "Explore our portfolio of rug restoration projects. See before and after transformations of oriental rugs, Persian carpets, and textile restoration work.",
  keywords: "rug restoration portfolio, carpet repair examples, oriental rug restoration, Persian carpet repair, textile restoration projects",
  openGraph: {
    title: "Portfolio | Goglanco.com | Rug Restoration Projects",
    description: "Explore our portfolio of rug restoration projects. See before and after transformations of oriental rugs, Persian carpets, and textile restoration work.",
    images: ["/og-portfolio.jpg"],
  },
};

export default function PortfolioPage() {
  return <PortfolioView />;
}