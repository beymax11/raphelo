import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import ProductGrid from "@/components/product/ProductGrid";
import { CATEGORIES, getProductsByCategory } from "@/lib/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Fragrances — Categories`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const matchingProducts = getProductsByCategory(category.slug);

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <Link
          href="/categories"
          className="text-[11px] uppercase tracking-[0.2em] text-[#68645E] hover:text-[#1D1C1A] mb-3 inline-block font-medium"
        >
          ← All Categories
        </Link>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          {category.name}
        </h1>
        <p className="text-sm sm:text-base font-sans text-[#68645E] max-w-lg font-light leading-relaxed mb-6">
          {category.description}
        </p>
        <span className="text-xs uppercase tracking-[0.16em] text-[#1D1C1A] font-medium">
          {matchingProducts.length} {matchingProducts.length === 1 ? "Fragrance" : "Fragrances"}
        </span>
      </div>

      <ProductGrid products={matchingProducts} />
    </PageContainer>
  );
}
