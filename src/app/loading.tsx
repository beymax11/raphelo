import React from "react";
import RapheloMonogram from "@/components/brand/RapheloMonogram";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <RapheloMonogram size={36} className="text-[#1D1C1A] animate-pulse mb-4" />
      <span className="font-serif text-sm tracking-[0.2em] text-[#68645E] uppercase">
        Loading Atmosphere…
      </span>
    </div>
  );
}
