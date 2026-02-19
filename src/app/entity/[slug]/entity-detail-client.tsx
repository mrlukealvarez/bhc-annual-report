"use client";

import type { Entity } from "@/types/entity";
import Link from "next/link";
import { formatCurrency, formatNumber } from "@/lib/format";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  EmeraldShimmer,
  NavyGlow,
  ParallaxSection,
  PulseGlow,
  ScaleReveal,
} from "@/components/motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EntityDetailClientProps {
  entity: Entity;
  relatedEntities: Entity[];
}

/** Convert raw number to millions-display values for CountUp */
function toMillions(value: number): {
  end: number;
  prefix: string;
  suffix: string;
  decimals: number;
} {
  if (value >= 1_000_000_000) {
    return { end: value / 1_000_000_000, prefix: "$", suffix: "B", decimals: 1 };
  }
  if (value >= 1_000_000) {
    return { end: value / 1_000_000, prefix: "$", suffix: "M", decimals: 1 };
  }
  if (value >= 1_000) {
    return { end: value / 1_000, prefix: "$", suffix: "K", decimals: 0 };
  }
  return { end: value, prefix: "$", suffix: "", decimals: 0 };
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  operational: { bg: "bg-green-500/20", text: "text-green-400", label: "Operational" },
  "pre-launch": { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Pre-Launch" },
  planning: { bg: "bg-gray-500/20", text: "text-gray-400", label: "Planning" },
};

const streamStatusColors: Record<string, { bg: string; text: string }> = {
  core: { bg: "bg-green-100", text: "text-green-700" },
  new: { bg: "bg-blue-100", text: "text-blue-700" },
  planned: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function EntityDetailClient({ entity, relatedEntities }: EntityDetailClientProps) {
  const y1Display = toMillions(entity.revenueY1Floor);
  const y5Display = toMillions(entity.revenueY5Floor);
  const status = statusColors[entity.status] ?? statusColors.planning;

  // Revenue projection data (Year 1 → Year 5, linear interpolation)
  const projectionData = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    floor:
      entity.revenueY1Floor +
      (entity.revenueY5Floor - entity.revenueY1Floor) * (i / 4),
    ceiling:
      entity.revenueY1Ceiling +
      (entity.revenueY5Ceiling - entity.revenueY1Ceiling) * (i / 4),
  }));

  // Revenue streams (may not be populated yet by Agent 1)
  const revenueStreams = entity.revenueStreams ?? [];
  const totalY1 = revenueStreams.reduce((sum, s) => sum + s.estimatedY1, 0) || entity.revenueY1Floor;

  // Entity metrics (may not be populated yet by Agent 1)
  const metrics = entity.metrics ?? [];

  return (
    <>
      {/* Section 1: Entity Hero */}
      <section className="bg-[#0f172a] text-white overflow-hidden">
        <ParallaxSection speed={0.2} className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            {/* Status badge */}
            <div className="absolute top-6 right-4 md:right-8">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${status.bg} ${status.text}`}
              >
                {status.label}
              </span>
            </div>

            <div
              className="border-l-4 pl-6 md:pl-8"
              style={{ borderColor: entity.color }}
            >
              {/* Type badge */}
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-4"
                style={{ backgroundColor: entity.color }}
              >
                {entity.type}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {entity.name}
              </h1>

              <p className="text-sm text-gray-400 mb-4">{entity.legalName}</p>

              <p className="text-xl md:text-2xl mb-8">
                <EmeraldShimmer>{entity.tagline}</EmeraldShimmer>
              </p>

              {/* Y1 / Y5 Revenue CountUp */}
              <div className="flex flex-col sm:flex-row gap-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold">
                    <CountUp
                      end={y1Display.end}
                      prefix={y1Display.prefix}
                      suffix={y1Display.suffix}
                      decimals={y1Display.decimals}
                      duration={2}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Y1 Revenue (Floor)</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">
                    <CountUp
                      end={y5Display.end}
                      prefix={y5Display.prefix}
                      suffix={y5Display.suffix}
                      decimals={y5Display.decimals}
                      duration={2}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Y5 Revenue (Floor)</p>
                </div>
              </div>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Section 2: About */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: `${entity.color}15`,
                color: entity.color,
              }}
            >
              {entity.category}
            </span>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
              {entity.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Revenue Breakdown */}
      {revenueStreams.length > 0 && (
        <section className="bg-[#f9fafb] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Revenue Streams
              </h2>
            </FadeIn>
            <StaggerContainer className="space-y-4" staggerDelay={0.08}>
              {revenueStreams.map((stream) => {
                const pct = Math.max(
                  (stream.estimatedY1 / totalY1) * 100,
                  5
                );
                const streamStatus =
                  streamStatusColors[stream.status] ?? streamStatusColors.planned;

                return (
                  <StaggerItem key={stream.name}>
                    <div className="bg-white rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">
                            {stream.name}
                          </span>
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${streamStatus.bg} ${streamStatus.text}`}
                          >
                            {stream.status}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {formatCurrency(stream.estimatedY1)}
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full overflow-hidden bg-gray-100">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: entity.color,
                            opacity: 0.8,
                          }}
                        />
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Section 4: Key Metrics */}
      {metrics.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Key Metrics
              </h2>
            </FadeIn>
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              staggerDelay={0.1}
            >
              {metrics.map((metric) => (
                <StaggerItem key={metric.label}>
                  <NavyGlow className="rounded-xl bg-white p-6">
                    <div
                      className="border-l-4 pl-4"
                      style={{ borderColor: entity.color }}
                    >
                      <div className="text-3xl font-bold text-gray-900">
                        <CountUp
                          end={metric.value}
                          prefix={metric.prefix ?? ""}
                          suffix={metric.suffix ?? ""}
                          decimals={0}
                          duration={2}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {metric.label}
                      </p>
                    </div>
                  </NavyGlow>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Section 5: Flywheel Role */}
      <section className="bg-[#0f172a] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-8">
              Flywheel Connection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="bg-[#1e293b] rounded-xl p-6 border-l-4"
                style={{ borderColor: entity.color }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  Role
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {entity.flywheelRole}
                </p>
              </div>
              <div
                className="bg-[#1e293b] rounded-xl p-6 border-l-4"
                style={{ borderColor: entity.color }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  How It Connects
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {entity.flywheelConnection}
                </p>
              </div>
            </div>
            {/* Accent line */}
            <div
              className="mt-8 h-1 rounded-full max-w-xs"
              style={{
                background: `linear-gradient(90deg, ${entity.color}, transparent)`,
              }}
            />
          </FadeIn>
        </div>
      </section>

      {/* Section 6: Team */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Team</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="text-center md:text-left shrink-0">
                <ScaleReveal>
                  <div className="text-5xl md:text-6xl font-bold text-gray-900">
                    <CountUp end={entity.teamSize} duration={1.5} />
                  </div>
                </ScaleReveal>
                <p className="text-sm text-gray-500 mt-2">Team Members</p>
              </div>
              <StaggerContainer
                className="flex flex-wrap gap-3"
                staggerDelay={0.08}
              >
                {entity.keyRoles.map((role) => (
                  <StaggerItem key={role}>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                      {role}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 7: Revenue Projection */}
      <section className="bg-[#f9fafb] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Revenue Projection
            </h2>
            <p className="text-gray-500 mb-8">
              Year 1 &rarr; Year 5 &mdash; V6 Floor to V4 Ceiling range
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-xl p-4 md:p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={projectionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#d1d5db" }}
                  />
                  <YAxis
                    tickFormatter={(v: number) => formatCurrency(v)}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#d1d5db" }}
                    width={80}
                  />
                  <Tooltip
                    formatter={(v: number | undefined) =>
                      formatCurrency(v ?? 0)
                    }
                    labelStyle={{ fontWeight: 600 }}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ceiling"
                    name="V4 Ceiling"
                    stroke="#1a237e"
                    fill="#1a237e"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="floor"
                    name="V6 Floor"
                    stroke={entity.color}
                    fill={entity.color}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="bg-[#0f172a] text-white overflow-hidden">
        <ParallaxSection speed={0.15}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
                Explore More Entities
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <PulseGlow className="inline-block rounded-lg">
                  <Link
                    href="/"
                    className="inline-block bg-white text-[#0f172a] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Back to Overview
                  </Link>
                </PulseGlow>
                <PulseGlow className="inline-block rounded-lg">
                  <Link
                    href="/#entities"
                    className="inline-block font-semibold px-8 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: entity.color }}
                  >
                    All Entities
                  </Link>
                </PulseGlow>
              </div>
            </FadeIn>

            {/* Related Entities */}
            {relatedEntities.length > 0 && (
              <FadeIn delay={0.2}>
                <h3 className="text-xl font-semibold text-gray-300 text-center mb-6">
                  Related Entities
                </h3>
                <StaggerContainer
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  staggerDelay={0.1}
                >
                  {relatedEntities.slice(0, 3).map((related) => {
                    const relY1 = toMillions(related.revenueY1Floor);
                    return (
                      <StaggerItem key={related.slug}>
                        <Link href={`/entity/${related.slug}`}>
                          <NavyGlow className="rounded-xl bg-[#1e293b] p-6 h-full">
                            <div
                              className="border-l-4 pl-4"
                              style={{ borderColor: related.color }}
                            >
                              <h4 className="font-bold text-white mb-1">
                                {related.name}
                              </h4>
                              <p className="text-sm text-gray-400 mb-3">
                                {related.tagline}
                              </p>
                              <span
                                className="text-lg font-bold"
                                style={{ color: related.color }}
                              >
                                {formatCurrency(related.revenueY1Floor)}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                Y1 Floor
                              </span>
                            </div>
                          </NavyGlow>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </FadeIn>
            )}
          </div>
        </ParallaxSection>
      </section>
    </>
  );
}
