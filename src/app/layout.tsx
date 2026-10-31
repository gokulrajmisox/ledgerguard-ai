import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppStoreProvider } from "@/lib/store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tesseract | Every transaction leaves evidence.",
  description:
    "Tesseract is a premium financial intelligence platform that reconciles transactions, investigates discrepancies, and turns financial data into evidence-backed decisions.",
  keywords: [
    "financial intelligence",
    "invoice reconciliation",
    "document verification",
    "audit trail",
    "financial forensics",
    "payment matching",
  ],
  authors: [{ name: "Tesseract" }],
  openGraph: {
    title: "Tesseract | Every transaction leaves evidence.",
    description:
      "Reconcile transactions, verify documents, and make evidence-backed financial decisions.",
    url: "https://tesseract.finance",
    siteName: "Tesseract",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[#F7F5F1] text-[#30231D] antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}
