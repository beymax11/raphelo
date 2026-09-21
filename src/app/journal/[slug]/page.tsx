import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import StoryCard from "@/components/editorial/StoryCard";
import { JOURNAL_ARTICLES, getArticleBySlug } from "@/lib/journal";
import { Share2, ArrowLeft } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} — Journal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.slug !== slug);

  return (
    <article className="w-full">
      {/* Top Bar / Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-left">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#68645E] hover:text-[#1D1C1A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>
      </div>

      <PageContainer size="narrow">
        {/* Header */}
        <div className="text-left mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-2.5 py-1 bg-[#1D1C1A] text-[#F4F0E8] text-[9px] uppercase tracking-[0.2em] font-medium">
              {article.category}
            </span>
            <span className="text-xs text-[#68645E] font-light">
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight leading-[1.15] mb-6">
            {article.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-[#C8BDAF]/30 text-xs font-sans text-[#68645E]">
            <div>
              <span className="font-medium text-[#1D1C1A]">
                Words by {article.author}
              </span>{" "}
              · {article.publishedAt}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs text-[#1D1C1A] hover:text-[#A8735B] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-[#E9E3D9] mb-12 border border-[#C8BDAF]/30">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Body Paragraphs */}
        <div className="text-left space-y-6 text-base sm:text-lg font-serif text-[#1D1C1A] leading-relaxed mb-16">
          <p className="font-serif italic text-xl sm:text-2xl text-[#68645E] leading-relaxed border-l-2 border-[#A8735B] pl-6 my-8">
            “{article.excerpt}”
          </p>

          {article.content.map((paragraph, idx) => (
            <p key={idx} className="font-sans text-sm sm:text-base text-[#1D1C1A] leading-relaxed font-light">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Footnote */}
        <div className="p-6 bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 mb-20 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1">
            Author Profile
          </span>
          <h4 className="font-serif text-lg text-[#1D1C1A] mb-1">
            {article.author}
          </h4>
          <p className="text-xs font-sans text-[#68645E] leading-relaxed font-light">
            Researcher in olfactory perception and guest contributor to the RAPHÈLO Archive. Based in Paris.
          </p>
        </div>

        {/* Related Stories */}
        <div className="border-t border-[#C8BDAF]/30 pt-16 text-left">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#68645E] block mb-2 font-medium">
            Further Reading
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1D1C1A] mb-8">
            Related Stories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedArticles.slice(0, 2).map((rel) => (
              <StoryCard key={rel.slug} article={rel} />
            ))}
          </div>
        </div>
      </PageContainer>
    </article>
  );
}
