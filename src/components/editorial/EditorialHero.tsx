import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function EditorialHero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F4F0E8]">
      {/* Background Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/editorial/brand-hero.jpg"
          alt="RAPHÈLO Atmospheric Fragrance Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Soft natural gradient overlay to enhance typography contrast while maintaining warm light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F0E8] via-[#F4F0E8]/40 to-transparent" />
        <div className="absolute inset-0 bg-[#F4F0E8]/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <span className="inline-block text-[11px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#1D1C1A] mb-4 sm:mb-6 font-medium">
          Contemporary Fragrance House
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#1D1C1A] font-normal tracking-tight leading-[1.1] mb-6 sm:mb-8">
          Fragrance for the spaces between moments.
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-lg text-[#1D1C1A]/90 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10">
          RAPHÈLO creates contemporary scents shaped by memory, atmosphere, and the quiet details of everyday life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/shop" size="lg" className="w-full sm:w-auto">
            Explore Fragrances
          </Button>
          <Button
            href="/about"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-[#F4F0E8]/70 backdrop-blur-xs"
          >
            Discover RAPHÈLO
          </Button>
        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E]">
          Explore
        </span>
        <div className="w-px h-8 bg-[#1D1C1A]/40 animate-pulse" />
      </div>
    </section>
  );
}
