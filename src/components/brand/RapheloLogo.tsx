import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showAccent?: boolean;
  showMark?: boolean;
  showText?: boolean;
  variant?: "dark" | "light" | "auto";
}

export default function RapheloLogo({
  className = "",
  size = "md",
  showMark = true,
  showText = true,
  variant = "auto",
}: LogoProps) {
  const isLight =
    variant === "light" ||
    className.includes("text-white") ||
    className.includes("text-[#F4F0E8]") ||
    className.includes("text-[#C8BDAF]");

  const logoSrc = isLight ? "/images/logo-white.png" : "/images/logo.png";

  const markSizes = {
    sm: { width: 26, height: 26, className: "w-6 h-6 sm:w-6.5 sm:h-6.5" },
    md: { width: 34, height: 34, className: "w-7 h-7 sm:w-8.5 sm:h-8.5" },
    lg: { width: 44, height: 44, className: "w-9 h-9 sm:w-11 sm:h-11" },
    xl: { width: 60, height: 60, className: "w-12 h-12 sm:w-15 sm:h-15" },
  };

  const textSizes = {
    sm: "text-base sm:text-lg tracking-[0.2em]",
    md: "text-xl sm:text-2xl tracking-[0.22em]",
    lg: "text-2xl sm:text-3xl tracking-[0.25em]",
    xl: "text-3xl sm:text-4xl md:text-5xl tracking-[0.28em]",
  };

  const gaps = {
    sm: "gap-2",
    md: "gap-2.5 sm:gap-3",
    lg: "gap-3 sm:gap-3.5",
    xl: "gap-3.5 sm:gap-4",
  };

  return (
    <span
      className={`inline-flex items-center select-none transition-opacity duration-300 ${gaps[size]} ${className}`}
      aria-label="RAPHÈLO"
    >
      {showMark && (
        <span className={`inline-flex shrink-0 items-center justify-center ${markSizes[size].className}`}>
          <Image
            src={logoSrc}
            alt="RAPHÈLO emblem"
            width={markSizes[size].width * 2}
            height={markSizes[size].height * 2}
            className="w-full h-full object-contain"
            priority
          />
        </span>
      )}

      {showText && (
        <span
          className={`font-serif font-medium uppercase ${textSizes[size]}`}
          style={{ letterSpacing: "0.22em" }}
        >
          RAPHÈLO
        </span>
      )}
    </span>
  );
}

