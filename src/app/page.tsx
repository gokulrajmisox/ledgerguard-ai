import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { MetricsTicker } from "@/components/landing/MetricsTicker";
import { ScrollStorySequence } from "@/components/landing/ScrollStorySequence";
import { ForensicsTeaser } from "@/components/landing/ForensicsTeaser";
import { ReactBitsShowcase } from "@/components/landing/ReactBitsShowcase";
import Link from "next/link";
import { Terminal, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7] overflow-x-hidden selection:bg-[#00ff87] selection:text-black">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero with Interactive 3D Evidence Network */}
      <HeroSection />

      {/* Operational Metrics Ticker */}
      <MetricsTicker />

      {/* 5-Scene Scroll-Driven Product Story */}
      <ScrollStorySequence />

      {/* AI Image Forensics Lab Teaser */}
      <ForensicsTeaser />

      {/* React Bits Sensory Forensics Showcase: FlexCarousel, OptionWheel, CrystalizedBall, ScrollExpand */}
      <ReactBitsShowcase />

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-gradient-to-b from-[#070709] to-[#040406] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00ff87]/[0.04] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/60 text-[11px] font-mono text-[#00ff87]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE FORENSIC INTEGRITY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Every Transaction Leaves Evidence.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl mx-auto">
            Experience the autonomous financial command center. Reconcile millions in spend,
            isolate manipulated line items, and maintain an immutable cryptographic audit trail.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/console"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-[#15ff96] transition-all shadow-[0_0_30px_rgba(0,255,135,0.4)]"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Command Center</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/benchmarks"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all"
            >
              <span>View Accuracy Benchmarks</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
