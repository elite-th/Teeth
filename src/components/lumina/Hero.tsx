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
  const { t } = useI18n();

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

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #F5F0E8 30%, #FFFDF8 60%, #FAFAF7 100%)" }}
    >
      {/* Mesh Blobs — golden tones for all languages */}
      <div
        className="hero-mesh-blob"
        style={{
          width: 600,
          height: 600,
          background: "#C5A059",
          top: "-15%",
          insetInlineEnd: "-5%",
          opacity: 0.08,
        }}
      />
      <div
        className="hero-mesh-blob"
        style={{
          width: 500,
          height: 500,
          background: "#E8BD3E",
          bottom: "-10%",
          insetInlineStart: "-5%",
          animationDelay: "-5s",
          opacity: 0.06,
        }}
      />
      <div
        className="hero-mesh-blob"
        style={{
          width: 350,
          height: 350,
          background: "#D4B06A",
          top: "40%",
          insetInlineStart: "30%",
          animationDelay: "-9s",
          opacity: 0.05,
        }}
      />

      {/* Golden Gradient Overlay — breaks flatness */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#C5A059]/[0.05] via-transparent to-[#FAFAF7]/70"
      />

      {/* Dot Pattern — subtle gold for all languages */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: 0.02,
          backgroundImage: "radial-gradient(circle,#C5A059 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient Gold Glow — professional studio lighting feel */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 75% 25%, rgba(197,160,89,0.10) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 15% 75%, rgba(197,160,89,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[2] max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 lg:py-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-start">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#C5A059]/10 border-[#C5A059]/25 shadow-sm mb-6 sm:mb-8 backdrop-blur-sm"
              data-hero-anim=".1s"
            >
              <span className="w-2 h-2 rounded-full bg-[#C5A059] pulse-dot flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#1E1E1E]/55 whitespace-nowrap">
                {t("hero.badge")}
              </span>
            </div>

            {/* Heading — universal gradient from dark gold to charcoal */}
            <h1
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-6 hero-heading-rtl bg-gradient-to-r from-[#8B7355] to-[#1E1E1E] bg-clip-text text-transparent"
              data-hero-anim=".3s"
            >
              {t("hero.heading_l1")}
              <br />
              {t("hero.heading_l2")}{" "}
              <span>
                {t("hero.heading_l3")}
              </span>{" "}
              {t("hero.heading_l4")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl text-[#1E1E1E]/55 leading-[1.8] max-w-lg mx-auto lg:mx-0 mb-10"
              data-hero-anim=".8s"
            >
              {t("hero.subtitle")}
            </p>

            {/* CTAs — SOLID gold button */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12"
              data-hero-anim="1s"
            >
              <MagneticWrap>
                <button
                  onClick={() => scrollToElement("#booking")}
                  className="btn-cta inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-[15px] shadow-xl w-full sm:w-auto justify-center bg-[#C5A059] text-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#1E1E1E] shadow-[#C5A059]/40 hover:shadow-[#C5A059]/55"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {t("hero.cta_book")}
                </button>
              </MagneticWrap>
              <button
                onClick={() => scrollToElement("#services")}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-[#1E1E1E]/50 hover:bg-[#1E1E1E]/5 font-medium text-[15px] transition-all w-full sm:w-auto justify-center group"
              >
                {t("hero.cta_explore")}{" "}
                <ChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform rtl:rotate-180" />
              </button>
            </div>

            {/* Stats — GOLD numbers in glassmorphism containers */}
            <div
              className="flex items-center gap-4 sm:gap-5 justify-center lg:justify-start"
              data-hero-anim="1.2s"
            >
              <div className="text-center lg:text-start hero-stat-glass">
                <div className="text-2xl sm:text-3xl font-bold text-[#C5A059]">
                  <StatCounter target={15} />+
                </div>
                <div className="text-[11px] text-[#1E1E1E]/40 font-medium mt-0.5">
                  {t("hero.stat_years")}
                </div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent" />
              <div className="text-center lg:text-start hero-stat-glass">
                <div className="text-2xl sm:text-3xl font-bold text-[#C5A059]">
                  <StatCounter target={4.9} isDecimal />
                </div>
                <div className="text-[11px] text-[#1E1E1E]/40 font-medium mt-0.5">
                  {t("hero.stat_rating")}
                </div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#C5A059]/20 to-transparent" />
              <div className="text-center lg:text-start hero-stat-glass">
                <div className="text-2xl sm:text-3xl font-bold text-[#C5A059]">
                  <StatCounter target={8} />K+
                </div>
                <div className="text-[11px] text-[#1E1E1E]/40 font-medium mt-0.5">
                  {t("hero.stat_patients")}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image with Badges */}
          <div className="relative hidden lg:block" data-parallax="0.03">
            <div className="relative">
              {/* Golden soft shadow behind image */}
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-[#C5A059]/20">
                <img
                  src="/images/hero-dental.png"
                  alt={t("hero.img_alt")}
                  className="w-full h-[560px] object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#C5A059]/15 via-transparent to-transparent"
                />
              </div>

              {/* Floating Badge: 100% Safe — glassmorphism */}
              <div
                className="absolute -top-5 -end-5 bg-white/60 backdrop-blur-[10px] border-[#C5A059]/30 shadow-lg shadow-[#C5A059]/8 rounded-2xl shadow-xl p-4"
                data-hero-anim="1.4s"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#B08D3E] flex items-center justify-center shadow-lg shadow-[#C5A059]/20">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E1E1E]">
                      {t("hero.badge_safe")}
                    </div>
                    <div className="text-[11px] text-[#1E1E1E]/40">
                      {t("hero.badge_safe_sub")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Trusted — glassmorphism */}
              <div
                className="absolute -bottom-5 -start-5 bg-white/60 backdrop-blur-[10px] border-[#C5A059]/30 shadow-lg shadow-[#C5A059]/8 rounded-2xl shadow-xl p-4"
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
                    <div className="w-9 h-9 rounded-full border-2 bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center text-[10px] font-bold" style={{ borderColor: "#C5A059" }}>
                      +8K
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E1E1E]">{t("hero.badge_trusted")}</div>
                    <div className="text-[11px] text-[#1E1E1E]/40">{t("hero.badge_trusted_sub")}</div>
                  </div>
                </div>
              </div>

              {/* Decorative Circle — gold for all */}
              <div className="absolute -z-10 -top-12 -end-12 w-48 h-48 rounded-full border border-[#C5A059]/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
