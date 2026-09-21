"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ProductGrid from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/lib/products";

const SUGGESTED_TERMS = [
  "Iris",
  "Cedar",
  "Bergamot",
  "Rain",
  "Saffron",
  "Discovery",
  "Amber",
  "Musk",
];

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("raphelo_recent_searches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSearchSubmit = (term: string) => {
    const clean = term.trim();
    if (!clean) return;

    // Save to recent
    const updated = [clean, ...recentSearches.filter((s) => s !== clean)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("raphelo_recent_searches", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    router.push(`/search?q=${encodeURIComponent(clean)}`);
  };

  const handleClearQuery = () => {
    setQuery("");
    router.push("/search");
  };

  // Filter products
  const searchResults = useMemo(() => {
    if (!queryParam.trim()) return [];
    const q = queryParam.toLowerCase();

    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchFamily = p.family.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchAtmosphere = p.atmosphere.toLowerCase().includes(q);
      const matchNotes = [
        ...p.notes.top,
        ...p.notes.heart,
        ...p.notes.base,
      ].some((note) => note.toLowerCase().includes(q));

      return matchName || matchFamily || matchDesc || matchAtmosphere || matchNotes;
    });
  }, [queryParam]);

  return (
    <PageContainer size="narrow">
      <div className="text-left mb-10">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Catalog Search
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-6">
          SEARCH
        </h1>

        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(query);
          }}
          className="relative flex items-center border-b-2 border-[#1D1C1A] pb-2"
        >
          <SearchIcon className="w-6 h-6 text-[#1D1C1A] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by scent name, note, or atmosphere…"
            className="grow bg-transparent text-xl sm:text-2xl font-serif text-[#1D1C1A] placeholder-[#68645E]/60 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={handleClearQuery}
              className="p-1 text-[#68645E] hover:text-[#1D1C1A] mr-2"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-[#1D1C1A] text-[#F4F0E8] text-[10px] uppercase tracking-[0.18em]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Suggested & Recent Searches */}
      {!queryParam && (
        <div className="space-y-8 text-left py-6">
          {recentSearches.length > 0 && (
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#68645E] block mb-3 font-medium">
                Recent Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      handleSearchSubmit(term);
                    }}
                    className="px-3.5 py-1.5 bg-[#E9E3D9]/60 hover:bg-[#E9E3D9] text-xs font-sans text-[#1D1C1A] border border-[#C8BDAF]/30"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#68645E] block mb-3 font-medium">
              Suggested Olfactive Notes
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    handleSearchSubmit(term);
                  }}
                  className="px-3.5 py-1.5 bg-[#E9E3D9]/60 hover:bg-[#E9E3D9] text-xs font-sans text-[#1D1C1A] border border-[#C8BDAF]/30"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {queryParam && (
        <div className="text-left mt-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C8BDAF]/30">
            <h2 className="font-serif text-2xl text-[#1D1C1A]">
              Results for “{queryParam}”
            </h2>
            <span className="text-xs text-[#68645E]">
              {searchResults.length}{" "}
              {searchResults.length === 1 ? "fragrance" : "fragrances"} found
            </span>
          </div>

          <ProductGrid
            products={searchResults}
            emptyMessage="We couldn't find a fragrance matching that search. Try searching for a note like iris, amber, or rain."
          />
        </div>
      )}
    </PageContainer>
  );
}
