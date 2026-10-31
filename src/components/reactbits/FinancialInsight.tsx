"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, X } from "lucide-react";

// Dynamically load the WebGL CrystalizedBall component
const CrystalizedBall = dynamic(() => import("./CrystalizedBall"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#6F4E37]/30 animate-spin" />
    </div>
  ),
});

export function FinancialInsight() {
  const { invoices, cases } = useAppStore();
  const [activeInsightIndex, setActiveInsightIndex] = useState<number | null>(0);
  const [ballColor, setBallColor] = useState<string>("#6F4E37"); // Brand Mocha

  const totalAmount = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const reconciledAmount = invoices
    .filter((i) => i.status === "reconciled")
    .reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingAmount = totalAmount - reconciledAmount;
  const reconciliationRate = totalAmount > 0 ? (reconciledAmount / totalAmount) * 100 : 0;

  const insights = [
    {
      title: "Reconciled Capital",
      value: formatCurrency(reconciledAmount),
      description: "Successfully matched across PO and bank rails with 0 variance.",
      color: "#25663B",
      ballColor: "#25663B",
      icon: CheckCircle2,
    },
    {
      title: "Active In Dispute",
      value: formatCurrency(pendingAmount),
      description: "Flagged invoices with quantization divergence or price discrepancies.",
      color: "#946000",
      ballColor: "#946000",
      icon: AlertTriangle,
    },
    {
      title: "Total Intake Volume",
      value: formatCurrency(totalAmount),
      description: "Normalized invoice total across all authorized vendor accounts.",
      color: "#6F4E37",
      ballColor: "#6F4E37",
      icon: TrendingUp,
    },
    {
      title: "Assurance Ratio",
      value: `${Math.round(reconciliationRate)}%`,
      description: "Cryptographically verified and sealed in Merkle audit logs.",
      color: "#216766",
      ballColor: "#E6E0F0",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full h-full rounded-2xl border border-[#D7D0C9] bg-white p-6 shadow-lg flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D7D0C9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#6F4E37]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5C4F47]">
              SIGNATURE 3D SENSORY VISUALIZATION
            </span>
          </div>
          <h3 className="text-xl font-bold serif-display text-[#30231D]">
            Autonomous Intelligence Core
          </h3>
        </div>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#5C4F47] mr-1 hidden sm:inline">Theme:</span>
          {["#6F4E37", "#25663B", "#946000", "#E6E0F0"].map((c) => (
            <button
              key={c}
              onClick={() => setBallColor(c)}
              className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                ballColor === c ? "scale-125 border-[#30231D] shadow-sm" : "border-white opacity-70"
              }`}
              style={{ backgroundColor: c }}
              title={`Switch core color to ${c}`}
              aria-label={`Switch core color to ${c}`}
            />
          ))}
        </div>
      </div>

      {/* Center 3D CrystalizedBall Container */}
      <div className="relative w-full h-[280px] sm:h-[320px] my-2 rounded-xl bg-gradient-to-b from-[#F7F5F1] to-[#EDE8DE] border border-[#D7D0C9] overflow-hidden">
        <CrystalizedBall
          style={{ width: "100%", height: "100%" }}
          preset="plasma"
          color={ballColor}
          size={0.7}
          crackle={0.75}
          fill={0.55}
          interactive
          hoverStrength={0.65}
          strands={6}
          flares={0.6}
          glow={0.8}
          sparks={0.5}
          particleCount={12000}
          motion="rise"
          particleShape="square"
          depth={0.6}
          sway={0.4}
          twinkle={0.5}
          haze={0.6}
          dustSpeed={1}
          speed={1}
          intro
          paused={false}
        />

        {/* Micro HUD Overlay */}
        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[#5C4F47] pointer-events-none">
          MOVE CURSOR TO DIRECT PLASMA FLARES • CLICK METRIC TO TUNE CORE
        </div>
      </div>

      {/* Bottom Insights Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
        {insights.map((insight, idx) => {
          const isSelected = activeInsightIndex === idx;
          const Icon = insight.icon;
          return (
            <button
              key={insight.title}
              onClick={() => {
                setActiveInsightIndex(idx);
                setBallColor(insight.ballColor);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#F7F5F1] border-[#6F4E37] ring-2 ring-[#6F4E37]/15 shadow-sm"
                  : "bg-white border-[#D7D0C9] hover:bg-[#F7F5F1] hover:border-[#6F4E37]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-bold text-[#5C4F47] uppercase truncate">
                  {insight.title}
                </span>
                <Icon className="w-3.5 h-3.5 text-[#6F4E37]" />
              </div>
              <div className="text-lg font-bold text-[#30231D] font-mono tracking-tight">
                {insight.value}
              </div>
              <p className="text-[11px] text-[#5C4F47] line-clamp-1 mt-0.5">
                {insight.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
