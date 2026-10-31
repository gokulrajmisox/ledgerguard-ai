"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  Calculator,
  BrainCircuit,
  AlertOctagon,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface EvidenceCategorizedPanelProps {
  observedFacts: string[];
  computedDiscrepancies: string[];
  modelInterpretations: string[];
  missingEvidence: string[];
  recommendedAction: string;
  approvalRequirements: string;
}

export function EvidenceCategorizedPanel({
  observedFacts,
  computedDiscrepancies,
  modelInterpretations,
  missingEvidence,
  recommendedAction,
  approvalRequirements,
}: EvidenceCategorizedPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    facts: true,
    computed: true,
    interpretations: true,
    missing: true,
    action: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c12] p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <span className="font-bold text-white uppercase tracking-wider">
          Structured Forensic Evidence Matrix
        </span>
        <span className="text-zinc-500 text-[10px]">SOX-404 CLASSIFICATION STANDARDS</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {/* 1. OBSERVED FACTS */}
        <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
          <button
            onClick={() => toggleSection("facts")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.02] text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#00ff87]" />
              <span className="font-bold text-white uppercase">1. Observed Facts</span>
              <span className="text-[10px] text-zinc-500 font-normal">
                ({observedFacts.length} verifiable source records)
              </span>
            </div>
            {openSections.facts ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
          {openSections.facts && (
            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/5 text-zinc-300">
              {observedFacts.map((fact, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#00ff87] font-bold">›</span>
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. COMPUTED DISCREPANCIES */}
        <div className="rounded-lg border border-[#f59e0b]/30 bg-black/40 overflow-hidden">
          <button
            onClick={() => toggleSection("computed")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.02] text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#f59e0b]" />
              <span className="font-bold text-white uppercase">2. Computed Discrepancies</span>
              <span className="text-[10px] text-zinc-500 font-normal">
                ({computedDiscrepancies.length} mathematical deltas)
              </span>
            </div>
            {openSections.computed ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
          {openSections.computed && (
            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/5 text-zinc-300">
              {computedDiscrepancies.map((disc, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#f59e0b] font-bold">▲</span>
                  <span className="leading-relaxed">{disc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. MODEL-GENERATED INTERPRETATIONS */}
        <div className="rounded-lg border border-[#ff3355]/40 bg-black/40 overflow-hidden">
          <button
            onClick={() => toggleSection("interpretations")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.02] text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-[#ff3355]" />
              <span className="font-bold text-white uppercase">
                3. Model-Generated Interpretations
              </span>
              <span className="text-[10px] text-[#ff3355] font-normal">
                (Probabilistic Signals)
              </span>
            </div>
            {openSections.interpretations ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
          {openSections.interpretations && (
            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/5 text-zinc-300">
              {modelInterpretations.map((interp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#ff3355] font-bold">●</span>
                  <span className="leading-relaxed">{interp}</span>
                </div>
              ))}
              <div className="mt-2 p-2 rounded bg-red-950/20 border border-red-500/20 text-[10px] text-zinc-400 italic">
                Notice: Model interpretations are statistical hypotheses and do not constitute legal
                forgery proof.
              </div>
            </div>
          )}
        </div>

        {/* 4. MISSING OR CONFLICTING EVIDENCE */}
        <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden">
          <button
            onClick={() => toggleSection("missing")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.02] text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-zinc-400" />
              <span className="font-bold text-white uppercase">
                4. Missing or Conflicting Evidence
              </span>
              <span className="text-[10px] text-zinc-500 font-normal">
                ({missingEvidence.length} items needed)
              </span>
            </div>
            {openSections.missing ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
          {openSections.missing && (
            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/5 text-zinc-300">
              {missingEvidence.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">?</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. RECOMMENDED ACTIONS */}
        <div className="rounded-lg border border-[#00ff87]/40 bg-[#00ff87]/5 overflow-hidden">
          <button
            onClick={() => toggleSection("action")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-white/[0.02] text-left transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00ff87]" />
              <span className="font-bold text-[#00ff87] uppercase">
                5. Recommended Action & Policy Directives
              </span>
            </div>
            {openSections.action ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>
          {openSections.action && (
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#00ff87]/20 text-zinc-200">
              <p className="leading-relaxed font-semibold">{recommendedAction}</p>
              <div className="p-2.5 rounded bg-black/60 border border-white/10 text-[11px] text-zinc-400">
                <span className="text-white font-bold block mb-0.5">Approval Requirements:</span>
                {approvalRequirements}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
