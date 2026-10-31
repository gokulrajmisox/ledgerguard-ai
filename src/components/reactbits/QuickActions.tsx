"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Link2, Search, AlertTriangle, Clock, X, Plus, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Action = {
  id: string;
  label: string;
  description: string;
  icon: any;
  action: () => void;
  accentColor: string;
  badgeBg: string;
};

export function QuickActions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const actions: Action[] = [
    {
      id: "check-invoice",
      label: "Check Document",
      description: "Forensic ELA and OCR integrity scan",
      icon: Search,
      action: () => router.push("/document-check"),
      accentColor: "#6F4E37",
      badgeBg: "#EDE8DE",
    },
    {
      id: "match-payment",
      label: "Match Records",
      description: "3-Way Invoice to PO and Wire check",
      icon: Link2,
      action: () => router.push("/reconciliation"),
      accentColor: "#25663B",
      badgeBg: "#E8F4EC",
    },
    {
      id: "all-invoices",
      label: "All Invoices",
      description: "Filter reconciled and discrepant items",
      icon: FileText,
      action: () => router.push("/invoices"),
      accentColor: "#30231D",
      badgeBg: "#E5E4E2",
    },
    {
      id: "review-flagged",
      label: "Discrepancies",
      description: "Review active exception cases",
      icon: AlertTriangle,
      action: () => router.push("/reconciliation"),
      accentColor: "#946000",
      badgeBg: "#FFF8E6",
    },
    {
      id: "view-activity",
      label: "Activity Log",
      description: "Cryptographic Merkle audit stream",
      icon: Clock,
      action: () => router.push("/activity"),
      accentColor: "#216766",
      badgeBg: "#EAF5F5",
    },
  ];

  const radius = 130;
  const angleStep = (2 * Math.PI) / actions.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setIsOpen(false);
        setSelectedIndex(-1);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + actions.length) % actions.length);
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % actions.length);
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        actions[selectedIndex].action();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, actions]);

  const getPosition = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center select-none">
      {/* Center Button to open wheel */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-2xl bg-[#6F4E37] text-white flex items-center justify-center shadow-xl hover:bg-[#5A3E2A] transition-all z-20 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/30"
        aria-label={isOpen ? "Close quick actions wheel" : "Open quick actions wheel"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Radial Wheel Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className="relative w-[340px] h-[340px] rounded-full border-2 border-dashed border-[#D7D0C9] bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Radial Actions */}
              {actions.map((action, index) => {
                const pos = getPosition(index);
                const isSelected = selectedIndex === index;
                const Icon = action.icon;

                return (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: pos.x, y: pos.y }}
                    exit={{ opacity: 0, x: 0, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    onClick={() => {
                      action.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                    onFocus={() => setSelectedIndex(index)}
                    onBlur={() => setSelectedIndex(-1)}
                    className="absolute w-28 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center cursor-pointer group focus:outline-none"
                    aria-label={action.label}
                  >
                    {/* Action Icon Button */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 ${
                        isSelected
                          ? "scale-115 ring-2 ring-[#6F4E37] shadow-lg"
                          : "group-hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: isSelected ? action.accentColor : action.badgeBg,
                        color: isSelected ? "#FFFFFF" : action.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Action Label with High Contrast */}
                    <span
                      className={`text-xs font-bold mt-1.5 px-2 py-0.5 rounded transition-colors ${
                        isSelected
                          ? "bg-[#30231D] text-white"
                          : "text-[#30231D] bg-white/80 group-hover:text-[#6F4E37]"
                      }`}
                    >
                      {action.label}
                    </span>
                  </motion.button>
                );
              })}

              {/* Center Ring Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#5C4F47] bg-[#EDE8DE] px-2.5 py-1 rounded-full shadow-xs">
                  {selectedIndex >= 0 ? actions[selectedIndex].label : "CHOOSE ACTION"}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Helpful Instructions */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-xs font-mono font-semibold text-[#5C4F47]">
          {isOpen ? "CLICK AN ACTION OR USE ARROWS • ESC TO CLOSE" : "PRESS PLUS BUTTON FOR KINETIC ACTION RADIAL"}
        </p>
      </div>
    </div>
  );
}

export default QuickActions;
