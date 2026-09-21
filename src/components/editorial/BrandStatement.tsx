import React from "react";
import Image from "next/image";
import Link from "next/link";
import RapheloMonogram from "@/components/brand/RapheloMonogram";

export default function BrandStatement() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#E9E3D9]/60 overflow-hidden border-b border-[#C8BDAF]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <RapheloMonogram size={36} className="text-[#1D1C1A]" />
        </div>

        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-6 font-medium">
          The Philosophy of Atmosphere
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1D1C1A] leading-[1.2] tracking-normal mb-8 max-w-3xl mx-auto font-normal">
          Some memories disappear. <br className="hidden sm:inline" />
          Their scent doesn’t.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#68645E] max-w-xl mx-auto leading-relaxed font-light mb-10">
          We formulate fragrances as architectural atmospheres—composed of shadows, raw botanical extractions, natural daylight, and the tactile memory of spaces left behind.
        </p>

        <div>
          <Link
            href="/about"
            className="inline-block text-xs uppercase tracking-[0.2em] font-sans text-[#1D1C1A] border-b border-[#1D1C1A] pb-1 hover:text-[#A8735B] hover:border-[#A8735B] transition-colors"
          >
            Read Our Story & Process
          </Link>
        </div>
      </div>

      {/* Atmospheric subtle background element */}
      <div className="absolute -bottom-10 right-10 w-72 h-72 rounded-full bg-[#A8735B]/5 blur-3xl pointer-events-none" />
    </section>
  );
}
