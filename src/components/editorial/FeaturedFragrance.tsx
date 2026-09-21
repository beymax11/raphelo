import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function FeaturedFragrance() {
  return (
    <section className="py-20 sm:py-28 bg-[#F4F0E8] border-b border-[#C8BDAF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="lg:col-span-7 relative aspect-square sm:aspect-4/3 lg:aspect-5/4 overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
            <Image
              src="/images/products/halo.jpg"
              alt="HALO by RAPHÈLO"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-[#1D1C1A] text-[#F4F0E8] text-[9px] uppercase tracking-[0.25em] font-medium">
                Featured Creation
              </span>
            </div>
          </div>

          {/* Product Information Side */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] mb-2 block">
              Musky Floral · Eau de Parfum
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
              HALO
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-[#A8735B] mb-6">
              “Clean morning light.”
            </p>

            <p className="text-sm sm:text-base font-sans text-[#68645E] font-light leading-relaxed mb-8 max-w-md">
              A luminous halo of crystalline iris, fresh white tea, and soft cashmere wood that settles like clean morning light entering tall linen curtains. An intimate second-skin aura.
            </p>

            {/* Olfactive Summary Notes */}
            <div className="border-y border-[#C8BDAF]/40 py-4 mb-8 grid grid-cols-3 gap-2 text-left">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#68645E] block">
                  Top
                </span>
                <span className="text-xs font-serif text-[#1D1C1A]">
                  Bergamot · White Tea
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#68645E] block">
                  Heart
                </span>
                <span className="text-xs font-serif text-[#1D1C1A]">
                  Iris · Cashmere
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#68645E] block">
                  Base
                </span>
                <span className="text-xs font-serif text-[#1D1C1A]">
                  Soft Musk · Wood
                </span>
              </div>
            </div>

            <div>
              <Button href="/product/halo" size="lg">
                Explore HALO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
