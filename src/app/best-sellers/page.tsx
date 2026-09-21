import React from "react";
import { Metadata } from "next";
import PageContainer from "@/components/layout/PageContainer";
import ProductGrid from "@/components/product/ProductGrid";
import { getBestSellers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Best Sellers",
  description:
    "The most embraced atmospheres from the RAPHÈLO catalog.",
};

export default function BestSellersPage() {
  const bestSellers = getBestSellers();

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          House Icons
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          BEST SELLERS
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Compositions that have resonated deeply with collectors worldwide, distinguished by enduring skin presence and quiet distinction.
        </p>
      </div>

      <ProductGrid products={bestSellers} />
    </PageContainer>
  );
}
