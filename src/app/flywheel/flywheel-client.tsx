"use client";

import { useState } from "react";
import Link from "next/link";
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

interface FlywheelNode {
  id: string;
  label: string;
  value: string;
  color: string;
  description: string;
}

interface FlywheelConnection {
  from: string;
  to: string;
  label: string;
  type: string;
}

interface FlywheelData {
  nodes: FlywheelNode[];
  connections: FlywheelConnection[];
}

interface Entity {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  flywheelRole: string;
  flywheelConnection: string;
  revenueY1Floor: number;
}

interface FlywheelClientProps {
  flywheel: FlywheelData;
  entities: Entity[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Compute (x, y) center for a node in a 600x600 viewBox ellipse */
function getNodePosition(index: number, total: number): { x: number; y: number } {
  const cx = 300;
  const cy = 300;
  const rx = 230;
  const ry = 220;
  // Start at 12 o'clock (−π/2), go clockwise
  const angle = -Math.PI / 2 + (2 * Math.PI * index) / total;
  return {
    x: cx + rx * Math.cos(angle),
    y: cy + ry * Math.sin(angle),
  };
}

/** Build a cubic Bezier path that curves outward between two node positions */
function buildCurvedPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  curveOffset: number = 40
): string {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  // Perpendicular direction for the offset
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cpx = mx + nx * curveOffset;
  const cpy = my + ny * curveOffset;
  return `M ${from.x} ${from.y} Q ${cpx} ${cpy} ${to.x} ${to.y}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FlywheelClient({ flywheel, entities }: FlywheelClientProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const { nodes, connections } = flywheel;

  // Build a lookup of node positions
  const nodePositions: Record<string, { x: number; y: number }> = {};
  nodes.forEach((node, i) => {
    nodePositions[node.id] = getNodePosition(i, nodes.length);
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
              Ecosystem Engine
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              The 21% Perpetual{" "}
              <EmeraldShimmer>Flywheel</EmeraldShimmer>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              How 21% equity distribution creates compounding value across 13
              entities
            </p>
          </FadeIn>
        </div>
      </ParallaxSection>

      {/* ----------------------------------------------------------------- */}
      {/* Section 2: Flywheel Diagram                                        */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-4">
            The Flywheel
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            Hover over a node to see its outgoing connections. Each arrow
            represents a flow of value between entities.
          </p>
        </FadeIn>

        {/* Desktop: circular diagram */}
        <FadeIn className="hidden md:block">
          <div className="relative max-w-[600px] aspect-square mx-auto">
            {/* SVG connection arrows */}
            <svg
              viewBox="0 0 600 600"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="7"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#059669" />
                </marker>
              </defs>
              {connections.map((conn, i) => {
                const fromPos = nodePositions[conn.from];
                const toPos = nodePositions[conn.to];
                if (!fromPos || !toPos) return null;

                // Equity connections fan outward more
                const offset = conn.type === "equity" ? 60 : 40;
                const path = buildCurvedPath(fromPos, toPos, offset);

                // Highlight logic: dim paths not connected to hovered node
                const isActive =
                  !hoveredNode ||
                  conn.from === hoveredNode ||
                  conn.to === hoveredNode;

                return (
                  <path
                    key={i}
                    d={path}
                    fill="none"
                    stroke="#059669"
                    strokeWidth={conn.type === "equity" ? 2.5 : 1.8}
                    strokeDasharray={conn.type === "equity" ? "none" : "6 4"}
                    markerEnd="url(#arrowhead)"
                    opacity={isActive ? 0.7 : 0.15}
                    style={{ transition: "opacity 0.3s ease" }}
                  />
                );
              })}
            </svg>

            {/* Node cards */}
            {nodes.map((node, i) => {
              const pos = getNodePosition(i, nodes.length);
              // Card is 140x70; center on pos
              const left = (pos.x / 600) * 100;
              const top = (pos.y / 600) * 100;

              const isActive = !hoveredNode || hoveredNode === node.id;

              return (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    opacity: isActive ? 1 : 0.35,
                    transition: "opacity 0.3s ease",
                    zIndex: hoveredNode === node.id ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className="bg-white rounded-lg shadow-lg px-4 py-3 min-w-[120px] text-center"
                    style={{ borderLeft: `4px solid ${node.color}` }}
                  >
                    <p className="text-xs font-bold text-[#0f172a] leading-tight">
                      {node.label}
                    </p>
                    <p
                      className="text-sm font-semibold mt-0.5"
                      style={{ color: node.color }}
                    >
                      {node.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Mobile: vertical step list */}
        <div className="md:hidden max-w-md mx-auto">
          <StaggerContainer className="space-y-0" staggerDelay={0.08}>
            {connections.map((conn, i) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <StaggerItem key={i}>
                  <div className="flex flex-col items-center">
                    <NavyGlow className="rounded-xl bg-white shadow-sm p-4 w-full">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0f172a]">
                            <span style={{ color: fromNode.color }}>
                              {fromNode.label}
                            </span>
                            {" "}
                            <span className="text-gray-400">&rarr;</span>
                            {" "}
                            <span style={{ color: toNode.color }}>
                              {toNode.label}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {conn.label}
                          </p>
                        </div>
                      </div>
                    </NavyGlow>
                    {i < connections.length - 1 && (
                      <span className="text-emerald-500 text-xl my-2">
                        &darr;
                      </span>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 3: How It Works                                            */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            How It Works
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.08}
        >
          {connections.map((conn, i) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const typeColors: Record<string, string> = {
              equity: "bg-emerald-100 text-emerald-700",
              funds: "bg-blue-100 text-blue-700",
              workers: "bg-cyan-100 text-cyan-700",
              customers: "bg-orange-100 text-orange-700",
              content: "bg-purple-100 text-purple-700",
            };
            const badge = typeColors[conn.type] ?? "bg-gray-100 text-gray-700";

            return (
              <StaggerItem key={i}>
                <NavyGlow className="rounded-xl bg-white p-6 shadow-sm h-full">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-lg font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-lg font-bold text-[#0f172a] mb-1">
                        <span style={{ color: fromNode.color }}>
                          {fromNode.label}
                        </span>
                        {" "}
                        <span className="text-gray-400">&rarr;</span>
                        {" "}
                        <span style={{ color: toNode.color }}>
                          {toNode.label}
                        </span>
                      </p>
                      <span
                        className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-2 ${badge}`}
                      >
                        {conn.type}
                      </span>
                      <p className="text-sm text-gray-600">{conn.label}</p>
                    </div>
                  </div>
                </NavyGlow>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 4: Entity Roles                                            */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-white">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-[#0f172a] mb-12">
            Entity Flywheel Roles
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          staggerDelay={0.06}
        >
          {entities.map((entity) => (
            <StaggerItem key={entity.slug}>
              <NavyGlow className="rounded-xl bg-gray-50 p-6 h-full">
                <div
                  className="h-full"
                  style={{ borderLeft: `4px solid ${entity.color}`, paddingLeft: "16px" }}
                >
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">
                    {entity.shortName}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {entity.flywheelRole}
                  </p>
                </div>
              </NavyGlow>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section 5: Key Numbers                                             */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Key Numbers
          </h2>
        </FadeIn>

        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          staggerDelay={0.12}
        >
          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center">
              <CountUp
                end={59.1}
                prefix="$"
                suffix="M"
                decimals={1}
                className="text-4xl font-bold text-emerald-400"
              />
              <p className="text-gray-400 mt-2 text-sm font-medium">
                GrowWise Y1 Revenue
              </p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center">
              <CountUp
                end={21}
                suffix="%"
                className="text-4xl font-bold text-emerald-400"
              />
              <p className="text-gray-400 mt-2 text-sm font-medium">
                Equity Flow
              </p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center">
              <CountUp
                end={12.41}
                prefix="$"
                suffix="M"
                decimals={2}
                className="text-4xl font-bold text-emerald-400"
              />
              <p className="text-gray-400 mt-2 text-sm font-medium">
                Downstream Value
              </p>
            </NavyGlow>
          </StaggerItem>

          <StaggerItem>
            <NavyGlow className="rounded-xl bg-white/5 border border-white/10 p-8 text-center">
              <CountUp
                end={13}
                className="text-4xl font-bold text-emerald-400"
              />
              <p className="text-gray-400 mt-2 text-sm font-medium">
                Entities
              </p>
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
            <h2 className="text-3xl font-bold mb-8">Ready to Invest?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join the 21% perpetual flywheel and invest in compounding regional
              value across 13 interconnected entities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PulseGlow>
                <Link
                  href="/investors"
                  className="inline-block rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  Investor Information
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
