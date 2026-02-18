"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import { formatCurrency, formatNumber } from "@/lib/format";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Goal {
  label: string;
  current: number;
  target: number;
  unit: string;
  category: string;
  icon: string;
}

interface GoalsClientProps {
  goals: Goal[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const categoryColors: Record<string, { bg: string; text: string; bar: string; dot: string; badge: string }> = {
  revenue: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    bar: "bg-emerald-600",
    dot: "bg-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  infrastructure: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    bar: "bg-blue-500",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  reach: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
};

function formatValue(value: number, unit: string): string {
  if (unit === "dollars") return formatCurrency(value);
  return formatNumber(value);
}

function getPercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GoalsClient({ goals }: GoalsClientProps) {
  const goalsWithProgress = goals.filter((g) => g.current > 0);
  const averageCompletion =
    goals.length > 0
      ? Math.round(
          goals.reduce((sum, g) => sum + (g.target > 0 ? (g.current / g.target) * 100 : 0), 0) /
            goals.length
        )
      : 0;

  const categories = ["revenue", "infrastructure", "reach"];

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Hero                                                    */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="uppercase tracking-widest text-emerald-400 text-sm mb-6">
              Goals &amp; Milestones
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Five-Year{" "}
              <EmeraldShimmer>Targets</EmeraldShimmer>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tracking BHC progress across revenue, infrastructure, and regional reach
              toward our 2031 vision.
            </p>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Summary Stats                                           */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          staggerDelay={0.12}
        >
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={goals.length}
                className="text-5xl font-bold text-[#0f172a]"
              />
              <p className="text-gray-500 mt-2 font-medium">Total Goals</p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={goalsWithProgress.length}
                className="text-5xl font-bold text-[#0f172a]"
              />
              <p className="text-gray-500 mt-2 font-medium">With Progress</p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={averageCompletion}
                suffix="%"
                className="text-5xl font-bold text-[#0f172a]"
              />
              <p className="text-gray-500 mt-2 font-medium">Average Completion</p>
            </NavyGlow>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Goals Grid                                              */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            All Goals
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.08}
        >
          {goals.map((goal, i) => {
            const pct = getPercentage(goal.current, goal.target);
            const colors = categoryColors[goal.category] ?? categoryColors.reach;

            return (
              <StaggerItem key={i}>
                <NavyGlow className="rounded-xl bg-white p-6 shadow-sm">
                  {/* Category badge */}
                  <span
                    className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${colors.badge}`}
                  >
                    {goal.category}
                  </span>

                  {/* Goal label */}
                  <h3 className="text-lg font-bold text-[#0f172a] mb-4">
                    {goal.label}
                  </h3>

                  {/* Progress bar */}
                  <div className="relative w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-3">
                    <motion.div
                      className={`h-full rounded-full ${colors.bar}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
                    />
                  </div>

                  {/* Values row */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {formatValue(goal.current, goal.unit)}{" "}
                      <span className="text-gray-400">/</span>{" "}
                      {formatValue(goal.target, goal.unit)}
                    </span>
                    <span className={`font-semibold ${colors.text}`}>
                      {pct}%
                    </span>
                  </div>
                </NavyGlow>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Category Breakdown                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Category Breakdown
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.12}
        >
          {categories.map((cat) => {
            const catGoals = goals.filter((g) => g.category === cat);
            const colors = categoryColors[cat] ?? categoryColors.reach;
            const catLabel = cat.charAt(0).toUpperCase() + cat.slice(1);

            const sumCurrent = catGoals.reduce((s, g) => s + g.current, 0);
            const sumTarget = catGoals.reduce((s, g) => s + g.target, 0);
            const combinedPct = sumTarget > 0 ? Math.round((sumCurrent / sumTarget) * 100) : 0;

            return (
              <StaggerItem key={cat}>
                <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                    <h3 className="text-xl font-bold text-white">{catLabel}</h3>
                  </div>

                  {/* Stats */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <div>
                      <CountUp
                        end={catGoals.length}
                        className="text-3xl font-bold text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">Goals</p>
                    </div>
                    <div>
                      <CountUp
                        end={combinedPct}
                        suffix="%"
                        className="text-3xl font-bold text-white"
                      />
                      <p className="text-xs text-gray-400 mt-1">Complete</p>
                    </div>
                  </div>

                  {/* Goal list */}
                  <ul className="space-y-2">
                    {catGoals.map((g, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-300 flex items-center gap-2"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                        {g.label}
                      </li>
                    ))}
                  </ul>
                </NavyGlow>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 5: CTA                                                     */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">See How It All Connects</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <PulseGlow>
                <Link
                  href="/flywheel"
                  className="inline-block rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  See the Flywheel
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
