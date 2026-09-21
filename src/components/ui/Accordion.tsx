"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  defaultOpenId?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className = "",
  defaultOpenId,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-[#C8BDAF]/30 border-y border-[#C8BDAF]/30", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-2">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-4 text-left font-serif text-lg md:text-xl text-[#1D1C1A] hover:text-[#A8735B] transition-colors duration-200 group"
            >
              <span className="tracking-[0.03em]">{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#68645E] transition-transform duration-300 ease-out group-hover:text-[#1D1C1A]",
                  isOpen ? "rotate-180 text-[#1D1C1A]" : ""
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
              )}
            >
              <div className="text-sm font-sans text-[#68645E] leading-relaxed pt-1">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
