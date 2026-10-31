"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { History, ShieldCheck, Cpu, UserCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function RecentActivityFeed() {
  const { auditLogs } = useAppStore();

  return (
    <div className="card-luxury p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#D7D0C9]">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#6F4E37]" />
          <h3 className="text-xs font-mono font-bold uppercase text-espresso tracking-wider">
            Cryptographic Activity Feed
          </h3>
        </div>
        <Link
          href="/activity"
          className="text-xs font-mono text-[#6F4E37] font-bold hover:underline flex items-center gap-1"
        >
          <span>FULL MERKLE LOG</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {auditLogs.slice(0, 6).map((log) => {
          const isHuman = log.actorRole === "human_auditor";
          return (
            <div
              key={log.id}
              className="p-3.5 rounded-xl border border-[#D7D0C9] bg-white hover:bg-[#F7F5F1] transition-colors text-xs font-mono"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {isHuman ? (
                    <UserCheck className="w-3.5 h-3.5 text-[#25663B]" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-[#6F4E37]" />
                  )}
                  <span className="font-bold text-espresso text-[11px]">{log.action}</span>
                </div>
                <span className="text-[10px] text-[#5C4F47] font-medium">{formatDate(log.timestamp)}</span>
              </div>

              <p className="text-xs text-[#5C4F47] leading-relaxed mb-2">
                {log.details}
              </p>

              <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-[#D7D0C9] text-[#5C4F47]">
                <span className="truncate max-w-[180px] font-semibold text-espresso">{log.actor}</span>
                <span className="text-[#6F4E37] font-mono font-bold">{log.cryptographicHash}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
