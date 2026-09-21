"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
  onNavigate?: () => void;
}

export default function CartItem({ item, onNavigate }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-[#C8BDAF]/30 text-left">
      {/* Thumbnail */}
      <Link
        href={`/product/${item.product.slug}`}
        onClick={onNavigate}
        className="relative w-20 h-20 bg-[#E9E3D9]/60 shrink-0 overflow-hidden border border-[#C8BDAF]/30"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-col justify-between grow min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/product/${item.product.slug}`}
              onClick={onNavigate}
              className="font-serif text-base text-[#1D1C1A] hover:text-[#A8735B] transition-colors truncate block"
            >
              {item.product.name}
            </Link>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#68645E]">
              {item.size} · {item.product.subtitle}
            </p>
          </div>
          <span className="font-sans text-xs text-[#1D1C1A] font-medium shrink-0">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        {/* Quantity Controls & Remove */}
        <div className="flex items-center justify-between mt-2 pt-1">
          <div className="flex items-center border border-[#C8BDAF] bg-[#E9E3D9]/40 h-7">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="w-6 h-full flex items-center justify-center text-[#1D1C1A] hover:bg-[#E9E3D9] transition-colors"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <span className="w-7 text-center text-xs font-sans text-[#1D1C1A]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-6 h-full flex items-center justify-center text-[#1D1C1A] hover:bg-[#E9E3D9] transition-colors"
            >
              <Plus className="w-2.5 h-2.5" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            aria-label="Remove item"
            className="text-[#68645E] hover:text-red-700 transition-colors p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
