import flywheelData from "@/../data/flywheel.json";
import entitiesData from "@/../data/entities.json";
import { FlywheelClient } from "./flywheel-client";

export const metadata = {
  title: "The 21% Perpetual Flywheel — BHC Annual Report",
  description: "Interactive flywheel visualization showing how 13 entities create compounding value",
};

export default function FlywheelPage() {
  return <FlywheelClient flywheel={flywheelData} entities={entitiesData} />;
}
