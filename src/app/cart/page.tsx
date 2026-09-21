"use client";

import React from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, itemCount, clearCart } = useCart();

  return (
    <PageContainer>
      {/* Header */}
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Review Your Selection
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-2">
          SHOPPING CART
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E]">
          {itemCount} {itemCount === 1 ? "creation" : "creations"} in your personal selection.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-12">
          <p className="font-serif text-3xl text-[#1D1C1A] mb-3 italic">
            “Your cart is quiet.”
          </p>
          <p className="text-sm font-sans text-[#68645E] max-w-sm mx-auto mb-8 font-light">
            Your collection is waiting for its first scent. Discover our house fragrances or sample the complete line with the Meet RAPHÈLO Discovery Set.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/shop" size="lg">
              Explore All Fragrances
            </Button>
            <Button href="/discovery-sets" variant="outline" size="lg">
              Discovery Sets
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#C8BDAF]/30 text-xs uppercase tracking-[0.16em] text-[#68645E]">
              <span>Product Selection</span>
              <button
                onClick={clearCart}
                className="hover:text-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="divide-y divide-transparent">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-8">
              <Link
                href="/shop"
                className="inline-block text-xs uppercase tracking-[0.16em] text-[#1D1C1A] hover:text-[#A8735B] underline"
              >
                ← Continue Browsing Collections
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 sticky top-28">
            <CartSummary />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
