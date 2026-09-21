import React from "react";
import { Metadata } from "next";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy and data stewardship at RAPHÈLO.",
};

export default function PrivacyPage() {
  return (
    <PageContainer size="narrow">
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Legal & Privacy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-[#68645E]">
          Last revised: September 2026
        </p>
      </div>

      <div className="space-y-8 text-left text-sm font-sans text-[#68645E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#1D1C1A]">
            1. Our Commitment to Discretion
          </h2>
          <p>
            RAPHÈLO respects your privacy with the same restraint we apply to our fragrances. We collect only the information necessary to fulfill orders, provide concierge service, and curate atmospheric recommendations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#1D1C1A]">
            2. Information We Collect
          </h2>
          <p>
            When you interact with our website, we may collect: contact details (name, email, phone number), delivery addresses, transaction summaries, and questionnaire selections from the Fragrance Finder.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl text-[#1D1C1A]">
            3. Data Security & Storage
          </h2>
          <p>
            Payment information is processed directly through encrypted payment gateways and is never stored on RAPHÈLO servers. We do not sell, rent, or trade your personal information with third parties.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
