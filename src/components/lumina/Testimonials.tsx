"use client";

import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";

function Stars() {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();

  const testimonials = [
    {
      name: t("testimonials.t1_name"),
      treatment: t("testimonials.t1_treatment"),
      quote: t("testimonials.t1_quote"),
      avatar: "/images/avatar-t1.png",
    },
    {
      name: t("testimonials.t2_name"),
      treatment: t("testimonials.t2_treatment"),
      quote: t("testimonials.t2_quote"),
      avatar: "/images/avatar-t2.png",
    },
    {
      name: t("testimonials.t3_name"),
      treatment: t("testimonials.t3_treatment"),
      quote: t("testimonials.t3_quote"),
      avatar: "/images/avatar-t3.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1E1E1E 0%, #252220 40%, #1A1815 100%)" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle,#C5A059 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Gold blur blob */}
      <div className="absolute bottom-0 end-0 w-[500px] h-[500px] bg-[#C5A059] rounded-full filter blur-[160px] opacity-[0.06] translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="reveal inline-flex items-center gap-2.5 font-semibold text-[12px] mb-5 text-[#D4AF37]">
            <span className="w-8 h-[2px] bg-[#C5A059]/40 rounded-full" />
            {t("testimonials.label")}
            <span className="w-8 h-[2px] bg-[#C5A059]/40 rounded-full" />
          </span>
          <h2 className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15]">
            {t("testimonials.heading")}
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testi-glass rounded-2xl p-7"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(197, 160, 89, 0.15)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <Stars />
              <p className="text-sm leading-[1.8] mb-6 italic text-white/45">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C5A059]/20"
                />
                <div>
                  <div className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-[#C5A059]/35 text-xs">
                    {testimonial.treatment}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
