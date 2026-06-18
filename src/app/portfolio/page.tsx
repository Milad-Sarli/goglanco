import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PortfolioView } from "@/components/page-views/portfolio-view";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our portfolio of rug restoration projects. See before and after transformations of oriental rugs, Persian carpets, and textile restoration work.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Rug Restoration Portfolio | Goglanco",
    description: "Explore our portfolio of rug restoration projects. See before and after transformations of oriental rugs, Persian carpets, and textile restoration work.",
    images: ["/og-portfolio.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rug Restoration Portfolio | Goglanco",
    description: "Explore our portfolio of rug restoration projects.",
    images: ["/og-portfolio.svg"],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "Portfolio", url: "https://goglanco.com/portfolio" },
      ]} />
      <PortfolioView />
    </>
  );
}