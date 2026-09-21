import React, { Suspense } from "react";
import { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "All Fragrances",
  description:
    "Explore the complete collection of contemporary fragrances by RAPHÈLO. Formulated in Grasse and Paris.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-[#68645E] font-serif text-xl">
          Preparing the collection…
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
