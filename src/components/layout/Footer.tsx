"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, GitBranch, Terminal, ExternalLink, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050507] text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/[0.05]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
              <span className="text-sm font-bold tracking-wider text-white uppercase">
                TESSERACT • LEDGERGUARD AI
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Autonomous finance intelligence and multi-modal invoice forensics. Every transaction
              leaves evidence—our deterministic matching engine and computer vision neural agents
              turn subtle anomalies into court-admissible audit trails.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                KERNEL: ACTIVE (v3.4.12)
              </span>
              <span>•</span>
              <span>MERKLE BLOCK: 0x8f19e4a2bc</span>
              <span>•</span>
              <span>ENCRYPTION: AES-256-GCM</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
              Intelligence Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/console" className="hover:text-[#00ff87] transition-colors">
                  Command Center Console
                </Link>
              </li>
              <li>
                <Link href="/forensics" className="hover:text-[#00ff87] transition-colors">
                  AI Image Forensics Lab
                </Link>
              </li>
              <li>
                <Link href="/investigations" className="hover:text-[#00ff87] transition-colors">
                  Investigation Cases Queue
                </Link>
              </li>
              <li>
                <Link href="/evidence" className="hover:text-[#00ff87] transition-colors">
                  Evidence Graph & Replay
                </Link>
              </li>
              <li>
                <Link href="/mission-control" className="hover:text-[#00ff87] transition-colors">
                  Agent Mission Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 font-mono">
              Compliance & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/benchmarks" className="hover:text-[#00ff87] transition-colors">
                  Accuracy Benchmarks
                </Link>
              </li>
              <li className="text-zinc-500">Dual-Signoff Policy Rules</li>
              <li className="text-zinc-500">SOX-404 Cryptographic Audit</li>
              <li className="text-zinc-500">Deterministic Rate Guardrails</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div className="max-w-2xl">
            <span className="text-zinc-400 font-semibold">SYNTHETIC BENCHMARK FIXTURE: </span>
            All demonstration documents, vendor names, line items, and transaction logs are
            synthetic fixtures generated for platform evaluation. LedgerGuard AI does not alter real
            financial accounts or execute live bank settlements without explicit human governance.
          </div>
          <div className="shrink-0 text-zinc-500">
            © 2026 Tesseract Intelligence Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
