export type EntitySlug =
  | "growwise"
  | "outpost-media"
  | "seed-foundation"
  | "seed-academy"
  | "the-cult"
  | "the-op"
  | "pass-creek"
  | "settle-the-west"
  | "auric-labs"
  | "bhc"
  | "delegate-digital"
  | "adventurecap"
  | "grow-campus";

export type EntityType = "501c3" | "501c6" | "LLC" | "Holding" | "Program";

export interface Entity {
  slug: EntitySlug;
  name: string;
  shortName: string;
  legalName: string;
  type: EntityType;
  tagline: string;
  description: string;
  color: string;
  icon: string;
  category: "Technology" | "Media" | "Education" | "Real Estate" | "Community";
  revenueY1Floor: number;
  revenueY1Ceiling: number;
  revenueY5Floor: number;
  revenueY5Ceiling: number;
  status: "operational" | "pre-launch" | "planning";
  website: string | null;
  teamSize: number;
  keyRoles: string[];
  flywheelRole: string;
  flywheelConnection: string;
  aiProduct?: {
    name: string;
    description: string;
    pricing: string;
  };
  revenueStreams: RevenueStream[];
  metrics: EntityMetric[];
}

export interface EntityMetric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface RevenueStream {
  name: string;
  estimatedY1: number;
  estimatedY5: number;
  status: "core" | "new" | "planned";
  category: "saas" | "services" | "media" | "real-estate" | "donations" | "events" | "retail";
}
