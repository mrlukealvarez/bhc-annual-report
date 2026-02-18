import elevateData from "@/../data/comparison/elevate.json";
import type { ComparisonData } from "@/types/comparison";
import { ComparisonClient } from "./comparison-client";

const data = elevateData as ComparisonData;

export const metadata = {
  title: "BHC vs Elevate Rapid City — BHC Annual Report",
  description:
    "Side-by-side comparison of Black Hills Consortium and Elevate Rapid City — revenue, staff, technology, and economic impact.",
};

export default function ComparePage() {
  return <ComparisonClient data={data} otherComparisonHref="/compare/bhb" otherComparisonLabel="BHC vs Black Hills & Badlands" />;
}
