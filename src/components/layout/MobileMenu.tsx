"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Heart, User, Compass } from "lucide-react";
import RapheloLogo from "@/components/brand/RapheloLogo";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1D1C1A]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Menu Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#F4F0E8] h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-left duration-300 z-10 border-r border-[#C8BDAF]/40">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#C8BDAF]/30">
            <RapheloLogo size="sm" />
            <button
              onClick={onClose}
              className="p-1 text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation */}
          <nav className="py-8 space-y-5">
            <Link
              href="/shop"
              onClick={onClose}
              className="block font-serif text-2xl text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
            >
              All Fragrances
            </Link>
            <Link
              href="/collections"
              onClick={onClose}
              className="block font-serif text-2xl text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/discovery-sets"
              onClick={onClose}
              className="block font-serif text-2xl text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
            >
              Discovery Sets
            </Link>
            <Link
              href="/journal"
              onClick={onClose}
              className="block font-serif text-2xl text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="block font-serif text-2xl text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
            >
              About RAPHÈLO
            </Link>
          </nav>

          {/* Atmospheric Fragrance Finder Banner */}
          <div className="bg-[#E9E3D9] p-4 my-2 border border-[#C8BDAF]/40">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] mb-1 font-medium">
              Atmospheric Diagnostic
            </p>
            <Link
              href="/fragrance-finder"
              onClick={onClose}
              className="font-serif text-base text-[#1D1C1A] flex items-center justify-between hover:text-[#A8735B] transition-colors"
            >
              <span>Fragrance Finder</span>
              <ArrowRight className="w-4 h-4 text-[#A8735B]" />
            </Link>
          </div>

          {/* Secondary Quick Links */}
          <div className="py-4 space-y-3 text-xs uppercase tracking-[0.16em] text-[#68645E]">
            <Link
              href="/new-arrivals"
              onClick={onClose}
              className="block hover:text-[#1D1C1A] transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/best-sellers"
              onClick={onClose}
              className="block hover:text-[#1D1C1A] transition-colors"
            >
              Best Sellers
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="block hover:text-[#1D1C1A] transition-colors"
            >
              Concierge & Contact
            </Link>
            <Link
              href="/faq"
              onClick={onClose}
              className="block hover:text-[#1D1C1A] transition-colors"
            >
              Frequently Asked Questions
            </Link>
          </div>
        </div>

        {/* Footer Account / Wishlist */}
        <div className="pt-6 border-t border-[#C8BDAF]/30 flex items-center justify-between text-xs uppercase tracking-[0.16em]">
          <Link
            href={isAuthenticated ? "/account" : "/account/login"}
            onClick={onClose}
            className="flex items-center space-x-2 text-[#1D1C1A] hover:text-[#A8735B]"
          >
            <User className="w-4 h-4" />
            <span>{isAuthenticated ? "My Account" : "Sign In"}</span>
          </Link>
          <Link
            href="/account/wishlist"
            onClick={onClose}
            className="flex items-center space-x-2 text-[#1D1C1A] hover:text-[#A8735B]"
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
