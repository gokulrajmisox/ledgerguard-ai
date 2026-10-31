"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { History, ShieldCheck, Cpu, UserCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function RecentActivityFeed() {
  const { auditLogs } = useAppStore();

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c12] p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#00ff87]" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Reconciliation & Audit Trail
          </h3>
        </div>
        <Link
          href="/investigations#audit"
          className="text-[10px] font-mono text-[#00ff87] hover:underline flex items-center gap-1"
        >
          <span>FULL MERKLE LOG</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {auditLogs.slice(0, 6).map((log) => {
          const isHuman = log.actorRole === "human_auditor";
          return (
            <div
              key={log.id}
              className="p-3 rounded-lg border border-white/[0.05] bg-black/40 hover:bg-white/[0.02] transition-colors text-xs font-mono"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {isHuman ? (
                    <UserCheck className="w-3.5 h-3.5 text-[#00ff87]" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                  <span className="font-bold text-white text-[11px]">{log.action}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{formatDate(log.timestamp)}</span>
              </div>

              <p className="text-[11px] text-zinc-300 leading-tight mb-2">
                {log.details}
              </p>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                <span className="text-zinc-400 truncate max-w-[180px]">{log.actor}</span>
                <span className="text-[#00ff87] font-semibold">{log.cryptographicHash}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
