import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { COLLECTIONS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Curated fragrance atmospheres organized by concept, materiality, and emotional tone.",
};

export default function CollectionsPage() {
  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Atmospheric Curations
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          COLLECTIONS
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Each collection explores a distinct facet of atmosphere—from clean morning light to shadowed dusk, tactile wood, and rain-drenched earth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {COLLECTIONS.map((col) => (
          <div
            key={col.slug}
            className="group flex flex-col bg-[#E9E3D9]/40 border border-[#C8BDAF]/30 overflow-hidden text-left"
          >
            <Link
              href={`/collections/${col.slug}`}
              className="relative aspect-16/10 sm:aspect-3/2 w-full overflow-hidden bg-[#E9E3D9] block"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>

            <div className="p-6 sm:p-8 flex flex-col justify-between grow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors">
                    {col.title}
                  </h2>
                  <span className="text-[11px] uppercase tracking-widest text-[#68645E]">
                    {col.count} {col.count === 1 ? "Creation" : "Creations"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-[#68645E] leading-relaxed mb-6 font-light">
                  {col.description}
                </p>
              </div>

              <div>
                <Link
                  href={`/collections/${col.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
