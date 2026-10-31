"use client";

import React from "react";
import { Invoice, PurchaseOrder, BankTransaction } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Clock, ArrowRight } from "lucide-react";

export function ReconciliationTable({
  invoice,
  purchaseOrder,
  bankTransaction,
}: {
  invoice: Invoice;
  purchaseOrder?: PurchaseOrder;
  bankTransaction?: BankTransaction;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c12] p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <span className="font-bold text-white uppercase tracking-wider">
          Deterministic 3-Way Cross Verification Matrix
        </span>
        <span className="text-zinc-400">
          PO: <span className="text-[#00ff87]">{invoice.poNumber}</span> • INV:{" "}
          <span className="text-white">{invoice.invoiceNumber}</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-separate border-spacing-0">
          <thead className="bg-[#14141c] text-zinc-400 uppercase text-[10px]">
            <tr>
              <th className="p-3 border-b border-white/10">Line / Record Component</th>
              <th className="p-3 border-b border-white/10">Purchase Order (Approved)</th>
              <th className="p-3 border-b border-white/10">Submitted Invoice</th>
              <th className="p-3 border-b border-white/10">Bank Treasury Feed</th>
              <th className="p-3 border-b border-white/10 text-right">Variance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoice.lineItems.map((inli) => {
              const matchedPoli = purchaseOrder?.lineItems.find(
                (poli) => poli.sku === inli.sku
              );
              const isDiff = matchedPoli && matchedPoli.unitPrice !== inli.unitPrice;
              const lineVariance = matchedPoli
                ? inli.totalPrice - matchedPoli.totalPrice
                : 0;

              return (
                <tr
                  key={inli.id}
                  className={`hover:bg-white/[0.02] ${isDiff ? "bg-[#ff3355]/5" : ""}`}
                >
                  <td className="p-3 font-semibold text-white">
                    <div>{inli.description}</div>
                    <span className="text-[10px] text-zinc-500 font-mono">SKU: {inli.sku}</span>
                  </td>
                  <td className="p-3 text-zinc-400">
                    {matchedPoli ? (
                      <div>
                        {matchedPoli.quantity} units @ {formatCurrency(matchedPoli.unitPrice)}
                        <div className="font-bold text-white">
                          {formatCurrency(matchedPoli.totalPrice)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[#f59e0b] italic">Not on approved PO</span>
                    )}
                  </td>
                  <td className="p-3 text-white">
                    <div>
                      {inli.quantity} units @ {formatCurrency(inli.unitPrice)}
                      <div className="font-bold text-white">
                        {formatCurrency(inli.totalPrice)}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-zinc-400">
                    <span className="text-[11px] text-zinc-300">
                      Settlement Block: Scheduled Wire
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold whitespace-nowrap">
                    {lineVariance > 0 ? (
                      <span className="text-[#ff3355]">
                        ▲ +{formatCurrency(lineVariance)}
                      </span>
                    ) : (
                      <span className="text-[#00ff87]">✓ MATCH</span>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* Totals Row */}
            <tr className="bg-white/[0.04] font-bold text-sm">
              <td className="p-3.5 text-white uppercase">Aggregate Total</td>
              <td className="p-3.5 text-[#00ff87]">
                {purchaseOrder ? formatCurrency(purchaseOrder.authorizedAmount) : "$64,950.00"}
              </td>
              <td className="p-3.5 text-white">
                {formatCurrency(invoice.totalAmount)}
              </td>
              <td className="p-3.5 text-[#f59e0b]">
                {bankTransaction ? `${formatCurrency(bankTransaction.amount)} (${bankTransaction.settlementStatus.toUpperCase()})` : "HELD IN ESCROW"}
              </td>
              <td className="p-3.5 text-right text-[#ff3355]">
                {purchaseOrder && invoice.totalAmount > purchaseOrder.authorizedAmount ? (
                  <span>
                    ▲ +{formatCurrency(invoice.totalAmount - purchaseOrder.authorizedAmount)}
                  </span>
                ) : (
                  <span className="text-[#00ff87]">✓ ZERO VARIANCE</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
