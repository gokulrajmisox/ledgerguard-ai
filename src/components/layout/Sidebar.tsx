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
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const { cases } = useAppStore();

  const primaryItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Invoices", href: "/invoices", icon: FileText },
    { label: "Reconciliation", href: "/reconciliation", icon: Link2 },
    {
      label: "Document Check",
      href: "/document-check",
      icon: Search,
      highlight: true,
    },
    { label: "Connections", href: "/connections", icon: Layers },
    { label: "Activity", href: "/activity", icon: BarChart3 },
  ];

  const secondaryItems = [
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <aside className="w-64 border-r border-mocha/10 bg-ivory shrink-0 hidden md:flex flex-col min-h-screen">
      {/* Top Brand Tag */}
      <div className="p-4 border-b border-mocha/10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-taupe">
            TESSERACT
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-mocha">
            <span className="w-1.5 h-1.5 rounded-full bg-mocha animate-pulse" />
            ACTIVE
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="p-3 space-y-1 flex-1">
        <div className="px-3 py-2 text-[10px] font-mono uppercase text-taupe tracking-wider">
          Main Navigation
        </div>
        {primaryItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-all ${
                isActive
                  ? "bg-mocha/10 text-mocha border border-mocha/20 shadow-sm"
                  : "text-espresso hover:text-mocha hover:bg-mocha/5"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-mocha" : "text-taupe"}`} />
                <span>{item.label}</span>
              </div>
              {item.highlight && (
                <span className="w-1.5 h-1.5 rounded-full bg-mocha animate-pulse" />
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 py-2 text-[10px] font-mono uppercase text-taupe tracking-wider">
          Additional
        </div>
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium text-espresso hover:text-mocha hover:bg-mocha/5 transition-all"
            >
              <Icon className="w-4 h-4 text-taupe" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Live Discrepancy Alert Widget */}
      {cases.filter(c => c.status === "investigating" || c.status === "under_review").length > 0 && (
        <div className="p-3 m-3 rounded-lg border border-mocha/30 bg-mocha/5 text-xs">
          <div className="flex items-center gap-2 text-mocha font-semibold text-[11px] mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Active Discrepancies</span>
          </div>
          <p className="text-[11px] text-taupe leading-tight mb-2">
            {cases.filter(c => c.status === "investigating" || c.status === "under_review").length} items need attention
          </p>
          <Link
            href="/reconciliation"
            className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-mocha hover:underline"
          >
            Review Now 
          </Link>
        </div>
      )}

      {/* System Footer */}
      <div className="p-3 border-t border-mocha/10 text-[10px] font-mono text-taupe flex items-center justify-between">
        <span>TESSERACT v1.0</span>
        <span className="text-taupe/70">Financial Intelligence</span>
      </div>
    </aside>
  );
}
