"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import AccountNav from "@/components/account/AccountNav";
import Button from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product, product.sizes[0] || "100ml", 1);
    removeFromWishlist(product.id);
  };

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Personal Curations
        </span>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-2">
              SAVED WISHLIST
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#68645E]">
              Your curated shortlist of fragrance atmospheres.
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs uppercase tracking-[0.14em] text-[#68645E] hover:text-red-700 transition-colors"
            >
              Clear All Saved
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-left">
        <AccountNav />

        <div className="grow w-full">
          {wishlist.length === 0 ? (
            <div className="p-12 sm:p-20 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 text-center">
              <p className="font-serif text-3xl text-[#1D1C1A] mb-3 italic">
                “Your collection is waiting for its first scent.”
              </p>
              <p className="text-sm font-sans text-[#68645E] max-w-sm mx-auto mb-8 font-light">
                Explore our olfactory atmospheres and select the heart icon on any creation to save it here.
              </p>
              <Button href="/shop">Explore Fragrances</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-4 flex flex-col justify-between"
                >
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative aspect-square w-full bg-[#F4F0E8] block overflow-hidden border border-[#C8BDAF]/30 mb-4"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex items-baseline justify-between mb-1">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif text-lg text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <span className="font-sans text-xs font-medium text-[#1D1C1A]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#68645E] mb-2 font-light">
                      {product.family}
                    </p>

                    <p className="text-xs text-[#707462] mb-4">
                      {product.inventory > 0
                        ? "Available · Ships immediately"
                        : "Currently out of stock"}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#C8BDAF]/30 space-y-2">
                    <Button
                      onClick={() => handleMoveToCart(product)}
                      fullWidth
                      size="sm"
                      className="text-[11px]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 mr-1.5" /> Move to Cart
                    </Button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-full py-2 text-center text-xs text-[#68645E] hover:text-red-700 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove from Wishlist</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
