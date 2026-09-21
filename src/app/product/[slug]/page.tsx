import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import FragranceNotes from "@/components/product/FragranceNotes";
import ReviewSection from "@/components/product/ReviewSection";
import ProductCard from "@/components/product/ProductCard";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `RAPHÈLO — ${product.name} ${product.subtitle}`,
    description: `${product.description} Atmosphere: “${product.atmosphere}” Notes: ${product.notes.top.join(", ")}, ${product.notes.heart.join(", ")}, ${product.notes.base.join(", ")}.`,
    openGraph: {
      title: `RAPHÈLO — ${product.name} ${product.subtitle}`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 4);

  const accordionItems: AccordionItem[] = [
    {
      id: "details",
      title: "Details & Formulation",
      content: (
        <div className="space-y-3">
          <p>
            <strong className="text-[#1D1C1A]">Concentration:</strong>{" "}
            {product.details.concentration}
          </p>
          <p>
            <strong className="text-[#1D1C1A]">Origin:</strong>{" "}
            {product.details.origin}
          </p>
          <p>
            <strong className="text-[#1D1C1A]">Ingredients:</strong>{" "}
            <span className="text-xs text-[#68645E]/80">
              {product.details.ingredients}
            </span>
          </p>
          <p className="text-xs italic text-[#68645E]">
            Formulated without phthalates, parabens, synthetic colorants, or unnecessary additives. Cruelty-free and vegan.
          </p>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Delivery & Returns",
      content: (
        <div className="space-y-3">
          <p>
            <strong className="text-[#1D1C1A]">Complimentary Shipping:</strong>{" "}
            Delivered via carbon-neutral priority courier on all orders over $150. Standard delivery requires 2–4 business days.
          </p>
          <p>
            <strong className="text-[#1D1C1A]">The Invitation Sampler:</strong>{" "}
            Each full 50ml and 100ml flacon arrives accompanied by a complimentary 2ml test vial. Wear the scent on skin before breaking the security seal of the full bottle.
          </p>
          <p>
            <strong className="text-[#1D1C1A]">Complimentary Returns:</strong>{" "}
            Unopened flacons in original packaging may be returned within 30 days of delivery.
          </p>
        </div>
      ),
    },
    {
      id: "application",
      title: "Atmospheric Application",
      content: (
        <div className="space-y-2">
          <p>
            Apply to pulse points where circulation warms the skin—the collarbones, inside of the wrists, and the nape of the neck.
          </p>
          <p>
            For a more diffuse aura, mist onto natural textiles such as linen or wool from a distance of 20 centimeters.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-left">
        <nav className="text-[11px] uppercase tracking-[0.16em] text-[#68645E]">
          <Link href="/" className="hover:text-[#1D1C1A]">
            Home
          </Link>
          <span className="mx-2 text-[#C8BDAF]">/</span>
          <Link href="/shop" className="hover:text-[#1D1C1A]">
            Shop
          </Link>
          <span className="mx-2 text-[#C8BDAF]">/</span>
          <span className="text-[#1D1C1A]">{product.name}</span>
        </nav>
      </div>

      <PageContainer>
        {/* Main Product Section: Left Gallery, Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Olfactive Profile */}
        <div className="mb-20">
          <FragranceNotes notes={product.notes} />
        </div>

        {/* The Atmosphere & Story Section */}
        <div className="mb-20 py-12 px-6 sm:px-12 bg-[#E9E3D9]/30 border-y border-[#C8BDAF]/30 text-left">
          <div className="max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
              The Atmosphere
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-4">
              “{product.atmosphere}”
            </h3>
            <p className="text-sm sm:text-base font-sans text-[#68645E] leading-relaxed font-light mb-6">
              {product.description} Formulated to evoke quiet confidence rather than loud projection, this composition adapts intimately to the skin chemistry of its wearer.
            </p>
          </div>
        </div>

        {/* Product Accordions: Details, Shipping, Application */}
        <div className="mb-20 max-w-4xl mx-auto text-left">
          <Accordion items={accordionItems} defaultOpenId="details" />
        </div>

        {/* Customer Reviews */}
        <div className="mb-24">
          <ReviewSection
            productId={product.id}
            productName={product.name}
            initialRating={product.rating}
            initialReviewCount={product.reviewCount}
          />
        </div>

        {/* You May Also Like */}
        <div className="pt-16 border-t border-[#C8BDAF]/30 text-left">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#68645E] block mb-1 font-medium">
                Related Atmospheres
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A]">
                You May Also Like
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-[0.16em] text-[#1D1C1A] hover:text-[#A8735B]"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
