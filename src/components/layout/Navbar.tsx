"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Search,
  Link2,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notification, clearNotification } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const primaryNavLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Invoices", href: "/invoices", icon: FileText },
    { name: "Reconciliation", href: "/reconciliation", icon: Link2 },
    { name: "Document Check", href: "/document-check", icon: Search, highlight: true },
    { name: "Activity", href: "/activity", icon: BarChart3 },
  ];

  const secondaryNavLinks = [
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border border-mocha/20 bg-espresso/95 text-xs shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3">
          <div className="w-2 h-2 rounded-full bg-mocha animate-ping" />
          <span className="text-mocha font-semibold font-mono">AUDIT COMMIT:</span>
          <span className="text-platinum">{notification.message}</span>
          <button
            onClick={clearNotification}
            className="ml-3 text-taupe hover:text-mocha"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/85 backdrop-blur-md border-b border-mocha/10 shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg border border-mocha/20 bg-gradient-to-br from-mocha/10 to-espresso flex items-center justify-center transition-all duration-300 group-hover:border-mocha group-hover:shadow-[0_0_15px_rgba(111,78,55,0.3)]">
              <span className="text-lg font-bold serif-display text-mocha">T</span>
              <div className="absolute inset-0 bg-mocha/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold serif-display text-espresso">
                TESSERACT
              </span>
              <span className="text-[10px] font-mono text-taupe uppercase tracking-wider hidden sm:block">
                Every transaction leaves evidence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-mocha bg-mocha/10 border border-mocha/20"
                      : "text-espresso hover:text-mocha hover:bg-mocha/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-mocha" : "text-taupe"}`} />
                  <span>{link.name}</span>
                  {link.highlight ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-mocha animate-pulse" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Launch Console / CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/reconciliation"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <span>Start Reconciliation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/reconciliation"
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-mocha text-ivory"
            >
              Reconcile
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-taupe hover:text-mocha bg-ivory border border-mocha/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory border-b border-mocha/10 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm ${
                    isActive
                      ? "text-mocha bg-mocha/10 font-medium"
                      : "text-espresso hover:text-mocha"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-taupe" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-mocha/10 mt-2">
              {secondaryNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded text-sm text-espresso hover:text-mocha"
                  >
                    <Icon className="w-4 h-4 text-taupe" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
