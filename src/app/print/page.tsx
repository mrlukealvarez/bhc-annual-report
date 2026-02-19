import entitiesData from "@/../data/entities.json";
import metricsData from "@/../data/metrics.json";
import financialsData from "@/../data/financials.json";
import investorsData from "@/../data/investors.json";
import teamData from "@/../data/team.json";
import goalsData from "@/../data/goals.json";
import flywheelData from "@/../data/flywheel.json";
import { PrintClient } from "./print-client";

export const metadata = {
  title: "Print Report — BHC Annual Report 2026",
  description: "Printer-friendly version of the complete BHC Annual Report",
};

export default function PrintPage() {
  return (
    <PrintClient
      entities={entitiesData}
      metrics={metricsData}
      financials={financialsData}
      investors={investorsData}
      team={teamData}
      goals={goalsData}
      flywheel={flywheelData}
    />
  );
}
