import React from "react";
import { InvestigationDetailClient } from "./client";

export function generateStaticParams() {
  return [
    { id: "case-01" },
    { id: "case-02" },
    { id: "case-03" },
    { id: "case-04" },
  ];
}

export default async function InvestigationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <InvestigationDetailClient caseId={resolvedParams.id} />;
}
