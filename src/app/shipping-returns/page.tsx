import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Information regarding delivery timelines, complimentary samplers, and returns at RAPHÈLO.",
};

export default function ShippingReturnsPage() {
  return (
    <PageContainer size="narrow">
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Logistics & Policy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          SHIPPING & RETURNS
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Every order is prepared by hand in our signature tactile porcelain ivory boxes and dispatched via carbon-neutral courier.
        </p>
      </div>

      <div className="space-y-12 text-left text-sm font-sans text-[#68645E] leading-relaxed">
        {/* Shipping */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1D1C1A]">
            Delivery Services & Rates
          </h2>
          <p>
            RAPHÈLO provides complimentary standard delivery on all domestic orders exceeding $150. For orders below this threshold, a flat delivery fee of $15 is calculated at checkout.
          </p>
          <div className="p-4 bg-[#E9E3D9]/50 border border-[#C8BDAF]/30 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="font-medium text-[#1D1C1A]">Domestic Standard (Courier)</span>
              <span>2–4 Business Days · $15 (Free over $150)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#1D1C1A]">Domestic Express</span>
              <span>1–2 Business Days · $25</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-[#1D1C1A]">International Priority</span>
              <span>4–7 Business Days · $35</span>
            </div>
          </div>
        </section>

        {/* Processing & Tracking */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1D1C1A]">
            Order Processing & Tracking
          </h2>
          <p>
            Orders placed before 14:00 CET are dispatched from our studio on the same business day. Once your order has been handed to our courier partner, you will receive an email containing your unique tracking number and an estimated arrival window.
          </p>
        </section>

        {/* The Invitation Sampler & Return Policy */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1D1C1A]">
            The Invitation Sampler & Returns
          </h2>
          <p>
            We recognize that committing to a full fragrance requires skin intimacy. To provide absolute peace of mind, every full 50ml or 100ml flacon is accompanied by a complimentary 2ml test vial of the identical scent.
          </p>
          <p>
            We invite you to test the scent from the vial first. If you decide the atmosphere is not aligned with your taste, you may return the unopened, sealed full bottle within 30 days for a complete refund.
          </p>
          <p className="text-xs italic">
            Note: For hygiene and safety reasons, flacons with broken exterior seals cannot be accepted for return.
          </p>
        </section>

        {/* Damaged or Incorrect Orders */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1D1C1A]">
            Damaged Orders & Exchanges
          </h2>
          <p>
            In the rare event that your package arrives damaged during transit, please photograph the parcel and notify us at{" "}
            <a
              href="mailto:concierge@raphelo.com"
              className="text-[#1D1C1A] underline"
            >
              concierge@raphelo.com
            </a>{" "}
            within 48 hours of delivery. A replacement will be expedited to you immediately.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
