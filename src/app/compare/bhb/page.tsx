import bhbData from "@/../data/comparison/bhb.json";
import type { ComparisonData } from "@/types/comparison";
import { ComparisonClient } from "../comparison-client";

const data = bhbData as ComparisonData;

export const metadata = {
  title: "BHC vs Black Hills & Badlands — BHC Annual Report",
  description:
    "Side-by-side comparison of Black Hills Consortium and Black Hills & Badlands Tourism Association — revenue, entities, technology, and impact.",
};

export default function CompareBHBPage() {
  return <ComparisonClient data={data} otherComparisonHref="/compare" otherComparisonLabel="BHC vs Elevate Rapid City" />;
}
