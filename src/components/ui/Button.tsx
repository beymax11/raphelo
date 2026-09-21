import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "clay";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-sans tracking-[0.14em] uppercase text-xs font-medium transition-all duration-300 select-none disabled:opacity-40 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "px-4 py-2.5 text-[11px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-8 py-4 text-xs tracking-[0.18em]",
  };

  const variantClasses = {
    primary:
      "bg-[#1D1C1A] text-[#F4F0E8] hover:bg-[#68645E] active:bg-[#1D1C1A]",
    secondary:
      "bg-[#E9E3D9] text-[#1D1C1A] hover:bg-[#C8BDAF] active:bg-[#E9E3D9]",
    outline:
      "border border-[#1D1C1A] text-[#1D1C1A] bg-transparent hover:bg-[#1D1C1A] hover:text-[#F4F0E8]",
    ghost:
      "text-[#1D1C1A] hover:text-[#A8735B] underline-offset-8 hover:underline bg-transparent px-2",
    clay:
      "bg-[#A8735B] text-[#F4F0E8] hover:bg-[#8e5e49] active:bg-[#A8735B]",
  };

  const classes = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth ? "w-full" : "",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
