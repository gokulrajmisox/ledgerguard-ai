"use client";

import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FileText, ZoomIn, ZoomOut, Download, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ForensicFinding } from "@/types";
import { formatCurrency } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentViewerProps {
  invoiceNumber: string;
  vendorName: string;
  totalAmount: number;
  poAmount: number;
  findings: ForensicFinding[];
  activeFindingId: string;
  onSelectFinding: (finding: ForensicFinding) => void;
}

export function DocumentViewer({
  invoiceNumber,
  vendorName,
  totalAmount,
  poAmount,
  findings,
  activeFindingId,
  onSelectFinding,
}: DocumentViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [showFindings, setShowFindings] = useState(true);

  // Sample PDF URL for demo purposes
  // In a real app, this would be the actual document URL
  const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 2.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  // Get active finding
  const activeFinding = findings.find(f => f.id === activeFindingId);

  // Calculate discrepancy
  const discrepancy = totalAmount - poAmount;
  const discrepancyPercentage = poAmount > 0 ? (discrepancy / poAmount) * 100 : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Document Header */}
      <div className="p-3 border-b border-mocha/10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-espresso">
            Document: {invoiceNumber}
          </h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFindings(!showFindings)}
              className={`p-1.5 rounded text-sm ${showFindings ? "bg-mocha/10 text-mocha" : "text-taupe hover:text-mocha"}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button onClick={zoomOut} className="p-1.5 rounded hover:bg-mocha/10 transition-colors text-taupe hover:text-mocha">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={zoomIn} className="p-1.5 rounded hover:bg-mocha/10 transition-colors text-taupe hover:text-mocha">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-mocha/10 transition-colors text-taupe hover:text-mocha">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-taupe">
          <span>Vendor: {vendorName}</span>
          <span>Invoice: {formatCurrency(totalAmount)}</span>
          <span>PO: {formatCurrency(poAmount)}</span>
          <span
            className={`font-medium ${
              discrepancy === 0 ? "text-status-success" : 
              Math.abs(discrepancyPercentage) > 10 ? "text-status-error" : "text-status-warning"
            }`}
          >
            {discrepancy === 0 ? "✓ Matched" : `Δ ${formatCurrency(discrepancy)} (${Math.round(Math.abs(discrepancyPercentage))}%)`}
          </span>
        </div>
      </div>

      {/* Document Viewer */}
      <div className="flex-1 overflow-auto bg-platinum/50 relative">
        {/* PDF Viewer */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-taupe">Loading document...</div>}
            error={<div className="text-status-error">Failed to load document</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              width={Math.min(800 * scale, window.innerWidth - 200)}
              loading={<div className="text-taupe">Loading page...</div>}
            />
          </Document>
        </div>

        {/* Finding Highlights Overlay */}
        {showFindings && findings.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {findings.map((finding) => (
              <div
                key={finding.id}
                className={`absolute border-2 rounded transition-all ${
                  activeFindingId === finding.id 
                    ? "border-status-error animate-pulse" 
                    : "border-status-warning/50"
                }`}
                style={{
                  left: `${finding.boundingBox?.x || 10}%`,
                  top: `${finding.boundingBox?.y || 10}%`,
                  width: `${finding.boundingBox?.width || 20}%`,
                  height: `${finding.boundingBox?.height || 10}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFinding(finding);
                }}
              />
            ))}
          </div>
        )}

        {/* Page Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-ivory/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded hover:bg-mocha/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-espresso">
            Page {pageNumber} of {numPages || "?"}
          </span>
          <button
            onClick={goToNextPage}
            disabled={!numPages || pageNumber >= numPages}
            className="p-1.5 rounded hover:bg-mocha/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Active Finding Details */}
      {activeFinding && (
        <div className="p-3 border-t border-mocha/10 bg-lavender/50">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-status-warning" />
            <h4 className="text-sm font-medium text-espresso">
              {activeFinding.title}
            </h4>
          </div>
          <div className="text-xs text-taupe space-y-1">
            <p>
              <strong>Type:</strong> {activeFinding.type.replace("_", " ")}
            </p>
            <p>
              <strong>Confidence:</strong> {(activeFinding.confidenceScore * 100).toFixed(1)}%
            </p>
            <p>
              <strong>Severity:</strong> {activeFinding.severity}
            </p>
            <p className="mt-2">
              {activeFinding.observedEvidence}
            </p>
            <p className="text-status-warning/70 text-xs italic mt-2">
              {activeFinding.limitationDisclaimer}
            </p>
          </div>
        </div>
      )}

      {/* No Findings */}
      {findings.length === 0 && (
        <div className="p-3 border-t border-mocha/10 bg-status-success/10 text-center">
          <CheckCircle2 className="w-5 h-5 text-status-success mx-auto mb-1" />
          <p className="text-sm text-status-success">
            No forensic findings detected
          </p>
        </div>
      )}
    </div>
  );
}

export default DocumentViewer;
