"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ThreeFallback } from "./ThreeFallback";
import { GraphNode } from "./Console3DGraph";

const Console3DGraph = dynamic(
  () => import("./Console3DGraph").then((mod) => mod.Console3DGraph),
  {
    ssr: false,
    loading: () => <ThreeFallback />,
  }
);

export function Console3DGraphClient({
  onSelectNode,
  highlightCaseId,
}: {
  onSelectNode?: (node: GraphNode) => void;
  highlightCaseId?: string;
}) {
  const [useFallback, setUseFallback] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  return <Console3DGraph onSelectNode={onSelectNode} highlightCaseId={highlightCaseId} />;
}
