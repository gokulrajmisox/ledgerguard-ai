# LEDGERGUARD AI (Tesseract)

> **"Every transaction leaves evidence."**

An autonomous finance intelligence and invoice forensics platform that reconciles transactions, investigates suspicious invoices, and turns financial discrepancies into evidence-backed decisions.

---

## ✦ Platform Overview

LedgerGuard AI is a financial intelligence and document forensics suite built to reconcile invoices, purchase orders, and bank transaction records at scale. Designed with the aesthetics of a high-altitude intelligence terminal and forensic digital laboratory, it eliminates manual AP review bottlenecks and intercepts invoice manipulation, duplicate billing, and phantom vendors before capital disbursement.

### Visual Identity & Design System
* **Primary Palette**: Obsidian black (`#070709`), graphite/charcoal surfaces (`#0c0c12`), crisp white typography.
* **Semantic Accents**:
  * 🟢 **Electric Acid-Green** (`#00ff87`) — Cryptographically verified records & exact 3-way matches.
  * 🟡 **Restrained Amber** (`#f59e0b`) — Unresolved discrepancies & variance warnings.
  * 🔴 **Deep Crimson Alert** (`#ff3355`) — High-priority forensics alerts, tampering, & wire redirection risks.
* **Aesthetic**: Deliberately art-directed, typography-first, kinetic WebGL visual effects without generic SaaS cliches.

---

## ✦ Core Application Modules

### 1. Landing Page & Cinematic 3D First Impression (`/`)
* **Interactive 3D Evidence Network**: Suspended invoice panels, connected vendor/transaction nodes, traveling particle pulses, and camera parallax powered by Three.js and `@react-three/fiber`.
* **5-Scene Scroll-Driven Product Sequence**:
  1. **Ingest** — Dynamic OCR document scanner with live bounding-box field extraction.
  2. **Reconcile** — 3-way matching between Invoices, POs, and Bank records with discrepancy indicators.
  3. **Investigate** — Error Level Analysis (ELA) heatmap exposing digital image manipulation and font forgery.
  4. **Resolve** — Reviewer decision flow with AI confidence scores, RFI requests, and workflow approvals.
  5. **Verify** — Merkle-tree cryptographic signature generation anchoring tamper-evident audit blocks.

### 2. Command Center & Investigation Queue (`/console`)
* **Real-time Financial Telemetry**: Total Reconciled Volume, High-Risk Intercepted Value, Active Discrepancies, Auto-Resolution Rate, and Mean Time to Detection (MTTD).
* **Dual View Mode**:
  * **3D Force Graph**: Interactive orbit-controlled visualization of vendor, invoice, PO, and bank nodes with semantic color coding.
  * **Accessible Data Table**: Full container-query responsive table with sticky headers, severity badges, and quick triage actions.

### 3. AI Document Forensics Lab (`/forensics`)
* **Document Inspection Canvas**: Deep zoom (60% to 220%), pan controls, and specimen switcher.
* **Forensic Detection Layers**:
  * **Error Level Analysis (ELA)**: Localized JPEG compression and quantization divergence heatmaps.
  * **OCR Bounding Boxes**: Confidence-graded extraction overlays.
  * **Dual View Comparison**: Interactive before/after split slider and side-by-side diffing against the authorized baseline.
* **Forensic Metrics**: Compression anomaly quotient, font weight divergence, digital noise variance, and calculated tampering confidence.

### 4. Investigation Dossier & 3-Way Reconciliation (`/investigations/[id]`)
* **3-Way Reconciliation Matrix**: Line-item field comparisons between Invoice, Purchase Order, and Bank Wire records.
* **5-Tier Evidence Classification**:
  1. *Established Facts*
  2. *Verified Discrepancies*
  3. *Model Interpretations*
  4. *Missing Information*
  5. *Recommended Action*
* **Reviewer Action Center**: Human-in-the-loop sign-off modals for *Approve Payment*, *Reject & Flag Fraud*, *Request Information (RFI)*, and *Escalate to Internal Audit*.
* **Cryptographic Merkle Audit Trail**: Block hashes, SHA-256 state roots, reviewer attestations, and immutable action histories.

### 5. Evidence Topology & Scrubber Replay Engine (`/evidence`)
* **Interactive Node Topology**: Connected visual graph of actors, banking rails, line items, and audit flags.
* **7-Step Timeline Scrubber**: Step-by-step investigation playback with automated progression, 1x/2x speed controls, and active evidence focus.

### 6. Autonomous Agent Pipeline Inspector (`/mission-control`)
* **7-Stage Pipeline Telemetry**:
  1. Document Intake & Normalization
  2. Multi-Engine OCR & Vectorization
  3. 3-Way Reconciliation Engine
  4. Anomaly & Forensics Detection (ELA)
  5. Graph Correlation & Entity Resolution
  6. Confidence Scoring & Decision Policy
  7. Audit Block Cryptographic Sealing
* **Live Telemetry Stream**: Real-time console logs, stage metrics, and raw JSON input/output inspectors.

### 7. Empirical Accuracy & Benchmarks (`/benchmarks`)
* **Benchmark Visualizations**: Interactive Recharts comparisons against Traditional Rule Engines, Standard AP Automation, and Manual Human Review.
* **Accuracy Metrics**: 99.4% detection accuracy on altered totals, 98.7% on phantom vendors, and 99.1% on duplicate submissions.

### 8. React Bits Sensory Laboratory (`/interactive-lab`)
* **`<FlexCarousel />`**: OGL WebGL liquid glass refracting carousel with `liquid`, `ribbon`, `vortex`, and `arch` lens presets, momentum drag, and rolling digit reel captions.
* **`<OptionWheel />`**: Curved kinetic filter selector with exponential rAF dampening, Gaussian blur attenuation, and haptic keyboard controls.
* **`<ScrollExpand />`**: Scroll-driven media frame smoothly interpolating to full-bleed evidence inspection.
* **`<CrystalizedBall />`**: OGL WebGL dielectric crystal sphere with 15,000 GLSL particles, crackling electric plasma strands, and interactive cursor flares.

---

## ✦ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router with Turbopack), React 19, TypeScript |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, OGL (Minimal WebGL library) |
| **Animation & Motion** | Framer Motion, GSAP & ScrollTrigger |
| **Styling & Components** | Tailwind CSS, Lucide React, shadcn/ui patterns |
| **Data Visualization** | Recharts, `@xyflow/react` |
| **Package Management** | pnpm |

---

## ✦ Getting Started

### Prerequisites
* **Node.js** >= 18.18.0
* **pnpm** >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/gokulrajmisox/ledgerguard-ai.git

# Navigate to project directory
cd ledgerguard-ai

# Install dependencies
pnpm install
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build optimized static and dynamic routes
pnpm build

# Start production server
pnpm start
```

---

## ✦ Security & Guardrails

* **Synthetic Data Safeguards**: All accounts, banking credentials, invoices, and entity names in the application are realistic synthetic test fixtures.
* **Human-in-the-Loop Governance**: Automated actions above risk thresholds require reviewer cryptographic signatures.
* **Audit Integrity**: All state transitions generate immutable Merkle audit records with timestamped SHA-256 block hashes.

---

## ✦ License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
