"use client";

import React, { useState } from "react";
import Link from "next/link";
import RapheloLogo from "@/components/brand/RapheloLogo";
import RapheloMonogram from "@/components/brand/RapheloMonogram";
import Button from "@/components/ui/Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please provide a valid email address.");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setMessage("You are now welcomed into the RAPHÈLO circle.");
      setEmail("");
    }, 600);
  };

  return (
    <footer className="bg-[#1D1C1A] text-[#F4F0E8] pt-16 sm:pt-20 pb-12 border-t border-[#C8BDAF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="pb-16 mb-16 border-b border-[#C8BDAF]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8BDAF] block mb-2 font-medium">
              Private Correspondence
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-normal tracking-wide mb-3">
              Stay close to RAPHÈLO.
            </h3>
            <p className="text-sm font-sans text-[#C8BDAF] max-w-md font-light leading-relaxed">
              Receive new fragrance releases, olfactory stories, and private invitations directly to your inbox.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Enter your email address"
                className="grow bg-[#F4F0E8]/5 border border-[#C8BDAF]/30 px-4 py-3.5 text-sm text-[#F4F0E8] placeholder-[#C8BDAF]/60 focus:outline-none focus:border-[#F4F0E8] transition-colors"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={status === "loading"}
                className="sm:w-auto shrink-0"
              >
                {status === "loading" ? "Joining…" : "Join RAPHÈLO"}
              </Button>
            </form>
            {message && (
              <p
                className={`text-xs mt-3 ${status === "success" ? "text-[#C8BDAF]" : "text-red-400"
                  }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* 4 Column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-16 border-b border-[#C8BDAF]/20">
          {/* Shop */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#C8BDAF] mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-xs tracking-[0.14em] uppercase text-[#F4F0E8]/80 font-light">
              <li>
                <Link href="/shop" className="hover:text-[#A8735B] transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="hover:text-[#A8735B] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-[#A8735B] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/discovery-sets" className="hover:text-[#A8735B] transition-colors">
                  Discovery Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#C8BDAF] mb-5">
              About
            </h4>
            <ul className="space-y-3 text-xs tracking-[0.14em] uppercase text-[#F4F0E8]/80 font-light">
              <li>
                <Link href="/about" className="hover:text-[#A8735B] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#A8735B] transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/fragrance-finder" className="hover:text-[#A8735B] transition-colors">
                  Fragrance Finder
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#A8735B] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#C8BDAF] mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-xs tracking-[0.14em] uppercase text-[#F4F0E8]/80 font-light">
              <li>
                <Link href="/contact" className="hover:text-[#A8735B] transition-colors">
                  Contact & Concierge
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#A8735B] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#A8735B] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#A8735B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#C8BDAF] mb-5">
              Account
            </h4>
            <ul className="space-y-3 text-xs tracking-[0.14em] uppercase text-[#F4F0E8]/80 font-light">
              <li>
                <Link href="/account" className="hover:text-[#A8735B] transition-colors">
                  Customer Profile
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-[#A8735B] transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/account/wishlist" className="hover:text-[#A8735B] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account/addresses" className="hover:text-[#A8735B] transition-colors">
                  Saved Addresses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Logo, Social, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <RapheloMonogram size={24} className="text-[#C8BDAF]" />
            <span className="font-serif tracking-[0.22em] text-sm text-[#F4F0E8]">
              RAPHÈLO
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-xs uppercase tracking-[0.18em] text-[#C8BDAF]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F0E8] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F0E8] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F0E8] transition-colors"
            >
              TikTok
            </a>
          </div>

          {/* Legal / Copyright */}
          <div className="flex items-center space-x-6 text-[11px] text-[#C8BDAF]/70 font-light">
            <Link href="/terms" className="hover:text-[#F4F0E8] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#F4F0E8] transition-colors">
              Privacy
            </Link>
            <span>© {new Date().getFullYear()} RAPHÈLO. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
