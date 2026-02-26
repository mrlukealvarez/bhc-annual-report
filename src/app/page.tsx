"use client";

// Homepage — 6 sections: Hero, Metrics, Entity Grid, Flywheel, Comparison, CTA
import Link from "next/link";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  ParallaxSection,
  EmeraldShimmer,
  NavyGlow,
  PulseGlow,
} from "@/components/motion";

// Inline entity data for homepage (13 entities with verified numbers)
const entities = [
  { slug: "growwise", name: "FlowBot", tagline: "AI-Native Cannabis Operations Platform", color: "#22c55e", revenueY1: "$60.52M", category: "Technology" },
  { slug: "outpost-media", name: "Outpost Media", tagline: "Cannabis-First Multi-Channel Media Network", color: "#3b82f6", revenueY1: "$1.78M", category: "Media" },
  { slug: "seed-foundation", name: "Seed Foundation", tagline: "Charitable Foundation for Regional Impact", color: "#a855f7", revenueY1: "$1.89M", category: "Community" },
  { slug: "seed-academy", name: "Seed Academy", tagline: "AI-Powered Workforce Training Academy", color: "#8b5cf6", revenueY1: "$1.21M", category: "Education" },
  { slug: "the-cult", name: "THE CULT", tagline: "Annual Convention & Events Brand", color: "#ef4444", revenueY1: "$270K", category: "Community" },
  { slug: "the-op", name: "THE OP", tagline: "Community Cafe & Merchandise Hub", color: "#f97316", revenueY1: "$490K", category: "Community" },
  { slug: "pass-creek", name: "Pass Creek Holdings", tagline: "Black Hills Real Estate Portfolio", color: "#eab308", revenueY1: "$610K", category: "Real Estate" },
  { slug: "settle-the-west", name: "Settle the West", tagline: "Remote Worker Relocation Program", color: "#06b6d4", revenueY1: "$470K", category: "Community" },
  { slug: "auric-labs", name: "Auric Labs", tagline: "AI-Native Startup Accelerator", color: "#ec4899", revenueY1: "$410K", category: "Technology" },
  { slug: "bhc", name: "Black Hills Consortium", tagline: "Regional Coordination & Holding Company", color: "#1a237e", revenueY1: "$3.1M", category: "Community" },
  { slug: "delegate-digital", name: "Delegate Digital", tagline: "B2B Digital Services & AI Consulting", color: "#6366f1", revenueY1: "$310K", category: "Technology" },
  { slug: "adventurecap", name: "AdventureCap Holdings", tagline: "Adventure Tourism Asset Holdings", color: "#14b8a6", revenueY1: "$130K", category: "Real Estate" },
  { slug: "grow-campus", name: "Grow Campus", tagline: "15-Acre Innovation Campus", color: "#f59e0b", revenueY1: "$390K", category: "Real Estate" },
];

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <section className="bg-navy text-white py-24 lg:py-32 overflow-hidden">
        <ParallaxSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <EmeraldShimmer>13 Entities.</EmeraldShimmer>{" "}
              1 Flywheel.
              <br />
              Building Rural America&apos;s Future.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              $52M Capital Raise &nbsp;|&nbsp; $71.59M&ndash;$439.5M Year 1 Revenue
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PulseGlow className="inline-block rounded-lg">
                <Link
                  href="/entity/growwise"
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Explore Entities
                </Link>
              </PulseGlow>
              <Link
                href="/financials"
                className="inline-block border border-gray-400 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Financials
              </Link>
            </div>
          </FadeIn>
        </ParallaxSection>
      </section>

      {/* Section 2: Key Metrics Bar */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" staggerDelay={0.1}>
            {[
              { end: 71.59, prefix: "$", suffix: "M", decimals: 2, label: "Revenue Y1", sublabel: "V6 Floor" },
              { end: 13, label: "Entities", sublabel: "Integrated Ecosystem" },
              { end: 18786, label: "CRM Accounts", sublabel: "Active Pipeline" },
              { end: 51, label: "Staff", sublabel: "Output like 255 with AI" },
              { end: 9, label: "Partner Cities", sublabel: "SD + WY" },
              { end: 15, label: "Campus Acres", sublabel: "Custer, SD" },
            ].map((metric) => (
              <StaggerItem key={metric.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-navy mb-1">
                  <CountUp
                    end={metric.end}
                    prefix={metric.prefix || ""}
                    suffix={metric.suffix || ""}
                    decimals={metric.decimals || 0}
                  />
                </div>
                <div className="text-sm font-semibold text-gray-800">{metric.label}</div>
                <div className="text-xs text-gray-500">{metric.sublabel}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 3: Entity Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              The <EmeraldShimmer>Ecosystem</EmeraldShimmer>
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              13 entities working together through a perpetual flywheel — each one strengthening the others.
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {entities.map((entity) => (
              <StaggerItem key={entity.slug}>
                <Link href={`/entity/${entity.slug}`}>
                  <NavyGlow className="rounded-xl bg-white p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-1 h-16 rounded-full shrink-0"
                        style={{ backgroundColor: entity.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900 truncate">{entity.name}</h3>
                          <span className="text-xs font-medium text-gray-400 ml-2 shrink-0">{entity.category}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{entity.tagline}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold" style={{ color: entity.color }}>
                            {entity.revenueY1}
                          </span>
                          <span className="text-xs text-gray-400">Y1 V6 Floor</span>
                        </div>
                      </div>
                    </div>
                  </NavyGlow>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 4: Mini Flywheel */}
      <section className="py-20 bg-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              The <EmeraldShimmer>21% Perpetual Flywheel</EmeraldShimmer>
            </h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              FlowBot distributes 21% of revenue — 7% each to Auric Labs, Seed Foundation, and BHC — creating $12.41M in automatic downstream funding that powers the entire ecosystem.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
              {[
                { step: "1", label: "FlowBot Revenue", value: "$60.52M", color: "#22c55e" },
                { step: "2", label: "21% Equity Flow", value: "$12.41M", color: "#059669" },
                { step: "3", label: "Funds Operations", value: "13 Entities", color: "#06b6d4" },
                { step: "4", label: "Content & Growth", value: "Attracts More", color: "#3b82f6" },
              ].map((item) => (
                <div key={item.step} className="bg-navy rounded-xl p-5 border border-gray-700">
                  <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-sm text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <PulseGlow className="inline-block rounded-lg">
              <Link
                href="/flywheel"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                See Full Flywheel →
              </Link>
            </PulseGlow>
          </FadeIn>
        </div>
      </section>

      {/* Section 5: Comparison Teaser */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
              BHC vs. <EmeraldShimmer>Traditional Economic Development</EmeraldShimmer>
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Why the old model can&apos;t keep up.
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {/* BHC Column */}
            <StaggerItem>
              <div className="bg-navy text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-emerald-400">Black Hills Consortium</h3>
                <div className="space-y-4">
                  {[
                    { label: "Revenue", value: "$71.59M" },
                    { label: "Entities", value: "13" },
                    { label: "Staff", value: "51 (255 AI-equiv)" },
                    { label: "CRM", value: "18,786 accounts" },
                    { label: "Technology", value: "AI-native, 721+ agents" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="font-bold text-emerald-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
            {/* Elevate Column */}
            <StaggerItem>
              <div className="bg-gray-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-500">Elevate Rapid City</h3>
                <div className="space-y-4">
                  {[
                    { label: "Budget", value: "$7.17M" },
                    { label: "Entities", value: "1" },
                    { label: "Staff", value: "14" },
                    { label: "Investors", value: "106" },
                    { label: "Technology", value: "Basic website + PDFs" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-500 text-sm">{item.label}</span>
                      <span className="font-bold text-gray-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
          <FadeIn delay={0.4} className="text-center mt-10">
            <Link
              href="/compare"
              className="inline-block text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              See Full Comparison →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-dark to-navy text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to invest in Rural America&apos;s future?
            </h2>
            <p className="text-gray-300 mb-10">
              Join the consortium building 13 entities across technology, media, education, real estate, and community.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PulseGlow className="inline-block rounded-lg">
                <Link
                  href="/investors"
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Investor Information
                </Link>
              </PulseGlow>
              <Link
                href="mailto:luke@bhconsortium.com"
                className="inline-block border border-gray-400 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
