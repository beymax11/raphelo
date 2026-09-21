import React from "react";
import Link from "next/link";
import EditorialHero from "@/components/editorial/EditorialHero";
import FeaturedFragrance from "@/components/editorial/FeaturedFragrance";
import BrandStatement from "@/components/editorial/BrandStatement";
import DiscoverySetPromo from "@/components/editorial/DiscoverySetPromo";
import StoryCard from "@/components/editorial/StoryCard";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { JOURNAL_ARTICLES } from "@/lib/journal";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const coreFragrances = PRODUCTS.filter((p) => p.family !== "Discovery");
  const journalPreviews = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO */}
      <EditorialHero />

      {/* 2. FEATURED FRAGRANCE (HALO) */}
      <FeaturedFragrance />

      {/* 3. THE COLLECTION */}
      <section className="py-20 sm:py-28 bg-[#F4F0E8] border-b border-[#C8BDAF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
                The House Catalog
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight">
                THE COLLECTION
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 sm:mt-0 inline-block text-xs uppercase tracking-[0.18em] font-sans text-[#1D1C1A] hover:text-[#A8735B] border-b border-[#1D1C1A] pb-0.5 transition-colors"
            >
              View All Fragrances ({coreFragrances.length})
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
            {coreFragrances.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/shop" size="lg" variant="outline">
              Explore Complete Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* 4. BRAND STATEMENT */}
      <BrandStatement />

      {/* 5. DISCOVERY SET */}
      <DiscoverySetPromo />

      {/* 6. JOURNAL PREVIEW */}
      <section className="py-20 sm:py-28 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
                Olfactory Journal
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight">
                Essays & Atmospheric Studies
              </h2>
            </div>
            <Link
              href="/journal"
              className="mt-4 sm:mt-0 inline-block text-xs uppercase tracking-[0.18em] font-sans text-[#1D1C1A] hover:text-[#A8735B] border-b border-[#1D1C1A] pb-0.5 transition-colors"
            >
              Read All Stories
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {journalPreviews.map((article) => (
              <StoryCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
