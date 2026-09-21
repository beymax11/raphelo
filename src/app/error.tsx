"use client";

import React, { useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer size="narrow">
      <div className="py-24 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#A8735B] block mb-4 font-medium">
          Temporary Interruption
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1D1C1A] mb-4">
          An unexpected occurrence took place.
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-md mx-auto mb-10 font-light">
          Our studio has been informed. You may attempt to restore the atmosphere or return to the home sanctuary.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button href="/" variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
