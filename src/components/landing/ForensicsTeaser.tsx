"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SearchCode, AlertTriangle, ArrowRight, Eye, Layers } from "lucide-react";

export function ForensicsTeaser() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeOverlay, setActiveOverlay] = useState<"heatmap" | "bbox" | "clean">("heatmap");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] bg-[#050508] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff3355]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff3355]">
                PRIMARY DIFFERENTIATOR
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-[0.95]">
              AI Image Forensics Lab
            </h2>
            <p className="text-sm text-zinc-300 font-normal leading-relaxed">
              Traditional OCR reads words; LedgerGuard inspects pixels. Our multi-modal vision
              models analyze quantization artifacts, font kerning compression, baseline
              misalignments, and PDF stream discrepancies.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <Eye className="w-4 h-4 text-[#00ff87] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-white font-semibold block">Error Level Analysis (ELA)</span>
                  <span className="text-zinc-400">
                    Isolates localized re-compression signatures when digital text is modified.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                <Layers className="w-4 h-4 text-[#ff3355] shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-white font-semibold block">Dual-Stream Cross Checking</span>
                  <span className="text-zinc-400">
                    Flags divergences between underlying invisible PDF text layers and visual raster.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/forensics"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-[#15ff96] transition-all shadow-[0_0_25px_rgba(0,255,135,0.3)]"
              >
                <SearchCode className="w-4 h-4" />
                <span>Open Full Forensics Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Comparison Preview */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-zinc-400">FORENSIC SPECIMEN: INV-88219 (GRAND TOTAL REGION)</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveOverlay("heatmap")}
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      activeOverlay === "heatmap"
                        ? "bg-[#ff3355] text-white"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    Heatmap
                  </button>
                  <button
                    onClick={() => setActiveOverlay("bbox")}
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      activeOverlay === "bbox"
                        ? "bg-[#00ff87] text-black font-semibold"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    Bounding Box
                  </button>
                  <button
                    onClick={() => setActiveOverlay("clean")}
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      activeOverlay === "clean"
                        ? "bg-white text-black font-semibold"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    Raw Document
                  </button>
                </div>
              </div>

              {/* Document Visual Display */}
              <div className="relative h-72 sm:h-80 rounded-xl bg-black border border-white/10 flex flex-col justify-center items-center overflow-hidden">
                {/* Simulated Invoice Document Background */}
                <div className="w-full max-w-md p-6 bg-zinc-950/80 rounded border border-white/10 shadow-inner relative">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400 pb-3 border-b border-white/10 mb-4">
                    <span>APEX HEAVY SYSTEMS</span>
                    <span>INV-88219</span>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>2x Hydraulic Actuators</span>
                      <span className="text-white font-bold">$56,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5x Servo Valves</span>
                      <span>$17,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Freight & Rigging</span>
                      <span>$5,000.00</span>
                    </div>
                  </div>

                  {/* Suspect Grand Total Section */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center relative">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Total Amount Due:
                    </span>

                    {/* Suspect Total with overlay */}
                    <div className="relative p-1">
                      <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider">
                        $84,950.00
                      </span>

                      {/* Error Level Analysis Heatmap Overlay */}
                      {activeOverlay === "heatmap" && (
                        <div className="absolute inset-0 bg-red-600/40 rounded border border-[#ff3355] animate-pulse flex items-center justify-center">
                          <span className="text-[9px] font-mono font-bold bg-[#ff3355] text-white px-1.5 py-0.2 rounded shadow">
                            ELA: 0.94 CONF
                          </span>
                        </div>
                      )}

                      {/* Bounding Box Overlay */}
                      {activeOverlay === "bbox" && (
                        <div className="absolute -inset-1 border-2 border-dashed border-[#ff3355] rounded">
                          <span className="absolute -top-3 left-0 text-[8px] font-mono bg-[#ff3355] text-white px-1 rounded uppercase font-bold">
                            Altered: Expected $64,950
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom interactive caption */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>DISCREPANCY DELTA: +$20,000.00 (+30.8%)</span>
                  <span className="text-[#00ff87]">SYNTHETIC BENCHMARK SPECIMEN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
