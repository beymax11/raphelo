import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Information regarding RAPHÈLO fragrances, shipping, returns, and orders.",
};

export default function FAQPage() {
  const fragranceQuestions: AccordionItem[] = [
    {
      id: "f-1",
      title: "What is the concentration of RAPHÈLO fragrances?",
      content:
        "All RAPHÈLO flacons are formulated as high-concentration Eau de Parfum (20% to 25% fragrance oil concentration). They are designed for intimate longevity—lasting 8 to 12 hours on skin while remaining restrained in projection.",
    },
    {
      id: "f-2",
      title: "Are RAPHÈLO fragrances gender-neutral?",
      content:
        "Yes. We believe scent is an atmosphere, not a gendered construct. All our creations are formulated for anyone drawn to their aesthetic and emotional character.",
    },
    {
      id: "f-3",
      title: "Are your formulations vegan and cruelty-free?",
      content:
        "Every RAPHÈLO fragrance is 100% cruelty-free and vegan. We never test on animals, nor do we use animal-derived musks or ambergris, opting instead for sustainable, bio-identical accords.",
    },
  ];

  const ordersQuestions: AccordionItem[] = [
    {
      id: "o-1",
      title: "How do I redeem my Discovery Set voucher?",
      content:
        "Each Meet RAPHÈLO Discovery Set includes a unique 12-character privilege code. Enter this code at checkout on your next purchase of any full 50ml or 100ml flacon to apply your $45 credit.",
    },
    {
      id: "o-2",
      title: "Can I cancel or modify my order?",
      content:
        "Because our laboratory processes orders promptly to ensure expedited courier dispatch, please contact concierge@raphelo.com within one hour of order placement for modifications.",
    },
  ];

  const shippingQuestions: AccordionItem[] = [
    {
      id: "s-1",
      title: "What are your delivery timeframes and rates?",
      content:
        "Complimentary standard shipping is provided on all orders over $150. For orders under $150, a flat delivery fee of $15 applies. Orders typically arrive within 2 to 4 business days via carbon-neutral courier.",
    },
    {
      id: "s-2",
      title: "Do you ship internationally?",
      content:
        "We currently ship throughout North America, the European Union, the United Kingdom, and select global regions with specialized fragrance transport permits.",
    },
  ];

  const returnsQuestions: AccordionItem[] = [
    {
      id: "r-1",
      title: "What is your return policy?",
      content:
        "Each full flacon arrives accompanied by a complimentary 2ml sample vial. You may test the fragrance from the vial at your leisure. If you decide the atmosphere is not for you, you may return the unopened, sealed full bottle within 30 days for a complete refund.",
    },
  ];

  const productsQuestions: AccordionItem[] = [
    {
      id: "p-1",
      title: "How should I store my RAPHÈLO flacon?",
      content:
        "Store your flacon away from direct sunlight, sudden temperature fluctuations, and humidity. A shaded dresser, bookshelf, or vanity preserves the delicate top notes for years.",
    },
  ];

  const accountQuestions: AccordionItem[] = [
    {
      id: "a-1",
      title: "What are the benefits of creating a RAPHÈLO account?",
      content:
        "An account allows you to save favorite fragrances to your personal wishlist, store multiple delivery addresses, review your order history, and receive private invitations to limited batch extraits.",
    },
  ];

  return (
    <PageContainer size="narrow">
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Assistance & Answers
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Guidance on our formulation philosophy, ordering protocols, delivery, and returns.
        </p>
      </div>

      <div className="space-y-12 text-left">
        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-[#68645E] mb-4 font-semibold">
            Fragrance & Formulation
          </h2>
          <Accordion items={fragranceQuestions} />
        </div>

        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-[#68645E] mb-4 font-semibold">
            Orders & Payments
          </h2>
          <Accordion items={ordersQuestions} />
        </div>

        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-[#68645E] mb-4 font-semibold">
            Shipping & Delivery
          </h2>
          <Accordion items={shippingQuestions} />
        </div>

        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-[#68645E] mb-4 font-semibold">
            Returns & Exchanges
          </h2>
          <Accordion items={returnsQuestions} />
        </div>

        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-[#68645E] mb-4 font-semibold">
            Product Care
          </h2>
          <Accordion items={productsQuestions} />
        </div>

        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.2em] text-[#68645E] mb-4 font-semibold">
            Account & Preferences
          </h2>
          <Accordion items={accountQuestions} />
        </div>
      </div>

      {/* Contact Prompt */}
      <div className="mt-16 p-8 bg-[#E9E3D9]/50 border border-[#C8BDAF]/40 text-center">
        <h3 className="font-serif text-2xl text-[#1D1C1A] mb-2">
          Require further assistance?
        </h3>
        <p className="text-xs text-[#68645E] mb-6 max-w-sm mx-auto">
          Our private concierge is available to guide your discovery personally.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-[#1D1C1A] text-[#F4F0E8] text-xs uppercase tracking-[0.16em]"
        >
          Contact Concierge
        </Link>
      </div>
    </PageContainer>
  );
}
