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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InvestorsClientProps {
  data: {
    capitalRaise: number;
    thesis: string[];
    useOfFunds: { category: string; percentage: number; amount: number }[];
    tiers: { name: string; range: string; benefits: string[]; color: string }[];
    returnProjections: {
      valuationY1Low: number;
      valuationY1High: number;
      valuationY5Low: number;
      valuationY5High: number;
      revenueMultiple: string;
    };
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FUND_COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#6366f1"];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InvestorsClient({ data }: InvestorsClientProps) {
  const valY1 = `${formatCurrency(data.returnProjections.valuationY1Low)} \u2013 ${formatCurrency(data.returnProjections.valuationY1High)}`;
  const valY5 = `${formatCurrency(data.returnProjections.valuationY5Low)} \u2013 ${formatCurrency(data.returnProjections.valuationY5High)}`;

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Hero                                                    */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="uppercase tracking-widest text-emerald-400 text-sm mb-6">
              Investor Relations
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <EmeraldShimmer>Investment Opportunity</EmeraldShimmer>
            </h1>
            <p className="text-2xl text-gray-300 mb-2">
              {formatCurrency(data.capitalRaise)} Capital Raise
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A 13-entity flywheel ecosystem positioned at the intersection of
              cannabis technology, rural development, and AI-native operations.
            </p>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Investment Thesis                                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            <EmeraldShimmer>Investment Thesis</EmeraldShimmer>
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.1}
        >
          {data.thesis.map((point, i) => (
            <StaggerItem
              key={i}
              className={
                i === data.thesis.length - 1 && data.thesis.length % 2 !== 0
                  ? "md:col-span-2"
                  : ""
              }
            >
              <NavyGlow className="rounded-xl bg-gray-50 p-6 shadow-sm h-full">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    {"\u2713"}
                  </span>
                  <p className="text-[#0f172a] leading-relaxed">{point}</p>
                </div>
              </NavyGlow>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Use of Funds                                            */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Use of Funds
          </h2>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          {/* Donut Chart */}
          <FadeIn className="flex justify-center mb-12">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.useOfFunds}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {data.useOfFunds.map((_, i) => (
                      <Cell
                        key={i}
                        fill={FUND_COLORS[i % FUND_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`]}
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </FadeIn>

          {/* Fund breakdown cards */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            staggerDelay={0.08}
          >
            {data.useOfFunds.map((fund, i) => (
              <StaggerItem key={i}>
                <NavyGlow className="rounded-xl bg-white p-5 shadow-sm text-center h-full">
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-3"
                    style={{
                      backgroundColor: FUND_COLORS[i % FUND_COLORS.length],
                    }}
                  />
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    {fund.category}
                  </p>
                  <CountUp
                    end={fund.percentage}
                    suffix="%"
                    className="text-2xl font-bold text-[#0f172a]"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    {formatCurrency(fund.amount)}
                  </p>
                </NavyGlow>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Investor Tiers                                          */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Investor Tiers
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          staggerDelay={0.1}
        >
          {data.tiers.map((tier, i) => (
            <StaggerItem key={i}>
              <NavyGlow className="rounded-xl bg-gray-50 p-6 shadow-sm h-full">
                <div
                  className="rounded-xl p-6 h-full"
                  style={{ borderLeft: `4px solid ${tier.color}` }}
                >
                  <h3 className="text-xl font-bold text-[#0f172a] mb-2">
                    {tier.name}
                  </h3>
                  <span
                    className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
                    style={{
                      backgroundColor: `${tier.color}20`,
                      color: tier.color,
                    }}
                  >
                    {tier.range}
                  </span>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: tier.color }}
                        />
                        {benefit}
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
      {/* Section 5: Return Projections                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Return Projections
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.12}
        >
          {/* Valuation Year 1 */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center h-full">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Valuation Year 1
              </p>
              <FadeIn>
                <p className="text-2xl font-bold text-emerald-400">{valY1}</p>
              </FadeIn>
            </NavyGlow>
          </StaggerItem>

          {/* Valuation Year 5 */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center h-full">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Valuation Year 5
              </p>
              <FadeIn>
                <p className="text-2xl font-bold text-emerald-400">{valY5}</p>
              </FadeIn>
            </NavyGlow>
          </StaggerItem>

          {/* Revenue Multiple */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center h-full">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Revenue Multiple
              </p>
              <FadeIn>
                <p className="text-2xl font-bold text-emerald-400">
                  {data.returnProjections.revenueMultiple}
                </p>
              </FadeIn>
            </NavyGlow>
          </StaggerItem>

          {/* Capital Raise */}
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center h-full">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Capital Raise
              </p>
              <CountUp
                end={52}
                prefix="$"
                suffix="M"
                className="text-2xl font-bold text-emerald-400"
              />
            </NavyGlow>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 6: CTA                                                     */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
            <p className="text-gray-400 mb-8">
              Connect with our investor relations team to learn more about the
              BHC opportunity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PulseGlow>
                <a
                  href="mailto:investors@blackhillsconsortium.com"
                  className="inline-block rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  Contact Investor Relations
                </a>
              </PulseGlow>
              <PulseGlow>
                <Link
                  href="/financials"
                  className="inline-block rounded-full border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  View Financial Breakdown
                </Link>
              </PulseGlow>
            </div>
            <Link
              href="/"
              className="inline-block mt-6 text-gray-400 hover:text-white transition-colors text-sm"
            >
              &larr; Back to Overview
            </Link>
          </div>
        </FadeIn>
      </ParallaxSection>
    </>
  );
}
