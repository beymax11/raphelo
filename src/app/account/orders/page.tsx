"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import AccountNav from "@/components/account/AccountNav";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function OrdersPage() {
  const { orders } = useAuth();

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Order Archives
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1D1C1A] tracking-tight mb-2">
          ORDER HISTORY
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E]">
          Review past deliveries, track recent shipments, and re-order signature scents.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-left">
        <AccountNav />

        <div className="grow space-y-6 w-full">
          {orders.length === 0 ? (
            <div className="p-12 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 text-center">
              <p className="font-serif text-2xl text-[#1D1C1A] mb-2">
                No orders found.
              </p>
              <p className="text-xs text-[#68645E] mb-6">
                Your future orders will appear here for easy tracking and re-ordering.
              </p>
              <Button href="/shop">Explore Fragrances</Button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 sm:p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C8BDAF]/30 gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1">
                      Order Reference
                    </span>
                    <span className="font-mono text-sm font-medium text-[#1D1C1A]">
                      {order.orderNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[#68645E]">{order.date}</span>
                    <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider bg-[#707462] text-[#F4F0E8]">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#C8BDAF]/20">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 bg-[#E9E3D9] shrink-0 border border-[#C8BDAF]/30 overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-serif text-base text-[#1D1C1A]">
                            {item.productName}
                          </h3>
                          <p className="text-[11px] text-[#68645E]">
                            {item.size} · Quantity {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-sans text-xs text-[#1D1C1A] font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#C8BDAF]/30 gap-4">
                  <div className="text-xs text-[#68645E]">
                    <span>Total Amount: </span>
                    <strong className="font-serif text-base text-[#1D1C1A] ml-1">
                      {formatPrice(order.total)}
                    </strong>
                  </div>

                  <Link
                    href={`/account/orders/${order.id}`}
                    className="inline-block text-xs uppercase tracking-[0.16em] text-[#1D1C1A] hover:text-[#A8735B] underline"
                  >
                    View Order Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
}
