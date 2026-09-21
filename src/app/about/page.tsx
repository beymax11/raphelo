import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
import RapheloMonogram from "@/components/brand/RapheloMonogram";

export const metadata: Metadata = {
  title: "About RAPHÈLO — The House & Philosophy",
  description:
    "Discover RAPHÈLO, a contemporary fragrance house shaped by memory, atmosphere, and the quiet details of everyday life.",
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Editorial Hero */}
      <section className="relative py-24 sm:py-36 bg-[#E9E3D9]/60 border-b border-[#C8BDAF]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-6">
            <RapheloMonogram size={38} className="text-[#1D1C1A]" />
          </div>
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-4 font-medium">
            The House of RAPHÈLO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#1D1C1A] tracking-tight mb-8">
            Quiet confidence over loud luxury.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#A8735B] max-w-2xl mx-auto leading-relaxed">
            “A fragrance is not simply something you wear. It is an atmosphere you carry.”
          </p>
        </div>
      </section>

      {/* 1. THE HOUSE */}
      <section className="py-20 sm:py-28 border-b border-[#C8BDAF]/30">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
                Chapter 01
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-6">
                THE HOUSE
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light mb-6">
                RAPHÈLO was founded on a singular conviction: traditional perfumery has become increasingly theatrical, relying on bombastic projection, gilded bottles, and celebrity facades. In contrast, the most profound moments in life occur in stillness.
              </p>
              <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light">
                We craft fragrances for those who appreciate understated distinction. Operating between our botanical sourcing partners in Grasse and our creative studio in Paris, RAPHÈLO explores the delicate architecture of scent as an intimate sensory space.
              </p>
            </div>

            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-5/4 overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/products/halo.jpg"
                alt="The House of RAPHÈLO"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. OUR PHILOSOPHY */}
      <section className="py-20 sm:py-28 bg-[#E9E3D9]/40 border-b border-[#C8BDAF]/30">
        <PageContainer size="narrow">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
              Chapter 02
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-6">
              OUR PHILOSOPHY
            </h2>
            <p className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              Scent as atmosphere and memory.
            </p>
            <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light max-w-2xl mx-auto mb-6">
              Unlike visual images which can be cataloged or captured through a lens, olfactory experiences are intrinsically ephemeral. They bypass intellectual cognition and connect directly with the limbic system—evoking memories of sun-warmed travertine, rain on asphalt, or a quiet room after someone departs.
            </p>
            <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light max-w-2xl mx-auto">
              Our formulations do not seek to mask the wearer. Instead, they interact harmoniously with natural skin chemistry, creating a subtle halo that is discovered only in close proximity.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* 3. THE PROCESS */}
      <section className="py-20 sm:py-28 border-b border-[#C8BDAF]/30">
        <PageContainer>
          <div className="text-left mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
              Chapter 03
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
              THE PROCESS
            </h2>
            <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
              From raw botanical harvest to the final flacon, each RAPHÈLO creation undergoes meticulous artisanal development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
            <div className="p-6 bg-[#F4F0E8] border border-[#C8BDAF]/40">
              <span className="font-serif text-2xl text-[#A8735B] block mb-2">
                01
              </span>
              <h3 className="font-serif text-lg text-[#1D1C1A] mb-2">
                Ethical Sourcing
              </h3>
              <p className="text-xs text-[#68645E] leading-relaxed">
                Direct partnerships with botanical growers in Calabria, Grasse, and the Atlas Mountains.
              </p>
            </div>

            <div className="p-6 bg-[#F4F0E8] border border-[#C8BDAF]/40">
              <span className="font-serif text-2xl text-[#A8735B] block mb-2">
                02
              </span>
              <h3 className="font-serif text-lg text-[#1D1C1A] mb-2">
                Artisanal Blending
              </h3>
              <p className="text-xs text-[#68645E] leading-relaxed">
                Carefully calculated evaporation curves formulated in small batches of 200 bottles.
              </p>
            </div>

            <div className="p-6 bg-[#F4F0E8] border border-[#C8BDAF]/40">
              <span className="font-serif text-2xl text-[#A8735B] block mb-2">
                03
              </span>
              <h3 className="font-serif text-lg text-[#1D1C1A] mb-2">
                Slow Maturation
              </h3>
              <p className="text-xs text-[#68645E] leading-relaxed">
                Each fragrance rests in stainless steel vessels for 60 to 90 days to achieve harmonious equilibrium.
              </p>
            </div>

            <div className="p-6 bg-[#F4F0E8] border border-[#C8BDAF]/40">
              <span className="font-serif text-2xl text-[#A8735B] block mb-2">
                04
              </span>
              <h3 className="font-serif text-lg text-[#1D1C1A] mb-2">
                Architectural Glass
              </h3>
              <p className="text-xs text-[#68645E] leading-relaxed">
                Hand-polished custom glass flacons with thick weighted bases and matte architectural caps.
              </p>
            </div>

            <div className="p-6 bg-[#F4F0E8] border border-[#C8BDAF]/40">
              <span className="font-serif text-2xl text-[#A8735B] block mb-2">
                05
              </span>
              <h3 className="font-serif text-lg text-[#1D1C1A] mb-2">
                Tactile Packaging
              </h3>
              <p className="text-xs text-[#68645E] leading-relaxed">
                FSC-certified porcelain ivory paper with debossed typography and subtle clay accents.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 4. THE MATERIALS */}
      <section className="py-20 sm:py-28 bg-[#E9E3D9]/40 border-b border-[#C8BDAF]/30">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-5/4 overflow-hidden bg-[#F4F0E8] border border-[#C8BDAF]/30 order-2 lg:order-1">
              <Image
                src="/images/products/sable.jpg"
                alt="Tactile Materials of RAPHÈLO"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
                Chapter 04
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-6">
                THE MATERIALS
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light mb-6">
                We believe that true luxury is tactile. It is not communicated through loud branding, but through the weight of cold glass in the palm, the crisp texture of uncoated paper, and the subtle magnetic resistance of the cap.
              </p>
              <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light">
                From organic Italian alcohol to high-purity natural extraits, every material chosen for RAPHÈLO honors both sensory pleasure and planetary stewardship.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 5. THE RAPHÈLO WORLD GALLERY */}
      <section className="py-20 sm:py-28 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
            Chapter 05
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-12">
            THE RAPHÈLO WORLD
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <div className="relative aspect-square overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/products/ember-veil.jpg"
                alt="Ember Veil Atmosphere"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/products/still-room.jpg"
                alt="Still Room Atmosphere"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/products/after-rain.jpg"
                alt="After Rain Atmosphere"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/products/late-light.jpg"
                alt="Late Light Atmosphere"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/products/discovery-set.jpg"
                alt="Discovery Set Packaging"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-[#E9E3D9] border border-[#C8BDAF]/30">
              <Image
                src="/images/editorial/brand-hero.jpg"
                alt="RAPHÈLO Studio Atmosphere"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <Button href="/shop" size="lg">
            Explore the Fragrance Collection
          </Button>
        </div>
      </section>
    </div>
  );
}
