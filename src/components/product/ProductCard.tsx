"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist, setIsAuthPromptOpen } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "100ml";
    addToCart(product, defaultSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#F4F0E8] transition-all duration-300">
      {/* Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-[#E9E3D9]/60 block"
      >
        <Image
          src={product.images[0]}
          alt={`RAPHÈLO ${product.name} Eau de Parfum`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <Badge variant={product.badge === "NEW" ? "clay" : "ink"}>
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-[#F4F0E8]/80 backdrop-blur-xs flex items-center justify-center text-[#1D1C1A] hover:bg-[#F4F0E8] hover:text-[#A8735B] transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "fill-[#A8735B] text-[#A8735B]" : "text-[#1D1C1A]"
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1D1C1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex justify-center">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#F4F0E8] text-[#1D1C1A] text-[10px] uppercase tracking-[0.18em] font-medium hover:bg-[#1D1C1A] hover:text-[#F4F0E8] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#707462]" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add · {product.sizes[0]}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col grow">
        <div className="flex items-baseline justify-between mb-1">
          <Link
            href={`/product/${product.slug}`}
            className="font-serif text-lg md:text-xl text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors tracking-wide"
          >
            {product.name}
          </Link>
          <span className="font-sans text-xs text-[#1D1C1A] font-medium tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-[11px] uppercase tracking-[0.15em] text-[#68645E] mb-1 font-light">
          {product.family}
        </p>

        <p className="text-xs text-[#68645E] line-clamp-1 italic font-serif">
          “{product.atmosphere}”
        </p>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden mt-3 pt-2 border-t border-[#C8BDAF]/30">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-[#E9E3D9] text-[#1D1C1A] text-[10px] uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-1"
          >
            {isAdded ? "Added" : `Quick Add · ${formatPrice(product.price)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
