import financialsData from "@/../data/financials.json";
import entitiesData from "@/../data/entities.json";
import { FinancialsClient } from "./financials-client";

export const metadata = {
  title: "Financial Breakdown — BHC Annual Report",
  description:
    "Complete financial overview of the Black Hills Consortium ecosystem",
};

export default function FinancialsPage() {
  return <FinancialsClient financials={financialsData} entities={entitiesData} />;
}
