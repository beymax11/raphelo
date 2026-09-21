import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { CATEGORIES, getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore RAPHÈLO fragrances organized by olfactive family: Floral, Woody, Amber, Fresh, Musk, and Spicy.",
};

export default function CategoriesPage() {
  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Olfactive Classification
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          CATEGORIES
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Fragrance structures grouped by their dominant botanical, resinous, or atmospheric family.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {CATEGORIES.map((cat) => {
          const matching = getProductsByCategory(cat.slug);
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/30 hover:border-[#1D1C1A] transition-colors text-left flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#68645E] block mb-2 font-medium">
                  {matching.length} {matching.length === 1 ? "Fragrance" : "Fragrances"}
                </span>
                <h2 className="font-serif text-3xl text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors mb-3">
                  {cat.name}
                </h2>
                <p className="text-xs sm:text-sm font-sans text-[#68645E] leading-relaxed font-light">
                  {cat.description}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#1D1C1A] group-hover:text-[#A8735B] font-medium">
                <span>View Category</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}
