import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function EditorialHero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-end overflow-hidden bg-[#1D1C1A]">
      {/* 1. Full-Width Background Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/editorial/brand-hero.jpg"
          alt="RAPHÈLO Atmospheric Fragrance Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft atmospheric gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1C1A]/85 via-[#1D1C1A]/30 to-transparent" />
      </div>

      {/* 2. Minimalist Bottom-Aligned Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-20 pt-32">
        <div className="max-w-2xl">
          <span className="inline-block text-[11px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#F4F0E8]/80 mb-4 font-medium">
            Contemporary Fragrance House
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F4F0E8] font-normal tracking-tight leading-[1.08] mb-8 drop-shadow-xs">
            Fragrance for the spaces between moments.
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button
              href="/shop"
              variant="white"
              size="lg"
              className="w-full sm:w-auto shadow-md"
            >
              Explore Fragrances
            </Button>
            <Button
              href="/discovery-sets"
              variant="white-outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Sample Discovery Set
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
