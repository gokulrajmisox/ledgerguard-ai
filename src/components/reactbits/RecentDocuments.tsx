"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Document {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  totalAmount: number;
  status: string;
  issueDate: string;
}

interface RecentDocumentsProps {
  documents: Document[];
}

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Calculate if scrolling is possible
  useEffect(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, [documents, scrollPosition]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      setScrollPosition(e.currentTarget.scrollLeft);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reconciled":
        return "bg-status-success/20 text-status-success border border-status-success/30";
      case "discrepant":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      case "investigating":
        return "bg-status-warning/20 text-status-warning border border-status-warning/30";
      case "duplicate_suspect":
        return "bg-status-error/20 text-status-error border border-status-error/30";
      default:
        return "bg-platinum text-taupe";
    }
  };

  // Generate realistic document preview colors
  const getDocumentColor = (index: number) => {
    const colors = [
      "from-mocha/10 to-mocha/20",
      "from-taupe/10 to-taupe/20",
      "from-platinum to-platinum/80",
      "from-lavender/50 to-lavender/80",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full h-full flex flex-col">
      {documents.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-taupe/70">
          <p>No recent documents</p>
        </div>
      ) : (
        <>
          {/* Carousel Container */}
          <div className="flex-1 flex items-center">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-ivory border border-mocha/20 flex items-center justify-center text-mocha hover:bg-mocha/5 transition-colors z-10 shadow-md mr-3"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Carousel */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex-1 overflow-x-auto scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex gap-4 px-2">
                {documents.map((doc, index) => (
                  <div
                    key={doc.id}
                    className="flex-shrink-0 w-64 bg-ivory border border-mocha/10 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-mocha hover:shadow-md"
                    onClick={() => router.push(`/document-check?invoice=${doc.id}`)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        router.push(`/document-check?invoice=${doc.id}`);
                      }
                    }}
                  >
                    {/* Document Preview */}
                    <div
                      className={`h-36 bg-gradient-to-br ${getDocumentColor(index)} flex items-center justify-center`}
                    >
                      <FileText className="w-10 h-10 text-mocha/30" />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(doc.status)}`}
                        >
                          {doc.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {/* Document Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-espresso truncate">
                          {doc.invoiceNumber}
                        </h4>
                        <Eye className="w-4 h-4 text-taupe" />
                      </div>
                      <p className="text-sm text-taupe truncate">{doc.vendorName}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-mocha">
                          {formatCurrency(doc.totalAmount)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-mocha" />
                      </div>
                      <p className="text-xs text-taupe/70 mt-1">
                        {formatDate(doc.issueDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-ivory border border-mocha/20 flex items-center justify-center text-mocha hover:bg-mocha/5 transition-colors z-10 shadow-md ml-3"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 py-3">
            {documents.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  Math.abs(
                    (carouselRef.current?.scrollLeft || 0) - index * 280
                  ) < 140
                    ? "bg-mocha"
                    : "bg-mocha/20"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Instructions */}
      <div className="text-center py-2">
        <p className="text-xs text-taupe/70">
          Drag to scroll or use arrow buttons
        </p>
      </div>
    </div>
  );
}

export default RecentDocuments;
