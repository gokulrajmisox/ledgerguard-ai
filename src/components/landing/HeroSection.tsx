"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldAlert, Cpu, Sparkles, Terminal, FileSearch } from "lucide-react";
import { HeroEvidenceNetworkClient } from "@/components/three/HeroEvidenceNetworkClient";
import type { Variants } from "framer-motion";

export function HeroSection() {
  const [activePreviewNode, setActivePreviewNode] = useState<any>(null);

  // Staggered words animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D Scene in Background and Surrounding */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <HeroEvidenceNetworkClient onSelectNode={setActivePreviewNode} />
      </div>

      {/* Subtle radial ambient gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00ff87]/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#ff3355]/[0.03] blur-3xl pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pointer-events-none">
        <div className="max-w-3xl">
          {/* Top Brand Micro Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md mb-6 pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              TESSERACT • AUTONOMOUS FORENSIC INTELLIGENCE
            </span>
          </motion.div>

          {/* Staggered Cinematic Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] mb-6 pointer-events-auto selection:bg-[#00ff87] selection:text-black"
          >
            <div className="overflow-hidden">
              <motion.span variants={wordVariants} className="inline-block text-white">
                Money
              </motion.span>{" "}
              <motion.span
                variants={wordVariants}
                className="inline-block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
              >
                moves.
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span variants={wordVariants} className="inline-block text-zinc-400">
                We
              </motion.span>{" "}
              <motion.span
                variants={wordVariants}
                className="inline-block text-[#00ff87] drop-shadow-[0_0_35px_rgba(0,255,135,0.4)]"
              >
                investigate.
              </motion.span>
            </div>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mb-8 pointer-events-auto"
          >
            An autonomous finance intelligence platform that reconciles transactions, investigates
            suspicious invoices, and turns financial discrepancies into evidence-backed decisions.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <Link
              href="/console"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-[#15ff96] transition-all duration-200 shadow-[0_0_30px_rgba(0,255,135,0.35)] hover:shadow-[0_0_45px_rgba(0,255,135,0.55)] active:scale-[0.98]"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Investigation Console</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/forensics"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-md"
            >
              <FileSearch className="w-4 h-4 text-[#00ff87]" />
              <span>AI Image Forensics Lab</span>
            </Link>

            <a
              href="#story"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-mono uppercase text-zinc-400 hover:text-white transition-colors"
            >
              <span>Explore Intelligence System</span>
              <span className="text-[#00ff87]">↓</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Telemetry Ticker */}
      <div className="absolute bottom-4 left-4 right-4 max-w-7xl mx-auto z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500 pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
            DETERMINISTIC 3-WAY RECONCILIATION
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-400">COMPUTER VISION RASTER ELA</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-zinc-400">
          <span>DRAG 3D TO ROTATE • HOVER NODES FOR EVIDENCE</span>
        </div>
      </div>
    </section>
  );
}
