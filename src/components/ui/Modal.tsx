"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1D1C1A]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        className={cn(
          "relative w-full bg-[#F4F0E8] border border-[#C8BDAF]/50 shadow-2xl p-6 sm:p-8 z-10 transition-all duration-300 animate-in fade-in zoom-in-95",
          maxWidthClasses[maxWidth]
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-[#68645E] hover:text-[#1D1C1A] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <h3 className="font-serif text-2xl text-[#1D1C1A] mb-6 tracking-wide text-left">
            {title}
          </h3>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
