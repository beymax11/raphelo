"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import RapheloLogo from "@/components/brand/RapheloLogo";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    const result = await register(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password
    );
    setLoading(false);

    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "Failed to create account. Please try again.");
    }
  };

  return (
    <PageContainer size="narrow">
      <div className="max-w-md mx-auto py-8 sm:py-16 text-center">
        <div className="flex justify-center mb-6">
          <RapheloLogo size="md" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1D1C1A] mb-2 tracking-wide">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm font-sans text-[#68645E] mb-8 font-light">
          Join the RAPHÈLO circle to save preferences and track orders.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Eleanor"
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Vance"
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="eleanor@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="At least 6 characters"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            placeholder="Confirm password"
            required
          />

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
              {loading ? "Creating Account…" : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#C8BDAF]/30 text-xs text-[#68645E]">
          <span>Already have an account? </span>
          <Link
            href="/account/login"
            className="text-[#1D1C1A] font-medium underline hover:text-[#A8735B]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
