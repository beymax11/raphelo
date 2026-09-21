import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { JournalArticle } from "@/types";

interface StoryCardProps {
  article: JournalArticle;
}

export default function StoryCard({ article }: StoryCardProps) {
  return (
    <article className="group flex flex-col text-left">
      <Link
        href={`/journal/${article.slug}`}
        className="relative aspect-16/10 sm:aspect-3/2 w-full overflow-hidden bg-[#E9E3D9] mb-5 border border-[#C8BDAF]/30 block"
      >
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 bg-[#1D1C1A] text-[#F4F0E8] text-[9px] uppercase tracking-[0.2em] font-medium">
            {article.category}
          </span>
        </div>
      </Link>

      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#68645E] mb-2 font-light">
        <span>{article.readTime}</span>
        <span>{article.publishedAt}</span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl text-[#1D1C1A] group-hover:text-[#A8735B] transition-colors leading-snug mb-2">
        <Link href={`/journal/${article.slug}`} className="flex items-start justify-between">
          <span>{article.title}</span>
          <ArrowUpRight className="w-4 h-4 text-[#C8BDAF] group-hover:text-[#A8735B] transition-colors shrink-0 mt-1 ml-2" />
        </Link>
      </h3>

      <p className="text-xs sm:text-sm font-sans text-[#68645E] line-clamp-2 leading-relaxed font-light">
        {article.excerpt}
      </p>
    </article>
  );
}
