"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, Eye, Layers, AlertTriangle, CheckCircle2, Download, RefreshCw, FileSearch } from "lucide-react";
import { ForensicFinding } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface DocumentViewerProps {
  invoiceNumber: string;
  vendorName: string;
  totalAmount: number;
  poAmount: number;
  findings: ForensicFinding[];
  activeFindingId: string;
  onSelectFinding: (finding: ForensicFinding) => void;
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
  const [scale, setScale] = useState<number>(1.0);
  const [showElaHeatmap, setShowElaHeatmap] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 1.8));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const resetZoom = () => setScale(1.0);

  const discrepancy = totalAmount - poAmount;
  const activeFinding = findings.find((f) => f.id === activeFindingId);

  return (
    <div className="card h-full flex flex-col p-0 overflow-hidden shadow-md">
      {/* Document Viewer Toolbar */}
      <div className="p-4 border-b border-[#D7D0C9] bg-[#F7F5F1] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6F4E37] text-white flex items-center justify-center font-bold text-xs font-mono">
            PDF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-[#30231D]">{invoiceNumber}</span>
              <span className="badge-warning text-xs font-bold">DISPUTED</span>
            </div>
            <div className="text-xs text-[#5C4F47]">{vendorName}</div>
          </div>
        </div>

        {/* View Mode & Zoom Controls */}
        <div className="flex items-center gap-2">
          {/* ELA Heatmap Toggle */}
          <button
            onClick={() => setShowElaHeatmap(!showElaHeatmap)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              showElaHeatmap
                ? "bg-[#6F4E37] text-white border-[#5A3E2A] shadow-xs"
                : "bg-white text-[#30231D] border-[#D7D0C9] hover:bg-[#EDE8DE]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ELA Heatmap</span>
          </button>

          {/* OCR BBoxes Toggle */}
          <button
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              showBoundingBoxes
                ? "bg-[#25663B] text-white border-[#1E5230] shadow-xs"
                : "bg-white text-[#30231D] border-[#D7D0C9] hover:bg-[#EDE8DE]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>OCR Matrix</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center rounded-lg border border-[#D7D0C9] bg-white p-0.5 shadow-xs">
            <button
              onClick={zoomOut}
              className="p-1.5 rounded hover:bg-[#EDE8DE] text-[#30231D] transition-colors cursor-pointer"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              className="px-2 text-xs font-mono font-bold text-[#5C4F47] hover:text-[#30231D]"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={zoomIn}
              className="p-1.5 rounded hover:bg-[#EDE8DE] text-[#30231D] transition-colors cursor-pointer"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Interactive Canvas Stage */}
      <div className="flex-1 min-h-[460px] bg-[#E5E4E2]/50 p-6 overflow-auto flex items-center justify-center relative">
        <div
          className="bg-white rounded-lg shadow-xl border border-[#D7D0C9] p-8 max-w-2xl w-full transition-transform duration-200 relative select-none"
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          {/* ELA Heatmap Layer Overlay */}
          {showElaHeatmap && (
            <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-tr from-transparent via-[#946000]/10 to-[#B52A2A]/15 mix-blend-multiply" />
          )}

          {/* Invoice Specimen Content */}
          <div className="space-y-6 text-[#30231D]">
            {/* Header */}
            <div className="flex justify-between items-start pb-6 border-b border-[#D7D0C9]">
              <div>
                <h2 className="text-2xl font-black serif-display text-[#30231D] uppercase tracking-tight">
                  {vendorName}
                </h2>
                <div className="text-xs text-[#5C4F47] mt-1 font-sans">
                  Industrial Robotics & Heavy Systems Division<br />
                  404 Industrial Blvd, Suite 900, Austin TX
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-[#6F4E37] uppercase">INVOICE</div>
                <div className="text-lg font-black font-mono text-[#30231D]">{invoiceNumber}</div>
                <div className="text-xs text-[#5C4F47] mt-0.5">Date: October 15, 2026</div>
              </div>
            </div>

            {/* Bill To & PO */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#F7F5F1] border border-[#D7D0C9]">
                <div className="font-bold text-[#5C4F47] uppercase font-mono">BILL TO:</div>
                <div className="font-bold text-[#30231D] mt-1">Tesseract Autonomous Corp</div>
                <div className="text-[#5C4F47]">Accounts Payable Department</div>
              </div>
              <div className="p-3 rounded-lg bg-[#F7F5F1] border border-[#D7D0C9]">
                <div className="font-bold text-[#5C4F47] uppercase font-mono">PURCHASE ORDER:</div>
                <div className="font-mono font-bold text-[#25663B] mt-1">PO-2024-912</div>
                <div className="text-[#5C4F47]">Net 30 Payment Terms</div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-[#D7D0C9] rounded-lg overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-[#F7F5F1] border-b border-[#D7D0C9] text-left text-[#5C4F47] font-mono">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE8DE]">
                  <tr>
                    <td className="p-2.5 font-medium text-[#30231D]">High-Yield Hydraulic Actuators (Model 4X)</td>
                    <td className="p-2.5 text-center font-mono">4</td>
                    <td className="p-2.5 text-right font-mono">$12,000.00</td>
                    <td className="p-2.5 text-right font-mono font-bold">$48,000.00</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-[#30231D]">Titanium Bushing Sets (Sub-assembly)</td>
                    <td className="p-2.5 text-center font-mono">12</td>
                    <td className="p-2.5 text-right font-mono">$1,412.50</td>
                    <td className="p-2.5 text-right font-mono font-bold">$16,950.00</td>
                  </tr>
                  {/* Flagged Row */}
                  <tr className="bg-[#FFF8E6] text-[#946000]">
                    <td className="p-2.5 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#B52A2A]" />
                      <span>Expedited Freight & Hazardous Surcharge</span>
                    </td>
                    <td className="p-2.5 text-center font-mono">1</td>
                    <td className="p-2.5 text-right font-mono font-bold">+$20,000.00</td>
                    <td className="p-2.5 text-right font-mono font-black text-[#B52A2A]">+$20,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Section with Bounding Box Overlay */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C4F47]">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#30231D]">$64,950.00</span>
                </div>
                <div className="flex justify-between text-[#B52A2A] font-bold">
                  <span>Unauthorized Levy:</span>
                  <span className="font-mono">+$20,000.00</span>
                </div>
                {/* Total Box */}
                <div className="pt-2 border-t border-[#D7D0C9] flex justify-between items-center text-sm font-bold relative">
                  <span>Grand Total:</span>
                  <span className="font-mono text-lg text-[#30231D] relative px-2 py-0.5">
                    {formatCurrency(totalAmount)}
                    {showBoundingBoxes && (
                      <span className="absolute inset-0 border-2 border-[#B52A2A] rounded animate-pulse pointer-events-none" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
