import React from "react";
import Image from "next/image";

interface MonogramProps {
  className?: string;
  size?: number;
  variant?: "dark" | "light" | "auto";
  alt?: string;
}

export default function RapheloMonogram({
  className = "",
  size = 28,
  variant = "auto",
  alt = "RAPHÈLO Monogram",
}: MonogramProps) {
  const isLight =
    variant === "light" ||
    className.includes("text-white") ||
    className.includes("text-[#F4F0E8]") ||
    className.includes("text-[#C8BDAF]");

  const logoSrc = isLight ? "/images/logo-white.png" : "/images/logo.png";

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={alt}
    >
      <Image
        src={logoSrc}
        alt={alt}
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-contain"
      />
    </span>
  );
}

