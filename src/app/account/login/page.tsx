"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import RapheloLogo from "@/components/brand/RapheloLogo";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "Authentication failed. Please verify credentials.");
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await login("collector@raphelo.com", "password");
    setLoading(false);
    router.push("/account");
  };

  return (
    <PageContainer size="narrow">
      <div className="max-w-md mx-auto py-8 sm:py-16 text-center">
        <div className="flex justify-center mb-6">
          <RapheloLogo size="md" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-2 tracking-wide">
          Sign In
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E] mb-8 font-light">
          Access your personal fragrance archive and order status.
        </p>

        {/* Demo Account Quick Access */}
        <div className="mb-6 p-4 bg-[#E9E3D9]/60 border border-[#C8BDAF]/50 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1 font-medium">
            Studio Demo Access
          </span>
          <p className="text-xs text-[#68645E] mb-3">
            Explore the authenticated customer experience with pre-seeded order history and addresses:
          </p>
          <button
            type="button"
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full py-2 bg-[#1D1C1A] text-[#F4F0E8] text-[11px] uppercase tracking-[0.16em] hover:bg-[#68645E] transition-colors"
          >
            Sign In as Demo Collector
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="collector@raphelo.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div className="flex justify-end pt-1">
            <Link
              href="/account/forgot-password"
              className="text-xs text-[#68645E] hover:text-[#1D1C1A] underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2 border border-red-200">
              {error}
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing In…" : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#C8BDAF]/30 text-xs text-[#68645E]">
          <span>New to RAPHÈLO? </span>
          <Link
            href="/account/register"
            className="text-[#1D1C1A] font-medium underline hover:text-[#A8735B]"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
