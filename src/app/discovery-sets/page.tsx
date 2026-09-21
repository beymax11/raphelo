import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { getDiscoverySets } from "@/lib/products";

export const metadata: Metadata = {
  title: "Discovery Sets",
  description:
    "Explore RAPHÈLO fragrances at your own rhythm with curated sampler sets and miniature collections.",
};

export default function DiscoverySetsPage() {
  const sets = getDiscoverySets();

  return (
    <PageContainer>
      {/* Header */}
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Sensory Exploration
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          DISCOVERY SETS
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-xl font-light leading-relaxed">
          The most intimate way to experience RAPHÈLO. Experience how each creation evolves on your skin across hours, environments, and temperaments.
        </p>
      </div>

      {/* Featured Discovery Hero */}
      <div className="bg-[#E9E3D9]/60 border border-[#C8BDAF]/40 p-8 sm:p-12 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 relative aspect-16/10 sm:aspect-4/3 overflow-hidden bg-[#F4F0E8] border border-[#C8BDAF]/30">
          <Image
            src="/images/products/discovery-set.jpg"
            alt="Meet RAPHÈLO Discovery Set"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-5 text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
            Signature Introduction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-3">
            Meet RAPHÈLO
          </h2>
          <p className="font-serif italic text-lg text-[#A8735B] mb-4">
            Six fragrances. Six atmospheres. One introduction.
          </p>
          <p className="text-xs sm:text-sm font-sans text-[#68645E] leading-relaxed mb-6 font-light">
            Includes 2ml atomizers of Halo, Ember Veil, Still Room, Late Light, Sable, and After Rain, housed in a textured tactile ivory box with an olfactive guide booklet.
          </p>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-serif text-[#1D1C1A]">$45</span>
            <span className="text-xs text-[#707462]">
              Includes $45 voucher towards full flacon
            </span>
          </div>
          <Button href="/product/discovery-set" size="lg">
            Purchase Discovery Set
          </Button>
        </div>
      </div>

      {/* Sets Grid */}
      <div className="mb-20 text-left">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] mb-8">
          Available Sets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {sets.map((set) => (
            <ProductCard key={set.id} product={set} />
          ))}
        </div>
      </div>

      {/* Educational Guide: How Discovery Works */}
      <div className="border-t border-[#C8BDAF]/30 pt-16 text-left">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
            The Protocol
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-4">
            How to Experience a Discovery Set
          </h3>
          <p className="text-sm font-sans text-[#68645E] font-light leading-relaxed">
            Scent is an intimate dialogue with human skin chemistry. To truly understand a fragrance, follow our studio recommendations:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#E9E3D9]/30 border border-[#C8BDAF]/30">
            <span className="font-serif text-3xl text-[#A8735B] block mb-3">
              01
            </span>
            <h4 className="font-serif text-xl text-[#1D1C1A] mb-2">
              One Atmosphere Per Day
            </h4>
            <p className="text-xs text-[#68645E] leading-relaxed">
              Avoid testing multiple fragrances simultaneously on the same arm. Wear a single scent from morning to evening to observe its complete evaporation curve.
            </p>
          </div>

          <div className="p-6 bg-[#E9E3D9]/30 border border-[#C8BDAF]/30">
            <span className="font-serif text-3xl text-[#A8735B] block mb-3">
              02
            </span>
            <h4 className="font-serif text-xl text-[#1D1C1A] mb-2">
              Observe Changing Light
            </h4>
            <p className="text-xs text-[#68645E] leading-relaxed">
              Notice how the heart notes reveal themselves during the afternoon, and how the base notes linger intimately on pulse points and clothing after sunset.
            </p>
          </div>

          <div className="p-6 bg-[#E9E3D9]/30 border border-[#C8BDAF]/30">
            <span className="font-serif text-3xl text-[#A8735B] block mb-3">
              03
            </span>
            <h4 className="font-serif text-xl text-[#1D1C1A] mb-2">
              Redeem Your Voucher
            </h4>
            <p className="text-xs text-[#68645E] leading-relaxed">
              Once you have found the atmosphere that resonates with your spirit, apply your included credit towards any full 50ml or 100ml flacon.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
