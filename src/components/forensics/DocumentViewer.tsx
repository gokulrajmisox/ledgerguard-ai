"use client";

import React, { useState, useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  Eye,
  Sliders,
  SplitSquareVertical,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { ForensicFinding } from "@/types";

interface DocumentViewerProps {
  invoiceNumber: string;
  vendorName: string;
  totalAmount: number;
  poAmount: number;
  findings: ForensicFinding[];
  activeFindingId?: string;
  onSelectFinding?: (f: ForensicFinding) => void;
}

export function DocumentViewer({
  invoiceNumber,
  vendorName,
  totalAmount,
  poAmount,
  findings,
  activeFindingId,
  onSelectFinding,
}: DocumentViewerProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [compareMode, setCompareMode] = useState<"single" | "slider" | "split">("single");
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 60), 220));
  };

  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#07070a] overflow-hidden shadow-2xl">
      {/* Viewer Toolbar */}
      <div className="p-3 border-b border-white/10 bg-[#0e0e14] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Document Identifier */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff3355] animate-ping" />
          <span className="text-white font-bold">{invoiceNumber}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">{vendorName}</span>
        </div>

        {/* View Mode & Overlay Toggles */}
        <div className="flex items-center gap-2">
          {/* Overlay Toggles */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 text-[11px]">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-2 py-1 rounded transition-all ${
                showHeatmap
                  ? "bg-[#ff3355]/20 text-[#ff3355] font-bold border border-[#ff3355]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Toggle Error Level Analysis Heatmap"
            >
              ELA Heatmap
            </button>
            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className={`px-2 py-1 rounded transition-all ${
                showBoundingBoxes
                  ? "bg-[#00ff87]/20 text-[#00ff87] font-bold border border-[#00ff87]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Toggle OCR Bounding Boxes"
            >
              Bounding Boxes
            </button>
          </div>

          {/* Comparison Mode Toggles */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 text-[11px]">
            <button
              onClick={() => setCompareMode("single")}
              className={`px-2 py-1 rounded ${
                compareMode === "single" ? "bg-white/15 text-white font-bold" : "text-zinc-400"
              }`}
            >
              Single
            </button>
            <button
              onClick={() => setCompareMode("slider")}
              className={`px-2 py-1 rounded ${
                compareMode === "slider" ? "bg-white/15 text-white font-bold" : "text-zinc-400"
              }`}
            >
              Slider
            </button>
            <button
              onClick={() => setCompareMode("split")}
              className={`px-2 py-1 rounded ${
                compareMode === "split" ? "bg-white/15 text-white font-bold" : "text-zinc-400"
              }`}
            >
              Side-by-Side
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-black/60 border border-white/10 text-[11px]">
            <button
              onClick={() => handleZoom(-15)}
              className="p-1 text-zinc-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-zinc-300 font-mono text-[10px]">
              {zoomLevel}%
            </span>
            <button
              onClick={() => handleZoom(15)}
              className="p-1 text-zinc-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1.5 py-0.5 text-[10px] text-zinc-400 hover:text-white"
              title="Fit to Window"
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Visual Canvas Container */}
      <div className="flex-1 overflow-auto p-6 sm:p-8 flex items-center justify-center bg-[#050508] relative min-h-[480px]">
        {/* Background Grid */}
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

        {/* SINGLE OR SLIDER VIEW */}
        {compareMode === "single" || compareMode === "slider" ? (
          <div
            className="relative transition-transform duration-150 origin-center max-w-xl w-full"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* INVOICE DOCUMENT SLATE */}
            <div className="relative p-8 rounded-xl bg-[#0c0c14] border border-white/15 shadow-2xl text-xs font-mono text-zinc-300 select-none">
              {/* Document Watermark Header */}
              <div className="flex justify-between items-start pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">{vendorName}</h3>
                  <div className="text-[10px] text-zinc-500">TAX ID: XX-9912048 • CERTIFIED VENDOR</div>
                </div>
                <div className="text-right text-[11px]">
                  <div className="text-white font-bold">{invoiceNumber}</div>
                  <div className="text-zinc-400">Date: 2024-10-14</div>
                  <div className="text-[#00ff87]">PO: PO-2024-912</div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-3 mb-8">
                <div className="grid grid-cols-12 pb-2 border-b border-white/10 text-zinc-500 uppercase text-[10px] font-bold">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Unit Rate</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Line Item 1: Discrepant Unit Rate */}
                <div className="relative grid grid-cols-12 py-2 text-zinc-200 group">
                  <div className="col-span-6">Hydraulic Actuator Set (Grade-A)</div>
                  <div className="col-span-2 text-right">2</div>
                  <div className="col-span-2 text-right font-bold text-white relative">
                    $28,000.00
                    {showBoundingBoxes && (
                      <span className="absolute -inset-1 border border-dashed border-[#ff3355] rounded pointer-events-none" />
                    )}
                  </div>
                  <div className="col-span-2 text-right font-bold text-white">$56,000.00</div>

                  {/* OCR layer mismatch tag */}
                  {showBoundingBoxes && (
                    <div className="absolute -top-3 right-10 text-[8px] font-mono px-1 rounded bg-[#ff3355] text-white font-bold">
                      OCR Layer: Text Stream $22,000 vs Raster $28,000
                    </div>
                  )}
                </div>

                {/* Line Item 2: Verified */}
                <div className="grid grid-cols-12 py-2 text-zinc-400">
                  <div className="col-span-6">Calibrated Servo Valve Regulators</div>
                  <div className="col-span-2 text-right">5</div>
                  <div className="col-span-2 text-right">$3,500.00</div>
                  <div className="col-span-2 text-right">$17,500.00</div>
                </div>

                {/* Line Item 3: Inflated Freight */}
                <div className="grid grid-cols-12 py-2 text-zinc-400">
                  <div className="col-span-6">Certified Freight & Rigging Transport</div>
                  <div className="col-span-2 text-right">1</div>
                  <div className="col-span-2 text-right">$5,000.00</div>
                  <div className="col-span-2 text-right">$5,000.00</div>
                </div>
              </div>

              {/* Total Calculation Block */}
              <div className="border-t border-white/10 pt-4 flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span>$78,500.00</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Tax (8.21%):</span>
                    <span>$6,450.00</span>
                  </div>

                  {/* Suspect Grand Total with Active Overlays */}
                  <div className="relative pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase">Invoice Total:</span>

                    <div className="relative p-1">
                      <span className="text-xl font-bold font-mono text-white tracking-wider">
                        $<span className="text-[#ff3355]">8</span>4,950.00
                      </span>

                      {/* ELA Heatmap Overlay */}
                      {showHeatmap && (
                        <div className="absolute inset-0 bg-[#ff3355]/30 border border-[#ff3355] rounded animate-pulse flex items-center justify-center">
                          <span className="text-[8px] font-mono font-bold bg-[#ff3355] text-white px-1 rounded shadow">
                            ELA Conf: 0.94
                          </span>
                        </div>
                      )}

                      {/* Bounding Box Overlay */}
                      {showBoundingBoxes && (
                        <div className="absolute -inset-1 border-2 border-dashed border-[#ff3355] rounded pointer-events-none">
                          <span className="absolute -top-3 left-0 text-[8px] font-mono bg-[#ff3355] text-white px-1 rounded font-bold uppercase">
                            Delta: +$20,000.00
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remittance Wire Coordinates Footer */}
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-zinc-500 flex justify-between">
                <span>WIRE ROUTING: 021000021</span>
                <span>ACCOUNT: •••• 4892</span>
                <span className="text-[#00ff87]">BENEFICIARY CONFIRMED</span>
              </div>
            </div>

            {/* SLIDER COMPARISON OVERLAY */}
            {compareMode === "slider" && (
              <div className="mt-4 p-3 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-400">Document Version Slider:</span>
                  <span className="text-[#00ff87]">
                    {sliderPos < 50 ? "Original PO ($64,950)" : "Altered Invoice ($84,950)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#00ff87] cursor-ew-resize"
                />
              </div>
            )}
          </div>
        ) : (
          /* SIDE-BY-SIDE VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Version A: Authorized Baseline (PO) */}
            <div className="p-6 rounded-xl bg-[#09090e] border border-white/10 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="text-[#00ff87] font-bold">AUTHORIZED BASELINE (PO-2024-912)</span>
                <span className="text-zinc-500">2024-10-10</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>2x Hydraulic Actuators</span>
                  <span className="text-white font-bold">$44,000.00 ($22,000/ea)</span>
                </div>
                <div className="flex justify-between">
                  <span>5x Servo Valves</span>
                  <span>$17,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Freight Cap</span>
                  <span>$3,450.00</span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between font-bold text-white">
                <span>Authorized Ceiling:</span>
                <span className="text-[#00ff87]">$64,950.00</span>
              </div>
            </div>

            {/* Version B: Received Invoice */}
            <div className="p-6 rounded-xl bg-[#09090e] border border-[#ff3355]/40 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="text-[#ff3355] font-bold">SUBMITTED INVOICE (INV-88219)</span>
                <span className="text-zinc-500">2024-10-14</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[#ff3355]">
                  <span>2x Hydraulic Actuators</span>
                  <span className="font-bold">$56,000.00 ($28,000/ea)</span>
                </div>
                <div className="flex justify-between">
                  <span>5x Servo Valves</span>
                  <span>$17,500.00</span>
                </div>
                <div className="flex justify-between text-[#f59e0b]">
                  <span>Freight Billed</span>
                  <span>$5,000.00</span>
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between font-bold text-white">
                <span>Billed Total:</span>
                <span className="text-[#ff3355]">$84,950.00 (+30.8%)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metadata & Limitation Footer */}
      <div className="p-3 border-t border-white/10 bg-[#0e0e14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>
            FORENSIC SIGNAL NOTICE: Statistical anomaly only. Does not constitute legal proof of
            forgery. Human review mandatory.
          </span>
        </div>
        <span className="text-zinc-400">RESOLUTION: 300 DPI • COLOR MATRIX: RGB-888</span>
      </div>
    </div>
  );
}
