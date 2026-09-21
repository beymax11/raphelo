import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ProductGrid from "@/components/product/ProductGrid";
import { COLLECTIONS, PRODUCTS } from "@/lib/products";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.title} — Collections`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Determine products for this collection
  let matchingProducts = PRODUCTS;
  if (slug === "core-collection") {
    matchingProducts = PRODUCTS.filter((p) => p.family !== "Discovery");
  } else if (slug === "discovery-collection") {
    matchingProducts = PRODUCTS.filter((p) => p.family === "Discovery");
  } else if (slug === "limited-editions") {
    matchingProducts = PRODUCTS.filter((p) => p.slug === "sable");
  } else if (slug === "seasonal-atmospheres") {
    matchingProducts = PRODUCTS.filter((p) =>
      ["after-rain", "ember-veil", "late-light"].includes(p.slug)
    );
  }

  const otherCollections = COLLECTIONS.filter((c) => c.slug !== slug);

  return (
    <div className="w-full">
      {/* Collection Hero */}
      <section className="relative w-full py-20 sm:py-28 bg-[#E9E3D9]/60 border-b border-[#C8BDAF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 text-left">
            <Link
              href="/collections"
              className="text-[11px] uppercase tracking-[0.2em] text-[#68645E] hover:text-[#1D1C1A] mb-3 inline-block font-medium"
            >
              ← All Collections
            </Link>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
              {collection.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed max-w-lg font-light mb-6">
              {collection.description}
            </p>
            <div className="inline-block px-3 py-1 bg-[#1D1C1A] text-[#F4F0E8] text-[10px] uppercase tracking-[0.2em]">
              {matchingProducts.length} {matchingProducts.length === 1 ? "Fragrance" : "Fragrances"}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-16/10 sm:aspect-3/2 overflow-hidden bg-[#F4F0E8] border border-[#C8BDAF]/30">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <PageContainer>
        <div className="mb-8 text-left">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#68645E] block font-medium">
            Collection Selections
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A]">
            The Formulations
          </h2>
        </div>

        <ProductGrid products={matchingProducts} />

        {/* Related Collections */}
        <div className="mt-24 pt-16 border-t border-[#C8BDAF]/30 text-left">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#68645E] block mb-2 font-medium">
            Explore Further
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] mb-8">
            Other Collections
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherCollections.slice(0, 3).map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="group block p-5 bg-[#E9E3D9]/40 border border-[#C8BDAF]/30 hover:border-[#1D1C1A] transition-colors"
              >
                <span className="text-[10px] uppercase tracking-widest text-[#68645E] block mb-1">
                  Collection
                </span>
                <h4 className="font-serif text-lg text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors flex items-center justify-between">
                  <span>{col.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
