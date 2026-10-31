import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppStoreProvider } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LedgerGuard AI — Autonomous Finance Intelligence & Invoice Forensics",
  description:
    "An autonomous finance intelligence platform by Tesseract that reconciles transactions, investigates suspicious invoices, and turns financial discrepancies into evidence-backed decisions.",
  keywords: [
    "finance intelligence",
    "invoice forensics",
    "autonomous reconciliation",
    "fraud detection",
    "financial audit",
    "3-way matching",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased selection:bg-[#00ff87] selection:text-black`}
    >
      <body className="min-h-full flex flex-col bg-[#070709] text-[#f4f4f7] overflow-x-hidden tech-grid">
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}
