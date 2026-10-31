"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { HelpCircle, BookOpen, MessageSquare, Search, ArrowLeft, FileText, Link2, Eye, CheckCircle2 } from "lucide-react";

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<"getting-started" | "workflows" | "faq" | "contact">("getting-started");
  const [searchTerm, setSearchTerm] = useState("");

  const gettingStartedSteps = [
    {
      id: "step1",
      title: "Upload Your First Document",
      description: "Start by uploading an invoice, purchase order, or bank statement. Tesseract will automatically extract the key information.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "step2",
      title: "Review Extracted Data",
      description: "Check the extracted information for accuracy. You can edit any field if the automatic extraction missed something.",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      id: "step3",
      title: "Match Records",
      description: "Tesseract will automatically match invoices to purchase orders and bank transactions. Review the matches and fix any discrepancies.",
      icon: <Link2 className="w-6 h-6" />,
    },
    {
      id: "step4",
      title: "Resolve Issues",
      description: "For any discrepancies, Tesseract will explain the issue in plain language. You can approve, reject, or request clarification.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
  ];

  const workflows = [
    {
      id: "reconciliation",
      title: "Reconciliation Workflow",
      steps: [
        "Upload invoices, POs, and bank statements",
        "Tesseract extracts and matches records automatically",
        "Review matches and fix discrepancies",
        "Approve or reject based on your review",
        "All actions are recorded in the audit trail",
      ],
    },
    {
      id: "document-check",
      title: "Document Check Workflow",
      steps: [
        "Upload a document for verification",
        "Tesseract performs forensic analysis",
        "Review extracted information and findings",
        "Compare against authorized records",
        "Get plain-language explanations of any issues",
      ],
    },
    {
      id: "connections",
      title: "Connections Workflow",
      steps: [
        "View all document relationships",
        "See how invoices link to POs and payments",
        "Understand the connection reasons",
        "Switch between list and graph views",
        "Click on any connection to see details",
      ],
    },
  ];

  const faqs = [
    {
      id: "faq1",
      question: "What types of documents can I upload?",
      answer: "You can upload PDF invoices, purchase orders, receipts, and bank statements. Tesseract supports most common document formats.",
    },
    {
      id: "faq2",
      question: "How accurate is the data extraction?",
      answer: "Tesseract uses advanced OCR and AI to extract data with over 95% accuracy. You can always review and edit the extracted information.",
    },
    {
      id: "faq3",
      question: "Is my data secure?",
      answer: "Yes. All your data is encrypted and stored securely. Tesseract maintains an immutable audit trail of all actions for compliance.",
    },
    {
      id: "faq4",
      question: "Can I export my data?",
      answer: "Yes. You can export your invoices, reports, and audit logs in CSV, PDF, or Excel format from the Settings page.",
    },
    {
      id: "faq5",
      question: "What is the cryptographic audit trail?",
      answer: "Every action you take in Tesseract is cryptographically linked to the previous action, creating an immutable chain of evidence. This ensures that no one can tamper with your financial records.",
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-mocha/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-mocha" />
                <span className="text-xs font-mono uppercase tracking-widest text-mocha">
                  SUPPORT CENTER
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Help & Support
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-platinum border border-mocha/10">
            <button
              onClick={() => setActiveSection("getting-started")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeSection === "getting-started"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Getting Started</span>
            </button>
            <button
              onClick={() => setActiveSection("workflows")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeSection === "workflows"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Workflows</span>
            </button>
            <button
              onClick={() => setActiveSection("faq")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeSection === "faq"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </button>
            <button
              onClick={() => setActiveSection("contact")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeSection === "contact"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </div>

          {/* Content */}
          <div className="card">
            {activeSection === "getting-started" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold serif-display text-espresso mb-2">
                    Getting Started with Tesseract
                  </h2>
                  <p className="text-taupe">
                    Follow these simple steps to start using Tesseract
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gettingStartedSteps.map((step, index) => (
                    <div key={step.id} className="p-4 rounded-lg border border-mocha/20 hover:bg-platinum/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-mocha/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-mocha">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-espresso mb-2">{step.title}</h3>
                          <p className="text-sm text-taupe">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-lavender/50 border border-mocha/10">
                  <h3 className="text-lg font-bold text-espresso mb-3">Quick Tips</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-mocha mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-taupe">Use the Quick Actions wheel for fast navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-mocha mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-taupe">Click on the Financial Insight crystal to explore your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-mocha mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-taupe">The Recent Documents carousel shows your most recent uploads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-mocha mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-taupe">All actions are automatically added to the cryptographic audit trail</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "workflows" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold serif-display text-espresso mb-2">
                    Tesseract Workflows
                  </h2>
                  <p className="text-taupe">
                    Understand how to use each Tesseract feature
                  </p>
                </div>

                <div className="space-y-6">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="p-4 rounded-lg border border-mocha/20">
                      <h3 className="text-lg font-bold text-espresso mb-3">{workflow.title}</h3>
                      <p className="text-sm text-taupe mb-3">
                        Step-by-step guide:
                      </p>
                      <ol className="space-y-2">
                        {workflow.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-sm font-medium text-mocha">{index + 1}.</span>
                            <span className="text-sm text-taupe">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "faq" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold serif-display text-espresso mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-taupe">
                    Find answers to common questions
                  </p>
                </div>

                {/* Search */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search FAQs..."
                    className="w-full pl-9 pr-4 py-2 bg-platinum border border-mocha/20 rounded-lg text-sm font-mono text-espresso placeholder-taupe focus:outline-none focus:border-mocha focus:ring-1 focus:ring-mocha/20"
                  />
                </div>

                <div className="space-y-4">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <div key={faq.id} className="p-4 rounded-lg border border-mocha/20">
                        <h3 className="text-lg font-bold text-espresso mb-2">{faq.question}</h3>
                        <p className="text-sm text-taupe">{faq.answer}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <HelpCircle className="w-12 h-12 mx-auto text-mocha/30 mb-4" />
                      <h3 className="text-lg font-medium text-espresso mb-2">
                        No FAQs found
                      </h3>
                      <p className="text-taupe text-sm">
                        Try adjusting your search term
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold serif-display text-espresso mb-2">
                    Contact Support
                  </h2>
                  <p className="text-taupe">
                    Get in touch with our support team
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="p-4 rounded-lg border border-mocha/20 text-center">
                    <h3 className="text-lg font-bold text-espresso mb-2">Email Support</h3>
                    <p className="text-sm text-taupe mb-3">
                      Send us an email and we'll get back to you within 24 hours
                    </p>
                    <a
                      href="mailto:support@tesseract.finance"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>support@tesseract.finance</span>
                    </a>
                  </div>

                  <div className="p-4 rounded-lg border border-mocha/20 text-center">
                    <h3 className="text-lg font-bold text-espresso mb-2">Documentation</h3>
                    <p className="text-sm text-taupe mb-3">
                      Browse our comprehensive documentation
                    </p>
                    <a
                      href="https://docs.tesseract.finance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>View Documentation</span>
                    </a>
                  </div>

                  <div className="p-4 rounded-lg border border-mocha/20 text-center">
                    <h3 className="text-lg font-bold text-espresso mb-2">Live Chat</h3>
                    <p className="text-sm text-taupe mb-3">
                      Chat with our support team in real-time
                    </p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Start Live Chat</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                  <h3 className="text-lg font-bold text-espresso mb-3">Office Hours</h3>
                  <p className="text-sm text-taupe">
                    Monday - Friday: 9:00 AM - 5:00 PM (EST)
                  </p>
                  <p className="text-sm text-taupe">
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
