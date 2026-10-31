"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { ZoomIn, ZoomOut, RotateCcw, Filter, Eye, AlertTriangle } from "lucide-react";

export interface GraphNode {
  id: string;
  name: string;
  type: "vendor" | "po" | "invoice" | "receipt" | "bank" | "case";
  status: "verified" | "discrepant" | "review" | "neutral";
  position: [number, number, number];
  amount?: string;
  details: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  status: "verified" | "discrepant" | "review" | "neutral";
}

const CONSOLE_NODES: GraphNode[] = [
  // Cluster 1: Apex Heavy Systems (Discrepant $20,000)
  {
    id: "case-01",
    name: "CASE: INV-88219-DISC",
    type: "case",
    status: "review",
    position: [0, 2.2, 0],
    amount: "+$20,000.00 delta",
    details: "High-priority P1 case: Font raster anomaly & price inflation on Actuator set",
  },
  {
    id: "vnd-01",
    name: "Apex Heavy Systems",
    type: "vendor",
    status: "review",
    position: [-2.5, 2.0, 0.5],
    amount: "Master Profile",
    details: "Vendor tax ID XX-9912048, routing verified, recent unauthorized PDF edit",
  },
  {
    id: "inv-01",
    name: "INV-88219 ($84,950)",
    type: "invoice",
    status: "discrepant",
    position: [-1.2, 0.8, 1.2],
    amount: "$84,950.00",
    details: "Billed amount exceeds authorized PO ceiling by +$20,000.00",
  },
  {
    id: "po-01",
    name: "PO-2024-912 ($64,950)",
    type: "po",
    status: "verified",
    position: [-2.8, -0.4, -0.2],
    amount: "$64,950.00",
    details: "Authorized 2x Hydraulic Actuators + 5x Servo Valves + Freight",
  },
  {
    id: "rcp-01",
    name: "GR-9912 Goods Receipt",
    type: "receipt",
    status: "verified",
    position: [-1.8, -1.8, 0.8],
    amount: "Qty: 2 & 5",
    details: "Warehouse loading dock confirmed receipt of physical units intact",
  },
  {
    id: "txn-01",
    name: "WIRE-9901 ($84,950)",
    type: "bank",
    status: "review",
    position: [0.8, 0.5, 1.8],
    amount: "$84,950.00 (HELD)",
    details: "Automated Treasury hold triggered. Settlement halted in ERP queue",
  },

  // Cluster 2: Vanguard Cloud Infrastructure (Duplicate / Redirection Suspect)
  {
    id: "case-02",
    name: "CASE: INV-90432-DUP",
    type: "case",
    status: "review",
    position: [2.8, 1.8, -1.0],
    amount: "$88,400.00",
    details: "Potential duplicate / BEC redirection: Unverified third-party wire routing",
  },
  {
    id: "vnd-02",
    name: "Vanguard Cloud Corp",
    type: "vendor",
    status: "review",
    position: [4.2, 1.0, -1.5],
    amount: "Master Profile",
    details: "Remittance bank coordinates diverged to newly formed Wyoming shell entity",
  },
  {
    id: "inv-02",
    name: "INV-90432 ($88,400)",
    type: "invoice",
    status: "discrepant",
    position: [2.0, 0.2, -1.8],
    amount: "$88,400.00",
    details: "Duplicate invoice submitted within 10 days of verified settlement",
  },
  {
    id: "po-02",
    name: "PO-2024-441",
    type: "po",
    status: "verified",
    position: [3.4, -1.2, -0.8],
    amount: "$88,400.00",
    details: "Dedicated H100 GPU cluster monthly allocation approved by CTO",
  },

  // Cluster 3: Cyberdyne Quantum (Clean Verified 3-Way Match)
  {
    id: "vnd-04",
    name: "Cyberdyne Quantum",
    type: "vendor",
    status: "verified",
    position: [1.5, -2.2, 0.5],
    amount: "Verified Tier-1",
    details: "Enterprise security vendor with 100% verified historical compliance",
  },
  {
    id: "inv-04",
    name: "INV-65201 ($142,500)",
    type: "invoice",
    status: "verified",
    position: [2.6, -1.8, 1.2],
    amount: "$142,500.00",
    details: "Post-quantum cryptographic HSM node: 100% match against PO-2024-118",
  },
  {
    id: "po-04",
    name: "PO-2024-118",
    type: "po",
    status: "verified",
    position: [0.6, -3.0, -0.5],
    amount: "$142,500.00",
    details: "Authorized by Chief Security Officer Sarah Lin with HSM key escrow",
  },
  {
    id: "txn-04",
    name: "WIRE-6520 ($142,500)",
    type: "bank",
    status: "verified",
    position: [3.2, -3.0, 0.8],
    amount: "$142,500.00",
    details: "Wire settlement cleared and confirmed by correspondent clearinghouse",
  },
];

const CONSOLE_EDGES: GraphEdge[] = [
  // Apex heavy chain
  { from: "case-01", to: "inv-01", status: "review" },
  { from: "vnd-01", to: "inv-01", status: "review" },
  { from: "inv-01", to: "po-01", status: "discrepant" },
  { from: "po-01", to: "rcp-01", status: "verified" },
  { from: "inv-01", to: "txn-01", status: "review" },

  // Vanguard chain
  { from: "case-02", to: "inv-02", status: "review" },
  { from: "vnd-02", to: "inv-02", status: "review" },
  { from: "inv-02", to: "po-02", status: "verified" },

  // Cyberdyne chain
  { from: "vnd-04", to: "inv-04", status: "verified" },
  { from: "inv-04", to: "po-04", status: "verified" },
  { from: "inv-04", to: "txn-04", status: "verified" },
];

function CameraRig({ targetPosition }: { targetPosition: [number, number, number] | null }) {
  const { camera } = useThree();
  useFrame(() => {
    if (targetPosition) {
      camera.lookAt(targetPosition[0], targetPosition[1], targetPosition[2]);
    }
  });
  return null;
}

function GraphNodeMesh({
  node,
  isSelected,
  isHighlighted,
  onSelect,
}: {
  node: GraphNode;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: (node: GraphNode) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const color = useMemo(() => {
    if (node.status === "review") return "#ff3355"; // Red for high priority review
    if (node.status === "discrepant") return "#f59e0b"; // Amber for unresolved discrepancy
    if (node.status === "verified") return "#00ff87"; // Green for verified
    return "#71717a"; // Neutral gray
  }, [node.status]);

  useFrame((state) => {
    if (meshRef.current && (isSelected || hovered)) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 4) * 0.08
      );
    }
  });

  const nodeRadius =
    node.type === "case" ? 0.26 : node.type === "invoice" ? 0.22 : 0.18;

  return (
    <group
      position={node.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={meshRef}>
        {node.type === "case" ? (
          <octahedronGeometry args={[nodeRadius, 0]} />
        ) : node.type === "invoice" ? (
          <boxGeometry args={[nodeRadius * 1.5, nodeRadius * 2, 0.08]} />
        ) : node.type === "vendor" ? (
          <dodecahedronGeometry args={[nodeRadius, 0]} />
        ) : (
          <sphereGeometry args={[nodeRadius, 16, 16]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected || isHighlighted ? 1.0 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Ring indicator on selection */}
      {(hovered || isSelected || isHighlighted) && (
        <mesh>
          <ringGeometry args={[nodeRadius + 0.08, nodeRadius + 0.14, 24]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Label above node */}
      <Text
        position={[0, nodeRadius + 0.25, 0]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
      >
        {node.name.length > 20 ? node.name.slice(0, 20) + "..." : node.name}
      </Text>
    </group>
  );
}

function GraphLines({
  edges,
  nodes,
  selectedNodeId,
}: {
  edges: GraphEdge[];
  nodes: GraphNode[];
  selectedNodeId: string | null;
}) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  return (
    <group>
      {edges.map((edge, idx) => {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) return null;

        const isConnectedToSelected =
          selectedNodeId === edge.from || selectedNodeId === edge.to;

        const color =
          edge.status === "review"
            ? "#ff3355"
            : edge.status === "discrepant"
            ? "#f59e0b"
            : edge.status === "verified"
            ? "#00ff87"
            : "#52525b";

        const points = [
          new THREE.Vector3(...fromNode.position),
          new THREE.Vector3(...toNode.position),
        ];

        return (
          <line key={idx}>
            <bufferGeometry
              attach="geometry"
              onUpdate={(self) => self.setFromPoints(points)}
            />
            <lineBasicMaterial
              color={color}
              transparent
              opacity={isConnectedToSelected ? 0.9 : 0.3}
              linewidth={isConnectedToSelected ? 2 : 1}
            />
          </line>
        );
      })}
    </group>
  );
}

export function Console3DGraph({
  onSelectNode,
  highlightCaseId,
}: {
  onSelectNode?: (node: GraphNode) => void;
  highlightCaseId?: string;
}) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(CONSOLE_NODES[0]);
  const [filterType, setFilterType] = useState<string>("all");
  const controlsRef = useRef<any>(null);

  const filteredNodes = useMemo(() => {
    if (filterType === "all") return CONSOLE_NODES;
    if (filterType === "discrepant") {
      return CONSOLE_NODES.filter(
        (n) => n.status === "discrepant" || n.status === "review"
      );
    }
    return CONSOLE_NODES.filter((n) => n.type === filterType);
  }, [filterType]);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoom = (delta: number) => {
    if (controlsRef.current) {
      const cam = controlsRef.current.object;
      cam.position.multiplyScalar(delta);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-xl overflow-hidden border border-white/10 bg-[#07070a]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1.5, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#00ff87" />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxDistance={14}
          minDistance={2.5}
        />

        <CameraRig targetPosition={selectedNode ? selectedNode.position : null} />

        <GraphLines
          edges={CONSOLE_EDGES}
          nodes={CONSOLE_NODES}
          selectedNodeId={selectedNode?.id || null}
        />

        {filteredNodes.map((node) => (
          <GraphNodeMesh
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            isHighlighted={highlightCaseId === node.id}
            onSelect={handleNodeClick}
          />
        ))}
      </Canvas>

      {/* Top Floating Controls & Filter Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/70 border border-white/10 backdrop-blur-md pointer-events-auto">
          {[
            { id: "all", label: "All Entities" },
            { id: "discrepant", label: "Discrepancies & Alerts" },
            { id: "invoice", label: "Invoices" },
            { id: "vendor", label: "Vendors" },
            { id: "bank", label: "Bank Settlement" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all ${
                filterType === f.id
                  ? "bg-white/20 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Camera Controls */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-black/70 border border-white/10 backdrop-blur-md pointer-events-auto">
          <button
            onClick={() => handleZoom(0.85)}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(1.15)}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetCamera}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10"
            title="Reset Camera"
            aria-label="Reset Camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Color Semantics Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 px-3 py-2 rounded-lg bg-black/80 border border-white/10 text-[10px] font-mono text-zinc-400 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
          <span>Verified Match</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
          <span>Unresolved Discrepancy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff3355]" />
          <span>High-Priority Review</span>
        </div>
      </div>

      {/* Selected Entity Preview Drawer */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 max-w-xs p-4 rounded-xl border border-white/15 bg-black/90 backdrop-blur-xl shadow-2xl text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-[10px] font-mono uppercase text-zinc-400">
              {selectedNode.type.toUpperCase()} NODE
            </span>
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                selectedNode.status === "review"
                  ? "bg-[#ff3355]/20 text-[#ff3355]"
                  : selectedNode.status === "discrepant"
                  ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                  : "bg-[#00ff87]/20 text-[#00ff87]"
              }`}
            >
              {selectedNode.status}
            </span>
          </div>

          <h5 className="font-bold text-white text-sm mb-1">{selectedNode.name}</h5>

          {selectedNode.amount && (
            <div className="font-mono text-xs text-[#00ff87] font-semibold mb-2">
              {selectedNode.amount}
            </div>
          )}

          <p className="text-[11px] font-mono text-zinc-300 leading-relaxed mb-3">
            {selectedNode.details}
          </p>

          <div className="text-[10px] font-mono text-zinc-500">
            ORBIT: DRAG • ZOOM: SCROLL • SELECT: CLICK
          </div>
        </div>
      )}
    </div>
  );
}
