import React, { Suspense } from "react";
import { Metadata } from "next";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Thank you for your order with RAPHÈLO.",
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-[#68645E] font-serif text-xl">
          Confirming order…
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
