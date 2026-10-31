"use client";

import React from "react";
import { FileText, Link2, Search, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ScrollStorySequence() {
  const stories = [
    {
      id: "upload",
      title: "Upload Your Documents",
      description: "Drag and drop invoices, purchase orders, receipts, and bank statements. Tesseract automatically extracts all the key information.",
      icon: <FileText className="w-8 h-8" />,
      color: "#6F4E37",
      bgColor: "rgba(111, 78, 55, 0.1)",
    },
    {
      id: "match",
      title: "Intelligent Matching",
      description: "Tesseract automatically matches invoices to purchase orders and bank transactions, identifying discrepancies that need your attention.",
      icon: <Link2 className="w-8 h-8" />,
      color: "#4A7C59",
      bgColor: "rgba(74, 124, 89, 0.1)",
    },
    {
      id: "verify",
      title: "Document Verification",
      description: "Our forensic analysis checks for visual manipulation, OCR inconsistencies, and metadata anomalies, with plain-language explanations.",
      icon: <Search className="w-8 h-8" />,
      color: "#4A8782",
      bgColor: "rgba(74, 135, 130, 0.1)",
    },
    {
      id: "reconcile",
      title: "Reconcile with Confidence",
      description: "Review matches, resolve discrepancies, and approve transactions. Every action is recorded in the immutable cryptographic audit trail.",
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: "#D4A017",
      bgColor: "rgba(212, 160, 23, 0.1)",
    },
    {
      id: "audit",
      title: "Immutable Audit Trail",
      description: "Every action is cryptographically linked to the previous one, creating an unbreakable chain of evidence for compliance and security.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "#6F4E37",
      bgColor: "rgba(111, 78, 55, 0.1)",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold serif-display text-espresso mb-4">
            How Tesseract Works
          </h2>
          <p className="text-lg text-taupe">
            A complete workflow from document upload to final reconciliation
          </p>
        </div>

        <div className="space-y-6">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-mocha/10 hover:border-mocha transition-all"
              style={{
                background: `linear-gradient(135deg, ${story.bgColor} 0%, transparent 100%)`,
              } as React.CSSProperties}
            >
              {/* Step Number */}
              <div className="w-10 h-10 rounded-full bg-mocha text-ivory flex items-center justify-center font-bold text-lg flex-shrink-0">
                {index + 1}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: story.bgColor,
                  color: story.color,
                }}
              >
                {React.cloneElement(story.icon as React.ReactElement, {
                  className: "w-8 h-8",
                } as React.HTMLAttributes<SVGElement>)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-espresso mb-2">
                  {story.title}
                </h3>
                <p className="text-taupe">
                  {story.description}
                </p>
              </div>

              {/* Arrow (except last item) */}
              {index < stories.length - 1 && (
                <div className="hidden md:block">
                  <ArrowRight className="w-6 h-6 text-mocha/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary CTA */}
        <div className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-r from-mocha/5 via-lavender/5 to-mocha/5 border border-mocha/10">
          <h3 className="text-2xl font-bold serif-display text-espresso mb-4">
            Ready to Transform Your Financial Workflow?
          </h3>
          <p className="text-lg text-taupe max-w-2xl mx-auto mb-6">
            Tesseract makes reconciliation simple, verification reliable, and audit trails immutable.
          </p>
          <Link
            href="/reconciliation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-colors shadow-md hover:shadow-lg"
          >
            <span>Start Using Tesseract</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ScrollStorySequence;
