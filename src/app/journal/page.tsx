import React from "react";
import { Metadata } from "next";
import PageContainer from "@/components/layout/PageContainer";
import StoryCard from "@/components/editorial/StoryCard";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal — Essays & Atmospheric Studies",
  description:
    "Reflections on the architecture of scent, olfactory memory, and contemporary design by RAPHÈLO.",
};

export default function JournalPage() {
  const categories = ["All", "Fragrance", "Culture", "Materials", "Stories"];

  return (
    <PageContainer>
      {/* Header */}
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Editorial Publication
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          JOURNAL
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Essays on olfactive memory, structural botany, and the atmospheres that shape everyday rituals.
        </p>

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto pt-6">
          {categories.map((cat, idx) => (
            <span
              key={cat}
              className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.14em] cursor-pointer transition-colors ${
                idx === 0
                  ? "bg-[#1D1C1A] text-[#F4F0E8]"
                  : "bg-[#E9E3D9]/60 text-[#1D1C1A] hover:bg-[#E9E3D9]"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
        {JOURNAL_ARTICLES.map((article) => (
          <StoryCard key={article.slug} article={article} />
        ))}
      </div>
    </PageContainer>
  );
}
