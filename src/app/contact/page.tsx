"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/layout/PageContainer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { validateContactForm } from "@/lib/validations";
import { Mail, Clock, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 700);
  };

  return (
    <PageContainer>
      <div className="border-b border-[#C8BDAF]/30 pb-8 mb-12 text-left">
        <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#68645E] block mb-2 font-medium">
          Personal Concierge
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1D1C1A] tracking-tight mb-4">
          CONTACT
        </h1>
        <p className="text-sm font-sans text-[#68645E] max-w-lg font-light leading-relaxed">
          Our fragrance advisors are available to guide your selection, answer formulation inquiries, or assist with private orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 text-left">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="p-8 bg-[#E9E3D9]/60 border border-[#C8BDAF]/50 text-center py-16">
              <CheckCircle className="w-10 h-10 text-[#707462] mx-auto mb-4" />
              <h3 className="font-serif text-3xl text-[#1D1C1A] mb-2">
                Message Received
              </h3>
              <p className="text-sm font-sans text-[#68645E] max-w-sm mx-auto mb-8 font-light">
                Thank you for contacting RAPHÈLO. An olfactory advisor will review your note and respond within 24 hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={errors.name}
                  placeholder="Eleanor Vance"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                  placeholder="eleanor@example.com"
                  required
                />
              </div>

              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                error={errors.subject}
                placeholder="Fragrance consultation, order inquiry, or press"
                required
              />

              <div className="flex flex-col text-left">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#68645E] mb-2 font-medium">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="How may our concierge assist your discovery?"
                  className="w-full bg-[#E9E3D9]/40 border-b border-[#C8BDAF] px-3.5 py-3 text-sm text-[#1D1C1A] placeholder-[#68645E]/60 focus:outline-none focus:border-[#1D1C1A]"
                  required
                />
                {errors.message && (
                  <span className="text-[11px] text-red-600 mt-1.5">
                    {errors.message}
                  </span>
                )}
              </div>

              <div>
                <Button type="submit" disabled={loading} size="lg">
                  {loading ? "Sending…" : "Submit Inquiry"}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Concierge Information Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#E9E3D9]/40 border border-[#C8BDAF]/30 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1 font-medium">
                Direct Inquiries
              </span>
              <div className="flex items-center gap-2 text-sm text-[#1D1C1A] font-medium">
                <Mail className="w-4 h-4 text-[#A8735B]" />
                <a
                  href="mailto:concierge@raphelo.com"
                  className="hover:text-[#A8735B] transition-colors"
                >
                  concierge@raphelo.com
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1 font-medium">
                Hours of Service
              </span>
              <div className="flex items-start gap-2 text-xs text-[#68645E]">
                <Clock className="w-4 h-4 text-[#707462] shrink-0 mt-0.5" />
                <span>
                  Monday through Friday <br />
                  09:00 — 18:00 CET (Paris)
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block mb-1 font-medium">
                Studio Locations
              </span>
              <div className="flex items-start gap-2 text-xs text-[#68645E]">
                <MapPin className="w-4 h-4 text-[#1D1C1A] shrink-0 mt-0.5" />
                <span>
                  Paris Studio: 18 Rue de Richelieu, 75001 Paris <br />
                  Laboratory: Route de Grasse, 06130 Grasse, France
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-[#C8BDAF]/30 text-xs text-[#68645E] space-y-3">
            <h4 className="font-serif text-lg text-[#1D1C1A]">
              Frequently Asked Questions
            </h4>
            <p>
              Looking for immediate answers regarding shipping timelines, returns, or sample vouchers?
            </p>
            <Link
              href="/faq"
              className="inline-block text-[11px] uppercase tracking-[0.16em] text-[#1D1C1A] hover:text-[#A8735B] underline"
            >
              Consult the FAQ →
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
