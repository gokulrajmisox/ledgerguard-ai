"use client";

import React, { useState } from "react";
import { Upload, FileUp, CheckCircle2, AlertCircle, FileText, Sparkles } from "lucide-react";

interface UploadZoneProps {
  onSelectSampleCase: (caseId: string) => void;
  selectedCaseId: string;
}

export function UploadZone({ onSelectSampleCase, selectedCaseId }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSimulatedUpload = (fileType: string) => {
    setUploadError(null);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 15;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 800);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const sampleCases = [
    {
      id: "case-01",
      label: "Case 1: INV-88219 (Altered Grand Total)",
      vendor: "Apex Heavy Systems",
      finding: "Pixel compression & font offset +$20,000",
      type: "discrepant",
    },
    {
      id: "case-02",
      label: "Case 2: INV-90432 (Duplicate / Divergent Wire)",
      vendor: "Vanguard Cloud",
      finding: "10-day duplicate cycle & unverified routing",
      type: "duplicate",
    },
    {
      id: "case-03",
      label: "Case 3: INV-77104 (Uncontracted Fee)",
      vendor: "Krypton Logistics",
      finding: "+$7,500 fuel surcharge not in MSA",
      type: "discrepant",
    },
    {
      id: "case-04",
      label: "Case 4: INV-65201 (Clean 3-Way Match)",
      vendor: "Cyberdyne Quantum",
      finding: "100% verified against PO-2024-118",
      type: "clean",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Preloaded Forensic Demonstrations Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00ff87]" />
          <span className="text-white font-bold uppercase">Preloaded Forensic Specimens:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {sampleCases.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSampleCase(s.id)}
              className={`px-2.5 py-1.5 rounded text-[11px] font-mono transition-all text-left ${
                selectedCaseId === s.id
                  ? "bg-[#00ff87] text-black font-bold shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                  : "bg-zinc-900 text-zinc-300 hover:text-white border border-white/5"
              }`}
            >
              <span>{s.label.split("(")[0]}</span>
              <span className="opacity-75 block text-[9px]">{s.vendor}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Dropzone Simulator */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleSimulatedUpload("drop");
        }}
        className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center relative ${
          isDragging
            ? "border-[#00ff87] bg-[#00ff87]/5"
            : "border-white/10 bg-[#07070a] hover:border-white/20"
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-[#00ff87]">
            <Upload className="w-5 h-5" />
          </div>

          <div className="text-xs font-mono">
            <span className="text-white font-bold block mb-1">
              Drag & Drop Invoice Image or PDF for Neural Forensics
            </span>
            <span className="text-zinc-500 text-[11px]">
              Supports PDF, PNG, TIFF, JPG up to 50MB. Optical Resolution normalized at 300 DPI.
            </span>
          </div>

          {/* Upload Progress Animation */}
          {uploadProgress !== null && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>ANALYZING PIXEL QUANTIZATION...</span>
                <span className="text-[#00ff87] font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00ff87] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadError && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#ff3355] font-mono">
              <AlertCircle className="w-4 h-4" />
              <span>{uploadError}</span>
            </div>
          )}

          <div className="pt-1 flex items-center justify-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono border border-white/10">
              <FileUp className="w-3.5 h-3.5" />
              <span>Browse Local File</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.tiff"
                onChange={() => handleSimulatedUpload("picker")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
