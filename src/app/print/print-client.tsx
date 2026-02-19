"use client";

import Link from "next/link";
import { formatCurrency, formatNumber } from "@/lib/format";

interface Entity {
  slug: string;
  name: string;
  shortName: string;
  type: string;
  category: string;
  revenueY1Floor: number;
  revenueY5Floor: number;
  teamSize: number;
  flywheelRole: string;
}

interface Metrics {
  capitalRaise: number;
  entities: number;
  crmAccounts: number;
  revenueY1Floor: number;
  revenueY1Ceiling: number;
  revenueY5Floor: number;
  revenueY5Ceiling: number;
  valuationY1Low: number;
  valuationY1High: number;
  valuationY5Low: number;
  valuationY5High: number;
  staff: number;
  staffAIEquivalent: number;
  campusAcres: number;
  partnerCities: number;
}

interface Financials {
  aggregate: {
    revenueY1Floor: number;
    revenueY1Ceiling: number;
    revenueY5Floor: number;
    revenueY5Ceiling: number;
    capitalRaise: number;
    flywheelPercentage: number;
  };
  pricing: Record<string, number>;
  entityBreakdown: Array<{
    slug: string;
    name: string;
    revenueY1Floor: number;
    revenueY5Floor: number;
  }>;
}

interface Investors {
  capitalRaise: number;
  thesis: string[];
  useOfFunds: Array<{ category: string; percentage: number; amount: number }>;
  tiers: Array<{ name: string; range: string; benefits: string[] }>;
  returnProjections: {
    valuationY1Low: number;
    valuationY1High: number;
    valuationY5Low: number;
    valuationY5High: number;
    revenueMultiple: string;
  };
}

interface Team {
  staff: number;
  aiEquivalent: number;
  departments: Array<{ name: string; headcount: number }>;
  benefits: Array<{ label: string; value: string; description: string }>;
  fullyLoadedCosts: Record<string, number>;
}

interface Goal {
  label: string;
  current: number;
  target: number;
  unit: string;
}

interface FlywheelData {
  nodes: Array<{ id: string; label: string }>;
  connections: Array<{ from: string; to: string; label: string }>;
}

interface PrintClientProps {
  entities: Entity[];
  metrics: Metrics;
  financials: Financials;
  investors: Investors;
  team: Team;
  goals: Goal[];
  flywheel: FlywheelData;
}

export function PrintClient({
  entities,
  metrics,
  financials,
  investors,
  team,
  goals,
  flywheel,
}: PrintClientProps) {
  const sortedEntities = [...entities].sort(
    (a, b) => b.revenueY1Floor - a.revenueY1Floor
  );

  const totalY1Floor = sortedEntities.reduce(
    (sum, e) => sum + e.revenueY1Floor,
    0
  );
  const totalY5Floor = sortedEntities.reduce(
    (sum, e) => sum + e.revenueY5Floor,
    0
  );
  const totalTeam = sortedEntities.reduce((sum, e) => sum + e.teamSize, 0);

  const topEntities = [...financials.entityBreakdown]
    .sort((a, b) => b.revenueY1Floor - a.revenueY1Floor)
    .slice(0, 5);

  return (
    <>
      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          * { box-shadow: none !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Print Button */}
        <div className="no-print flex gap-4 mb-8">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Print Report
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Section 1: Cover */}
        <section className="border-b border-gray-200 pb-8 mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            BLACK HILLS CONSORTIUM
          </h1>
          <h2 className="text-2xl text-gray-600 mb-6">Annual Report 2026</h2>
          <hr className="border-gray-300 mb-6" />
          <p className="text-lg text-gray-700">
            {formatNumber(metrics.entities)} Entities &middot;{" "}
            {formatCurrency(metrics.capitalRaise)} Capital Raise &middot;{" "}
            {formatNumber(metrics.staff)} Staff &middot;{" "}
            {formatNumber(metrics.partnerCities)} Partner Cities
          </p>
        </section>

        {/* Section 2: Executive Summary */}
        <section className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Executive Summary</h2>
          <table className="border border-gray-300 text-sm w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Metric</th>
                <th className="text-left px-4 py-2 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Revenue Y1 Floor
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.revenueY1Floor)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Revenue Y1 Ceiling
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.revenueY1Ceiling)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Revenue Y5 Floor
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.revenueY5Floor)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Revenue Y5 Ceiling
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.revenueY5Ceiling)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Valuation Y1 Range
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.valuationY1Low)} &ndash;{" "}
                  {formatCurrency(metrics.valuationY1High)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Valuation Y5 Range
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.valuationY5Low)} &ndash;{" "}
                  {formatCurrency(metrics.valuationY5High)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Capital Raise
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(metrics.capitalRaise)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Entities
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatNumber(metrics.entities)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Staff (AI-Equivalent)
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatNumber(metrics.staff)} /{" "}
                  {formatNumber(metrics.staffAIEquivalent)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  CRM Accounts
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatNumber(metrics.crmAccounts)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Partner Cities
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatNumber(metrics.partnerCities)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Campus Acres
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatNumber(metrics.campusAcres)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 3: Entity Grid */}
        <section className="border-b border-gray-200 pb-8 mb-8 print:break-before-page">
          <h2 className="text-2xl font-bold mb-6">Entity Grid</h2>
          <table className="border border-gray-300 text-sm w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Name</th>
                <th className="text-left px-4 py-2 font-semibold">Type</th>
                <th className="text-left px-4 py-2 font-semibold">Category</th>
                <th className="text-left px-4 py-2 font-semibold">Y1 Floor</th>
                <th className="text-left px-4 py-2 font-semibold">Y5 Floor</th>
                <th className="text-left px-4 py-2 font-semibold">Team</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntities.map((entity) => (
                <tr key={entity.slug}>
                  <td className="px-4 py-2 border-t border-gray-200 font-medium">
                    {entity.shortName}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {entity.type}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {entity.category}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {formatCurrency(entity.revenueY1Floor)}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {formatCurrency(entity.revenueY5Floor)}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {entity.teamSize}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-2 border-t border-gray-300">TOTAL</td>
                <td className="px-4 py-2 border-t border-gray-300" />
                <td className="px-4 py-2 border-t border-gray-300" />
                <td className="px-4 py-2 border-t border-gray-300">
                  {formatCurrency(totalY1Floor)}
                </td>
                <td className="px-4 py-2 border-t border-gray-300">
                  {formatCurrency(totalY5Floor)}
                </td>
                <td className="px-4 py-2 border-t border-gray-300">
                  {totalTeam}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 4: Financial Summary */}
        <section className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Financial Summary</h2>

          <h3 className="text-lg font-semibold mb-3">Aggregate Revenue</h3>
          <table className="border border-gray-300 text-sm w-full mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Metric</th>
                <th className="text-left px-4 py-2 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Y1 Floor
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(financials.aggregate.revenueY1Floor)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Y1 Ceiling
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(financials.aggregate.revenueY1Ceiling)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Y5 Floor
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(financials.aggregate.revenueY5Floor)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Y5 Ceiling
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(financials.aggregate.revenueY5Ceiling)}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-3">
            Top 5 Entities by Y1 Revenue
          </h3>
          <table className="border border-gray-300 text-sm w-full mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Entity</th>
                <th className="text-left px-4 py-2 font-semibold">Y1 Floor</th>
                <th className="text-left px-4 py-2 font-semibold">Y5 Floor</th>
              </tr>
            </thead>
            <tbody>
              {topEntities.map((entity) => (
                <tr key={entity.slug}>
                  <td className="px-4 py-2 border-t border-gray-200 font-medium">
                    {entity.name}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {formatCurrency(entity.revenueY1Floor)}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {formatCurrency(entity.revenueY5Floor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-3">
            GrowWise Pricing Tiers
          </h3>
          <table className="border border-gray-300 text-sm w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Tier</th>
                <th className="text-left px-4 py-2 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">Starter</td>
                <td className="px-4 py-2 border-t border-gray-200">$699</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">Solo</td>
                <td className="px-4 py-2 border-t border-gray-200">$1,299</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Growth
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  $1,799/loc
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Enterprise
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  $2,499/loc
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">MSO</td>
                <td className="px-4 py-2 border-t border-gray-200">
                  $2,499/loc
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 5: Team Overview */}
        <section className="border-b border-gray-200 pb-8 mb-8 print:break-before-page">
          <h2 className="text-2xl font-bold mb-2">Team Overview</h2>
          <p className="text-lg text-gray-700 mb-6">
            {formatNumber(team.staff)} staff /{" "}
            {formatNumber(team.aiEquivalent)} AI-equivalent
          </p>

          <h3 className="text-lg font-semibold mb-3">Departments</h3>
          <table className="border border-gray-300 text-sm w-full mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">
                  Department
                </th>
                <th className="text-left px-4 py-2 font-semibold">
                  Headcount
                </th>
              </tr>
            </thead>
            <tbody>
              {team.departments.map((dept) => (
                <tr key={dept.name}>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {dept.name}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {dept.headcount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-3">Benefits</h3>
          <ul className="list-disc list-inside mb-6 text-sm space-y-1">
            {team.benefits.map((benefit) => (
              <li key={benefit.label}>
                <span className="font-medium">{benefit.label}:</span>{" "}
                {benefit.value} &mdash; {benefit.description}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-3">Fully-Loaded Costs</h3>
          <table className="border border-gray-300 text-sm w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Role</th>
                <th className="text-left px-4 py-2 font-semibold">
                  Annual Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Technical
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(team.fullyLoadedCosts.technical)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Field Sales
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(team.fullyLoadedCosts.fieldSales)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Executive
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(team.fullyLoadedCosts.executive)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 6: Investment Overview */}
        <section className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-2">Investment Overview</h2>
          <p className="text-lg text-gray-700 mb-6">
            {formatCurrency(investors.capitalRaise)} Capital Raise
          </p>

          <h3 className="text-lg font-semibold mb-3">Investment Thesis</h3>
          <ul className="list-disc list-inside mb-6 text-sm space-y-1">
            {investors.thesis.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-3">Use of Funds</h3>
          <table className="border border-gray-300 text-sm w-full mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Category</th>
                <th className="text-left px-4 py-2 font-semibold">%</th>
                <th className="text-left px-4 py-2 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {investors.useOfFunds.map((item) => (
                <tr key={item.category}>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {item.category}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {item.percentage}%
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-3">Investor Tiers</h3>
          <table className="border border-gray-300 text-sm w-full mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Tier</th>
                <th className="text-left px-4 py-2 font-semibold">Range</th>
                <th className="text-left px-4 py-2 font-semibold">
                  Key Benefits
                </th>
              </tr>
            </thead>
            <tbody>
              {investors.tiers.map((tier) => (
                <tr key={tier.name}>
                  <td className="px-4 py-2 border-t border-gray-200 font-medium">
                    {tier.name}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {tier.range}
                  </td>
                  <td className="px-4 py-2 border-t border-gray-200">
                    {tier.benefits.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-3">Return Projections</h3>
          <table className="border border-gray-300 text-sm w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Metric</th>
                <th className="text-left px-4 py-2 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Valuation Y1
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(investors.returnProjections.valuationY1Low)}{" "}
                  &ndash;{" "}
                  {formatCurrency(investors.returnProjections.valuationY1High)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Valuation Y5
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {formatCurrency(investors.returnProjections.valuationY5Low)}{" "}
                  &ndash;{" "}
                  {formatCurrency(investors.returnProjections.valuationY5High)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-t border-gray-200">
                  Revenue Multiple
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {investors.returnProjections.revenueMultiple}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 7: Goals */}
        <section className="border-b border-gray-200 pb-8 mb-8 print:break-before-page">
          <h2 className="text-2xl font-bold mb-6">Goals</h2>
          <table className="border border-gray-300 text-sm w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 font-semibold">Goal</th>
                <th className="text-left px-4 py-2 font-semibold">Current</th>
                <th className="text-left px-4 py-2 font-semibold">Target</th>
                <th className="text-left px-4 py-2 font-semibold">
                  Progress %
                </th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => {
                const progress = Math.round(
                  (goal.current / goal.target) * 100
                );
                const isDollar = goal.unit === "dollars";
                return (
                  <tr key={goal.label}>
                    <td className="px-4 py-2 border-t border-gray-200 font-medium">
                      {goal.label}
                    </td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      {isDollar
                        ? formatCurrency(goal.current)
                        : formatNumber(goal.current)}
                    </td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      {isDollar
                        ? formatCurrency(goal.target)
                        : formatNumber(goal.target)}
                    </td>
                    <td className="px-4 py-2 border-t border-gray-200">
                      {progress}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Section 8: Flywheel */}
        <section className="pb-8">
          <h2 className="text-2xl font-bold mb-6">
            The 21% Perpetual Flywheel
          </h2>

          <h3 className="text-lg font-semibold mb-3">Flywheel Connections</h3>
          <ol className="list-decimal list-inside mb-6 text-sm space-y-1">
            {flywheel.connections.map((conn, i) => (
              <li key={i}>
                {conn.from} &rarr; {conn.to}: {conn.label}
              </li>
            ))}
          </ol>

          <h3 className="text-lg font-semibold mb-3">
            Entity Flywheel Roles
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            {sortedEntities.map((entity) => (
              <p key={entity.slug}>
                <span className="font-medium">{entity.shortName}:</span>{" "}
                {entity.flywheelRole}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
