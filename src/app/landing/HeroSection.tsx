"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-platinum/50 to-lavender/30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-mocha/10 to-mocha/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-mocha/10 to-mocha/20 rounded-full blur-3xl opacity-50" />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mocha/20 bg-mocha/5">
          <Sparkles className="w-4 h-4 text-mocha" />
          <span className="text-sm font-mono text-mocha uppercase tracking-wider">
            NEXT-GENERATION FINANCIAL INTELLIGENCE
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black serif-display text-espresso leading-tight">
          Every transaction leaves evidence.
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-taupe max-w-2xl mx-auto">
          Tesseract reconciles your transactions, verifies documents, and turns 
          financial data into evidence-backed decisions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/reconciliation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-ivory bg-mocha hover:bg-mocha/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <span>Start Reconciliation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/document-check"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold text-espresso bg-platinum/80 hover:bg-platinum border border-mocha/20 transition-all"
          >
            <span>Check a Document</span>
          </Link>
        </div>

        {/* Features Preview */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-taupe">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mocha" />
            <span>Upload & Extract</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mocha" />
            <span>Match Records</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mocha" />
            <span>Verify & Reconcile</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mocha" />
            <span>Audit Trail</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
