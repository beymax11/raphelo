"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import { PRODUCTS } from "@/lib/products";
import { Product } from "@/types";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

interface AtmosphereResult {
  title: string;
  description: string;
  recommendations: Product[];
}

export default function FragranceFinderPage() {
  const [step, setStep] = useState(1);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [result, setResult] = useState<AtmosphereResult | null>(null);

  const atmospheres = [
    { label: "Fresh", desc: "Crisp air, green leaves, mineral clarity" },
    { label: "Warm", desc: "Sunlit wood, amber resins, twilight glow" },
    { label: "Dark", desc: "Smoked leather, dark cedar, shadowed depth" },
    { label: "Soft", desc: "Clean linen, white tea, crystalline iris" },
    { label: "Earthy", desc: "Wet stone, forest moss, roots after rain" },
    { label: "Floral", desc: "Night-blooming jasmine, powdered violet, airy petals" },
  ];

  const occasions = [
    { label: "Everyday", desc: "An intimate companion for morning till night" },
    { label: "Evening", desc: "Atmosphere for dim lights and conversations" },
    { label: "Work & Focus", desc: "Clean, non-intrusive presence and calm" },
    { label: "Date & Intimacy", desc: "Second-skin warmth drawn close" },
    { label: "Special Occasion", desc: "Memorable projection and distinction" },
  ];

  const textures = [
    { label: "Linen", desc: "Crisp, airy, natural weave" },
    { label: "Wood", desc: "Raw pale oak, dry cedar shavings" },
    { label: "Smoke", desc: "Incense wisps, charred embers" },
    { label: "Skin", desc: "Warm intimate musk, powdery softness" },
    { label: "Stone", desc: "Cool travertine, wet slate after rain" },
    { label: "Velvet", desc: "Deep, tactile, rich and shadowed" },
  ];

  const handleComplete = () => {
    // Determine atmospheric profile
    let title = "QUIET WARMTH";
    let description =
      "You are drawn to comforting, resonant atmospheres with subtle depth and tactile warmth.";
    let recSlugs = ["ember-veil", "still-room", "late-light"];

    if (selectedAtmosphere === "Fresh" || selectedTexture === "Stone") {
      title = "MINERAL CLARITY";
      description =
        "You seek the crisp serenity of morning rain, wet slate, and cool botanical leaves.";
      recSlugs = ["after-rain", "halo", "still-room"];
    } else if (selectedAtmosphere === "Dark" || selectedTexture === "Smoke" || selectedTexture === "Velvet") {
      title = "SHADOWED GRAVITAS";
      description =
        "You carry an aura of architectural mystery, dark cedarwood, black pepper, and leather.";
      recSlugs = ["sable", "ember-veil", "late-light"];
    } else if (selectedAtmosphere === "Soft" || selectedTexture === "Linen" || selectedTexture === "Skin") {
      title = "SECOND SKIN";
      description =
        "You desire intimate fragrances that merge seamlessly with your natural presence, like morning light across linen.";
      recSlugs = ["halo", "still-room", "late-light"];
    } else if (selectedAtmosphere === "Floral") {
      title = "RADIANT BLOOM";
      description =
        "You favor golden daylight, airy jasmine, and crystalline petals grounded in gentle tonka and cedar.";
      recSlugs = ["late-light", "halo", "still-room"];
    }

    const recs = recSlugs
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter(Boolean) as Product[];

    setResult({
      title,
      description,
      recommendations: recs,
    });
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedAtmosphere(null);
    setSelectedOccasion(null);
    setSelectedTexture(null);
    setResult(null);
  };

  return (
    <PageContainer size="narrow">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Atmospheric Diagnostic
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          FRAGRANCE FINDER
        </h1>
        <p className="text-sm sm:text-base font-sans text-[#68645E] max-w-lg mx-auto font-light leading-relaxed">
          Answer three sensory questions to uncover the fragrance atmosphere that best mirrors your presence.
        </p>

        {step < 4 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans transition-colors ${
                    step === num
                      ? "bg-[#1D1C1A] text-[#F4F0E8]"
                      : step > num
                      ? "bg-[#A8735B] text-[#F4F0E8]"
                      : "bg-[#E9E3D9] text-[#68645E]"
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-8 h-px ${
                      step > num ? "bg-[#A8735B]" : "bg-[#C8BDAF]/40"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 1: Atmosphere */}
      {step === 1 && (
        <div className="text-left animate-in fade-in duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] mb-2 text-center">
            What atmosphere are you drawn to?
          </h2>
          <p className="text-xs text-[#68645E] text-center mb-8 font-light">
            Select the ambient feeling you desire to carry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {atmospheres.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedAtmosphere(item.label)}
                className={`p-5 text-left border transition-all duration-200 ${
                  selectedAtmosphere === item.label
                    ? "border-[#1D1C1A] bg-[#1D1C1A] text-[#F4F0E8]"
                    : "border-[#C8BDAF]/50 bg-[#E9E3D9]/40 hover:border-[#1D1C1A] text-[#1D1C1A]"
                }`}
              >
                <span className="font-serif text-xl block mb-1">
                  {item.label}
                </span>
                <span
                  className={`text-xs block ${
                    selectedAtmosphere === item.label
                      ? "text-[#C8BDAF]"
                      : "text-[#68645E]"
                  }`}
                >
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!selectedAtmosphere}
              onClick={() => setStep(2)}
              className="flex items-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Occasion */}
      {step === 2 && (
        <div className="text-left animate-in fade-in duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] mb-2 text-center">
            When would you wear it?
          </h2>
          <p className="text-xs text-[#68645E] text-center mb-8 font-light">
            Define the rhythm and circumstance of your scent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {occasions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedOccasion(item.label)}
                className={`p-5 text-left border transition-all duration-200 ${
                  selectedOccasion === item.label
                    ? "border-[#1D1C1A] bg-[#1D1C1A] text-[#F4F0E8]"
                    : "border-[#C8BDAF]/50 bg-[#E9E3D9]/40 hover:border-[#1D1C1A] text-[#1D1C1A]"
                }`}
              >
                <span className="font-serif text-xl block mb-1">
                  {item.label}
                </span>
                <span
                  className={`text-xs block ${
                    selectedOccasion === item.label
                      ? "text-[#C8BDAF]"
                      : "text-[#68645E]"
                  }`}
                >
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              disabled={!selectedOccasion}
              onClick={() => setStep(3)}
              className="flex items-center gap-2"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Texture */}
      {step === 3 && (
        <div className="text-left animate-in fade-in duration-300">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] mb-2 text-center">
            Which texture feels closest to you?
          </h2>
          <p className="text-xs text-[#68645E] text-center mb-8 font-light">
            Tactile sensation is deeply linked to olfactory preference.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {textures.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedTexture(item.label)}
                className={`p-5 text-left border transition-all duration-200 ${
                  selectedTexture === item.label
                    ? "border-[#1D1C1A] bg-[#1D1C1A] text-[#F4F0E8]"
                    : "border-[#C8BDAF]/50 bg-[#E9E3D9]/40 hover:border-[#1D1C1A] text-[#1D1C1A]"
                }`}
              >
                <span className="font-serif text-xl block mb-1">
                  {item.label}
                </span>
                <span
                  className={`text-xs block ${
                    selectedTexture === item.label
                      ? "text-[#C8BDAF]"
                      : "text-[#68645E]"
                  }`}
                >
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              disabled={!selectedTexture}
              onClick={handleComplete}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A8735B]" />
              <span>Reveal Your Atmosphere</span>
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Personalized Result */}
      {step === 4 && result && (
        <div className="text-left animate-in fade-in duration-500">
          {/* Result Card */}
          <div className="p-8 sm:p-12 bg-[#E9E3D9]/70 border border-[#C8BDAF]/50 text-center mb-16">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
              Your Personalized Atmosphere
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] mb-4 tracking-wide">
              {result.title}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#68645E] max-w-lg mx-auto leading-relaxed font-light mb-8">
              {result.description}
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </div>

          {/* Recommendations Header */}
          <div className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#68645E] block font-medium">
              Curated Selection
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A]">
              Recommended Fragrances
            </h3>
          </div>

          {/* Recommended Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {result.recommendations.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="p-8 bg-[#1D1C1A] text-[#F4F0E8] text-center">
            <h4 className="font-serif text-2xl mb-2">
              Undecided Between Atmospheres?
            </h4>
            <p className="text-xs text-[#C8BDAF] max-w-md mx-auto mb-6">
              Sample all six creations at your own rhythm with the Meet RAPHÈLO Discovery Set. Includes voucher towards your full flacon.
            </p>
            <Button
              href="/product/discovery-set"
              variant="secondary"
              size="sm"
            >
              Explore Discovery Set · $45
            </Button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
