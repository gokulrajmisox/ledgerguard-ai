"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowUpRight, Lock, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#30231D] text-[#E5E4E2] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#4A3B32]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-[#D7D0C9]/20 bg-[#6F4E37] flex items-center justify-center shadow-md">
                <span className="text-lg font-black serif-display text-white">T</span>
              </div>
              <div>
                <div className="text-xl font-black serif-display text-white tracking-tight">
                  TESSERACT
                </div>
                <div className="text-[11px] font-mono text-[#E6E0F0] uppercase tracking-wider font-semibold">
                  Financial Intelligence
                </div>
              </div>
            </div>
            <p className="text-sm text-[#E5E4E2]/90 leading-relaxed font-normal">
              Every transaction leaves evidence. Autonomous invoice reconciliation, document forensics, and cryptographic audit assurance.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#E6E0F0]">
              <Lock className="w-3.5 h-3.5 text-[#E6E0F0]" />
              <span>SOC2 Type II • Zero Data Retention</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider font-mono">
              Platform Modules
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Overview", href: "/" },
                { label: "Reconciliation Matrix", href: "/reconciliation" },
                { label: "Document Check", href: "/document-check" },
                { label: "Invoices Directory", href: "/invoices" },
                { label: "Entity Connections", href: "/connections" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#E5E4E2] hover:text-white transition-colors flex items-center gap-1 group font-medium"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider font-mono">
              Intelligence & Governance
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Analytics & Reports", href: "/reports" },
                { label: "Activity Audit Stream", href: "/activity" },
                { label: "Security & Cryptography", href: "/help" },
                { label: "System Settings", href: "/settings" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#E5E4E2] hover:text-white transition-colors flex items-center gap-1 group font-medium"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Status */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider font-mono">
              System Health
            </h4>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#E5E4E2]">Engine State</span>
                <span className="inline-flex items-center gap-1.5 text-[#E6E0F0] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#E6E0F0] animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#E5E4E2]">Active Rail</span>
                <span className="text-white font-bold">Merkle SHA-256</span>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs text-[#E5E4E2]">
                Continuous monitoring of all inbound and matched records.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#4A3B32] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#D7D0C9]">
          <div>
            © 2026 TESSERACT Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/help" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/help" className="hover:text-white transition-colors">
              Terms of Assurance
            </Link>
            <Link href="/help" className="hover:text-white transition-colors">
              Audit Standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
