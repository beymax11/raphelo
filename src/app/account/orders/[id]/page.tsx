"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle, Truck, Package, Clock } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import AccountNav from "@/components/account/AccountNav";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { orders } = useAuth();

  const orderId = params?.id as string;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <PageContainer>
        <div className="py-20 text-center">
          <h2 className="font-serif text-2xl text-[#1D1C1A] mb-4">
            Order not found
          </h2>
          <Button href="/account/orders">Back to Orders</Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#68645E] hover:text-[#1D1C1A] mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] tracking-tight">
            Order {order.orderNumber}
          </h1>
          <span className="text-xs font-sans text-[#68645E]">
            Placed on {order.date}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start text-left">
        <AccountNav />

        <div className="grow space-y-8 w-full">
          {/* Status Tracker */}
          <div className="p-6 bg-[#E9E3D9]/60 border border-[#C8BDAF]/40">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-4 font-medium">
              Delivery Progress
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#1D1C1A] text-[#F4F0E8] flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 text-[#707462]" />
                </div>
                <span className="font-medium text-[#1D1C1A]">Confirmed</span>
                <span className="text-[10px] text-[#68645E]">Laboratory</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#1D1C1A] text-[#F4F0E8] flex items-center justify-center mb-2">
                  <Truck className="w-4 h-4 text-[#A8735B]" />
                </div>
                <span className="font-medium text-[#1D1C1A]">Dispatched</span>
                <span className="text-[10px] text-[#68645E]">In Transit</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#707462] text-[#F4F0E8] flex items-center justify-center mb-2">
                  <Package className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#1D1C1A]">Delivered</span>
                <span className="text-[10px] text-[#68645E]">Recipient</span>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="p-6 sm:p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 space-y-4">
            <h2 className="font-serif text-xl text-[#1D1C1A] pb-3 border-b border-[#C8BDAF]/30">
              Purchased Creations
            </h2>

            <div className="divide-y divide-[#C8BDAF]/20">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 bg-[#E9E3D9] overflow-hidden border border-[#C8BDAF]/30 shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#1D1C1A]">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-[#68645E]">
                        Format: {item.size} · Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-sans text-sm text-[#1D1C1A] font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-6 border-t border-[#C8BDAF]/30 space-y-2 text-xs text-[#68645E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1D1C1A] font-medium font-sans">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span>
                  {order.shipping === 0
                    ? "Complimentary Priority Courier"
                    : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[#1D1C1A] pt-3 border-t border-[#C8BDAF]/30 font-medium">
                <span>Total Paid</span>
                <span className="font-serif text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 text-xs text-[#68645E] space-y-2">
              <h3 className="font-serif text-base text-[#1D1C1A] mb-2 font-medium">
                Delivery Address
              </h3>
              <p className="font-medium text-[#1D1C1A]">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.street} {order.shippingAddress.apartment}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                {order.shippingAddress.postalCode}
              </p>
              {order.shippingAddress.phone && (
                <p>Phone: {order.shippingAddress.phone}</p>
              )}
            </div>

            <div className="p-6 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 text-xs text-[#68645E] space-y-2">
              <h3 className="font-serif text-base text-[#1D1C1A] mb-2 font-medium">
                Payment Information
              </h3>
              <p className="font-medium text-[#1D1C1A]">
                {order.paymentMethod}
              </p>
              <p>Billing status: Paid in full</p>
              <p>Invoice reference: INV-{order.orderNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
