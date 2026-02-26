"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  EmeraldShimmer,
  NavyGlow,
  ParallaxSection,
  PulseGlow,
} from "@/components/motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EntityBreakdown {
  slug: string;
  name: string;
  revenueY1Floor: number;
  revenueY1Ceiling: number;
  revenueY5Floor: number;
  revenueY5Ceiling: number;
  shareOfY1Floor: number;
}

interface FinancialsData {
  aggregate: {
    revenueY1Floor: number;
    revenueY1Ceiling: number;
    revenueY5Floor: number;
    revenueY5Ceiling: number;
    valuationY1Low: number;
    valuationY1High: number;
    valuationY5Low: number;
    valuationY5High: number;
    capitalRaise: number;
    flywheelPercentage: number;
    flywheelDistribution: {
      auricLabs: number;
      seedFoundation: number;
      bhc: number;
    };
  };
  pricing: {
    starter: number;
    solo: number;
    growth: number;
    enterprise: number;
    mso: number;
  };
  entityBreakdown: EntityBreakdown[];
}

interface EntityData {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  [key: string]: unknown;
}

interface FinancialsClientProps {
  financials: FinancialsData;
  entities: EntityData[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert raw number to millions/billions display values for CountUp */
function toDisplay(value: number): {
  end: number;
  prefix: string;
  suffix: string;
  decimals: number;
} {
  if (value >= 1_000_000_000) {
    return {
      end: value / 1_000_000_000,
      prefix: "$",
      suffix: "B",
      decimals: 2,
    };
  }
  if (value >= 1_000_000) {
    return {
      end: value / 1_000_000,
      prefix: "$",
      suffix: "M",
      decimals: 1,
    };
  }
  if (value >= 1_000) {
    return { end: value / 1_000, prefix: "$", suffix: "K", decimals: 0 };
  }
  return { end: value, prefix: "$", suffix: "", decimals: 0 };
}

/** Look up an entity color by slug, fallback to gray */
function getEntityColor(
  slug: string,
  entities: EntityData[]
): string {
  const found = entities.find((e) => e.slug === slug);
  return found?.color ?? "#6b7280";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FinancialsClient({
  financials,
  entities,
}: FinancialsClientProps) {
  const { aggregate, pricing, entityBreakdown } = financials;

  // Sort entities by Y1 floor descending for bar chart
  const sortedEntities = [...entityBreakdown].sort(
    (a, b) => b.revenueY1Floor - a.revenueY1Floor
  );

  // Bar chart data
  const barChartData = sortedEntities.map((e) => ({
    name: e.name.length > 12 ? e.name.slice(0, 11) + "\u2026" : e.name,
    fullName: e.name,
    floor: e.revenueY1Floor,
    ceiling: e.revenueY1Ceiling,
    color: getEntityColor(e.slug, entities),
  }));

  // Pie chart data — filter out 0% shares
  const pieData = entityBreakdown
    .filter((e) => e.shareOfY1Floor > 0)
    .sort((a, b) => b.shareOfY1Floor - a.shareOfY1Floor)
    .map((e) => ({
      name: e.name,
      value: e.shareOfY1Floor,
      color: getEntityColor(e.slug, entities),
    }));

  // Aggregate metric cards
  const y1Floor = toDisplay(aggregate.revenueY1Floor);
  const y1Ceiling = toDisplay(aggregate.revenueY1Ceiling);
  const y5Floor = toDisplay(aggregate.revenueY5Floor);
  const y5Ceiling = toDisplay(aggregate.revenueY5Ceiling);
  const capRaise = toDisplay(aggregate.capitalRaise);

  // Pricing tiers
  const pricingTiers = [
    {
      name: "Starter",
      price: pricing.starter,
      desc: "Per month",
    },
    {
      name: "Solo",
      price: pricing.solo,
      desc: "Per month",
    },
    {
      name: "Growth",
      price: pricing.growth,
      desc: "Per location / month",
    },
    {
      name: "Enterprise",
      price: pricing.enterprise,
      desc: "Per location / month",
    },
    {
      name: "MSO",
      price: pricing.mso,
      desc: "Per location / month",
    },
  ];

  // Flywheel recipients
  const flywheelRecipients = [
    {
      name: "Auric Labs",
      pct: aggregate.flywheelDistribution.auricLabs,
      desc: "AI-native startup accelerator — funds portfolio companies and innovation programs",
    },
    {
      name: "Seed Foundation",
      pct: aggregate.flywheelDistribution.seedFoundation,
      desc: "501(c)(3) charitable arm — funds scholarships, grants, and community programs",
    },
    {
      name: "BHC",
      pct: aggregate.flywheelDistribution.bhc,
      desc: "Regional coordination — funds shared services, capital raise, and ecosystem operations",
    },
  ];

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Hero                                                    */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="uppercase tracking-widest text-emerald-400 text-sm mb-6">
              Financial Overview
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              The{" "}
              <EmeraldShimmer>Numbers</EmeraldShimmer>{" "}
              Behind the Ecosystem
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Complete financial breakdown of 13 entities, V6 floor to V4
              ceiling projections, pricing model, and the 21% perpetual
              flywheel that sustains everything.
            </p>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Aggregate Metrics Bar                                   */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-gray-50">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Ecosystem Totals
          </h2>
        </FadeIn>
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto"
          staggerDelay={0.08}
        >
          {/* Revenue Y1 Floor */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white p-6 text-center shadow-sm h-full">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Revenue Y1 Floor
              </p>
              <CountUp
                end={y1Floor.end}
                prefix={y1Floor.prefix}
                suffix={y1Floor.suffix}
                decimals={y1Floor.decimals}
                className="text-2xl md:text-3xl font-bold text-[#0f172a]"
                duration={2}
              />
            </NavyGlow>
          </StaggerItem>

          {/* Revenue Y1 Ceiling */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white p-6 text-center shadow-sm h-full">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Revenue Y1 Ceiling
              </p>
              <CountUp
                end={y1Ceiling.end}
                prefix={y1Ceiling.prefix}
                suffix={y1Ceiling.suffix}
                decimals={y1Ceiling.decimals}
                className="text-2xl md:text-3xl font-bold text-[#0f172a]"
                duration={2}
              />
            </NavyGlow>
          </StaggerItem>

          {/* Revenue Y5 Floor */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white p-6 text-center shadow-sm h-full">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Revenue Y5 Floor
              </p>
              <CountUp
                end={y5Floor.end}
                prefix={y5Floor.prefix}
                suffix={y5Floor.suffix}
                decimals={y5Floor.decimals}
                className="text-2xl md:text-3xl font-bold text-[#0f172a]"
                duration={2}
              />
            </NavyGlow>
          </StaggerItem>

          {/* Revenue Y5 Ceiling */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white p-6 text-center shadow-sm h-full">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Revenue Y5 Ceiling
              </p>
              <CountUp
                end={y5Ceiling.end}
                prefix={y5Ceiling.prefix}
                suffix={y5Ceiling.suffix}
                decimals={y5Ceiling.decimals}
                className="text-2xl md:text-3xl font-bold text-[#0f172a]"
                duration={2}
              />
            </NavyGlow>
          </StaggerItem>

          {/* Valuation Y1 — range, show as text */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white p-6 text-center shadow-sm h-full">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Valuation Y1
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#0f172a]">
                {formatCurrency(aggregate.valuationY1Low)}&ndash;
                {formatCurrency(aggregate.valuationY1High)}
              </p>
            </NavyGlow>
          </StaggerItem>

          {/* Capital Raise */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white p-6 text-center shadow-sm h-full">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Capital Raise
              </p>
              <CountUp
                end={capRaise.end}
                prefix={capRaise.prefix}
                suffix={capRaise.suffix}
                decimals={capRaise.decimals}
                className="text-2xl md:text-3xl font-bold text-emerald-600"
                duration={2}
              />
            </NavyGlow>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Entity Revenue Breakdown — BarChart                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-2">
            Entity Revenue Breakdown
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Year 1 revenue by entity &mdash; V6 Floor vs V4 Ceiling
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 md:p-6">
            <ResponsiveContainer width="100%" height={480}>
              <BarChart
                data={barChartData}
                margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                  axisLine={{ stroke: "#d1d5db" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  tickFormatter={(v: number) => formatCurrency(v)}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#d1d5db" }}
                  width={80}
                />
                <Tooltip
                  formatter={(
                    value: number | undefined,
                    name: string | undefined
                  ) => [
                    formatCurrency(value ?? 0),
                    (name ?? "") === "floor" ? "V6 Floor" : "V4 Ceiling",
                  ]}
                  labelFormatter={(label) => {
                    const labelStr = String(label ?? "");
                    const item = barChartData.find((d) => d.name === labelStr);
                    return item?.fullName ?? labelStr;
                  }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend
                  formatter={(value: string) =>
                    value === "floor" ? "V6 Floor" : "V4 Ceiling"
                  }
                />
                <Bar
                  dataKey="floor"
                  fill="#059669"
                  radius={[4, 4, 0, 0]}
                  name="floor"
                />
                <Bar
                  dataKey="ceiling"
                  fill="#1e293b"
                  radius={[4, 4, 0, 0]}
                  name="ceiling"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Revenue Concentration — PieChart Donut                  */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-gray-50">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-2">
            Revenue Concentration
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Share of Y1 floor revenue by entity
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Chart */}
            <div className="w-full md:w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={1}
                    label={({ name, value }: { name?: string; value?: number }) =>
                      (value ?? 0) > 5 ? `${name ?? ""} ${value}%` : ""
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number | undefined) => `${value ?? 0}%`}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="w-full md:w-1/2">
              <StaggerContainer className="space-y-3" staggerDelay={0.06}>
                {pieData.map((entry) => (
                  <StaggerItem key={entry.name}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm text-gray-700 font-medium flex-1">
                        {entry.name}
                      </span>
                      <span className="text-sm font-bold text-[#0f172a]">
                        {entry.value}%
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 5: 21% Flywheel Distribution                              */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-emerald-400 text-sm mb-4">
              Perpetual Flywheel
            </p>
            <h2 className="text-3xl font-bold text-white mb-2">
              <CountUp
                end={aggregate.flywheelPercentage}
                suffix="%"
                className="text-emerald-400"
                duration={2}
              />{" "}
              <span className="text-white">FlowBot Equity Distribution</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every dollar of FlowBot equity distributes 7% each to three
              ecosystem pillars, creating a self-sustaining growth engine.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.15}
        >
          {flywheelRecipients.map((recipient) => (
            <StaggerItem key={recipient.name}>
              <NavyGlow className="rounded-xl bg-[#1e293b] p-8 text-center border border-emerald-600/30 h-full">
                <CountUp
                  end={recipient.pct}
                  suffix="%"
                  className="text-5xl font-bold text-emerald-400"
                  duration={2}
                />
                <h3 className="text-xl font-bold text-white mt-4 mb-2">
                  {recipient.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {recipient.desc}
                </p>
              </NavyGlow>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 6: V4 Pricing Tiers                                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-2">
            FlowBot Pricing Tiers
          </h2>
          <p className="text-center text-gray-500 mb-12">
            V4 pricing model powering the revenue engine
          </p>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          staggerDelay={0.1}
        >
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <NavyGlow className="rounded-xl bg-gray-50 p-6 text-center shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-3">
                    {tier.name}
                  </h3>
                  <div className="mb-2">
                    <CountUp
                      end={tier.price}
                      prefix="$"
                      className="text-3xl font-bold text-emerald-600"
                      duration={1.5}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">{tier.desc}</p>
              </NavyGlow>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 7: CTA                                                     */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to See the{" "}
              <EmeraldShimmer>Investment Case</EmeraldShimmer>?
            </h2>
            <p className="text-gray-400 mb-10">
              Explore investor details, team profiles, and the strategic
              goals driving the BHC ecosystem forward.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PulseGlow>
                <Link
                  href="/investors"
                  className="inline-block rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  View Investor Details
                </Link>
              </PulseGlow>
              <Link
                href="/"
                className="inline-block rounded-full border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Back to Overview
              </Link>
            </div>
          </div>
        </FadeIn>
      </ParallaxSection>
    </>
  );
}
