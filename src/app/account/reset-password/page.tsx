"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import RapheloLogo from "@/components/brand/RapheloLogo";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSubmitted(true);
    setTimeout(() => {
      router.push("/account/login");
    }, 1500);
  };

  return (
    <PageContainer size="narrow">
      <div className="max-w-md mx-auto py-8 sm:py-16 text-center">
        <div className="flex justify-center mb-6">
          <RapheloLogo size="md" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-2 tracking-wide">
          New Password
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E] mb-8 font-light">
          Create a new secure password for your RAPHÈLO profile.
        </p>

        {submitted ? (
          <div className="p-6 bg-[#E9E3D9]/60 border border-[#C8BDAF]/40 text-center space-y-2">
            <h3 className="font-serif text-xl text-[#1D1C1A]">
              Password Updated
            </h3>
            <p className="text-xs text-[#68645E]">
              Redirecting you to the sign in page…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 border border-red-200">
                {error}
              </p>
            )}

            <Button type="submit" fullWidth size="lg">
              Save New Password
            </Button>
          </form>
        )}
      </div>
    </PageContainer>
  );
}
