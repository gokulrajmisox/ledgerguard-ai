import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ScrollStorySequence } from "@/components/landing/ScrollStorySequence";
import { FinancialInsight } from "@/components/reactbits/FinancialInsight";
import { QuickActions } from "@/components/reactbits/QuickActions";
import { RecentDocuments } from "@/components/reactbits/RecentDocuments";
import { DEMO_INVOICES } from "@/lib/demo-data";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sliders, FileSearch } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F5F1] text-[#30231D] overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Scroll-Driven Product Story */}
      <ScrollStorySequence />

      {/* Financial Insight & 3D Sensory Visualization */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F7F5F1] to-[#EDE8DE] border-t border-[#D7D0C9]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D7D0C9] bg-white text-xs font-mono font-bold text-[#6F4E37] mb-4 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#25663B]" />
              <span>FINANCIAL INTELLIGENCE TELEMETRY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black serif-display text-[#30231D] mb-4">
              See Your Financial Evidence in 3D
            </h2>
            <p className="text-base sm:text-lg text-[#5C4F47] leading-relaxed">
              Interactive WebGL dielectric plasma core visualizing real-time ledger health, capital reconciliation rates, and flagged audit exceptions.
            </p>
          </div>

          {/* Interactive Financial Insight Core */}
          <div className="max-w-4xl mx-auto">
            <FinancialInsight />
          </div>

          <div className="text-center pt-4">
            <Link
              href="/reconciliation"
              className="btn-primary text-sm px-6 py-3.5 shadow-md hover:shadow-lg"
            >
              <span>Explore Reconciliation Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Sensory Suite: Kinetic Actions & Specimen Deck */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#D7D0C9]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#D7D0C9]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6E0F0] text-xs font-mono font-bold text-[#30231D] mb-2">
                <Sliders className="w-3.5 h-3.5 text-[#6F4E37]" />
                <span>INTERACTIVE LAB CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black serif-display text-[#30231D]">
                Kinetic Controls & Specimen Deck
              </h2>
            </div>
            <p className="text-sm text-[#5C4F47] max-w-md mt-4 md:mt-0 leading-relaxed font-medium">
              Explore the tactile micro-interactions powering Tesseract: radial triage wheels and responsive document inspection carousels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* QuickActions Radial Wheel */}
            <div className="lg:col-span-5 rounded-2xl border border-[#D7D0C9] bg-[#F7F5F1] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#30231D] mb-1 font-serif">
                  Kinetic Action Radial
                </h3>
                <p className="text-xs text-[#5C4F47] mb-4">
                  Touch-ready radial action selector with frame-rate independent physics.
                </p>
              </div>
              <div className="h-[360px] flex items-center justify-center">
                <QuickActions />
              </div>
            </div>

            {/* Recent Documents Specimen Deck */}
            <div className="lg:col-span-7 rounded-2xl border border-[#D7D0C9] bg-[#F7F5F1] p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#30231D] font-serif">
                    Live Document Specimen Deck
                  </h3>
                  <Link href="/invoices" className="text-xs font-bold text-[#6F4E37] hover:underline">
                    View All Invoices →
                  </Link>
                </div>
                <p className="text-xs text-[#5C4F47] mb-4">
                  Drag and scrub through active invoices with verified 3-way status badges.
                </p>
              </div>
              <div className="h-[360px] flex items-center">
                <RecentDocuments documents={DEMO_INVOICES} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#D7D0C9] bg-[#EDE8DE] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D7D0C9] bg-white text-xs font-mono font-bold text-[#6F4E37] shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#25663B]" />
            <span>START RECONCILING WITH ASSURANCE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black serif-display text-[#30231D]">
            Every transaction leaves evidence.
          </h2>

          <p className="text-base sm:text-lg text-[#5C4F47] leading-relaxed max-w-xl mx-auto">
            Eliminate hours of manual cross-checking. Ingest invoices, verify discrepancies, and generate audit-proof Merkle chains in minutes.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/reconciliation"
              className="btn-primary text-sm px-8 py-4 shadow-md hover:shadow-lg"
            >
              <span>Start Free Reconciliation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/document-check"
              className="btn-secondary text-sm px-8 py-4"
            >
              <FileSearch className="w-4 h-4 text-[#6F4E37]" />
              <span>Check Any Document</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
