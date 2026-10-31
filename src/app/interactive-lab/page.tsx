import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { ReactBitsShowcase } from '@/components/landing/ReactBitsShowcase';
import { Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function InteractiveLabPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#f4f4f7]">
      <Navbar />

      <div className="flex-1 flex pt-16">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
                  EXPERIMENTAL SENSORY LABORATORY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                React Bits Interactive Suite
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                COMPONENTS: <span className="text-[#00ff87] font-bold">FlexCarousel • OptionWheel • CrystalizedBall • ScrollExpand</span>
              </span>
            </div>
          </div>

          {/* Interactive Showcase containing all 4 components */}
          <ReactBitsShowcase />
        </main>
      </div>

      <Footer />
    </div>
  );
}
