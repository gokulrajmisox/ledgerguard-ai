"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export function FinancialInsight() {
  const { invoices } = useAppStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState<{title: string, value: string, description: string} | null>(null);
  
  const totalAmount = invoices.reduce((sum, i) => sum + i.totalAmount, 0);
  const reconciledAmount = invoices.filter(i => i.status === "reconciled").reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingAmount = totalAmount - reconciledAmount;
  const reconciliationRate = totalAmount > 0 ? (reconciledAmount / totalAmount) * 100 : 0;

  const insights = [
    {
      title: "Total Processed",
      value: formatCurrency(totalAmount),
      description: "Total value of all invoices in the system"
    },
    {
      title: "Reconciled",
      value: formatCurrency(reconciledAmount),
      description: "Invoices successfully matched and reconciled"
    },
    {
      title: "Pending Review",
      value: formatCurrency(pendingAmount),
      description: "Invoices requiring your attention"
    },
    {
      title: "Reconciliation Rate",
      value: `${Math.round(reconciliationRate)}%`,
      description: "Percentage of invoices successfully reconciled"
    }
  ];

  // Simple 3D crystal visualization using CSS
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-mocha/5 to-mocha/10 rounded-xl overflow-hidden">
      {/* 3D Crystal Shape using CSS transforms */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Octahedron shape using CSS */}
          <div className="absolute inset-0 transform-gpu animate-float">
            {/* Top pyramid */}
            <div className="absolute w-0 h-0 border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent border-b-mocha/30 top-0 left-1/2 -translate-x-1/2" />
            {/* Bottom pyramid (inverted) */}
            <div className="absolute w-0 h-0 border-l-[24px] border-r-[24px] border-t-[40px] border-l-transparent border-r-transparent border-t-mocha/30 bottom-0 left-1/2 -translate-x-1/2" />
            {/* Middle diamond */}
            <div className="absolute w-20 h-20 bg-mocha/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-mocha/40 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 10}%`,
                top: `${15 + (i % 4) * 15}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay with financial summary */}
      <div className="absolute bottom-4 left-4 right-4 bg-ivory/90 backdrop-blur-md rounded-lg border border-mocha/20 p-4">
        <h4 className="text-sm font-medium text-espresso mb-3">Financial Overview</h4>
        <div className="grid grid-cols-2 gap-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-2 rounded border border-mocha/10 hover:bg-mocha/5 cursor-pointer transition-all"
              onClick={() => {
                setTooltipContent(insight);
                setShowTooltip(true);
              }}
            >
              <div className="text-xs text-taupe truncate">{insight.title}</div>
              <div className="text-lg font-bold text-mocha">{insight.value}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-taupe/70 mt-2">
          Click on the crystal to explore. Hover over elements for details.
        </p>
      </div>
      
      {/* Tooltip */}
      {showTooltip && tooltipContent && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ivory border border-mocha/20 rounded-lg shadow-xl p-4 max-w-xs z-50 animate-fade-in">
          <h5 className="text-sm font-bold text-espresso mb-2">{tooltipContent.title}</h5>
          <div className="text-xl font-bold text-mocha mb-2">{tooltipContent.value}</div>
          <p className="text-sm text-taupe">{tooltipContent.description}</p>
          <button
            onClick={() => setShowTooltip(false)}
            className="mt-3 px-3 py-1 bg-mocha/10 text-mocha text-sm rounded hover:bg-mocha/20 transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-10px) rotateX(180deg) rotateY(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default FinancialInsight;
