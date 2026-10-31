"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { HelpCircle, BookOpen, MessageSquare, Search, FileText, Link2, Eye, CheckCircle2, ChevronDown, ShieldCheck, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<"getting-started" | "workflows" | "faq" | "contact">("getting-started");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("faq1");

  const gettingStartedSteps = [
    {
      id: "step1",
      title: "1. Ingest Invoices & Documentation",
      description: "Upload digital PDFs, scanned receipts, or wire statements. Tesseract's neural optical character recognition extracts line-item totals, tax registrations, and bank routing numbers.",
      icon: <FileText className="w-5 h-5 text-white" />,
    },
    {
      id: "step2",
      title: "2. Automated 3-Way Cross-Check",
      description: "Tesseract cross-references each invoice against corresponding enterprise Purchase Orders and cleared Treasury settlements with zero-tolerance math validation.",
      icon: <Link2 className="w-5 h-5 text-white" />,
    },
    {
      id: "step3",
      title: "3. Forensic PDF Discrepancy Detection",
      description: "Error Level Analysis (ELA) and typography verification detect font substitution, altered wire instructions, and spliced amounts before payment release.",
      icon: <Eye className="w-5 h-5 text-white" />,
    },
    {
      id: "step4",
      title: "4. Immutable Cryptographic Signing",
      description: "Every audit decision, variance sign-off, or payment approval is permanently linked in a SHA-256 Merkle chain for verifiable SOX and statutory compliance.",
      icon: <CheckCircle2 className="w-5 h-5 text-white" />,
    },
  ];

  const workflows = [
    {
      id: "reconciliation",
      title: "Deterministic 3-Way Reconciliation",
      steps: [
        "Upload invoices, purchase orders, and bank settlement statements in bulk.",
        "System extracts vendor names, PO reference keys, and line-item unit rates.",
        "Tri-party matching algorithm flags any deviation above 0.00% tolerance.",
        "Human auditors inspect line-item breakdowns with single-click resolution.",
        "Actions are cryptographically sealed in the immutable activity log.",
      ],
    },
    {
      id: "document-check",
      title: "Document Forensics & Font Analysis",
      steps: [
        "Select suspect PDF document for deep structural inspection.",
        "Engine computes Error Level Analysis (ELA) heatmap to highlight modified regions.",
        "OCR matrix detects font raster mismatches, altered invoice numbers, and rate deltas.",
        "Plain-language intelligence report summarizes risk level and evidence rationale.",
        "Auditors can hold payment, escalate to fraud team, or verify as authentic.",
      ],
    },
    {
      id: "connections",
      title: "Entity & Settlement Relationship Mapping",
      steps: [
        "Explore relationships between invoices, authorized POs, and cleared wires.",
        "Switch between tabular listing and 3D evidence network topology.",
        "Identify circular vendor relationships or duplicate billing attempts.",
        "Export audit dossiers for internal treasury sign-offs.",
      ],
    },
  ];

  const faqs = [
    {
      id: "faq1",
      question: "What file formats and billing standards does Tesseract support?",
      answer: "Tesseract accepts PDF invoices, TIFF/PNG high-resolution scans, XML electronic invoices (UBL 2.1, Factur-X, ZUGFeRD), CSV/EDI purchase orders, and MT940 / CAMT.053 bank settlement statements.",
    },
    {
      id: "faq2",
      question: "How does Tesseract detect invoice manipulation and font fraud?",
      answer: "Tesseract combines Error Level Analysis (ELA) with neural typography forensics. It examines compression artifacts across PDF layers to detect modified text boxes, font glyph weight inconsistencies, and spliced routing numbers.",
    },
    {
      id: "faq3",
      question: "What is the cryptographic audit trail and how is it verified?",
      answer: "Every action taken—from automated matching to auditor approvals—generates a SHA-256 block hash incorporating the previous action's hash. This Merkle chain is cryptographically immutable, guaranteeing tamper-proof records for SOX 404 audit compliance.",
    },
    {
      id: "faq4",
      question: "Can Tesseract integrate directly with our existing ERP?",
      answer: "Yes. Tesseract provides REST and webhook integrations for SAP S/4HANA, Oracle NetSuite, Workday Financial Management, and Microsoft Dynamics 365, allowing bidirectional synchronization without displacing existing workflows.",
    },
    {
      id: "faq5",
      question: "How are currency conversions and exchange rate fluctuations handled?",
      answer: "Tesseract pulls authoritative daily central bank fixing rates (ECB, Federal Reserve, Bank of England). Any variance between the PO authorization date rate and the invoice presentation date rate is categorized as FX delta rather than pricing error.",
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-espresso">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7D0C9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6F4E37]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-bold">
                  KNOWLEDGE BASE & GUIDELINES
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso tracking-tight">
                Help & Forensic Guidance
              </h1>
              <p className="text-sm text-[#5C4F47] mt-1">
                Operational guides, forensic analysis workflows, and enterprise compliance protocols
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white border border-[#D7D0C9] shadow-sm">
            {[
              { id: "getting-started", label: "Getting Started", icon: BookOpen },
              { id: "workflows", label: "Core Workflows", icon: Link2 },
              { id: "faq", label: "Frequently Asked Questions", icon: HelpCircle },
              { id: "contact", label: "Enterprise Support", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#6F4E37] text-white shadow-sm"
                      : "text-[#30231D] hover:bg-[#F7F5F1] hover:text-[#6F4E37]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Pane */}
          <motion.div
            key={activeSection}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Getting Started Section */}
            {activeSection === "getting-started" && (
              <div className="space-y-6">
                <div className="card-luxury p-6 sm:p-8">
                  <div className="max-w-2xl mb-6">
                    <h2 className="text-2xl font-bold serif-display text-espresso">
                      Platform Architecture & Quick Start
                    </h2>
                    <p className="text-sm text-[#5C4F47] mt-1">
                      Tesseract combines deterministic financial reconciliation with deep neural document forensics. Follow these four foundational steps:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {gettingStartedSteps.map((step) => (
                      <div
                        key={step.id}
                        className="p-5 rounded-xl border border-[#D7D0C9] bg-[#F7F5F1] hover:border-[#6F4E37] transition-all hover:shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#6F4E37] flex items-center justify-center flex-shrink-0 shadow-sm">
                            {step.icon}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-espresso mb-1">{step.title}</h3>
                            <p className="text-xs text-[#5C4F47] leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#E6E0F0]/40 border border-[#6F4E37]/20 card-luxury">
                  <h3 className="text-base font-bold text-espresso mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#6F4E37]" />
                    <span>Auditor Best Practices</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C4F47]">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6F4E37] mt-1.5 shrink-0" />
                      <span>Always cross-check bank routing numbers against the Master Vendor Register before releasing wires exceeding \$50,000.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6F4E37] mt-1.5 shrink-0" />
                      <span>Use Error Level Analysis (ELA) whenever line-item fonts show slight antialiasing differences or bounding box misalignment.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6F4E37] mt-1.5 shrink-0" />
                      <span>Audit comments are permanently cryptographically sealed; provide unambiguous justifications when overriding warnings.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6F4E37] mt-1.5 shrink-0" />
                      <span>Export periodic Merkle log dossiers for statutory SOX 404 audit archives from the Data & Governance tab.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workflows Section */}
            {activeSection === "workflows" && (
              <div className="space-y-6">
                {workflows.map((wf) => (
                  <div key={wf.id} className="card-luxury p-6 sm:p-8">
                    <h3 className="text-xl font-bold serif-display text-espresso mb-2">{wf.title}</h3>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#6F4E37] mb-5">
                      Execution Protocol & Verification Sequence
                    </p>
                    <div className="space-y-3">
                      {wf.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                          <span className="w-6 h-6 rounded-full bg-[#6F4E37] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-espresso font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAQ Section */}
            {activeSection === "faq" && (
              <div className="card-luxury p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold serif-display text-espresso">Frequently Asked Questions</h2>
                  <p className="text-xs text-[#5C4F47] mt-1">
                    Guidance for accounting leads, forensic analysts, and compliance officers
                  </p>
                </div>

                {/* Search Box */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4F47]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search questions or keywords..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D7D0C9] focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15 rounded-xl text-sm text-espresso placeholder-[#7E7067] shadow-sm"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => {
                      const isExpanded = expandedFaq === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="rounded-xl border border-[#D7D0C9] overflow-hidden bg-white shadow-sm transition-all"
                        >
                          <button
                            onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F7F5F1] transition-colors"
                          >
                            <span className="font-bold text-sm text-espresso pr-4">{faq.question}</span>
                            <ChevronDown className={`w-4 h-4 text-[#6F4E37] shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-4 pb-4 pt-1 border-t border-[#D7D0C9]/50 bg-[#F7F5F1]/50 text-xs sm:text-sm text-[#5C4F47] leading-relaxed"
                              >
                                {faq.answer}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10">
                      <HelpCircle className="w-10 h-10 mx-auto text-[#6F4E37]/40 mb-2" />
                      <p className="text-sm font-bold text-espresso">No questions found</p>
                      <p className="text-xs text-[#5C4F47]">Try searching with alternative keywords</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Support Section */}
            {activeSection === "contact" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-luxury p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#6F4E37]/10 flex items-center justify-center mx-auto text-[#6F4E37]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-espresso">Forensics Advisory Desk</h3>
                    <p className="text-xs text-[#5C4F47] mt-1">Direct priority channel for urgent fraud or mismatch review</p>
                  </div>
                  <a
                    href="mailto:forensics@tesseract.finance"
                    className="btn-primary w-full py-2 px-3 text-xs font-bold inline-flex items-center justify-center gap-1.5"
                  >
                    <span>forensics@tesseract.finance</span>
                  </a>
                </div>

                <div className="card-luxury p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#6F4E37]/10 flex items-center justify-center mx-auto text-[#6F4E37]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-espresso">API & Developer Docs</h3>
                    <p className="text-xs text-[#5C4F47] mt-1">Complete specs for ERP hooks, webhooks, and cryptographic proofs</p>
                  </div>
                  <a
                    href="https://docs.tesseract.finance"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline w-full py-2 px-3 text-xs font-bold inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Read Documentation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="card-luxury p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#6F4E37]/10 flex items-center justify-center mx-auto text-[#6F4E37]">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-espresso">Live Security Response</h3>
                    <p className="text-xs text-[#5C4F47] mt-1">24/7 incident response for anomalous unauthorized wire holds</p>
                  </div>
                  <button
                    onClick={() => alert("Connecting to 24/7 Treasury Security Incident Hotline...")}
                    className="btn-primary w-full py-2 px-3 text-xs font-bold inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Initiate Incident Hold</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
