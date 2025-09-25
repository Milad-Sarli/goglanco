import { Metadata } from "next";
import { ColorRestorationPageView } from "@/components/views/color-restoration-page-view";

export const metadata: Metadata = {
  title: "Color Restoration Services | Goglanco",
  description: "Professional color restoration services for your faded rugs. Restore the vibrant colors and beauty of your valuable rugs with our expert techniques.",
};

export default function ColorRestorationPage() {
  return <ColorRestorationPageView />;
}