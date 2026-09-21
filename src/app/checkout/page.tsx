"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, ShieldCheck, CreditCard } from "lucide-react";
import RapheloLogo from "@/components/brand/RapheloLogo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { validateCheckoutForm } from "@/lib/validations";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const { user, addresses, createOrder } = useAuth();

  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || defaultAddr?.firstName || "",
    lastName: user?.lastName || defaultAddr?.lastName || "",
    street: defaultAddr?.street || "",
    apartment: defaultAddr?.apartment || "",
    city: defaultAddr?.city || "",
    province: defaultAddr?.province || "",
    postalCode: defaultAddr?.postalCode || "",
    phone: user?.phone || defaultAddr?.phone || "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "klarna">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        email: formData.email,
        status: "processing",
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
          imageUrl: i.product.images[0],
        })),
        subtotal,
        shipping: shippingCost,
        total,
        shippingAddress: {
          id: "addr-" + Date.now(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        paymentMethod:
          paymentMethod === "card"
            ? "Credit Card ending in 4242"
            : paymentMethod === "apple_pay"
            ? "Apple Pay"
            : "Klarna (Pay in 4)",
      });

      clearCart();
      router.push(`/checkout/success?orderNumber=${order.orderNumber}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-[#1D1C1A] mb-3">
          Your cart is currently empty.
        </h2>
        <p className="text-sm text-[#68645E] mb-6 font-light">
          Please add a fragrance to your selection before proceeding to checkout.
        </p>
        <Button href="/shop">Explore Fragrances</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-left">
      {/* Distraction-Free Header */}
      <header className="border-b border-[#C8BDAF]/30 py-6 bg-[#F4F0E8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="hover:opacity-85 transition-opacity">
            <RapheloLogo size="md" />
          </Link>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#68645E]">
            <Lock className="w-3.5 h-3.5 text-[#707462]" />
            <span>Encrypted Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact, Shipping, Payment */}
            <div className="lg:col-span-7 space-y-10">
              {/* Contact Information */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#C8BDAF]/30">
                  <h2 className="font-serif text-2xl text-[#1D1C1A]">
                    1. Contact Information
                  </h2>
                  {!user && (
                    <Link
                      href="/account/login"
                      className="text-xs text-[#A8735B] underline"
                    >
                      Sign in for faster checkout
                    </Link>
                  )}
                </div>

                <Input
                  label="Email for Order Confirmation"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                  placeholder="name@example.com"
                  required
                />
              </section>

              {/* Delivery Address */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-[#1D1C1A] pb-2 border-b border-[#C8BDAF]/30">
                  2. Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    error={errors.firstName}
                    placeholder="Eleanor"
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    error={errors.lastName}
                    placeholder="Vance"
                    required
                  />
                </div>

                <Input
                  label="Street Address"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                  error={errors.street}
                  placeholder="740 Park Avenue"
                  required
                />

                <Input
                  label="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={(e) =>
                    setFormData({ ...formData, apartment: e.target.value })
                  }
                  placeholder="Apt 4B"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    error={errors.city}
                    placeholder="New York"
                    required
                  />
                  <Input
                    label="State / Province"
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    error={errors.province}
                    placeholder="NY"
                    required
                  />
                  <Input
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    error={errors.postalCode}
                    placeholder="10021"
                    required
                  />
                </div>

                <Input
                  label="Phone Number (for courier updates)"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 234-8901"
                />
              </section>

              {/* Payment Section */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl text-[#1D1C1A] pb-2 border-b border-[#C8BDAF]/30">
                  3. Payment Method
                </h2>

                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === "card"
                        ? "border-[#1D1C1A] bg-[#E9E3D9]/60"
                        : "border-[#C8BDAF]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="accent-[#1D1C1A]"
                      />
                      <span className="text-xs font-sans uppercase tracking-[0.14em] text-[#1D1C1A] font-medium">
                        Credit / Debit Card
                      </span>
                    </div>
                    <CreditCard className="w-4 h-4 text-[#68645E]" />
                  </label>

                  {paymentMethod === "card" && (
                    <div className="p-4 bg-[#E9E3D9]/30 border border-[#C8BDAF]/30 space-y-4">
                      <Input
                        label="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• 4242"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Expiry (MM/YY)" placeholder="12/28" />
                        <Input label="Security Code" placeholder="123" />
                      </div>
                    </div>
                  )}

                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === "apple_pay"
                        ? "border-[#1D1C1A] bg-[#E9E3D9]/60"
                        : "border-[#C8BDAF]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "apple_pay"}
                        onChange={() => setPaymentMethod("apple_pay")}
                        className="accent-[#1D1C1A]"
                      />
                      <span className="text-xs font-sans uppercase tracking-[0.14em] text-[#1D1C1A] font-medium">
                        Apple Pay
                      </span>
                    </div>
                    <span className="text-xs text-[#68645E]">One-touch</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      paymentMethod === "klarna"
                        ? "border-[#1D1C1A] bg-[#E9E3D9]/60"
                        : "border-[#C8BDAF]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "klarna"}
                        onChange={() => setPaymentMethod("klarna")}
                        className="accent-[#1D1C1A]"
                      />
                      <span className="text-xs font-sans uppercase tracking-[0.14em] text-[#1D1C1A] font-medium">
                        Klarna · 4 interest-free payments of {formatPrice(total / 4)}
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  size="lg"
                  fullWidth
                  className="py-4 text-xs tracking-[0.2em]"
                >
                  {isProcessing
                    ? "Securing Order…"
                    : `Place Order · ${formatPrice(total)}`}
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#68645E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#707462]" />
                  <span>30-Day Complimentary Returns with Invitation Sampler</span>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="lg:col-span-5 bg-[#E9E3D9]/50 border border-[#C8BDAF]/40 p-6 sm:p-8 h-fit">
              <h3 className="font-serif text-2xl text-[#1D1C1A] pb-4 border-b border-[#C8BDAF]/30 mb-6">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 pb-6 border-b border-[#C8BDAF]/30">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-[#E9E3D9] shrink-0 border border-[#C8BDAF]/30 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grow min-w-0">
                      <h4 className="font-serif text-base text-[#1D1C1A] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#68645E]">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-sans font-medium text-[#1D1C1A]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Costs Breakdown */}
              <div className="py-6 space-y-2.5 text-xs text-[#68645E] border-b border-[#C8BDAF]/30">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1D1C1A] font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-[#707462]">Complimentary</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax</span>
                  <span>Included</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-6 flex justify-between items-baseline">
                <span className="font-serif text-xl text-[#1D1C1A]">Total</span>
                <span className="font-sans text-2xl text-[#1D1C1A] font-medium">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
