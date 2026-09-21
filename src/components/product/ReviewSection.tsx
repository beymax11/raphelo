"use client";

import React, { useState } from "react";
import { Star, CheckCircle, Plus } from "lucide-react";
import { Review } from "@/types";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

interface ReviewSectionProps {
  productId: string;
  productName: string;
  initialRating?: number;
  initialReviewCount?: number;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "11111111-1111-1111-1111-111111111111",
    authorName: "Camille D.",
    rating: 5,
    title: "Light in liquid form.",
    comment:
      "HALO is unlike any iris fragrance I have experienced. It is dry, crisp, and leaves an intimate impression on linen shirts. It does not announce itself; it simply elevates the room.",
    date: "September 4, 2026",
    verifiedPurchase: true,
  },
  {
    id: "rev-2",
    productId: "11111111-1111-1111-1111-111111111111",
    authorName: "Julian M.",
    rating: 5,
    title: "The bottle alone is a sculpture.",
    comment:
      "The heavy glass base and minimalist label look extraordinary on the mantle. The cashmere wood note lingers for more than 10 hours without becoming cloying.",
    date: "August 19, 2026",
    verifiedPurchase: true,
  },
  {
    id: "rev-3",
    productId: "22222222-2222-2222-2222-222222222222",
    authorName: "Siddharth P.",
    rating: 5,
    title: "Enveloping and quiet.",
    comment:
      "Warm pepper and saffron transitioning into soft smoked vanilla. It feels like returning home to warm lamps on a rainy October evening.",
    date: "August 2, 2026",
    verifiedPurchase: true,
  },
];

export default function ReviewSection({
  productId,
  productName,
  initialRating = 4.9,
  initialReviewCount = 38,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(
    SAMPLE_REVIEWS.filter((r) => r.productId === productId).length > 0
      ? SAMPLE_REVIEWS.filter((r) => r.productId === productId)
      : SAMPLE_REVIEWS
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: "rev-" + Date.now(),
      productId,
      authorName,
      rating,
      title: title || "Atmospheric Impression",
      comment,
      date: "Today",
      verifiedPurchase: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setAuthorName("");
      setTitle("");
      setComment("");
    }, 1200);
  };

  return (
    <div className="py-12 border-t border-[#C8BDAF]/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1 font-medium">
            Customer Reflections
          </span>
          <h3 className="font-serif text-3xl text-[#1D1C1A]">
            Atmospheric Reviews
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-[#A8735B]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(initialRating)
                      ? "fill-[#A8735B]"
                      : "text-[#C8BDAF]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#1D1C1A] font-medium">
              {initialRating.toFixed(1)} / 5.0
            </span>
            <span className="text-xs text-[#68645E]">
              ({reviews.length || initialReviewCount} reviews)
            </span>
          </div>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          size="sm"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 bg-[#E9E3D9]/30 border border-[#C8BDAF]/30 text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex text-[#A8735B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? "fill-[#A8735B]" : "text-[#C8BDAF]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#68645E] font-light">
                {rev.date}
              </span>
            </div>

            <h4 className="font-serif text-lg text-[#1D1C1A] mb-2">
              {rev.title}
            </h4>
            <p className="text-sm text-[#68645E] leading-relaxed mb-4">
              {rev.comment}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#1D1C1A] font-medium pt-3 border-t border-[#C8BDAF]/20">
              <span>{rev.authorName}</span>
              {rev.verifiedPurchase && (
                <span className="flex items-center gap-1 text-[10px] text-[#707462] font-normal uppercase tracking-wider">
                  <CheckCircle className="w-3 h-3" /> Verified Collector
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Review ${productName}`}
      >
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-10 h-10 text-[#707462] mx-auto mb-3" />
            <h4 className="font-serif text-xl text-[#1D1C1A] mb-1">
              Thank You
            </h4>
            <p className="text-xs text-[#68645E]">
              Your reflection has been added to the RAPHÈLO archive.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-[0.16em] text-[#68645E] block mb-2 font-medium">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="p-1 text-[#A8735B]"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        num <= rating ? "fill-[#A8735B]" : "text-[#C8BDAF]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Your Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Eleanor V."
              required
            />

            <Input
              label="Summary Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scent of clean morning light"
              required
            />

            <div className="flex flex-col text-left">
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#68645E] mb-2 font-medium">
                Your Atmospheric Impression
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe how the scent inhabits your space or skin…"
                className="w-full bg-[#E9E3D9]/40 border-b border-[#C8BDAF] px-3.5 py-3 text-sm text-[#1D1C1A] placeholder-[#68645E]/60 focus:outline-none focus:border-[#1D1C1A]"
                required
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
