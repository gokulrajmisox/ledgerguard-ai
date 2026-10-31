import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ScrollStorySequence } from "@/components/landing/ScrollStorySequence";
import { FinancialInsight } from "@/components/reactbits/FinancialInsight";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory text-espresso overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Scroll-Driven Product Story */}
      <ScrollStorySequence />

      {/* Financial Insight Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ivory to-platinum/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mocha/20 bg-mocha/5 text-sm font-mono text-mocha mb-4">
              <CheckCircle2 className="w-4 h-4" />
              <span>FINANCIAL INTELLIGENCE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold serif-display text-espresso mb-4">
              See Your Financial Data in a New Light
            </h2>
            <p className="text-lg text-taupe max-w-2xl mx-auto">
              Interactive 3D visualization of your reconciliation status. Click, explore, and discover insights.
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-2xl h-96">
              <FinancialInsight />
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/reconciliation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-all shadow-md hover:shadow-lg"
            >
              <span>Explore Financial Insight</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-mocha/10 bg-ivory text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mocha/5 via-transparent to-mocha/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mocha/20 bg-mocha/5 text-sm font-mono text-mocha">
            <CheckCircle2 className="w-4 h-4" />
            <span>READY TO BEGIN</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold serif-display text-espresso">
            Every transaction leaves evidence.
          </h2>

          <p className="text-lg text-taupe font-normal leading-relaxed max-w-xl mx-auto">
            Start reconciling your transactions today. Upload documents, match records, and resolve discrepancies with confidence.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reconciliation"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-semibold text-ivory bg-mocha hover:bg-mocha/90 transition-all shadow-md hover:shadow-lg"
            >
              <span>Start Reconciliation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/document-check"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-semibold text-espresso bg-platinum/80 hover:bg-platinum border border-mocha/20 transition-all"
            >
              <span>Check a Document</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
