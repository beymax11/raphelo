"use client";

import React from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import RapheloLogo from "@/components/brand/RapheloLogo";

export default function AuthPromptModal() {
  const { isAuthPromptOpen, setIsAuthPromptOpen } = useWishlist();

  return (
    <Modal
      isOpen={isAuthPromptOpen}
      onClose={() => setIsAuthPromptOpen(false)}
      maxWidth="md"
    >
      <div className="text-center py-4">
        <div className="flex justify-center mb-6">
          <RapheloLogo size="md" />
        </div>

        <h4 className="font-serif text-2xl text-[#1D1C1A] mb-3">
          Preserve Your Fragrance Collection
        </h4>

        <p className="text-sm font-sans text-[#68645E] leading-relaxed mb-8 max-w-sm mx-auto">
          Create an account or sign in to save your personal fragrance preferences, wishlist, and curations across all your devices.
        </p>

        <div className="space-y-3">
          <Button
            href="/account/login"
            fullWidth
            onClick={() => setIsAuthPromptOpen(false)}
          >
            Sign In to RAPHÈLO
          </Button>

          <Button
            href="/account/register"
            variant="outline"
            fullWidth
            onClick={() => setIsAuthPromptOpen(false)}
          >
            Create an Account
          </Button>
        </div>

        <button
          onClick={() => setIsAuthPromptOpen(false)}
          className="mt-6 text-[11px] font-sans uppercase tracking-[0.16em] text-[#68645E] hover:text-[#1D1C1A] transition-colors"
        >
          Continue Exploring as Guest
        </button>
      </div>
    </Modal>
  );
}
