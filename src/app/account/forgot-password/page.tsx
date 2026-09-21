"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import RapheloLogo from "@/components/brand/RapheloLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <PageContainer size="narrow">
      <div className="max-w-md mx-auto py-8 sm:py-16 text-center">
        <div className="flex justify-center mb-6">
          <RapheloLogo size="md" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-2 tracking-wide">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E] mb-8 font-light">
          Enter the email associated with your RAPHÈLO account to receive recovery instructions.
        </p>

        {submitted ? (
          <div className="p-6 bg-[#E9E3D9]/60 border border-[#C8BDAF]/40 text-center space-y-4">
            <h3 className="font-serif text-xl text-[#1D1C1A]">
              Check Your Inbox
            </h3>
            <p className="text-xs text-[#68645E] leading-relaxed">
              We have dispatched a confidential password reset link to{" "}
              <strong className="text-[#1D1C1A]">{email}</strong>.
            </p>
            <div className="pt-4">
              <Button href="/account/reset-password" size="sm">
                Proceed to Reset Password
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? "Sending Link…" : "Send Reset Link"}
            </Button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[#C8BDAF]/30 text-xs text-[#68645E]">
          <Link
            href="/account/login"
            className="text-[#1D1C1A] font-medium underline hover:text-[#A8735B]"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
