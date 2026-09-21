import React, { Suspense } from "react";
import { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Fragrances",
  description:
    "Search the complete RAPHÈLO catalog by olfactive note, family, or mood.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center text-[#68645E] font-serif text-xl">
          Searching the archives…
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
