'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Sparkles, Layers, Sliders, ShieldCheck, ArrowRight, Eye, Radio } from 'lucide-react';

// Dynamically import the WebGL and interactive components
const FlexCarousel = dynamic<any>(() => import('@/components/reactbits/FlexCarousel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex items-center justify-center text-xs font-mono text-zinc-500 bg-black/40 rounded-2xl border border-white/5">
      Loading Liquid Glass FlexCarousel...
    </div>
  ),
});

const OptionWheel = dynamic<any>(() => import('@/components/reactbits/OptionWheel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center text-xs font-mono text-zinc-500 bg-black/40 rounded-2xl border border-white/5">
      Loading OptionWheel...
    </div>
  ),
});

const ScrollExpand = dynamic<any>(() => import('@/components/reactbits/ScrollExpand'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex items-center justify-center text-xs font-mono text-zinc-500 bg-black/40 rounded-2xl border border-white/5">
      Loading ScrollExpand...
    </div>
  ),
});

const CrystalizedBall = dynamic<any>(() => import('@/components/reactbits/CrystalizedBall'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center text-xs font-mono text-zinc-500 bg-black/40 rounded-2xl border border-white/5">
      Loading CrystalizedBall...
    </div>
  ),
});

const FORENSIC_SPECIMENS = [
  {
    src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80&auto=format&fit=max',
    alt: 'Invoice INV-88219 Altered Grand Total',
    title: 'INV-88219 (Apex Heavy Systems)',
    subtitle: 'Discrepancy: +$20,000.00 Altered Grand Total'
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=max',
    alt: 'Error Level Analysis (ELA) Heatmap',
    title: 'Error Level Analysis (ELA)',
    subtitle: 'Confidence: 0.94 Localized Quantization Divergence'
  },
  {
    src: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80&auto=format&fit=max',
    alt: 'Authorized Purchase Order PO-2024-912',
    title: 'PO-2024-912 Contract Ceiling',
    subtitle: 'Authorized Limit: $64,950.00 Approved by VP Eng'
  },
  {
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80&auto=format&fit=max',
    alt: 'Bank Wire WIRE-20241014-9901 Held',
    title: 'WIRE-9901 Settlement Intercept',
    subtitle: 'Status: Automated Escrow Hold in ERP Settlement'
  },
  {
    src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80&auto=format&fit=max',
    alt: 'Duplicate Billing INV-90432 Redirection',
    title: 'INV-90432 (Vanguard Cloud)',
    subtitle: 'Flag: 10-day Duplicate Window & Wyoming Routing'
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format&fit=max',
    alt: 'Physical Goods Receipt GR-9912 Log',
    title: 'Goods Receipt GR-9912',
    subtitle: 'Verified: 2x Hydraulic Actuators Received at Dock'
  }
];

const FORENSIC_MODES = [
  'Error Level Analysis',
  'Quantization Discontinuity',
  'Font Kerning & Raster',
  'OCR Stream Divergence',
  'Fedwire Metadata Audit',
  'Merkle Chain Ledger',
  'Duplicate Cycle Defense',
  'Contract Rate Ceiling',
  'Escrow Hold Protocol'
];

export function ReactBitsShowcase() {
  const [selectedMode, setSelectedMode] = useState(FORENSIC_MODES[0]);
  const [ballColor, setBallColor] = useState('#00ff87');
  const [preset, setPreset] = useState<'liquid' | 'ribbon' | 'vortex' | 'arch'>('liquid');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07070a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00ff87]">
                INTERACTIVE FORENSICS LAB & SENSORY WORKSPACE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-[0.95]">
              Liquid Refraction & Haptic Forensics
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-md leading-relaxed">
            Experience next-generation tactile investigation instruments powered by WebGL: liquid
            refracting evidence carousels, responsive inspection wheels, scroll-driven full-bleed
            magnification, and our cryptographic plasma core.
          </p>
        </div>

        {/* 1. FLEX CAROUSEL: LIQUID GLASS FORENSIC SPECIMENS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00ff87]" />
              <span className="text-white font-bold uppercase tracking-wider">
                1. Liquid Glass Forensic Evidence Carousel (&lt;FlexCarousel /&gt;)
              </span>
            </div>
            {/* Presets selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-white/10 text-[11px]">
              <span className="text-zinc-500 px-1">LENS:</span>
              {(['liquid', 'ribbon', 'vortex', 'arch'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className={`px-2 py-0.5 rounded uppercase font-mono ${
                    preset === p ? 'bg-[#00ff87] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 shadow-2xl relative overflow-hidden">
            <div style={{ width: '100%', height: '560px', position: 'relative' }}>
              <FlexCarousel
                items={FORENSIC_SPECIMENS}
                preset={preset}
                intro="rise"
                cardHeight={0.5}
                gap={16}
                squeeze={0.2}
                focusOnClick
                captions
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-500">
              <span>DRAG TO ROTATE LENS • CLICK CARD TO CENTER AND FOCUS • ESC TO CLOSE</span>
              <span className="text-[#00ff87]">POWERED BY OGL WEBGL SHADERS</span>
            </div>
          </div>
        </div>

        {/* 2. DUAL INTERACTIVE SUITE: OPTION WHEEL & CRYSTALIZED BALL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* OPTION WHEEL: FORENSIC MODEL SELECTION */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00e5ff]" />
                  <span className="text-white font-bold uppercase">
                    Forensic Anomaly Selector (&lt;OptionWheel /&gt;)
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400">SMOOTH CURVE PHYSICS</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mb-4 leading-relaxed">
                Scroll or drag the kinetic wheel to tune the investigation filter. Exponential
                dampening provides frame-rate independent haptic feedback.
              </p>
            </div>

            <div style={{ width: '100%', height: '360px', position: 'relative' }} className="my-2">
              <OptionWheel
                items={FORENSIC_MODES}
                defaultSelected={2}
                textColor="#52525b"
                activeColor="#00ff87"
                side="left"
                fontSize={2.2}
                spacing={1.3}
                curve={1.1}
                tilt={6}
                blur={2}
                fade={0.3}
                smoothing={180}
                inset={40}
                loop={false}
                draggable
                onChange={(idx: number, item: string) => setSelectedMode(item)}
              />
            </div>

            <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-xs font-mono text-zinc-300 flex items-center justify-between">
              <div>
                <span className="text-zinc-500 text-[10px] block">ACTIVE INSPECTION FILTER</span>
                <span className="text-[#00ff87] font-bold">{selectedMode}</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">DRAG OR USE ARROW KEYS</span>
            </div>
          </div>

          {/* CRYSTALIZED BALL: FORENSIC PLASMA CORE */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#ff3355]" />
                  <span className="text-white font-bold uppercase">
                    Forensic Plasma Core (&lt;CrystalizedBall /&gt;)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {['#00ff87', '#ff3355', '#F25BD0', '#00e5ff'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBallColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-3.5 h-3.5 rounded-full transition-transform ${
                        ballColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-60'
                      }`}
                      title={c}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-mono mb-2 leading-relaxed">
                Interactive dielectric glass sphere with 6 braided electric strands, crackling
                plasma, and 15,000 responsive square particles that flare towards the cursor.
              </p>
            </div>

            <div style={{ width: '100%', height: '360px', position: 'relative' }} className="my-2">
              <CrystalizedBall
                preset="plasma"
                color={ballColor}
                size={0.75}
                crackle={0.85}
                fill={0.5}
                interactive
                hoverStrength={0.7}
                strands={6}
                flares={0.65}
                glow={0.9}
                sparks={0.6}
                particleCount={15000}
                motion="rise"
                particleShape="square"
                depth={0.6}
                sway={0.5}
                twinkle={0.5}
                haze={0.7}
                dustSpeed={1}
                speed={1}
                intro
                paused={false}
              />
            </div>

            <div className="p-3 rounded-lg bg-black/60 border border-white/5 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
              <span>HOVER CURSOR TO HEAT RIM & STIR DUST</span>
              <span className="text-[#00ff87]">15,000 GLSL PARTICLES</span>
            </div>
          </div>
        </div>

        {/* 3. SCROLL EXPAND: FULL-BLEED EVIDENCE MAGNIFICATION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#00ff87]" />
              <span className="text-white font-bold uppercase tracking-wider">
                3. Full-Bleed Evidence Canvas (&lt;ScrollExpand /&gt;)
              </span>
            </div>
            <span className="text-zinc-500 text-[10px]">SCROLL INSIDE THE FRAME TO GROW FULL-BLEED</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden shadow-2xl">
            <div style={{ height: '520px', position: 'relative' }}>
              <ScrollExpand
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80&auto=format&fit=max"
                alt="Forensic Deep Scan Engine Specimen"
                title="Built to scale"
                scrollHint="Scroll inside the frame"
                mediaZoom={1.35}
                startWidth={42}
                startHeight={58}
                startRadius={24}
                endRadius={0}
                scrollDistance={1.2}
                holdDistance={0.35}
                smoothing={0.1}
                overlayScrim={0.45}
                enabled
              >
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Every pixel, everywhere
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono max-w-md mx-auto leading-relaxed">
                    The frame opens up as you scroll and hands the whole stage to high-resolution
                    invoice forensics.
                  </p>
                </div>
              </ScrollExpand>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
