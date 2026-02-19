"use client";

import Link from "next/link";
import type { ComparisonData, ComparisonDataPoint } from "@/types/comparison";
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
// Helpers
// ---------------------------------------------------------------------------

/** Extract a numeric value from strings like "$71.59M", "51", "60+", "~$3.2M", "18,786" */
function extractNumber(val: string): number | null {
  const cleaned = val.replace(/[$,~+]/g, "").trim();
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? null : num;
}

/** Derive a short competitor label for bar charts */
function getShortName(name: string): string {
  if (/elevate/i.test(name)) return "ERC";
  if (/badlands/i.test(name) || /bh&b/i.test(name) || /bh ?& ?b/i.test(name))
    return "BH&B";
  return name.slice(0, 3);
}

/** Extract multiplier entries from data points via notes containing "Nx" patterns */
function extractMultipliers(
  dataPoints: ComparisonDataPoint[]
): { value: number; decimals: number; metric: string; note?: string }[] {
  const results: {
    value: number;
    decimals: number;
    metric: string;
    note?: string;
  }[] = [];

  for (const dp of dataPoints) {
    const source = dp.note ?? "";
    const match = source.match(/(\d+\.?\d*)x/i);
    if (match) {
      const raw = match[1];
      const value = parseFloat(raw);
      const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
      results.push({ value, decimals, metric: dp.metric, note: dp.note });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ComparisonClientProps {
  data: ComparisonData;
  otherComparisonHref: string;
  otherComparisonLabel: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ComparisonClient({
  data,
  otherComparisonHref,
  otherComparisonLabel,
}: ComparisonClientProps) {
  const multipliers = extractMultipliers(data.dataPoints);
  const shortName = getShortName(data.competitorName);

  // Split summary into first sentence + rest for EmeraldShimmer treatment
  const firstDot = data.summary.indexOf(". ");
  const summaryFirst =
    firstDot > -1 ? data.summary.slice(0, firstDot + 1) : data.summary;
  const summaryRest =
    firstDot > -1 ? data.summary.slice(firstDot + 1).trim() : "";

  // Bar-chart eligible data points (both sides must parse to numbers)
  const barData = data.dataPoints.filter((dp) => {
    const a = extractNumber(dp.bhcValue);
    const b = extractNumber(dp.competitorValue);
    return a !== null && b !== null;
  });

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Section 1: Hero                                                    */}
      {/* ----------------------------------------------------------------- */}
      <ParallaxSection className="bg-[#0f172a] text-white py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="uppercase tracking-widest text-emerald-400 text-sm mb-6">
              Comparison
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              BHC{" "}
              <EmeraldShimmer>vs</EmeraldShimmer>{" "}
              {data.competitorName}
            </h1>
            <p className="text-lg text-gray-400 mb-10">
              {data.competitorType}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="rounded-lg bg-white/5 p-4 border-l-4 border-emerald-600 text-left">
                <p className="text-sm text-gray-400 mb-1">Entity</p>
                <p className="font-semibold">Black Hills Consortium</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4 border-l-4 border-gray-500 text-left">
                <p className="text-sm text-gray-400 mb-1">Compared to</p>
                <p className="font-semibold">{data.competitorName}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Head-to-Head Table                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Head-to-Head
          </h2>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          {/* Column headers */}
          <div className="grid grid-cols-2 gap-8 mb-4 px-6">
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
              BHC
            </p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider text-right">
              {data.competitorName}
            </p>
          </div>

          <StaggerContainer staggerDelay={0.08}>
            {data.dataPoints.map((dp, i) => (
              <StaggerItem key={i}>
                <NavyGlow className="rounded-xl bg-gray-50 p-6 mb-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    {dp.metric}
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div
                      className={`text-lg ${
                        dp.winner === "bhc"
                          ? "text-emerald-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {dp.winner === "bhc" && (
                        <span className="mr-1">{"\u2713"}</span>
                      )}
                      {dp.bhcValue}
                    </div>
                    <div
                      className={`text-lg text-right ${
                        dp.winner === "competitor"
                          ? "text-emerald-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {dp.winner === "competitor" && (
                        <span className="mr-1">{"\u2713"}</span>
                      )}
                      {dp.competitorValue}
                    </div>
                  </div>
                  {dp.note && (
                    <p className="text-sm text-gray-500 italic mt-2">
                      {dp.note}
                    </p>
                  )}
                </NavyGlow>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: Multiplier Callouts                                     */}
      {/* ----------------------------------------------------------------- */}
      {multipliers.length > 0 && (
        <section className="py-20 px-6 bg-[#f9fafb]">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
              Key Multipliers
            </h2>
          </FadeIn>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            staggerDelay={0.12}
          >
            {multipliers.map((m, i) => (
              <StaggerItem key={i}>
                <NavyGlow className="rounded-xl bg-white p-8 text-center shadow-sm">
                  <CountUp
                    end={m.value}
                    suffix="x"
                    decimals={m.decimals}
                    className="text-5xl font-bold text-emerald-600"
                  />
                  <p className="text-lg font-semibold text-[#0f172a] mt-3">
                    {m.metric}
                  </p>
                  {m.note && (
                    <p className="text-sm text-gray-500 mt-2">{m.note}</p>
                  )}
                </NavyGlow>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Summary                                                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-8xl font-serif text-emerald-600/20 leading-none select-none">
              {"\u201C"}
            </p>
            <p className="text-xl md:text-2xl leading-relaxed -mt-8">
              <EmeraldShimmer className="text-white">
                {summaryFirst}
              </EmeraldShimmer>
              {summaryRest && (
                <span className="text-gray-300"> {summaryRest}</span>
              )}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 5: Visual Bar Comparison                                   */}
      {/* ----------------------------------------------------------------- */}
      {barData.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
              Visual Comparison
            </h2>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer staggerDelay={0.1}>
              {barData.map((dp, i) => {
                const bhcNum = extractNumber(dp.bhcValue)!;
                const compNum = extractNumber(dp.competitorValue)!;
                const maxVal = Math.max(bhcNum, compNum);
                const bhcPercent = maxVal > 0 ? (bhcNum / maxVal) * 100 : 0;
                const compPercent = maxVal > 0 ? (compNum / maxVal) * 100 : 0;

                return (
                  <StaggerItem key={i}>
                    <div className="mb-8">
                      <p className="font-semibold text-[#0f172a] mb-2">
                        {dp.metric}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 w-12 shrink-0">
                            BHC
                          </span>
                          <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                              style={{ width: `${bhcPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-24 text-right">
                            {dp.bhcValue}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 w-12 shrink-0">
                            {shortName}
                          </span>
                          <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                            <div
                              className="h-full bg-gray-400 rounded-full transition-all duration-1000"
                              style={{ width: `${compPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-24 text-right">
                            {dp.competitorValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

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
                  href={otherComparisonHref}
                  className="inline-block rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  {otherComparisonLabel}
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
