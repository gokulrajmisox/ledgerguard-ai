"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

interface EvidenceNodeData {
  id: string;
  name: string;
  type: "core" | "invoice" | "vendor" | "po" | "bank";
  status: "verified" | "discrepant" | "held" | "neutral";
  position: [number, number, number];
  amount?: string;
  delta?: string;
  finding?: string;
}

const HERO_NODES: EvidenceNodeData[] = [
  {
    id: "core-0",
    name: "Tesseract Forensic Core",
    type: "core",
    status: "verified",
    position: [0, 0, 0],
    amount: "2,847 Txns",
    finding: "Continuous Merkle Audit Active",
  },
  {
    id: "inv-88219",
    name: "Invoice INV-88219",
    type: "invoice",
    status: "discrepant",
    position: [-2.6, 1.2, 0.4],
    amount: "$84,950.00",
    delta: "+$20,000.00 (+30.8%)",
    finding: "Raster font compression & baseline offset on digit '8'",
  },
  {
    id: "po-912",
    name: "Purchase Order PO-2024-912",
    type: "po",
    status: "verified",
    position: [-3.8, -1.0, -0.6],
    amount: "$64,950.00",
    finding: "Authorized contract ceiling: 3 approved line items",
  },
  {
    id: "vnd-apex",
    name: "Apex Heavy Systems",
    type: "vendor",
    status: "discrepant",
    position: [-1.4, 2.4, -0.8],
    amount: "Vendor Master",
    finding: "Recent PDF metadata altered with PDF-XChange 14m prior",
  },
  {
    id: "wire-9901",
    name: "Bank Wire WIRE-9901",
    type: "bank",
    status: "held",
    position: [2.5, 1.4, 0.6],
    amount: "$84,950.00 (HELD)",
    finding: "Automated treasury hold placed; escrow pending sign-off",
  },
  {
    id: "inv-65201",
    name: "Invoice INV-65201",
    type: "invoice",
    status: "verified",
    position: [3.2, -1.2, -0.4],
    amount: "$142,500.00",
    finding: "Deterministic 3-way match verified with zero variance",
  },
  {
    id: "po-118",
    name: "Purchase Order PO-2024-118",
    type: "po",
    status: "verified",
    position: [1.6, -2.2, 0.5],
    amount: "$142,500.00",
    finding: "CSO Sarah Lin authorization cryptographic signature valid",
  },
];

function CameraParallax() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // Subtle, smooth camera dampening based on mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.6, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Suspended 3D Invoice Panel with technical grid lines
function FloatingInvoicePanel({
  position,
  rotation,
  title,
  amount,
  isFlagged,
  onSelect,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  amount: string;
  isFlagged?: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.0008;
    }
  });

  const borderColor = isFlagged ? "#ff3355" : "#00ff87";

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Document Slate Surface */}
        <mesh>
          <planeGeometry args={[1.5, 2.0]} />
          <meshStandardMaterial
            color={hovered ? "#1c1c28" : "#0c0c12"}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outline border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.5, 2.0)]} />
          <lineBasicMaterial
            color={hovered ? "#ffffff" : borderColor}
            transparent
            opacity={hovered ? 0.9 : 0.4}
            linewidth={1}
          />
        </lineSegments>

        {/* Internal mock text lines */}
        {[-0.6, -0.4, -0.2, 0.1, 0.3, 0.5].map((y, idx) => (
          <line key={idx}>
            <bufferGeometry
              attach="geometry"
              onUpdate={(self) => {
                const points = [
                  new THREE.Vector3(-0.55, y, 0.01),
                  new THREE.Vector3(idx === 5 ? 0.2 : 0.55, y, 0.01),
                ];
                self.setFromPoints(points);
              }}
            />
            <lineBasicMaterial
              color={idx === 5 && isFlagged ? "#ff3355" : "#ffffff"}
              transparent
              opacity={idx === 5 && isFlagged ? 0.8 : 0.2}
            />
          </line>
        ))}

        {/* Flagged anomaly marker on document */}
        {isFlagged && (
          <mesh position={[0.4, -0.6, 0.02]}>
            <circleGeometry args={[0.12, 16]} />
            <meshBasicMaterial color="#ff3355" transparent opacity={0.8} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

// Particle Stream traveling along transaction paths
function TravelingParticles({
  path,
  color,
  speed = 1,
}: {
  path: [number, number, number][];
  color: string;
  speed?: number;
}) {
  const count = 12;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const curve = useMemo(() => {
    const points = path.map((p) => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(points);
  }, [path]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * speed * 0.15;
    for (let i = 0; i < count; i++) {
      const t = (time + i / count) % 1;
      const pt = curve.getPoint(t);
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.025);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </instancedMesh>
  );
}

// Investigation Core in the center
function InvestigationCore({ onSelect }: { onSelect: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.4;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central multifaceted prism */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={hovered ? "#00ff87" : "#0d1b15"}
          emissive="#00ff87"
          emissiveIntensity={hovered ? 0.8 : 0.3}
          wireframe={false}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Wireframe outer ring */}
      <group ref={ringRef}>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(0.85, 1)]} />
          <lineBasicMaterial color="#00ff87" transparent opacity={0.4} />
        </lineSegments>
      </group>

      {/* Inner point light */}
      <pointLight color="#00ff87" intensity={2.5} distance={4} />
    </group>
  );
}

// Interactive Network Node
function EvidenceNode({
  node,
  isSelected,
  onSelect,
}: {
  node: EvidenceNodeData;
  isSelected: boolean;
  onSelect: (node: EvidenceNodeData) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        node.position[1] + Math.sin(state.clock.elapsedTime * 2 + node.position[0]) * 0.05;
    }
  });

  const color =
    node.status === "discrepant"
      ? "#ff3355"
      : node.status === "held"
      ? "#f59e0b"
      : "#00ff87";

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
      {/* Node Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[hovered || isSelected ? 0.18 : 0.13, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 1.0 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Halo pulse when hovered or selected */}
      {(hovered || isSelected) && (
        <mesh>
          <ringGeometry args={[0.22, 0.28, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

export function HeroEvidenceNetwork({
  onSelectNode,
}: {
  onSelectNode?: (node: EvidenceNodeData) => void;
}) {
  const [selectedNode, setSelectedNode] = useState<EvidenceNodeData | null>(HERO_NODES[1]);

  const handleSelect = (node: EvidenceNodeData) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[700px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <directionalLight position={[-5, -5, -2]} intensity={0.4} color="#00ff87" />

        <CameraParallax />

        {/* Central Core */}
        <InvestigationCore onSelect={() => handleSelect(HERO_NODES[0])} />

        {/* Floating Invoices */}
        <FloatingInvoicePanel
          position={[-2.4, 0.8, -0.2]}
          rotation={[0.1, 0.35, -0.05]}
          title="INV-88219"
          amount="$84,950.00"
          isFlagged={true}
          onSelect={() => handleSelect(HERO_NODES[1])}
        />

        <FloatingInvoicePanel
          position={[2.8, -0.6, -0.5]}
          rotation={[-0.1, -0.3, 0.08]}
          title="INV-65201"
          amount="$142,500.00"
          isFlagged={false}
          onSelect={() => handleSelect(HERO_NODES[5])}
        />

        {/* Network Nodes */}
        {HERO_NODES.map((node) => (
          <EvidenceNode
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            onSelect={handleSelect}
          />
        ))}

        {/* Connecting Lines between Core and Nodes */}
        <Line
          points={[HERO_NODES[0].position, HERO_NODES[1].position]}
          color="#ff3355"
          lineWidth={1}
          transparent
          opacity={0.6}
        />
        <Line
          points={[HERO_NODES[1].position, HERO_NODES[2].position]}
          color="#f59e0b"
          lineWidth={1}
          transparent
          opacity={0.4}
        />
        <Line
          points={[HERO_NODES[1].position, HERO_NODES[3].position]}
          color="#ffffff"
          lineWidth={1}
          transparent
          opacity={0.25}
        />
        <Line
          points={[HERO_NODES[0].position, HERO_NODES[4].position]}
          color="#f59e0b"
          lineWidth={1}
          transparent
          opacity={0.5}
        />
        <Line
          points={[HERO_NODES[0].position, HERO_NODES[5].position]}
          color="#00ff87"
          lineWidth={1}
          transparent
          opacity={0.6}
        />
        <Line
          points={[HERO_NODES[5].position, HERO_NODES[6].position]}
          color="#00ff87"
          lineWidth={1}
          transparent
          opacity={0.4}
        />

        {/* Particle Flows along paths */}
        <TravelingParticles
          path={[HERO_NODES[1].position, HERO_NODES[0].position, HERO_NODES[4].position]}
          color="#ff3355"
          speed={1.2}
        />
        <TravelingParticles
          path={[HERO_NODES[6].position, HERO_NODES[5].position, HERO_NODES[0].position]}
          color="#00ff87"
          speed={0.9}
        />
      </Canvas>

      {/* Interactive Evidence Preview HUD Overlay */}
      {selectedNode && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm glass-panel p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  selectedNode.status === "discrepant"
                    ? "bg-[#ff3355] animate-ping"
                    : selectedNode.status === "held"
                    ? "bg-[#f59e0b]"
                    : "bg-[#00ff87]"
                }`}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                EVIDENCE PREVIEW • {selectedNode.type.toUpperCase()}
              </span>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                selectedNode.status === "discrepant"
                  ? "bg-[#ff3355]/20 text-[#ff3355]"
                  : selectedNode.status === "held"
                  ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                  : "bg-[#00ff87]/20 text-[#00ff87]"
              }`}
            >
              {selectedNode.status}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white mb-1">{selectedNode.name}</h4>

          {selectedNode.amount && (
            <div className="flex items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-zinc-400">Amount:</span>
              <span className="text-white font-semibold">{selectedNode.amount}</span>
              {selectedNode.delta && (
                <span className="text-[#ff3355] font-semibold text-[11px]">
                  ({selectedNode.delta})
                </span>
              )}
            </div>
          )}

          <p className="text-xs text-zinc-300 leading-relaxed bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[11px]">
            {selectedNode.finding}
          </p>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>CLICK NODE TO RE-INSPECT</span>
            <span className="text-[#00ff87]">INTERACTIVE 3D</span>
          </div>
        </div>
      )}
    </div>
  );
}
