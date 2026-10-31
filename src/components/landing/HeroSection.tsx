"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, FileSearch } from "lucide-react";
import { staggerContainer as containerVariants, editorialWord, fadeInUp } from "@/lib/motion";

const ChromeSculpture = dynamic(
  () => import("@/components/three/ChromeSculpture").then((mod) => mod.ChromeSculpture),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#6F4E37]/30 animate-spin" />
      </div>
    ),
  }
);

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F7F5F1]">
      {/* Subtle Background Radial Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#E6E0F0]/40 via-[#E5E4E2]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-[#6F4E37]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline & Copy */}
        <div className="lg:col-span-7 space-y-8">
          {/* Top Micro Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D7D0C9] bg-white shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#6F4E37] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5C4F47]">
              TESSERACT • AUTONOMOUS FINANCE INTELLIGENCE
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 },
              },
            }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black serif-display text-[#30231D] tracking-tight leading-[0.96]"
          >
            <div className="overflow-hidden">
              <motion.span variants={editorialWord} className="inline-block">
                Money
              </motion.span>{" "}
              <motion.span
                variants={editorialWord}
                className="inline-block text-[#6F4E37] italic font-normal"
              >
                moves.
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span variants={editorialWord} className="inline-block">
                We
              </motion.span>{" "}
              <motion.span
                variants={editorialWord}
                className="inline-block underline decoration-[#E6E0F0] decoration-wavy decoration-2 underline-offset-8"
              >
                investigate.
              </motion.span>
            </div>
          </motion.h1>

          {/* High-Contrast Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg sm:text-xl text-[#5C4F47] font-normal leading-relaxed max-w-2xl font-sans"
          >
            An autonomous financial operations and invoice forensics engine that reconciles transactions,
            investigates suspicious discrepancies, and turns ambiguity into evidence-backed decisions.
          </motion.p>

          {/* Call to Actions with High Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="/reconciliation"
              className="btn-primary text-sm px-6 py-3.5 shadow-md hover:shadow-lg"
            >
              <span>Launch Reconciliation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/document-check"
              className="btn-secondary text-sm px-6 py-3.5"
            >
              <FileSearch className="w-4 h-4 text-[#6F4E37]" />
              <span>Verify Document</span>
            </Link>

            <Link
              href="/invoices"
              className="btn-outline text-sm px-6 py-3.5"
            >
              <span>Inspect Directory</span>
            </Link>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-6 border-t border-[#D7D0C9] grid grid-cols-3 gap-4 text-xs font-mono text-[#5C4F47]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#25663B]" />
              <span className="font-semibold">3-Way Reconciliation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#25663B]" />
              <span className="font-semibold">Raster ELA Forensics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#25663B]" />
              <span className="font-semibold">Merkle Audit Chains</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sculptural Chrome 3D Centerpiece */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full max-w-lg aspect-square relative rounded-3xl bg-gradient-to-b from-white/80 to-white/30 border border-[#D7D0C9] p-2 shadow-xl backdrop-blur-md">
            <ChromeSculpture />

            {/* Subtle Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl border border-[#D7D0C9] p-3 text-xs flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#25663B] animate-ping" />
                <span className="font-bold text-[#30231D]">TESSERACT KERNEL</span>
              </div>
              <span className="font-mono text-[#5C4F47] text-[11px]">
                INTERACTIVE 3D GYRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
