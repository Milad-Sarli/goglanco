import { Metadata } from "next";
import { RestorationPageView } from "@/components/views/restoration-page-view";

export const metadata: Metadata = {
  title: "Rug Restoration Services | Goglanco",
  description: "Professional rug restoration services for damaged rugs. Restore the beauty and integrity of your valuable rugs with our expert techniques.",
};

export default function RestorationPage() {
  return <RestorationPageView />;
}