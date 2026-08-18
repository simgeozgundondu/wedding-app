import WeddingExperience from "@/components/WeddingExperience";
import { wedding } from "@/lib/wedding-data";

export const metadata = {
  title: "Ayşe & Mert",
  description: "14 Eylül 2026 · The Garden Wedding Hall",
};

export default function WeddingPage() {
  return <WeddingExperience wedding={wedding} />;
}
