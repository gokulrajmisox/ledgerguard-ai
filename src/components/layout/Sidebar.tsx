"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Link2,
  Search,
  BarChart3,
  Layers,
  Settings,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const { cases } = useAppStore();

  const primaryItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Reconciliation", href: "/reconciliation", icon: Link2 },
    {
      label: "Document Check",
      href: "/document-check",
      icon: Search,
      highlight: true,
    },
    { label: "Invoices", href: "/invoices", icon: FileText },
    { label: "Connections", href: "/connections", icon: Layers },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Activity Feed", href: "/activity", icon: BarChart3 },
  ];

  const secondaryItems = [
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help & Docs", href: "/help", icon: HelpCircle },
  ];

  const activeDiscrepancies = cases.filter(
    (c) => c.status === "investigating" || c.status === "under_review"
  );

  return (
    <aside className="w-64 border-r border-[#D7D0C9] bg-[#F7F5F1] shrink-0 hidden md:flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Top Brand Tag */}
      <div className="p-4 border-b border-[#D7D0C9] bg-white/40">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#5C4F47]">
            TESSERACT OPS
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E8F4EC] border border-[#B7DEC3] text-[10px] font-mono font-bold text-[#25663B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25663B] animate-pulse" />
            LIVE
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1.5 text-[11px] font-mono font-bold uppercase text-[#5C4F47] tracking-wider">
          Workspace
        </div>
        {primaryItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-[#6F4E37]/12 text-[#6F4E37] border border-[#6F4E37]/30 shadow-xs"
                  : "text-[#30231D] hover:text-[#6F4E37] hover:bg-[#6F4E37]/6 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-[#6F4E37]" : "text-[#5C4F47]"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
              )}
            </Link>
          );
        })}

        <div className="pt-5 px-3 pb-1.5 text-[11px] font-mono font-bold uppercase text-[#5C4F47] tracking-wider">
          Configuration
        </div>
        {secondaryItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#6F4E37]/12 text-[#6F4E37] border border-[#6F4E37]/30"
                  : "text-[#30231D] hover:text-[#6F4E37] hover:bg-[#6F4E37]/6 border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4 text-[#5C4F47]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Live Discrepancy Alert Widget */}
      {activeDiscrepancies.length > 0 && (
        <div className="p-3.5 m-3 rounded-xl border border-[#F3DC9B] bg-[#FFF8E6] text-xs shadow-xs">
          <div className="flex items-center gap-2 text-[#946000] font-bold text-xs mb-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Active Discrepancies</span>
          </div>
          <p className="text-xs text-[#5C4F47] font-medium leading-relaxed mb-2.5">
            {activeDiscrepancies.length} item{activeDiscrepancies.length > 1 ? "s" : ""} flagged for human sign-off.
          </p>
          <Link
            href="/reconciliation"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#6F4E37] hover:text-[#5A3E2A] hover:underline"
          >
            <span>Review Matrix</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* System Footer */}
      <div className="p-3.5 border-t border-[#D7D0C9] bg-white/40 text-[11px] font-mono text-[#5C4F47] flex items-center justify-between">
        <span className="font-semibold">TESSERACT v1.0</span>
        <span className="text-[#25663B] font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          VERIFIED
        </span>
      </div>
    </aside>
  );
}
