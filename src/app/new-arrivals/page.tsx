import React from "react";
import { Metadata } from "next";
import PageContainer from "@/components/layout/PageContainer";
import ProductGrid from "@/components/product/ProductGrid";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "Recently formulated atmospheres and seasonal extraits from RAPHÈLO.",
};

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals();

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Recent Formulations
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          NEW ARRIVALS
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          The latest additions to the RAPHÈLO catalog, capturing recent sensory explorations in light, warmth, and architecture.
        </p>
      </div>

      <ProductGrid products={newArrivals} />
    </PageContainer>
  );
}
