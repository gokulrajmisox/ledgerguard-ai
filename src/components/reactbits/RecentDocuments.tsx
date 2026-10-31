"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, Eye, ArrowRight, ChevronLeft, ChevronRight, ShieldAlert, CheckCircle2 } from "lucide-react";
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
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, [documents, scrollPosition]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      setScrollPosition(e.currentTarget.scrollLeft);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reconciled":
        return "badge-success";
      case "discrepant":
      case "duplicate_suspect":
        return "badge-error";
      case "investigating":
        return "badge-warning";
      default:
        return "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-[#E5E4E2] text-[#30231D]";
    }
  };

  const getDocumentAccent = (index: number) => {
    const accents = [
      "from-[#6F4E37]/15 to-[#6F4E37]/5 border-[#6F4E37]/30",
      "from-[#E6E0F0]/60 to-[#E6E0F0]/20 border-[#D8D0E5]",
      "from-[#E5E4E2]/80 to-[#E5E4E2]/30 border-[#D7D0C9]",
      "from-[#25663B]/15 to-[#25663B]/5 border-[#B7DEC3]",
    ];
    return accents[index % accents.length];
  };

  return (
    <div className="w-full h-full flex flex-col">
      {documents.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-[#5C4F47] font-medium py-12">
          <p>No recent documents in repository</p>
        </div>
      ) : (
        <>
          {/* Carousel Container */}
          <div className="flex-1 flex items-center relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-white border border-[#D7D0C9] flex items-center justify-center text-[#30231D] hover:text-[#6F4E37] hover:border-[#6F4E37] hover:scale-105 active:scale-95 transition-all z-10 shadow-md mr-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Carousel Cards */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex-1 overflow-x-auto scroll-smooth py-2"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex gap-4 px-1">
                {documents.map((doc, index) => (
                  <div
                    key={doc.id}
                    className="flex-shrink-0 w-72 bg-white border border-[#D7D0C9] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-[#6F4E37] hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
                    onClick={() => router.push(`/document-check?invoice=${doc.id}`)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        router.push(`/document-check?invoice=${doc.id}`);
                      }
                    }}
                  >
                    {/* Document Top Banner */}
                    <div
                      className={`h-28 bg-gradient-to-br ${getDocumentAccent(index)} p-3.5 flex flex-col justify-between border-b`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#30231D] bg-white/90 px-2 py-0.5 rounded shadow-xs">
                          {doc.invoiceNumber}
                        </span>
                        <span className={getStatusBadge(doc.status)}>
                          {doc.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#5C4F47]">
                        <FileText className="w-4 h-4 text-[#6F4E37]" />
                        <span className="truncate">{doc.vendorName}</span>
                      </div>
                    </div>

                    {/* Document Info Body */}
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#5C4F47]">AMOUNT</span>
                        <span className="text-lg font-bold text-[#30231D] font-mono">
                          {formatCurrency(doc.totalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EDE8DE]">
                        <span className="text-[#5C4F47]">Issue Date</span>
                        <span className="font-semibold text-[#30231D]">
                          {formatDate(doc.issueDate)}
                        </span>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#6F4E37]">
                        <span>Inspect Document</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-white border border-[#D7D0C9] flex items-center justify-center text-[#30231D] hover:text-[#6F4E37] hover:border-[#6F4E37] hover:scale-105 active:scale-95 transition-all z-10 shadow-md ml-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Micro Caption */}
          <div className="text-center py-2 text-xs font-mono text-[#5C4F47] font-medium">
            DRAG OR CLICK SPECIMEN CARD TO ENTER FORENSICS LAB
          </div>
        </>
      )}
    </div>
  );
}

export default RecentDocuments;
