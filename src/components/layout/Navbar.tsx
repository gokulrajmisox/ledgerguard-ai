"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Cpu,
  Layers,
  SearchCode,
  FileCheck2,
  BarChart3,
  Terminal,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { metrics, notification, clearNotification } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Platform", href: "/console", icon: Terminal },
    { name: "Forensics Lab", href: "/forensics", icon: SearchCode, highlight: true },
    { name: "Interactive Lab", href: "/interactive-lab", icon: Sparkles },
    { name: "Investigations", href: "/investigations", icon: ShieldCheck, badge: metrics.exceptionCount },
    { name: "Evidence Graph", href: "/evidence", icon: Layers },
    { name: "Mission Control", href: "/mission-control", icon: Cpu },
    { name: "Benchmarks", href: "/benchmarks", icon: BarChart3 },
  ];

  return (
    <>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#00ff87]/30 bg-[#0e0e14]/95 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3">
          <div className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
          <span className="text-[#00ff87] font-mono font-semibold">AUDIT COMMIT:</span>
          <span className="text-zinc-200">{notification.message}</span>
          <button
            onClick={clearNotification}
            className="ml-3 text-zinc-400 hover:text-white"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#070709]/85 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/50"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded border border-white/20 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center transition-all duration-300 group-hover:border-[#00ff87] group-hover:shadow-[0_0_15px_rgba(0,255,135,0.3)]">
              <span className="text-xs font-mono font-bold tracking-tighter text-[#00ff87]">LG</span>
              <div className="absolute inset-0 bg-[#00ff87]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-widest text-white uppercase">
                  LEDGERGUARD
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-[#00ff87] border border-[#00ff87]/20">
                  AI
                </span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                Tesseract Forensic Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.08] border border-white/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#00ff87]" : "text-zinc-500"}`} />
                  <span>{link.name}</span>
                  {link.badge ? (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded-full bg-[#ff3355]/20 text-[#ff3355] border border-[#ff3355]/30">
                      {link.badge}
                    </span>
                  ) : null}
                  {link.highlight ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Launch Console */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
              <span>KERNEL: ACTIVE</span>
            </div>

            <Link
              href="/console"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-[#10ff94] transition-all duration-200 shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] active:scale-[0.98]"
            >
              <span>Launch Console</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/console"
              className="px-3 py-1.5 rounded text-xs font-semibold bg-[#00ff87] text-black"
            >
              Console
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0e] border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm ${
                    isActive
                      ? "text-[#00ff87] bg-white/[0.05] font-medium"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-zinc-400" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge ? (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-[#ff3355]/20 text-[#ff3355]">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
