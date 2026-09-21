"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "RAP-2026-9042";

  return (
    <PageContainer size="narrow">
      <div className="py-12 sm:py-20 text-center bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-8 sm:p-16">
        <CheckCircle className="w-12 h-12 text-[#707462] mx-auto mb-6" />

        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
          Thank you for your order.
        </h1>

        <p className="text-sm sm:text-base font-sans text-[#68645E] max-w-md mx-auto font-light leading-relaxed mb-8">
          Your olfactory order has been received by our laboratory. A detailed confirmation and courier tracking link has been sent to your email.
        </p>

        {/* Order Details Card */}
        <div className="max-w-md mx-auto p-6 bg-[#F4F0E8] border border-[#C8BDAF]/50 text-left mb-10 space-y-3">
          <div className="flex justify-between text-xs pb-3 border-b border-[#C8BDAF]/30">
            <span className="text-[#68645E]">Order Reference</span>
            <span className="font-mono font-medium text-[#1D1C1A]">
              {orderNumber}
            </span>
          </div>
          <div className="flex justify-between text-xs pb-3 border-b border-[#C8BDAF]/30">
            <span className="text-[#68645E]">Estimated Delivery</span>
            <span className="text-[#1D1C1A]">2–4 Business Days</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#68645E]">Courier</span>
            <span className="text-[#1D1C1A]">Carbon-Neutral Priority</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/account/orders" variant="outline">
            View Order
          </Button>
          <Button href="/shop">
            Continue Shopping
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
