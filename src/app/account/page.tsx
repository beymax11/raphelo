"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import AccountNav from "@/components/account/AccountNav";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Package, Heart, MapPin } from "lucide-react";

export default function AccountPage() {
  const { user, isAuthenticated, orders, addresses } = useAuth();
  const { wishlist } = useWishlist();

  if (!isAuthenticated) {
    return (
      <PageContainer size="narrow">
        <div className="py-20 text-center bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-8 sm:p-16">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
            Authentication Required
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-4">
            Welcome to RAPHÈLO
          </h1>
          <p className="text-sm font-sans text-[#68645E] max-w-sm mx-auto mb-8 font-light">
            Sign in to access your personal fragrance archive, saved delivery details, and order history.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/account/login">Sign In</Button>
            <Button href="/account/register" variant="outline">
              Create Account
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  const recentOrder = orders[0];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return (
    <PageContainer>
      {/* Header */}
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Collector Dashboard
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-2">
          Bonjour, {user?.firstName || "Collector"}
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E]">
          Member of the RAPHÈLO Circle · {user?.email}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-left">
        {/* Navigation Sidebar */}
        <AccountNav />

        {/* Dashboard Content */}
        <div className="grow space-y-10 w-full">
          {/* Recent Order Preview */}
          <section className="p-6 sm:p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40">
            <div className="flex items-center justify-between pb-4 border-b border-[#C8BDAF]/30 mb-6">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#1D1C1A]" />
                <h2 className="font-serif text-xl text-[#1D1C1A]">
                  Most Recent Order
                </h2>
              </div>
              <Link
                href="/account/orders"
                className="text-xs uppercase tracking-[0.14em] text-[#1D1C1A] hover:text-[#A8735B]"
              >
                View All Orders ({orders.length}) →
              </Link>
            </div>

            {recentOrder ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[#68645E]">Order:</span>{" "}
                    <strong className="font-mono text-[#1D1C1A]">
                      {recentOrder.orderNumber}
                    </strong>
                    <span className="text-[#68645E] ml-4">Placed:</span>{" "}
                    <span className="text-[#1D1C1A]">{recentOrder.date}</span>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider bg-[#707462] text-[#F4F0E8] w-fit">
                    {recentOrder.status}
                  </span>
                </div>

                <div className="divide-y divide-[#C8BDAF]/20 pt-2">
                  {recentOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-[#E9E3D9] overflow-hidden border border-[#C8BDAF]/30">
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-sm text-[#1D1C1A]">
                            {item.productName}
                          </p>
                          <p className="text-[11px] text-[#68645E]">
                            {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-sans text-[#1D1C1A]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between items-center text-xs border-t border-[#C8BDAF]/30">
                  <span className="font-medium text-[#1D1C1A]">Total Paid:</span>
                  <span className="font-serif text-base text-[#1D1C1A]">
                    {formatPrice(recentOrder.total)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#68645E]">
                No orders placed yet. Your first fragrance order will appear here.
              </p>
            )}
          </section>

          {/* Wishlist Preview */}
          <section className="p-6 sm:p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40">
            <div className="flex items-center justify-between pb-4 border-b border-[#C8BDAF]/30 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A8735B]" />
                <h2 className="font-serif text-xl text-[#1D1C1A]">
                  Saved Fragrances
                </h2>
              </div>
              <Link
                href="/account/wishlist"
                className="text-xs uppercase tracking-[0.14em] text-[#1D1C1A] hover:text-[#A8735B]"
              >
                View Wishlist ({wishlist.length}) →
              </Link>
            </div>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wishlist.slice(0, 3).map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.slug}`}
                    className="group block text-left"
                  >
                    <div className="relative aspect-square w-full bg-[#E9E3D9] overflow-hidden border border-[#C8BDAF]/30 mb-2">
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-serif text-sm text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors">
                      {prod.name}
                    </h4>
                    <span className="text-xs text-[#68645E]">
                      {formatPrice(prod.price)}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#68645E]">
                Your wishlist is currently waiting for its first scent.
              </p>
            )}
          </section>

          {/* Saved Addresses Summary */}
          <section className="p-6 sm:p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40">
            <div className="flex items-center justify-between pb-4 border-b border-[#C8BDAF]/30 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#707462]" />
                <h2 className="font-serif text-xl text-[#1D1C1A]">
                  Primary Delivery Address
                </h2>
              </div>
              <Link
                href="/account/addresses"
                className="text-xs uppercase tracking-[0.14em] text-[#1D1C1A] hover:text-[#A8735B]"
              >
                Manage Addresses →
              </Link>
            </div>

            {defaultAddress ? (
              <div className="text-xs text-[#68645E] space-y-1">
                <p className="font-medium text-[#1D1C1A]">
                  {defaultAddress.firstName} {defaultAddress.lastName}
                </p>
                <p>{defaultAddress.street} {defaultAddress.apartment}</p>
                <p>
                  {defaultAddress.city}, {defaultAddress.province} {defaultAddress.postalCode}
                </p>
                {defaultAddress.phone && <p>Phone: {defaultAddress.phone}</p>}
              </div>
            ) : (
              <p className="text-xs text-[#68645E]">
                No addresses saved yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
