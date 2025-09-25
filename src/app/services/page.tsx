import { Metadata } from 'next';
import { ServicesPageView } from '@/components/page-views/services-page-view';

export const metadata: Metadata = {
  title: 'Expert Rug Care Services | Goglanco',
  description: 'Discover our professional rug cleaning, restoration, and maintenance services. We ensure your valuable rugs receive the highest quality care they deserve.',
};

export default function ServicesPage() {
  return <ServicesPageView />; 
}