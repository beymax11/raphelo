import React from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageContainer size="narrow">
      <div className="py-24 sm:py-36 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#68645E] block mb-4 font-medium">
          404 — Void
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          This atmosphere does not exist.
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-md mx-auto mb-10 font-light leading-relaxed">
          The page or fragrance you are looking for has faded from our archives or never inhabited this space.
        </p>
        <div className="flex justify-center gap-4">
          <Button href="/">Return to House</Button>
          <Button href="/shop" variant="outline">
            Explore Fragrances
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
