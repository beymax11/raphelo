import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "ink" | "clay" | "olive" | "taupe";
  className?: string;
}

export default function Badge({
  children,
  variant = "ink",
  className = "",
}: BadgeProps) {
  const variants = {
    ink: "bg-[#1D1C1A] text-[#F4F0E8]",
    clay: "bg-[#A8735B] text-[#F4F0E8]",
    olive: "bg-[#707462] text-[#F4F0E8]",
    taupe: "bg-[#E9E3D9] text-[#68645E] border border-[#C8BDAF]/50",
  };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium select-none",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
