"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const currentImage = images[selectedIdx] || images[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails (if multiple images) */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#E9E3D9]/60 overflow-hidden border transition-all duration-200 ${
                selectedIdx === idx
                  ? "border-[#1D1C1A] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Showcase Image */}
      <div
        className="relative w-full aspect-square sm:aspect-4/5 bg-[#E9E3D9]/50 overflow-hidden cursor-crosshair border border-[#C8BDAF]/30"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={currentImage}
          alt={`RAPHÈLO ${productName}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover object-center transition-transform duration-300 ${
            isZoomed ? "scale-125" : "scale-100"
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : undefined
          }
        />

        {/* Ambient watermark */}
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-40">
          <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#1D1C1A]">
            RAPHÈLO
          </span>
        </div>
      </div>
    </div>
  );
}
