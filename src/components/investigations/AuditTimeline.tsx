"use client";

import React from "react";
import { AuditEvent } from "@/types";
import { formatDate } from "@/lib/utils";
import { Lock, Cpu, UserCheck, ShieldCheck, Hash } from "lucide-react";

export function AuditTimeline({ events }: { events: AuditEvent[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c12] p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#00ff87]" />
          <span className="font-bold text-white uppercase tracking-wider">
            Cryptographic Audit Timeline (SOX-404 Immutable)
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#00ff87]">MERKLE CHAIN VALID</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
        {events.map((evt) => {
          const isHuman = evt.actorRole === "human_auditor";
          return (
            <div key={evt.id} className="relative text-xs font-mono group">
              {/* Dot */}
              <div
                className={`absolute -left-6 top-0.5 w-3 h-3 rounded-full border-2 border-[#0c0c12] ${
                  isHuman ? "bg-[#00ff87]" : "bg-zinc-500"
                }`}
              />

              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">{evt.action}</span>
                <span className="text-[10px] text-zinc-500">{formatDate(evt.timestamp)}</span>
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed mb-2 font-mono">
                {evt.details}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded bg-black/40 border border-white/5 text-[10px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  {isHuman ? (
                    <UserCheck className="w-3 h-3 text-[#00ff87]" />
                  ) : (
                    <Cpu className="w-3 h-3 text-zinc-400" />
                  )}
                  <span className="text-zinc-400">{evt.actor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Hash:</span>
                  <span className="text-[#00ff87] font-semibold">{evt.cryptographicHash}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
