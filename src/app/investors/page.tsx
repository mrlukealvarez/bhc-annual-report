import investorsData from "@/../data/investors.json";
import { InvestorsClient } from "./investors-client";

export const metadata = {
  title: "Investment Opportunity — BHC Annual Report",
  description:
    "Explore the $105M capital raise opportunity with the Black Hills Consortium",
};

export default function InvestorsPage() {
  return <InvestorsClient data={investorsData} />;
}
