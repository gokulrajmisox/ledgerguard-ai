"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BenchmarkMetric } from "@/types";

export function BenchmarkCharts({ data }: { data: BenchmarkMetric[] }) {
  // Filter for percentage accuracy metrics
  const accuracyData = data
    .filter((d) => d.unit === "%" && d.metric !== "False Positive Rate")
    .map((d) => ({
      name: d.metric.replace(" Accuracy", "").replace(" Precision", "").replace(" Recall", ""),
      Baseline: d.baselineScore,
      Enhanced: d.enhancedScore,
      "Forensic-Assisted": d.forensicAssistedScore,
    }));

  return (
    <div className="space-y-6">
      {/* Comparative Performance Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c14] shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10 font-mono text-xs">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Comparative Accuracy Evaluation (12,500 Labeled Documents)
            </h3>
            <span className="text-[11px] text-zinc-500">
              Evaluation dataset: Synthetic Stress Test v3.2 • Gold Standard Hand-Audited
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded bg-zinc-600" />
              <span>Legacy Baseline</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#00e5ff]">
              <span className="w-2.5 h-2.5 rounded bg-[#00e5ff]" />
              <span>Enhanced 3-Way</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#00ff87]">
              <span className="w-2.5 h-2.5 rounded bg-[#00ff87]" />
              <span>Forensic-Assisted</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={accuracyData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                stroke="#71717a"
                tick={{ fill: "#a1a1aa", fontSize: 11, fontFamily: "monospace" }}
              />
              <YAxis
                domain={[60, 100]}
                stroke="#71717a"
                tick={{ fill: "#a1a1aa", fontSize: 11, fontFamily: "monospace" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#07070a",
                  borderColor: "rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="Baseline" fill="#52525b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Enhanced" fill="#00e5ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Forensic-Assisted" fill="#00ff87" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Breakdown Table */}
      <div className="rounded-xl border border-white/10 bg-[#07070a] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-separate border-spacing-0">
          <thead className="bg-[#0f0f15] text-zinc-400 uppercase text-[10px]">
            <tr>
              <th className="p-3.5 border-b border-white/10">Evaluation Metric</th>
              <th className="p-3.5 border-b border-white/10">Legacy Baseline</th>
              <th className="p-3.5 border-b border-white/10">Enhanced 3-Way</th>
              <th className="p-3.5 border-b border-white/10">Forensic-Assisted</th>
              <th className="p-3.5 border-b border-white/10">Sample Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((m) => {
              const isBetter =
                m.metric === "False Positive Rate" || m.metric === "Average Processing Latency"
                  ? m.forensicAssistedScore < m.baselineScore
                  : m.forensicAssistedScore > m.baselineScore;

              return (
                <tr key={m.metric} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-bold text-white">
                    <div>{m.metric}</div>
                    <span className="text-[10px] text-zinc-500 font-normal">{m.description}</span>
                  </td>
                  <td className="p-3.5 text-zinc-400">
                    {m.baselineScore}
                    {m.unit}
                  </td>
                  <td className="p-3.5 text-[#00e5ff] font-semibold">
                    {m.enhancedScore}
                    {m.unit}
                  </td>
                  <td className="p-3.5 font-bold text-[#00ff87] whitespace-nowrap">
                    {m.forensicAssistedScore}
                    {m.unit}
                  </td>
                  <td className="p-3.5 text-zinc-500">{m.sampleCount.toLocaleString()} docs</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
