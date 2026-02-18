import goalsData from "@/../data/goals.json";
import { GoalsClient } from "./goals-client";

export const metadata = {
  title: "Goals & Milestones — BHC Annual Report",
  description: "Track progress toward BHC five-year goals and milestones",
};

export default function GoalsPage() {
  return <GoalsClient goals={goalsData} />;
}
