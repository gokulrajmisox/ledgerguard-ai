"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Link2, Search, AlertTriangle, Clock, X } from "lucide-react";

type Action = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  bgColor: string;
};

export function QuickActions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wheelRef = useRef<HTMLDivElement>(null);

  const actions: Action[] = [
    {
      id: "check-invoice",
      label: "Check Invoice",
      icon: <FileText className="w-5 h-5" />,
      action: () => router.push("/document-check"),
      color: "#6F4E37",
      bgColor: "#6F4E37/10",
    },
    {
      id: "match-payment",
      label: "Match Payment",
      icon: <Link2 className="w-5 h-5" />,
      action: () => router.push("/reconciliation?step=match"),
      color: "#4A7C59",
      bgColor: "#4A7C59/10",
    },
    {
      id: "find-duplicates",
      label: "Find Duplicates",
      icon: <Search className="w-5 h-5" />,
      action: () => router.push("/invoices?filter=duplicate"),
      color: "#D4A017",
      bgColor: "#D4A017/10",
    },
    {
      id: "review-flagged",
      label: "Review Flagged",
      icon: <AlertTriangle className="w-5 h-5" />,
      action: () => router.push("/reconciliation?step=review"),
      color: "#C85A5A",
      bgColor: "#C85A5A/10",
    },
    {
      id: "view-activity",
      label: "View Activity",
      icon: <Clock className="w-5 h-5" />,
      action: () => router.push("/activity"),
      color: "#4A8782",
      bgColor: "#4A8782/10",
    },
  ];

  const radius = 120;
  const angleStep = (2 * Math.PI) / actions.length;

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
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex]);

  // Calculate positions for each action
  const getPosition = (index: number) => {
    const angle = index * angleStep;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center Button to open wheel */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-mocha text-ivory flex items-center justify-center shadow-lg hover:bg-mocha/90 transition-all duration-200 z-10"
        aria-label="Open quick actions"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Accessible List (for keyboard and screen readers) */}
      <div className="sr-only">
        <ul role="menu" aria-label="Quick Actions">
          {actions.map((action, index) => (
            <li key={action.id} role="menuitem">
              <button onClick={action.action}>{action.label}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Radial Wheel Menu */}
      {isOpen && (
        <div
          ref={wheelRef}
          className="absolute inset-0 flex items-center justify-center z-20"
          onClick={() => {
            setIsOpen(false);
            setSelectedIndex(-1);
          }}
        >
          <div
            className="relative w-[300px] h-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Wheel Background */}
            <div className="absolute inset-0 rounded-full border-2 border-mocha/20" />
            
            {/* Action Items */}
            {actions.map((action, index) => {
              const pos = getPosition(index);
              const isSelected = selectedIndex === index;
              
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                    setSelectedIndex(-1);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseLeave={() => setSelectedIndex(-1)}
                  onFocus={() => setSelectedIndex(index)}
                  onBlur={() => setSelectedIndex(-1)}
                  className={`absolute flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? "transform scale-110" 
                      : ""
                  }`}
                  style={{
                    left: `calc(50% + ${pos.x}px - 30px)`,
                    top: `calc(50% + ${pos.y}px - 30px)`,
                  } as React.CSSProperties}
                  aria-label={action.label}
                >
                  {/* Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isSelected 
                        ? `bg-[${action.bgColor}] border-2 border-[${action.color}]`
                        : `bg-ivory border border-mocha/20 hover:bg-mocha/5`
                    }`}
                    style={{
                      backgroundColor: isSelected ? action.bgColor : "#F7F5F1",
                      borderColor: isSelected ? action.color : "#6F4E37/20",
                    }}
                  >
                    {React.cloneElement(action.icon as React.ReactElement, {
                      className: `w-5 h-5 ${isSelected ? "text-[" + action.color + "]" : "text-mocha"}`
                    } as any)}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium ${isSelected ? "text-[" + action.color + "]" : "text-taupe"}`}>
                    {action.label}
                  </span>
                </button>
              );
            })}

            {/* Center Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-medium text-mocha bg-ivory px-3 py-1 rounded-full">
                Quick Actions
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Close Button when wheel is open */}
      {isOpen && (
        <button
          onClick={() => {
            setIsOpen(false);
            setSelectedIndex(-1);
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ivory border border-mocha/20 flex items-center justify-center text-mocha hover:bg-mocha/5 transition-colors z-30"
          aria-label="Close quick actions"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-taupe/70">
          {isOpen ? "Select an action or press ESC" : "Click to open quick actions"}
        </p>
      </div>
    </div>
  );
}

export default QuickActions;
