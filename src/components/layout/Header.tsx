"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import RapheloLogo from "@/components/brand/RapheloLogo";
import MobileMenu from "@/components/layout/MobileMenu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Discovery", href: "/discovery-sets" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-[#1D1C1A] text-[#F4F0E8] text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] py-2 px-4 text-center select-none border-b border-[#C8BDAF]/10">
        Complimentary delivery on orders over $150 &nbsp;·&nbsp; Each creation arrives with an atmospheric sampler
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#F4F0E8]/95 backdrop-blur-md shadow-xs border-b border-[#C8BDAF]/30 py-3.5"
            : "bg-[#F4F0E8] border-b border-[#C8BDAF]/20 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link
              href="/search"
              className="p-1.5 ml-2 text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-[#1D1C1A] hover:opacity-85 transition-opacity">
              <RapheloLogo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#1D1C1A] font-semibold border-b border-[#1D1C1A] pb-0.5"
                      : "text-[#68645E] hover:text-[#1D1C1A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search (Desktop) */}
            <Link
              href="/search"
              className="hidden lg:flex items-center text-[#1D1C1A] hover:text-[#A8735B] transition-colors p-1"
              aria-label="Search fragrances"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="relative text-[#1D1C1A] hover:text-[#A8735B] transition-colors p-1"
              aria-label="View wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A8735B] text-white text-[9px] font-sans w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={isAuthenticated ? "/account" : "/account/login"}
              className="hidden sm:flex items-center text-[#1D1C1A] hover:text-[#A8735B] transition-colors p-1"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#1D1C1A] hover:text-[#A8735B] transition-colors p-1 flex items-center"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1D1C1A] text-[#F4F0E8] text-[9px] font-sans w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Over */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
