import React from "react";
import { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment Unsuccessful",
  description: "There was an issue processing your transaction.",
};

export default function CheckoutFailedPage() {
  return (
    <PageContainer size="narrow">
      <div className="py-16 sm:py-24 text-center bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-8 sm:p-16">
        <AlertCircle className="w-12 h-12 text-[#A8735B] mx-auto mb-6" />

        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Transaction Incomplete
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
          Something went wrong with your payment.
        </h1>

        <p className="text-sm sm:text-base font-sans text-[#68645E] max-w-md mx-auto font-light leading-relaxed mb-10">
          Your card was not charged. This can occasionally occur due to a verification delay or temporary bank authorization issue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/checkout">
            Try Again
          </Button>
          <Button href="/cart" variant="outline">
            Return to Cart
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
