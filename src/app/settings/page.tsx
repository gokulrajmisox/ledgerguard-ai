"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Settings, User, Bell, ShieldCheck, Palette, Database, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "security" | "appearance" | "data">("general");
  const [formData, setFormData] = useState({
    companyName: "My Company",
    email: "user@example.com",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    notificationsEnabled: true,
    emailNotifications: true,
    desktopNotifications: false,
    twoFactorEnabled: false,
    theme: "light",
    autoSave: true,
    backupFrequency: "daily",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // In a real app, you would save to backend
    alert("Settings saved successfully!");
  };

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
                  SYSTEM CONFIGURATION
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold serif-display text-espresso">
                Settings
              </h1>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ivory bg-mocha hover:bg-mocha/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Settings"}</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-platinum border border-mocha/10">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "general"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>General</span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "notifications"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "security"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "appearance"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Appearance</span>
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                activeTab === "data"
                  ? "bg-ivory text-mocha shadow-sm"
                  : "text-taupe hover:text-mocha"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Data</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="card">
            {activeTab === "general" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-espresso mb-4">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Default Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleChange("currency", e.target.value)}
                      className="form-input"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="JPY">JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Date Format</label>
                    <select
                      value={formData.dateFormat}
                      onChange={(e) => handleChange("dateFormat", e.target.value)}
                      className="form-input"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-espresso mb-4">Notification Settings</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notificationsEnabled}
                      onChange={(e) => handleChange("notificationsEnabled", e.target.checked)}
                      className="w-5 h-5 rounded border-mocha/20 text-mocha focus:ring-mocha/20"
                    />
                    <span className="text-sm text-espresso">Enable Notifications</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => handleChange("emailNotifications", e.target.checked)}
                      className="w-5 h-5 rounded border-mocha/20 text-mocha focus:ring-mocha/20"
                    />
                    <span className="text-sm text-espresso">Email Notifications</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.desktopNotifications}
                      onChange={(e) => handleChange("desktopNotifications", e.target.checked)}
                      className="w-5 h-5 rounded border-mocha/20 text-mocha focus:ring-mocha/20"
                    />
                    <span className="text-sm text-espresso">Desktop Notifications</span>
                  </label>
                </div>

                <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                  <h4 className="text-sm font-medium text-espresso mb-2">Notification Types</h4>
                  <p className="text-sm text-taupe">
                    Configure which events trigger notifications
                  </p>
                  <div className="mt-3 space-y-2">
                    {[
                      { id: "new_invoice", label: "New Invoice Uploaded" },
                      { id: "discrepancy", label: "Discrepancy Detected" },
                      { id: "approval", label: "Approval Required" },
                      { id: "escalation", label: "Case Escalated" },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={true}
                          className="w-4 h-4 rounded border-mocha/20 text-mocha focus:ring-mocha/20"
                        />
                        <span className="text-sm text-espresso">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-espresso mb-4">Security Settings</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.twoFactorEnabled}
                      onChange={(e) => handleChange("twoFactorEnabled", e.target.checked)}
                      className="w-5 h-5 rounded border-mocha/20 text-mocha focus:ring-mocha/20"
                    />
                    <span className="text-sm text-espresso">Two-Factor Authentication</span>
                  </label>

                  <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                    <h4 className="text-sm font-medium text-espresso mb-2">Session Management</h4>
                    <p className="text-sm text-taupe">
                      Active sessions and login history
                    </p>
                    <div className="mt-3 space-y-2">
                      {[
                        { device: "MacBook Pro", location: "New York, NY", lastActive: "2 hours ago" },
                        { device: "iPhone 13", location: "New York, NY", lastActive: "1 day ago" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded border border-mocha/10">
                          <div>
                            <div className="text-sm text-espresso">{session.device}</div>
                            <div className="text-xs text-taupe">{session.location}</div>
                          </div>
                          <div className="text-xs text-taupe">{session.lastActive}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                    <h4 className="text-sm font-medium text-espresso mb-2">Change Password</h4>
                    <p className="text-sm text-taupe mb-3">
                      Update your account password
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="form-label">Current Password</label>
                        <input type="password" className="form-input" placeholder="Enter current password" />
                      </div>
                      <div>
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-input" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="form-label">Confirm New Password</label>
                        <input type="password" className="form-input" placeholder="Confirm new password" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-espresso mb-4">Appearance Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Theme</label>
                    <select
                      value={formData.theme}
                      onChange={(e) => handleChange("theme", e.target.value)}
                      className="form-input"
                    >
                      <option value="light">Light Mode</option>
                      <option value="dark">Dark Mode</option>
                      <option value="system">System Default</option>
                    </select>
                    <p className="text-xs text-taupe/70 mt-1">
                      Note: Dark mode preserves the Tesseract brand colors
                    </p>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.autoSave}
                      onChange={(e) => handleChange("autoSave", e.target.checked)}
                      className="w-5 h-5 rounded border-mocha/20 text-mocha focus:ring-mocha/20"
                    />
                    <span className="text-sm text-espresso">Auto-save preferences</span>
                  </label>
                </div>

                <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                  <h4 className="text-sm font-medium text-espresso mb-2">Preview</h4>
                  <p className="text-sm text-taupe">
                    Theme preview will appear here
                  </p>
                  <div className="mt-3 p-4 rounded bg-ivory border border-mocha/20">
                    <div className="text-sm text-espresso">Sample Card</div>
                    <div className="text-xs text-taupe mt-1">This is a preview of how your theme looks</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-espresso mb-4">Data Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Backup Frequency</label>
                    <select
                      value={formData.backupFrequency}
                      onChange={(e) => handleChange("backupFrequency", e.target.value)}
                      className="form-input"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                    <h4 className="text-sm font-medium text-espresso mb-2">Data Export</h4>
                    <p className="text-sm text-taupe mb-3">
                      Export your data in various formats
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 rounded-lg border border-mocha/20 bg-platinum text-sm text-espresso hover:bg-mocha/5 transition-colors">
                        Export All Data
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-mocha/20 bg-platinum text-sm text-espresso hover:bg-mocha/5 transition-colors">
                        Export Invoices
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-mocha/20 bg-platinum text-sm text-espresso hover:bg-mocha/5 transition-colors">
                        Export Audit Log
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-platinum/50 border border-mocha/10">
                    <h4 className="text-sm font-medium text-espresso mb-2">Data Retention</h4>
                    <p className="text-sm text-taupe">
                      Configure how long to keep different types of data
                    </p>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-espresso">Invoices</span>
                        <select className="px-3 py-1 rounded border border-mocha/20 bg-platinum text-sm">
                          <option>7 years</option>
                          <option>5 years</option>
                          <option>3 years</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-espresso">Audit Logs</span>
                        <select className="px-3 py-1 rounded border border-mocha/20 bg-platinum text-sm">
                          <option>Forever</option>
                          <option>10 years</option>
                          <option>7 years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
