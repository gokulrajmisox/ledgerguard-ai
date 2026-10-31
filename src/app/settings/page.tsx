"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Settings, Bell, ShieldCheck, Palette, Database, Save, CheckCircle2, Lock, Sliders, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "security" | "appearance" | "data">("general");
  const [formData, setFormData] = useState({
    companyName: "Acme Treasury & Industrial Corp",
    email: "treasury-audit@acme-corp.com",
    currency: "USD",
    dateFormat: "YYYY-MM-DD",
    notificationsEnabled: true,
    emailNotifications: true,
    desktopNotifications: false,
    twoFactorEnabled: true,
    theme: "light",
    autoSave: true,
    backupFrequency: "daily",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
                  GOVERNANCE & SYSTEM CONFIGURATION
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso tracking-tight">
                Settings & Policies
              </h1>
              <p className="text-sm text-[#5C4F47] mt-1">
                Configure enterprise reconciliation parameters, multi-factor security, and cryptographic audit parameters
              </p>
            </div>

            <div className="flex items-center gap-3">
              <AnimatePresence>
                {savedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E8F4EC] border border-[#25663B]/30 text-[#25663B] text-xs font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Configuration Saved</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Persisting..." : "Save Configuration"}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white border border-[#D7D0C9] shadow-sm">
            {[
              { id: "general", label: "General", icon: Settings },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security & MFA", icon: ShieldCheck },
              { id: "appearance", label: "Appearance", icon: Palette },
              { id: "data", label: "Data & Storage", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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

          {/* Tab Content Panes */}
          <motion.div
            key={activeTab}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="card-luxury p-6 sm:p-8"
          >
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[#D7D0C9]">
                  <h3 className="text-lg font-bold text-espresso">General Organization Settings</h3>
                  <p className="text-xs text-[#5C4F47] mt-0.5">
                    Primary entity parameters for invoice parsing and reconciliation headers
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label text-[#30231D] font-bold text-xs uppercase tracking-wider mb-2 block">
                      Enterprise Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      className="form-input w-full p-2.5 rounded-lg border border-[#D7D0C9] bg-white text-espresso font-medium focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15"
                    />
                  </div>
                  <div>
                    <label className="form-label text-[#30231D] font-bold text-xs uppercase tracking-wider mb-2 block">
                      Treasury Officer Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="form-input w-full p-2.5 rounded-lg border border-[#D7D0C9] bg-white text-espresso font-medium focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label text-[#30231D] font-bold text-xs uppercase tracking-wider mb-2 block">
                      Base Ledger Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleChange("currency", e.target.value)}
                      className="form-input w-full p-2.5 rounded-lg border border-[#D7D0C9] bg-white text-espresso font-medium focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15"
                    >
                      <option value="USD">USD ($) - United States Dollar</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="GBP">GBP (£) - British Pound</option>
                      <option value="INR">INR (₹) - Indian Rupee</option>
                      <option value="JPY">JPY (¥) - Japanese Yen</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label text-[#30231D] font-bold text-xs uppercase tracking-wider mb-2 block">
                      Standard Accounting Date Format
                    </label>
                    <select
                      value={formData.dateFormat}
                      onChange={(e) => handleChange("dateFormat", e.target.value)}
                      className="form-input w-full p-2.5 rounded-lg border border-[#D7D0C9] bg-white text-espresso font-medium focus:border-[#6F4E37] focus:ring-2 focus:ring-[#6F4E37]/15"
                    >
                      <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (US Standard)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (UK / EU)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[#D7D0C9]">
                  <h3 className="text-lg font-bold text-espresso">Forensic Alerts & Dispatch</h3>
                  <p className="text-xs text-[#5C4F47] mt-0.5">
                    Real-time notifications for invoice discrepancies, duplicate detections, and cryptographic audit locks
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { key: "notificationsEnabled", label: "Master Notification System", desc: "Allow Tesseract to push system-level incident updates" },
                    { key: "emailNotifications", label: "Executive Email Digests", desc: "Send daily variance summary and P1 incident alerts to treasury email" },
                    { key: "desktopNotifications", label: "Browser Desktop Notifications", desc: "Show immediate popups when an invoice mismatch is intercepted" },
                  ].map((pref) => (
                    <label
                      key={pref.key}
                      className="flex items-start gap-3.5 p-4 rounded-xl border border-[#D7D0C9] bg-white hover:bg-[#F7F5F1] transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={(formData as any)[pref.key]}
                        onChange={(e) => handleChange(pref.key, e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#6F4E37] border-[#D7D0C9] focus:ring-[#6F4E37]"
                      />
                      <div>
                        <span className="text-sm font-bold text-espresso block">{pref.label}</span>
                        <span className="text-xs text-[#5C4F47]">{pref.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                  <h4 className="text-sm font-bold text-espresso mb-1">Automated Triage Events</h4>
                  <p className="text-xs text-[#5C4F47] mb-3">
                    Select financial triggers that automatically elevate into high-priority review
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "new_invoice", label: "New Unverified PDF Uploaded" },
                      { id: "discrepancy", label: "Line Item Rate Variance > 2%" },
                      { id: "approval", label: "PO Authorization Discrepancy" },
                      { id: "escalation", label: "Suspected Duplicate Tax ID / Routing" },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#D7D0C9] cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 rounded text-[#6F4E37] border-[#D7D0C9] focus:ring-[#6F4E37]"
                        />
                        <span className="text-xs font-semibold text-espresso">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[#D7D0C9]">
                  <h3 className="text-lg font-bold text-espresso">Cryptographic Security & Access Control</h3>
                  <p className="text-xs text-[#5C4F47] mt-0.5">
                    Immutable SHA-256 audit signing, hardware keys, and auditor session management
                  </p>
                </div>
                
                <div className="p-4 rounded-xl border border-[#D7D0C9] bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/10 flex items-center justify-center text-[#6F4E37]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-espresso">Two-Factor Authentication (TOTP / FIDO2)</div>
                      <div className="text-xs text-[#5C4F47]">Hardware security key or authenticator app required for wire sign-offs</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleChange("twoFactorEnabled", !formData.twoFactorEnabled)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      formData.twoFactorEnabled ? "badge-success" : "btn-outline"
                    }`}
                  >
                    {formData.twoFactorEnabled ? "Active & Enforced" : "Enable MFA"}
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                  <h4 className="text-sm font-bold text-espresso mb-1">Active Auditor Sessions</h4>
                  <p className="text-xs text-[#5C4F47] mb-3">
                    Authenticated sessions holding cryptographic signing tokens
                  </p>
                  <div className="space-y-2">
                    {[
                      { device: "MacBook Pro (Enterprise Treasury Terminal)", location: "New York, USA", ip: "192.168.1.104", status: "Active Now" },
                      { device: "Chrome Workstation (Auditor Node 02)", location: "London, UK", ip: "10.0.4.88", status: "Signed in 42m ago" },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#D7D0C9]">
                        <div>
                          <div className="text-xs font-bold text-espresso">{session.device}</div>
                          <div className="text-[11px] text-[#5C4F47] font-mono">{session.location} • {session.ip}</div>
                        </div>
                        <span className="badge-success text-[10px] uppercase font-bold">{session.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                  <h4 className="text-sm font-bold text-espresso mb-3">Update Security Credentials</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#5C4F47] mb-1 block">Current Master Key</label>
                      <input type="password" placeholder="••••••••••••" className="form-input w-full p-2 rounded-lg border border-[#D7D0C9] bg-white text-xs" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#5C4F47] mb-1 block">New Master Key</label>
                      <input type="password" placeholder="••••••••••••" className="form-input w-full p-2 rounded-lg border border-[#D7D0C9] bg-white text-xs" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#5C4F47] mb-1 block">Confirm Master Key</label>
                      <input type="password" placeholder="••••••••••••" className="form-input w-full p-2 rounded-lg border border-[#D7D0C9] bg-white text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[#D7D0C9]">
                  <h3 className="text-lg font-bold text-espresso">Visual Brand & Theme</h3>
                  <p className="text-xs text-[#5C4F47] mt-0.5">
                    Configure contrast ratios, typography density, and motion preferences
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-[#6F4E37] bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-espresso">Tesseract Warm Ivory (Default)</span>
                      <span className="badge-success text-[10px] uppercase font-bold">Active</span>
                    </div>
                    <p className="text-xs text-[#5C4F47]">
                      Editorial high-contrast palette tailored for financial compliance, 6.54:1 contrast ratio, mocha accents.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#D7D0C9] bg-white hover:border-[#6F4E37] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-espresso">Deep Espresso Terminal</span>
                      <span className="badge-neutral text-[10px] uppercase font-bold">Preview</span>
                    </div>
                    <p className="text-xs text-[#5C4F47]">
                      High-density dark forensics theme tailored for night trading rooms and command centers.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9]">
                  <h4 className="text-sm font-bold text-espresso mb-2">Theme Specimen Live Preview</h4>
                  <div className="p-4 rounded-xl bg-white border border-[#D7D0C9] shadow-sm flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-espresso">Verified Wire Disbursement</div>
                      <div className="text-xs text-[#5C4F47]">Invoice #INV-2024-912 • Apex Heavy Systems</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-[#6F4E37]">$84,950.00 USD</div>
                      <span className="badge-success text-[10px] uppercase font-bold">Reconciled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[#D7D0C9]">
                  <h3 className="text-lg font-bold text-espresso">Data Governance & Export Policies</h3>
                  <p className="text-xs text-[#5C4F47] mt-0.5">
                    Automated snapshots, retention windows, and cryptographic ledger dumps
                  </p>
                </div>
                
                <div className="p-5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9] space-y-3">
                  <h4 className="text-sm font-bold text-espresso">Cryptographic Ledger Export</h4>
                  <p className="text-xs text-[#5C4F47]">
                    Download immutable audit logs with SHA-256 Merkle hashes for regulatory compliance and external review.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button className="btn-outline text-xs py-2 px-3.5 font-bold">
                      Export Full Ledger (JSON)
                    </button>
                    <button className="btn-outline text-xs py-2 px-3.5 font-bold">
                      Export Reconciliation Matrix (CSV)
                    </button>
                    <button className="btn-outline text-xs py-2 px-3.5 font-bold">
                      Export Executive Audit Dossier (PDF)
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#F7F5F1] border border-[#D7D0C9] space-y-3">
                  <h4 className="text-sm font-bold text-espresso">Regulatory Retention Schedule</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#D7D0C9]">
                      <span className="text-xs font-bold text-espresso">Tax Invoices & Wire Proofs</span>
                      <span className="text-xs font-mono font-bold text-[#6F4E37]">7 Years (IRS / Statutory)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#D7D0C9]">
                      <span className="text-xs font-bold text-espresso">Cryptographic Audit Chain</span>
                      <span className="text-xs font-mono font-bold text-[#25663B]">Permanent (Immutable)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
