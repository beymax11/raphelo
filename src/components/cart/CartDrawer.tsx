"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import CartItem from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    itemCount,
    subtotal,
    shippingThreshold,
    shippingCost,
    total,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / shippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1D1C1A]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#F4F0E8] h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-right duration-300 z-10 border-l border-[#C8BDAF]/40">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#C8BDAF]/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#1D1C1A]" />
              <h3 className="font-serif text-2xl text-[#1D1C1A]">
                Your Selection
              </h3>
              <span className="text-xs text-[#68645E]">({itemCount})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#68645E] hover:text-[#1D1C1A] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="py-4 border-b border-[#C8BDAF]/20">
            <p className="text-xs text-[#68645E] mb-2 font-light">
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#707462] font-medium">
                  Complimentary delivery unlocked.
                </span>
              ) : (
                <>
                  Add{" "}
                  <strong className="text-[#1D1C1A] font-medium">
                    {formatPrice(remainingForFreeShipping)}
                  </strong>{" "}
                  more for complimentary delivery.
                </>
              )}
            </p>
            <div className="w-full h-1 bg-[#E9E3D9] overflow-hidden">
              <div
                className="h-full bg-[#A8735B] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List / Empty State */}
          <div className="py-2">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif text-2xl text-[#1D1C1A] mb-2 italic">
                  “Your cart is quiet.”
                </p>
                <p className="text-xs font-sans text-[#68645E] mb-6 max-w-xs mx-auto">
                  Your collection is waiting for its first scent.
                </p>
                <Button
                  href="/shop"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Explore Fragrances
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-transparent">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onNavigate={() => setIsCartOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer / Summary (if items exist) */}
        {items.length > 0 && (
          <div className="pt-6 border-t border-[#C8BDAF]/30 space-y-4">
            <div className="space-y-1.5 text-xs text-[#68645E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1D1C1A] font-medium font-sans">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-[#707462]">Complimentary</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#1D1C1A] pt-2 border-t border-[#C8BDAF]/20 font-medium">
                <span>Estimated Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                href="/checkout"
                fullWidth
                onClick={() => setIsCartOpen(false)}
                className="py-3.5"
              >
                Proceed to Checkout
              </Button>

              {/* View All Cart Button as required in prompt */}
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 text-center block text-[11px] font-sans uppercase tracking-[0.16em] text-[#1D1C1A] bg-[#E9E3D9] hover:bg-[#C8BDAF] transition-colors font-medium"
              >
                View All Cart
              </Link>
            </div>

            <p className="text-[10px] text-center text-[#68645E]/80 tracking-wide font-light">
              Taxes calculated at checkout · Safe & encrypted transaction
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
