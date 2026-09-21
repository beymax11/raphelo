import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

export default function PageContainer({
  children,
  className = "",
  size = "default",
}: PageContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-(--breakpoint-2xl)",
    full: "w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
