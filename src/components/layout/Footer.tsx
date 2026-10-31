"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso text-platinum py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-mocha bg-mocha flex items-center justify-center">
                <span className="text-lg font-bold serif-display text-espresso">T</span>
              </div>
              <div>
                <div className="text-lg font-bold serif-display text-ivory">TESSERACT</div>
                <div className="text-xs text-platinum/70 uppercase tracking-wider">
                  Financial Intelligence
                </div>
              </div>
            </div>
            <p className="text-sm text-platinum/70">
              Every transaction leaves evidence. Tesseract helps you find it.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-ivory mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/invoices"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Invoices
                </Link>
              </li>
              <li>
                <Link
                  href="/reconciliation"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Reconciliation
                </Link>
              </li>
              <li>
                <Link
                  href="/document-check"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Document Check
                </Link>
              </li>
              <li>
                <Link
                  href="/connections"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  href="/activity"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Activity
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-ivory mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/reports"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.tesseract.finance"
                  target="_blank"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-sm font-semibold text-ivory mb-4 uppercase tracking-wider">
              Legal & Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@tesseract.finance"
                  className="text-sm text-platinum/70 hover:text-ivory transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@tesseract.finance</span>
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/tesseract-finance"
                target="_blank"
                className="text-platinum/70 hover:text-ivory transition-colors flex items-center gap-1"
                aria-label="GitHub"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">GitHub</span>
              </a>
              <a
                href="https://twitter.com/tesseract_finance"
                target="_blank"
                className="text-platinum/70 hover:text-ivory transition-colors flex items-center gap-1"
                aria-label="Twitter"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-mocha/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-mocha" />
            <span className="text-xs text-platinum/70">
              Cryptographic Audit Trail | Immutable Evidence
            </span>
          </div>
          <div className="text-xs text-platinum/70">
            © 2024 Tesseract. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
