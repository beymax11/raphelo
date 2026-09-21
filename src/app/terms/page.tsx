import React from "react";
import { Metadata } from "next";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions of the RAPHÈLO website and service.",
};

export default function TermsPage() {
  return (
    <PageContainer size="narrow">
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Legal Agreement
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
          TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-[#68645E]">
          Last revised: September 2026
        </p>
      </div>

      <div className="space-y-8 text-left text-sm font-sans text-[#68645E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#1D1C1A]">
            1. Intellectual Property
          </h2>
          <p>
            All content on this site, including the RAPHÈLO wordmark, R monogram, bottle architecture, imagery, olfactive formulations, and editorial essays, is the exclusive intellectual property of RAPHÈLO.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#1D1C1A]">
            2. Orders & Availability
          </h2>
          <p>
            All products are subject to availability. In the event of inventory exhaustion for small-batch extraits, we will notify you promptly and offer a priority reserve or full refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#1D1C1A]">
            3. Pricing & Taxes
          </h2>
          <p>
            Prices are listed in USD and exclude applicable regional sales taxes and international customs duties, which are calculated prior to order confirmation.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
