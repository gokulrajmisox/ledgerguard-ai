"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal,
  SearchCode,
  ShieldAlert,
  Layers,
  Cpu,
  BarChart3,
  Building2,
  FileText,
  History,
  Settings,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const { metrics, cases } = useAppStore();

  const primaryItems = [
    { label: "Overview", href: "/console", icon: Terminal },
    { label: "Invoice Forensics", href: "/forensics", icon: SearchCode, highlight: true },
    { label: "Interactive Lab", href: "/interactive-lab", icon: Sparkles },
    {
      label: "Investigations",
      href: "/investigations",
      icon: ShieldAlert,
      badge: cases.filter((c) => c.status === "investigating" || c.status === "under_review").length,
      badgeColor: "bg-[#ff3355]/20 text-[#ff3355] border-[#ff3355]/30",
    },
    { label: "Evidence Graph", href: "/evidence", icon: Layers },
    { label: "Agent Mission Control", href: "/mission-control", icon: Cpu },
    { label: "Evaluation Benchmarks", href: "/benchmarks", icon: BarChart3 },
  ];

  const secondaryItems = [
    { label: "Reconciliation Log", href: "/console#reconcile", icon: FileText },
    { label: "Vendor Entities", href: "/console#vendors", icon: Building2 },
    { label: "Cryptographic Audit", href: "/investigations#audit", icon: History },
    { label: "Settings & Guardrails", href: "/console#settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-white/[0.08] bg-[#070709] shrink-0 hidden md:flex flex-col min-h-screen">
      {/* Top Brand Tag */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            CONTROL MATRIX
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-[#00ff87]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="p-3 space-y-1 flex-1">
        <div className="px-3 py-2 text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
          Forensics & Operations
        </div>
        {primaryItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/console" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all ${
                isActive
                  ? "bg-white/[0.08] text-white border border-white/10 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#00ff87]" : "text-zinc-500"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`px-1.5 py-0.2 text-[10px] font-mono rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 py-2 text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
          Enterprise Systems
        </div>
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all"
            >
              <Icon className="w-4 h-4 text-zinc-500" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Live Discrepancy Alert Widget */}
      <div className="p-3 m-3 rounded-lg border border-[#ff3355]/30 bg-[#ff3355]/5 text-xs">
        <div className="flex items-center gap-2 text-[#ff3355] font-semibold text-[11px] mb-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Active Discrepancy P1</span>
        </div>
        <p className="text-[11px] text-zinc-300 leading-tight mb-2">
          INV-88219 (Apex Heavy) exceeds authorized PO ceiling by +$20,000.00.
        </p>
        <Link
          href="/investigations/case-01"
          className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#ff3355] hover:underline"
        >
          Inspect Dossier →
        </Link>
      </div>

      {/* System Telemetry Footer */}
      <div className="p-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500 flex items-center justify-between">
        <span>TESSERACT v3.4</span>
        <span className="text-zinc-400">LATENCY 124MS</span>
      </div>
    </aside>
  );
}
