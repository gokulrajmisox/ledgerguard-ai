"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Link2,
  Search,
  BarChart3,
  Layers,
  Settings,
  HelpCircle,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notification, clearNotification } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Reconciliation", href: "/reconciliation", icon: Link2 },
    { name: "Document Check", href: "/document-check", icon: Search, highlight: true },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Connections", href: "/connections", icon: Layers },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ];

  const secondaryNavLinks = [
    { name: "Activity", href: "/activity", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <>
      {/* Toast Notification Banner with High Contrast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-mocha/30 bg-[#30231D] text-xs text-[#F7F5F1] shadow-2xl backdrop-blur-xl"
            role="status"
            aria-live="polite"
          >
            <span className="w-2 h-2 rounded-full bg-[#E6E0F0] animate-ping" />
            <span className="text-[#E6E0F0] font-bold font-mono tracking-wide">
              AUDIT BLOCK:
            </span>
            <span className="text-[#FFFFFF] font-medium">{notification.message}</span>
            <button
              onClick={clearNotification}
              className="ml-3 p-1 rounded-lg text-[#E5E4E2] hover:text-[#FFFFFF] hover:bg-white/10 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F7F5F1]/92 backdrop-blur-md border-b border-[#D7D0C9] shadow-sm py-2.5"
            : "bg-[#F7F5F1]/60 backdrop-blur-sm border-b border-transparent py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-9 h-9 rounded-xl border border-[#5A3E2A] bg-[#6F4E37] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#5A3E2A] group-hover:scale-105">
              <span className="text-lg font-black serif-display text-white">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black serif-display tracking-tight text-[#30231D] group-hover:text-[#6F4E37] transition-colors">
                TESSERACT
              </span>
              <span className="text-[10px] font-mono font-medium text-[#5C4F47] uppercase tracking-wider hidden sm:block">
                Every transaction leaves evidence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}`));
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                    isActive
                      ? "text-[#6F4E37] bg-[#6F4E37]/10 border border-[#6F4E37]/25 shadow-xs"
                      : "text-[#30231D] hover:text-[#6F4E37] hover:bg-[#6F4E37]/5 border border-transparent"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#6F4E37]" : "text-[#5C4F47]"}`} />
                  <span>{link.name}</span>
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37] animate-pulse" />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#6F4E37] rounded-full"
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Launch Console / CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/reconciliation"
              className="btn-primary"
            >
              <span>Reconcile Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/reconciliation"
              className="btn-primary py-1.5 px-3 text-xs"
            >
              Reconcile
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#30231D] hover:text-[#6F4E37] bg-white border border-[#D7D0C9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with High Contrast and Animations */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-[#F7F5F1] border-b border-[#D7D0C9] px-4 pt-3 pb-6 space-y-2 shadow-xl overflow-hidden"
            >
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "text-[#6F4E37] bg-[#6F4E37]/12 border border-[#6F4E37]/25"
                        : "text-[#30231D] hover:text-[#6F4E37] hover:bg-[#6F4E37]/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#6F4E37]" : "text-[#5C4F47]"}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.highlight && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#6F4E37] text-white">
                        Live
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-[#D7D0C9] mt-2 space-y-1">
                {secondaryNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[#5C4F47] hover:text-[#30231D] hover:bg-[#E5E4E2]/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[#5C4F47]" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
