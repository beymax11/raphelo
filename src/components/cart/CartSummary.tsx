"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export default function CartSummary({
  showCheckoutButton = true,
}: CartSummaryProps) {
  const {
    subtotal,
    shippingCost,
    total,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const result = applyPromoCode(inputCode);
    setPromoMessage({
      text: result.message,
      isError: !result.success,
    });
    if (result.success) {
      setInputCode("");
    }
  };

  return (
    <div className="bg-[#E9E3D9]/50 border border-[#C8BDAF]/40 p-6 sm:p-8 text-left">
      <h3 className="font-serif text-2xl text-[#1D1C1A] mb-6 pb-4 border-b border-[#C8BDAF]/30">
        Order Summary
      </h3>

      {/* Breakdown */}
      <div className="space-y-3 text-xs font-sans text-[#68645E] pb-6 border-b border-[#C8BDAF]/30">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-[#1D1C1A] font-medium font-sans">
            {formatPrice(subtotal / (1 - promoDiscount || 1))}
          </span>
        </div>

        {promoDiscount > 0 && (
          <div className="flex justify-between text-[#A8735B]">
            <span>Privilege Discount ({promoDiscount * 100}%)</span>
            <span>
              -
              {formatPrice(
                (subtotal / (1 - promoDiscount)) * promoDiscount
              )}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Delivery</span>
          <span>
            {shippingCost === 0 ? (
              <span className="text-[#707462] font-medium">Complimentary</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>
          <span className="text-[#68645E]">Calculated at checkout</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="py-6 border-b border-[#C8BDAF]/30">
        {promoCode ? (
          <div className="flex items-center justify-between bg-[#F4F0E8] p-3 border border-[#C8BDAF]/50">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#68645E] block">
                Applied Privilege
              </span>
              <span className="text-xs font-sans font-medium text-[#1D1C1A]">
                {promoCode}
              </span>
            </div>
            <button
              type="button"
              onClick={removePromoCode}
              className="text-xs text-[#A8735B] hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Privilege code (e.g. WELCOME10)"
              className="grow bg-[#F4F0E8] border border-[#C8BDAF] px-3.5 py-2.5 text-xs text-[#1D1C1A] placeholder-[#68645E]/60 focus:outline-none focus:border-[#1D1C1A]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#1D1C1A] text-[#F4F0E8] text-[10px] uppercase tracking-[0.16em] hover:bg-[#68645E] transition-colors"
            >
              Apply
            </button>
          </form>
        )}
        {promoMessage && (
          <p
            className={`text-[11px] mt-2 ${
              promoMessage.isError ? "text-red-600" : "text-[#707462]"
            }`}
          >
            {promoMessage.text}
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline py-6">
        <span className="font-serif text-xl text-[#1D1C1A]">Total</span>
        <span className="font-sans text-2xl text-[#1D1C1A] font-medium">
          {formatPrice(total)}
        </span>
      </div>

      {showCheckoutButton && (
        <div className="space-y-3">
          <Button href="/checkout" fullWidth className="py-4">
            Proceed to Checkout
          </Button>

          <Link
            href="/shop"
            className="block text-center text-xs font-sans uppercase tracking-[0.15em] text-[#68645E] hover:text-[#1D1C1A] pt-2"
          >
            ← Continue Browsing
          </Link>
        </div>
      )}
    </div>
  );
}
