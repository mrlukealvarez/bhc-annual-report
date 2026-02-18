"use client";

import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Entity {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  teamSize: number;
  keyRoles: string[];
}

interface TeamData {
  staff: number;
  aiEquivalent: number;
  aiMultiplier: number;
  departments: { name: string; headcount: number; color: string }[];
  benefits: { label: string; value: string; description: string }[];
  fullyLoadedCosts: { technical: number; fieldSales: number; executive: number };
}

interface TeamClientProps {
  team: TeamData;
  entities: Entity[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TeamClient({ team, entities }: TeamClientProps) {
  // Sort departments by headcount descending for the bar chart
  const sortedDepartments = [...team.departments].sort(
    (a, b) => b.headcount - a.headcount
  );

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Hero                                                    */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="uppercase tracking-widest text-emerald-400 text-sm mb-6">
              Team
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <EmeraldShimmer>Our Team</EmeraldShimmer>
            </h1>
            <p className="text-lg text-gray-400 mb-10">
              {team.staff} Staff, Output of {team.aiEquivalent}
            </p>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Headline Metrics                                        */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            At a Glance
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.1}
        >
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={team.staff}
                className="text-4xl font-bold text-emerald-600"
              />
              <p className="text-gray-500 mt-2">Total Staff</p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={team.aiEquivalent}
                className="text-4xl font-bold text-emerald-600"
              />
              <p className="text-gray-500 mt-2">AI-Equivalent</p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={team.aiMultiplier}
                suffix="x"
                className="text-4xl font-bold text-emerald-600"
              />
              <p className="text-gray-500 mt-2">AI Multiplier</p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-gray-50 p-8 text-center">
              <CountUp
                end={13}
                className="text-4xl font-bold text-emerald-600"
              />
              <p className="text-gray-500 mt-2">Entities Staffed</p>
            </NavyGlow>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Department Breakdown                                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Department Breakdown
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={sortedDepartments}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fill: "#6b7280" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: "#374151", fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  }}
                  formatter={(value) => [`${value} staff`, "Headcount"]}
                />
                <Bar dataKey="headcount" radius={[0, 4, 4, 0]}>
                  {sortedDepartments.map((dept, index) => (
                    <Cell key={index} fill={dept.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Entity Team Grid                                        */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Teams Across 13 Entities
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          staggerDelay={0.08}
        >
          {entities.map((entity) => (
            <StaggerItem key={entity.slug}>
              <NavyGlow
                className="rounded-xl bg-gray-50 p-6"
              >
                <div
                  className="rounded-xl p-6"
                  style={{ borderLeft: `4px solid ${entity.color}` }}
                >
                  <Link
                    href={`/entity/${entity.slug}`}
                    className="hover:underline"
                  >
                    <h3 className="font-bold text-[#0f172a] text-lg mb-2">
                      {entity.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-1 mb-3">
                    <CountUp
                      end={entity.teamSize}
                      className="text-2xl font-bold text-emerald-600"
                    />
                    <span className="text-gray-500 text-sm">team members</span>
                  </div>
                  <ul className="space-y-1">
                    {entity.keyRoles.slice(0, 3).map((role) => (
                      <li
                        key={role}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: entity.color }}
                        />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </NavyGlow>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 5: Benefits & Perks                                        */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Benefits &amp; Perks
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {team.benefits.map((benefit, i) => (
            <FadeIn key={benefit.label} delay={i * 0.1}>
              <div className="rounded-xl bg-white/5 border border-white/10 p-8">
                <EmeraldShimmer className="text-3xl font-bold">
                  {benefit.value}
                </EmeraldShimmer>
                <h3 className="text-white font-semibold text-lg mt-3">
                  {benefit.label}
                </h3>
                <p className="text-gray-400 mt-1">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Fully-Loaded Cost Row */}
        <FadeIn delay={0.4}>
          <div className="max-w-4xl mx-auto mt-12">
            <p className="text-sm uppercase tracking-widest text-gray-500 text-center mb-6">
              Fully-Loaded Cost Per Role
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-center">
                <CountUp
                  end={team.fullyLoadedCosts.technical / 1000}
                  prefix="$"
                  suffix="K"
                  className="text-2xl font-bold text-emerald-400"
                />
                <p className="text-gray-400 text-sm mt-1">Technical</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-center">
                <CountUp
                  end={team.fullyLoadedCosts.fieldSales / 1000}
                  prefix="$"
                  suffix="K"
                  className="text-2xl font-bold text-emerald-400"
                />
                <p className="text-gray-400 text-sm mt-1">Field Sales</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-center">
                <CountUp
                  end={team.fullyLoadedCosts.executive / 1000}
                  prefix="$"
                  suffix="K"
                  className="text-2xl font-bold text-emerald-400"
                />
                <p className="text-gray-400 text-sm mt-1">Executive</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 6: CTA                                                     */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Explore More</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <PulseGlow>
                <Link
                  href="/goals"
                  className="inline-block rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  View Goals &amp; Milestones
                </Link>
              </PulseGlow>
              <PulseGlow>
                <Link
                  href="/"
                  className="inline-block rounded-full border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Back to Overview
                </Link>
              </PulseGlow>
            </div>
          </div>
        </FadeIn>
      </ParallaxSection>
    </>
  );
}
