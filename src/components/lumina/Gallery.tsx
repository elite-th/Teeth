"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal, scrollToElement } from "@/hooks/use-lumina";
import MagneticWrap from "@/components/lumina/MagneticWrap";
import { useI18n } from "@/i18n/context";

/* BeforeAfterSlider sub-component with drag logic */
interface BeforeAfterSliderProps {
  afterSrc: string;
  beforeSrc: string;
  label: string;
  sublabel: string;
  beforeLabel: string;
  afterLabel: string;
  isRtl?: boolean;
}

function BeforeAfterSlider({ afterSrc, beforeSrc, label, sublabel, beforeLabel, afterLabel, isRtl }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return 50;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    return Math.min(95, Math.max(5, pct));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragging.current = true;
    setPosition(getPositionFromClientX(e.clientX));

    const onMove = (ev: PointerEvent) => {
      if (!dragging.current) return;
      setPosition(getPositionFromClientX(ev.clientX));
    };
    const onUp = () => {
      dragging.current = false;
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp);
  }, [getPositionFromClientX]);

  return (
    <div
      ref={containerRef}
      className="ba-container aspect-[3/4] shadow-xl shadow-black/30"
      onPointerDown={handlePointerDown}
    >
      {/* After image (full width background) */}
      <img src={afterSrc} alt={afterLabel} draggable={false} className="w-full h-full object-cover" />

      {/* Before image (clipped) */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: isRtl ? `inset(0 0 0 ${100 - position}%)` : `inset(0 ${100 - position}% 0 0)` }}
      />

      {/* Slider line — uses `left` because position is calculated from rect.left (viewport-relative) */}
      <div className="ba-slider-line" style={{ left: `${position}%` }} />
      {/* Slider handle */}
      <div className="ba-slider-handle" style={{ left: `${position}%` }}>
        <ChevronLeft className="w-4 h-4 text-indigo-900 -mr-1" />
        <ChevronRight className="w-4 h-4 text-indigo-900 -ml-1" />
      </div>

      {/* Labels */}
      <div className="ba-label ba-label-start bg-black/60 text-white">{beforeLabel}</div>
      <div className="ba-label ba-label-end bg-indigo-500/80 text-white">{afterLabel}</div>

      {/* Bottom gradient overlay with info */}
      <div className="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12 z-[3]">
        <div className="text-white font-bold text-sm">{label}</div>
        <div className="text-indigo-200/50 text-xs">{sublabel}</div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useScrollReveal();
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  const galleryItems = [
    {
      label: t("gallery.item_1_title"),
      sublabel: t("gallery.item_1_sub"),
      afterSrc: "/images/after-1.png",
      beforeSrc: "/images/before-1.png",
    },
    {
      label: t("gallery.item_2_title"),
      sublabel: t("gallery.item_2_sub"),
      afterSrc: "/images/after-2.png",
      beforeSrc: "/images/before-2.png",
    },
    {
      label: t("gallery.item_3_title"),
      sublabel: t("gallery.item_3_sub"),
      afterSrc: "/images/after-3.png",
      beforeSrc: "/images/before-3.png",
    },
  ];

  /* RTL-aware CTA button classes — luxury gold outline */
  const ctaBtnClass = isRtl
    ? "btn-cta inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border-2 border-[#C5A059] bg-transparent text-[#C5A059] hover:bg-[#C5A059] hover:text-white font-bold text-[14px] shadow-lg shadow-[#C5A059]/15 hover:shadow-[#C5A059]/30"
    : "btn-cta inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-gray-900 font-bold text-[13px] shadow-lg shadow-amber-500/20";

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0f172a 40%, #1e1b4b 100%)" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle,#818cf8 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="reveal inline-flex items-center gap-2.5 text-indigo-300 font-semibold text-[12px] mb-5">
            <span className="w-8 h-[2px] bg-indigo-400/60 rounded-full" />
            {t("gallery.label")}
            <span className="w-8 h-[2px] bg-indigo-400/60 rounded-full" />
          </span>
          <h2 className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] mb-5">
            {t("gallery.heading")}
          </h2>
          <p className="reveal d2 text-indigo-200/40 text-lg leading-[1.8]">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div key={idx} className={`reveal d${idx + 1}`}>
              <BeforeAfterSlider
                afterSrc={item.afterSrc}
                beforeSrc={item.beforeSrc}
                label={item.label}
                sublabel={item.sublabel}
                beforeLabel={t("gallery.before")}
                afterLabel={t("gallery.after")}
                isRtl={isRtl}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 reveal d4">
          <MagneticWrap className="inline-flex">
            <button
              onClick={() => scrollToElement("#booking")}
              className={ctaBtnClass}
            >
              {t("gallery.cta")}{" "}
              <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
            </button>
          </MagneticWrap>
        </div>
      </div>
    </section>
  );
}
