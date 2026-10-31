"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThreeFallback } from "./ThreeFallback";

const HeroEvidenceNetwork = dynamic(
  () => import("./HeroEvidenceNetwork").then((mod) => mod.HeroEvidenceNetwork),
  {
    ssr: false,
    loading: () => <ThreeFallback />,
  }
);

export function HeroEvidenceNetworkClient({
  onSelectNode,
}: {
  onSelectNode?: (node: any) => void;
}) {
  const [useFallback, setUseFallback] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check user preference for reduced motion or WebGL availability
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setUseFallback(true);
    }
  }, []);

  if (!mounted) {
    return <ThreeFallback onSelectNode={onSelectNode} />;
  }

  if (useFallback) {
    return <ThreeFallback onSelectNode={onSelectNode} />;
  }

  return <HeroEvidenceNetwork onSelectNode={onSelectNode} />;
}
