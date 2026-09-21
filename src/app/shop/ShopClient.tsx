"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { Product, FragranceFamily } from "@/types";
import { PRODUCTS } from "@/lib/products";
import ProductGrid from "@/components/product/ProductGrid";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

const FAMILIES: FragranceFamily[] = [
  "Musky Floral",
  "Woody Amber",
  "Woody Musk",
  "Amber Floral",
  "Woody Spicy",
  "Fresh Woody",
  "Discovery",
];

const SIZES = ["50ml", "100ml", "6 x 2ml", "3 x 15ml"];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const familyParam = searchParams.get("family");
  const sortParam = searchParams.get("sort") || "featured";
  const sizeParam = searchParams.get("size");
  const availabilityParam = searchParams.get("availability");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/shop");
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (familyParam) {
      result = result.filter(
        (p) =>
          p.family.toLowerCase().replace(/\s+/g, "-") ===
            familyParam.toLowerCase() ||
          p.family.toLowerCase() === familyParam.toLowerCase()
      );
    }

    if (sizeParam) {
      result = result.filter((p) => p.sizes.includes(sizeParam));
    }

    if (availabilityParam === "in-stock") {
      result = result.filter((p) => p.inventory > 0);
    }

    if (sortParam === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortParam === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortParam === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortParam === "new") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [familyParam, sizeParam, availabilityParam, sortParam]);

  const hasActiveFilters = !!familyParam || !!sizeParam || !!availabilityParam;

  return (
    <PageContainer>
      {/* Header */}
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
              The Complete Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight">
              ALL FRAGRANCES
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#68645E] max-w-sm font-light">
            Sensory compositions formulated to inhabit the space between moments. {filteredProducts.length} creations available.
          </p>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex items-center justify-between py-4 border-b border-[#C8BDAF]/30 mb-8 text-xs font-sans">
        {/* Desktop Quick Family Chips */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => updateParam("family", null)}
            className={`px-3.5 py-1.5 uppercase tracking-[0.14em] transition-colors ${
              !familyParam
                ? "bg-[#1D1C1A] text-[#F4F0E8]"
                : "bg-[#E9E3D9]/60 text-[#1D1C1A] hover:bg-[#E9E3D9]"
            }`}
          >
            All Families
          </button>
          {FAMILIES.map((family) => {
            const isSelected =
              familyParam?.toLowerCase() === family.toLowerCase();
            return (
              <button
                key={family}
                onClick={() => updateParam("family", isSelected ? null : family)}
                className={`px-3.5 py-1.5 uppercase tracking-[0.14em] transition-colors shrink-0 ${
                  isSelected
                    ? "bg-[#1D1C1A] text-[#F4F0E8]"
                    : "bg-[#E9E3D9]/60 text-[#1D1C1A] hover:bg-[#E9E3D9]"
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#C8BDAF] text-xs uppercase tracking-[0.14em] text-[#1D1C1A]"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filter & Sort {hasActiveFilters && "•"}</span>
        </button>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#68645E] hidden sm:inline">
            Sort By:
          </span>
          <select
            value={sortParam}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="bg-transparent border-b border-[#C8BDAF] py-1 px-2 text-xs uppercase tracking-[0.12em] text-[#1D1C1A] focus:outline-none focus:border-[#1D1C1A] cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="new">New Releases</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-8 flex-wrap text-xs">
          <span className="text-[#68645E]">Active Filters:</span>
          {familyParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E9E3D9] text-[#1D1C1A]">
              Family: {familyParam}
              <button
                onClick={() => updateParam("family", null)}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {sizeParam && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E9E3D9] text-[#1D1C1A]">
              Size: {sizeParam}
              <button
                onClick={() => updateParam("size", null)}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-[#A8735B] underline hover:text-[#1D1C1A] ml-2 text-xs"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-[#1D1C1A]/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#F4F0E8] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 text-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C8BDAF]/30 mb-6">
                <h3 className="font-serif text-2xl text-[#1D1C1A]">
                  Filter & Refine
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-[#68645E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Family Filters */}
              <div className="mb-6">
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#68645E] mb-3 font-medium">
                  Fragrance Family
                </h4>
                <div className="space-y-2">
                  {FAMILIES.map((family) => {
                    const isSelected =
                      familyParam?.toLowerCase() === family.toLowerCase();
                    return (
                      <button
                        key={family}
                        onClick={() =>
                          updateParam("family", isSelected ? null : family)
                        }
                        className={`w-full flex items-center justify-between py-2 text-xs font-sans uppercase tracking-[0.14em] text-left ${
                          isSelected
                            ? "text-[#1D1C1A] font-semibold"
                            : "text-[#68645E]"
                        }`}
                      >
                        <span>{family}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#A8735B]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Filters */}
              <div className="mb-6 pt-4 border-t border-[#C8BDAF]/30">
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#68645E] mb-3 font-medium">
                  Volume / Format
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => {
                    const isSelected = sizeParam === size;
                    return (
                      <button
                        key={size}
                        onClick={() => updateParam("size", isSelected ? null : size)}
                        className={`px-3 py-1.5 text-xs font-sans uppercase border ${
                          isSelected
                            ? "border-[#1D1C1A] bg-[#1D1C1A] text-[#F4F0E8]"
                            : "border-[#C8BDAF] text-[#1D1C1A]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C8BDAF]/30 space-y-2">
              <Button
                fullWidth
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show {filteredProducts.length} Fragrances
              </Button>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    clearAllFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs uppercase tracking-[0.14em] text-[#68645E]"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
