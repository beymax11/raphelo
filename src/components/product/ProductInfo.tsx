"use client";

import React, { useState } from "react";
import { Heart, Minus, Plus, Check, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "100ml");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);

  // Price adjustment for 50ml vs 100ml
  const currentPrice =
    selectedSize === "50ml"
      ? Math.round(product.price * 0.72)
      : selectedSize === "6 x 2ml" || selectedSize === "3 x 15ml"
      ? product.price
      : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col text-left">
      {/* Brand & Category */}
      <div className="mb-2">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E]">
          RAPHÈLO · {product.family}
        </span>
      </div>

      {/* Fragrance Name */}
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1D1C1A] tracking-wide mb-3">
        {product.name}
      </h1>

      {/* Mood Quotation */}
      <p className="font-serif italic text-lg text-[#68645E] mb-6">
        “{product.atmosphere}”
      </p>

      {/* Price */}
      <div className="flex items-baseline space-x-3 mb-8 pb-6 border-b border-[#C8BDAF]/30">
        <span className="font-sans text-2xl text-[#1D1C1A] font-light">
          {formatPrice(currentPrice)}
        </span>
        <span className="text-xs text-[#68645E] font-light">
          Tax included. Complimentary delivery on orders over $150.
        </span>
      </div>

      {/* Description */}
      <p className="text-sm font-sans text-[#1D1C1A] leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Size Selector */}
      <div className="mb-6">
        <label className="text-[11px] uppercase tracking-[0.16em] text-[#68645E] block mb-2 font-medium">
          Format & Volume
        </label>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-5 py-2.5 text-xs font-sans uppercase tracking-[0.14em] transition-all duration-200 border ${
                selectedSize === size
                  ? "border-[#1D1C1A] bg-[#1D1C1A] text-[#F4F0E8]"
                  : "border-[#C8BDAF]/60 bg-[#F4F0E8] text-[#1D1C1A] hover:border-[#1D1C1A]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Quantity Controls */}
        <div className="flex items-center border border-[#C8BDAF] bg-[#E9E3D9]/30 h-12 w-32 shrink-0">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-full flex items-center justify-center text-[#1D1C1A] hover:bg-[#E9E3D9] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="grow text-center text-xs font-sans font-medium text-[#1D1C1A]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-full flex items-center justify-center text-[#1D1C1A] hover:bg-[#E9E3D9] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          fullWidth
          className="h-12 text-xs"
        >
          {isAdded ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#707462]" /> Added to Cart
            </span>
          ) : (
            `Add to Cart · ${formatPrice(currentPrice * quantity)}`
          )}
        </Button>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`h-12 w-12 shrink-0 border flex items-center justify-center transition-colors ${
            isFavorite
              ? "border-[#A8735B] bg-[#A8735B]/10 text-[#A8735B]"
              : "border-[#C8BDAF] bg-transparent text-[#1D1C1A] hover:border-[#1D1C1A]"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-[#A8735B]" : ""}`} />
        </button>
      </div>

      {/* Reassurance Guarantees */}
      <div className="pt-6 border-t border-[#C8BDAF]/30 space-y-3.5 text-xs text-[#68645E]">
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#A8735B] shrink-0 mt-0.5" />
          <span>
            <strong className="font-medium text-[#1D1C1A]">Complimentary 2ml Sampler:</strong> Included with every full flacon. Test the scent at leisure before opening the seal.
          </span>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="w-4 h-4 text-[#707462] shrink-0 mt-0.5" />
          <span>
            <strong className="font-medium text-[#1D1C1A]">Complimentary Delivery:</strong> Orders over $150 arrive in our signature tactile ivory packaging.
          </span>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#1D1C1A] shrink-0 mt-0.5" />
          <span>
            <strong className="font-medium text-[#1D1C1A]">Authentic Creation:</strong> Formulated in Grasse and Paris with responsibly sourced botanical extractions.
          </span>
        </div>
      </div>
    </div>
  );
}
