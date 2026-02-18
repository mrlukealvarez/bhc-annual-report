import teamData from "@/../data/team.json";
import entitiesData from "@/../data/entities.json";
import { TeamClient } from "./team-client";

export const metadata = {
  title: "Our Team — BHC Annual Report",
  description: "Meet the 51-person team powering the Black Hills Consortium ecosystem",
};

export default function TeamPage() {
  return <TeamClient team={teamData} entities={entitiesData} />;
}
