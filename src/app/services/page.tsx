import { Metadata } from 'next';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { ServicesPageView } from '@/components/page-views/services-page-view';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Discover our professional rug cleaning, restoration, and maintenance services. We ensure your valuable rugs receive the highest quality care they deserve.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Expert Rug Care Services | Goglanco',
    description: 'Discover our professional rug cleaning, restoration, and maintenance services.',
    images: ['/og-services.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Rug Care Services | Goglanco',
    description: 'Discover our professional rug care services.',
    images: ['/og-services.svg'],
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
        description="Discover our professional rug cleaning, restoration, and maintenance services. We ensure your valuable rugs receive the highest quality care they deserve."
        image="/og-services.svg"
        url="https://goglanco.com/services"
      />
      <ServicesPageView />
    </>
  );
} 