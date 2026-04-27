"use client";

import { useEffect, useRef } from "react";
import { CalendarCheck, ChevronDown, Shield } from "lucide-react";
import { useStatCounter, scrollToElement } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";
import MagneticWrap from "@/components/lumina/MagneticWrap";

function StatCounter({
  target,
  isDecimal = false,
}: {
  target: number;
  isDecimal?: boolean;
}) {
  const ref = useStatCounter(target, isDecimal);
  return (
    <span ref={ref} className="stat-num inline-block">
      0
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { t, dir } = useI18n();

  /* ── Parallax on hero image ── */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const parallaxEl = el.querySelector("[data-parallax]");
    if (!parallaxEl) return;

    const speed = parseFloat(
      (parallaxEl as HTMLElement).dataset.parallax || "0.03"
    );

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        (parallaxEl as HTMLElement).style.transform =
          "translateY(" + window.scrollY * speed + "px)";
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Apply entrance animations after mount (avoids hydration mismatch) ── */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const animEls = el.querySelectorAll("[data-hero-anim]");
    animEls.forEach((animEl) => {
      const delay = (animEl as HTMLElement).dataset.heroAnim || "0s";
      (animEl as HTMLElement).style.animation =
        `charIn .8s ${delay} cubic-bezier(.22,1,.36,1) both`;
    });
  }, []);

  const isRtl = dir === "rtl";

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden"
      style={{ background: "#FAFAF7" }}
    >
      {/* ═══ TECHNIQUE 1: Ambient Lighting ═══
          Studio spotlight: soft radial gold glow from the doctor-image side,
          fading to warm white at edges — eliminates flat bg */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: isRtl
            /* RTL: spotlight from left (image side) + secondary warm fill */
            ? "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(197,160,89,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 70% 80%, rgba(197,160,89,0.04) 0%, transparent 60%)"
            /* LTR: spotlight from right (image side) + secondary warm fill */
            : "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(197,160,89,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 30% 80%, rgba(197,160,89,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[2] max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 lg:py-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ═══════════════════════════════════════════════
              TEXT COLUMN — RTL: right side, LTR: left side
              ═══════════════════════════════════════════════ */}
          <div className="text-center lg:text-start">

            {/* Badge — gold tinted glass */}
            <div
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full border shadow-sm mb-6 sm:mb-8 backdrop-blur-sm"
              style={{
                background: "rgba(197,160,89,0.08)",
                borderColor: "rgba(197,160,89,0.20)",
              }}
              data-hero-anim=".1s"
            >
              <span className="w-2 h-2 rounded-full bg-[#C5A059] pulse-dot flex-shrink-0" />
              <span
                className="text-[10px] sm:text-[11px] font-bold whitespace-nowrap"
                style={{ color: "rgba(30,30,30,0.55)" }}
              >
                {t("hero.badge")}
              </span>
            </div>

            {/* ═══ TECHNIQUE 4: High-Contrast Typography ═══
                Heading: #1E1E1E charcoal, large, bold (700)
                Subtitle: #555555 medium grey — keeps heading dominant */}
            <h1
              className="hero-heading-luxury font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-6"
              data-hero-anim=".3s"
            >
              <span className="hero-heading-solid">{t("hero.heading_l1")}</span>
              <br />
              <span className="hero-heading-gold-end">{t("hero.heading_l2")}</span>
              {t("hero.heading_l3") ? (
                <span className="hero-heading-gold-end">{" "}{t("hero.heading_l3")}</span>
              ) : null}
              {t("hero.heading_l4") ? (
                <span className="hero-heading-gold-end">{" "}{t("hero.heading_l4")}</span>
              ) : null}
            </h1>

            {/* Subtitle — medium grey for readability without competing with heading */}
            <p
              className="text-lg sm:text-xl leading-[1.8] max-w-lg mx-auto lg:mx-0 mb-10"
              style={{ color: "#555555" }}
              data-hero-anim=".8s"
            >
              {t("hero.subtitle")}
            </p>

            {/* ═══ TECHNIQUE 5: 3D CTA Button ═══
                Gold gradient (#D4AF37 → #C5A059), dark text,
                golden shadow, hover lift + shadow expand */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12"
              data-hero-anim="1s"
            >
              <MagneticWrap>
                <button
                  onClick={() => scrollToElement("#booking")}
                  className="hero-cta-3d inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-[15px] w-full sm:w-auto justify-center"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {t("hero.cta_book")}
                </button>
              </MagneticWrap>
              <button
                onClick={() => scrollToElement("#services")}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-medium text-[15px] transition-all w-full sm:w-auto justify-center group hover:bg-[#1E1E1E]/5"
                style={{ color: "rgba(30,30,30,0.50)" }}
              >
                {t("hero.cta_explore")}{" "}
                <ChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform rtl:rotate-180" />
              </button>
            </div>

            {/* ═══ TECHNIQUE 3: Frosted Glass Stats ═══
                Glassmorphism: rgba(255,255,255,0.65), blur(12px),
                border rgba(197,160,89,0.4), gold numbers */}
            <div
              className="flex items-center gap-4 sm:gap-5 justify-center lg:justify-start"
              data-hero-anim="1.2s"
            >
              <div className="text-center lg:text-start hero-stat-float">
                <div className="text-2xl sm:text-3xl font-bold text-[#C5A059]">
                  <StatCounter target={15} />+
                </div>
                <div className="text-[11px] font-medium mt-0.5" style={{ color: "rgba(30,30,30,0.40)" }}>
                  {t("hero.stat_years")}
                </div>
              </div>
              <div
                className="w-px h-10"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(197,160,89,0.25), transparent)" }}
              />
              <div className="text-center lg:text-start hero-stat-float">
                <div className="text-2xl sm:text-3xl font-bold text-[#C5A059]">
                  <StatCounter target={4.9} isDecimal />
                </div>
                <div className="text-[11px] font-medium mt-0.5" style={{ color: "rgba(30,30,30,0.40)" }}>
                  {t("hero.stat_rating")}
                </div>
              </div>
              <div
                className="w-px h-10"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(197,160,89,0.25), transparent)" }}
              />
              <div className="text-center lg:text-start hero-stat-float">
                <div className="text-2xl sm:text-3xl font-bold text-[#C5A059]">
                  <StatCounter target={8} />K+
                </div>
                <div className="text-[11px] font-medium mt-0.5" style={{ color: "rgba(30,30,30,0.40)" }}>
                  {t("hero.stat_patients")}
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              IMAGE COLUMN — TECHNIQUE 2: Image Blending
              Soft shadow + bottom fade = seamless bg integration
              ═══════════════════════════════════════════════ */}
          <div className="relative hidden lg:block" data-parallax="0.03">
            <div className="relative">
              {/* Doctor image with soft shadow + bottom fade mask */}
              <div className="hero-img-mask rounded-[2rem] overflow-hidden">
                <img
                  src="/images/hero-dental.png"
                  alt={t("hero.img_alt")}
                  className="w-full h-[560px] object-cover"
                />
                {/* Bottom fade: image dissolves into bg — no hard edge */}
                <div
                  className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, #FAFAF7, transparent)",
                  }}
                />
              </div>

              {/* Floating Badge: 100% Safe — glassmorphism */}
              <div
                className="absolute -top-5 -end-5 rounded-2xl shadow-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(197,160,89,0.4)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
                data-hero-anim="1.4s"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(to bottom right, #C5A059, #B08D3E)",
                      boxShadow: "0 4px 16px rgba(197,160,89,0.25)",
                    }}
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E1E1E]">
                      {t("hero.badge_safe")}
                    </div>
                    <div className="text-[11px]" style={{ color: "rgba(30,30,30,0.40)" }}>
                      {t("hero.badge_safe_sub")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Trusted — glassmorphism */}
              <div
                className="absolute -bottom-5 -start-5 rounded-2xl shadow-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(197,160,89,0.4)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
                data-hero-anim="1.6s"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 rtl:space-x-reverse">
                    <img
                      src="/images/avatar-p1.png"
                      alt=""
                      className="w-9 h-9 rounded-full border-2 object-cover"
                      style={{ borderColor: "#C5A059" }}
                    />
                    <img
                      src="/images/avatar-p2.png"
                      alt=""
                      className="w-9 h-9 rounded-full border-2 object-cover"
                      style={{ borderColor: "#C5A059" }}
                    />
                    <img
                      src="/images/avatar-p3.png"
                      alt=""
                      className="w-9 h-9 rounded-full border-2 object-cover"
                      style={{ borderColor: "#C5A059" }}
                    />
                    <div
                      className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                      style={{
                        borderColor: "#C5A059",
                        background: "rgba(197,160,89,0.10)",
                        color: "#C5A059",
                      }}
                    >
                      +8K
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E1E1E]">
                      {t("hero.badge_trusted")}
                    </div>
                    <div className="text-[11px]" style={{ color: "rgba(30,30,30,0.40)" }}>
                      {t("hero.badge_trusted_sub")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative gold rings for depth */}
              <div className="absolute -z-10 -top-12 -end-12 w-48 h-48 rounded-full border border-[#C5A059]/15" />
              <div className="absolute -z-10 -bottom-8 -start-8 w-32 h-32 rounded-full border border-[#C5A059]/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
