import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function DiscoverySetPromo() {
  return (
    <section className="py-20 sm:py-28 bg-[#F4F0E8] border-b border-[#C8BDAF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E9E3D9]/70 border border-[#C8BDAF]/40 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Content Side */}
          <div className="lg:col-span-6 text-left">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] mb-3 block font-medium">
              The Introduction
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
              Meet RAPHÈLO
            </h2>

            <p className="font-serif italic text-lg sm:text-xl text-[#A8735B] mb-6">
              Six fragrances. Six atmospheres. One introduction to the house.
            </p>

            <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed mb-8 max-w-md font-light">
              Experience the complete collection in 2ml glass flacons. Each set includes an invitation voucher redeemable for the full amount toward your first 100ml flacon.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button href="/product/discovery-set" size="lg">
                Explore Discovery Set · $45
              </Button>
              <span className="text-xs text-[#68645E] font-light">
                Complimentary delivery included
              </span>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-4/3 overflow-hidden bg-[#F4F0E8] border border-[#C8BDAF]/30">
            <Image
              src="/images/products/discovery-set.jpg"
              alt="RAPHÈLO Discovery Set"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
