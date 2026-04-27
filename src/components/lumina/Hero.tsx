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

  const isRtl = dir === "rtl";

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

  /* ── RTL: Luxury Gold + Warm White palette ── */
  /* #FAFAF7 warm white bg · #C5A059 matte gold accent · #1E1E1E charcoal text */
  const textMain = isRtl ? "text-[#1E1E1E]" : "text-white";
  const textSub = isRtl ? "text-[#1E1E1E]/55" : "text-teal-200/60";
  const textMuted = isRtl ? "text-[#1E1E1E]/40" : "text-teal-300/50";
  const badgeBg = isRtl
    ? "bg-[#C5A059]/10 border-[#C5A059]/25"
    : "bg-white/10 border-white/10";
  const badgeText = isRtl ? "text-[#C5A059]" : "text-teal-200";
  const headingAccent = isRtl
    ? "bg-gradient-to-r from-[#C5A059] via-[#D4B06A] to-[#B08D3E]"
    : "bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-200";
  const exploreText = isRtl
    ? "text-[#C5A059]/70"
    : "text-teal-200/70";
  const exploreHover = isRtl
    ? "hover:bg-[#C5A059]/5"
    : "hover:bg-white/5";
  /* Stats: GOLD numbers for RTL — eye-catching */
  const statValue = isRtl ? "text-[#C5A059]" : "text-white";
  const statLabel = isRtl ? "text-[#1E1E1E]/40" : "text-teal-300/50";
  const dividerColor = isRtl
    ? "from-transparent via-[#C5A059]/20 to-transparent"
    : "from-transparent via-teal-400/30 to-transparent";
  const floatingBg = isRtl
    ? "bg-[#FAFAF7]/95 border-[#C5A059]/15 shadow-lg shadow-[#C5A059]/10"
    : "bg-white/10 border-white/10";
  const floatingIconBg = isRtl
    ? "from-[#C5A059] to-[#B08D3E] shadow-[#C5A059]/20"
    : "from-teal-400 to-emerald-500 shadow-teal-500/30";
  const floatingText = isRtl ? "text-[#1E1E1E]" : "text-white";
  const floatingSubText = isRtl ? "text-[#1E1E1E]/40" : "text-white/50";
  const avatarBorderColor = isRtl ? "#C5A059" : "#134e4a";
  const avatarOverflowBg = isRtl
    ? "bg-[#C5A059]/10 text-[#C5A059]"
    : "bg-teal-400/20 text-teal-200";
  const decorBorderColor = isRtl
    ? "border-[#C5A059]/20"
    : "border-teal-400/10";

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-24 overflow-hidden"
      style={
        isRtl
          ? { background: "linear-gradient(160deg, #FAFAF7 0%, #F5F0E8 30%, #FFFDF8 60%, #FAFAF7 100%)" }
          : { background: "linear-gradient(160deg, #042f2e 0%, #0a3d3a 30%, #134e4a 60%, #115e59 100%)" }
      }
    >
      {/* Mesh Blobs — golden tones for RTL */}
      <div
        className="hero-mesh-blob"
        style={{
          width: 600,
          height: 600,
          background: isRtl ? "#C5A059" : "#2dd4bf",
          top: "-15%",
          insetInlineEnd: "-5%",
          opacity: isRtl ? 0.08 : 0.2,
        }}
      />
      <div
        className="hero-mesh-blob"
        style={{
          width: 500,
          height: 500,
          background: isRtl ? "#E8BD3E" : "#f59e0b",
          bottom: "-10%",
          insetInlineStart: "-5%",
          animationDelay: "-5s",
          opacity: isRtl ? 0.06 : 0.2,
        }}
      />
      <div
        className="hero-mesh-blob"
        style={{
          width: 350,
          height: 350,
          background: isRtl ? "#D4B06A" : "#14b8a6",
          top: "40%",
          insetInlineStart: "30%",
          animationDelay: "-9s",
          opacity: isRtl ? 0.05 : 0.2,
        }}
      />

      {/* Golden Gradient Overlay for RTL — breaks flatness */}
      <div
        className={`absolute inset-0 z-[1] ${
          isRtl
            ? "bg-gradient-to-b from-[#C5A059]/[0.05] via-transparent to-[#FAFAF7]/70"
            : "bg-gradient-to-b from-transparent via-transparent to-[#042f2e]/90"
        }`}
      />

      {/* Dot Pattern — subtle gold for RTL */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: isRtl ? 0.02 : 0.03,
          backgroundImage: isRtl
            ? "radial-gradient(circle,#C5A059 1px,transparent 1px)"
            : "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Golden corner glow — breaks flatness */}
      {isRtl && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(197,160,89,0.07) 0%, transparent 70%)",
          }}
        />
      )}
      {isRtl && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 10% 80%, rgba(197,160,89,0.05) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-[2] max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 lg:py-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-start">
            {/* Badge — gold outline style for RTL */}
            <div
              className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full ${badgeBg} shadow-sm mb-6 sm:mb-8 backdrop-blur-sm`}
              data-hero-anim=".1s"
            >
              <span className={`w-2 h-2 rounded-full ${isRtl ? "bg-[#C5A059]" : "bg-teal-500"} pulse-dot flex-shrink-0`} />
              <span className={`text-[10px] sm:text-[11px] font-bold ${badgeText} whitespace-nowrap`}>
                {t("hero.badge")}
              </span>
            </div>

            {/* Heading — #1E1E1E with gold accent underline for RTL */}
            <h1
              className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-bold ${textMain} leading-[1.05] tracking-tight mb-6 hero-heading-rtl`}
              data-hero-anim=".3s"
            >
              {t("hero.heading_l1")}
              <br />
              {t("hero.heading_l2")}{" "}
              <span className={`${headingAccent} bg-clip-text text-transparent`}>
                {t("hero.heading_l3")}
              </span>{" "}
              {t("hero.heading_l4")}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg sm:text-xl ${textSub} leading-[1.8] max-w-lg mx-auto lg:mx-0 mb-10`}
              data-hero-anim=".8s"
            >
              {t("hero.subtitle")}
            </p>

            {/* CTAs — OUTLINE gold button for RTL (transparent bg, gold border, gold text) */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12"
              data-hero-anim="1s"
            >
              <MagneticWrap>
                <button
                  onClick={() => scrollToElement("#booking")}
                  className={`btn-cta inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-[15px] shadow-xl w-full sm:w-auto justify-center ${
                    isRtl
                      ? "border-2 border-[#C5A059] bg-transparent text-[#C5A059] hover:bg-[#C5A059] hover:text-white hover:shadow-[#C5A059]/30 hover:border-[#C5A059]"
                      : "text-gray-900 shadow-amber-500/25"
                  }`}
                >
                  <CalendarCheck className="w-4 h-4" />
                  {t("hero.cta_book")}
                </button>
              </MagneticWrap>
              <button
                onClick={() => scrollToElement("#services")}
                className={`inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl ${exploreText} font-medium text-[15px] ${exploreHover} transition-all w-full sm:w-auto justify-center group`}
              >
                {t("hero.cta_explore")}{" "}
                <ChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform rtl:rotate-180" />
              </button>
            </div>

            {/* Stats — GOLD numbers for RTL */}
            <div
              className="flex items-center gap-8 sm:gap-10 justify-center lg:justify-start"
              data-hero-anim="1.2s"
            >
              <div className="text-center lg:text-start">
                <div className={`text-2xl sm:text-3xl font-bold ${statValue}`}>
                  <StatCounter target={15} />+
                </div>
                <div className={`text-[11px] ${statLabel} font-medium mt-0.5`}>
                  {t("hero.stat_years")}
                </div>
              </div>
              <div className={`w-px h-10 bg-gradient-to-b ${dividerColor}`} />
              <div className="text-center lg:text-start">
                <div className={`text-2xl sm:text-3xl font-bold ${statValue}`}>
                  <StatCounter target={4.9} isDecimal />
                </div>
                <div className={`text-[11px] ${statLabel} font-medium mt-0.5`}>
                  {t("hero.stat_rating")}
                </div>
              </div>
              <div className={`w-px h-10 bg-gradient-to-b ${dividerColor}`} />
              <div className="text-center lg:text-start">
                <div className={`text-2xl sm:text-3xl font-bold ${statValue}`}>
                  <StatCounter target={8} />K+
                </div>
                <div className={`text-[11px] ${statLabel} font-medium mt-0.5`}>
                  {t("hero.stat_patients")}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image with Badges */}
          <div className="relative hidden lg:block" data-parallax="0.03">
            <div className="relative">
              {/* Golden soft shadow behind image for RTL */}
              <div className={`rounded-[2rem] overflow-hidden shadow-2xl ${isRtl ? "shadow-[#C5A059]/20" : "shadow-black/30"}`}>
                <img
                  src="/images/hero-dental.png"
                  alt={t("hero.img_alt")}
                  className="w-full h-[560px] object-cover"
                />
                <div
                  className={`absolute inset-0 ${
                    isRtl
                      ? "bg-gradient-to-t from-[#C5A059]/15 via-transparent to-transparent"
                      : "bg-gradient-to-t from-[#042f2e]/60 via-transparent to-transparent"
                  }`}
                />
              </div>

              {/* Floating Badge: 100% Safe */}
              <div
                className={`absolute -top-5 -end-5 ${floatingBg} backdrop-blur-xl rounded-2xl shadow-xl p-4`}
                data-hero-anim="1.4s"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${floatingIconBg} flex items-center justify-center shadow-lg`}>
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${floatingText}`}>
                      {t("hero.badge_safe")}
                    </div>
                    <div className={`text-[11px] ${floatingSubText}`}>
                      {t("hero.badge_safe_sub")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Trusted */}
              <div
                className={`absolute -bottom-5 -start-5 ${floatingBg} backdrop-blur-xl rounded-2xl shadow-xl p-4`}
                data-hero-anim="1.6s"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 rtl:space-x-reverse">
                    <img
                      src="/images/avatar-p1.png"
                      alt=""
                      className={`w-9 h-9 rounded-full border-2 object-cover`}
                      style={{ borderColor: avatarBorderColor }}
                    />
                    <img
                      src="/images/avatar-p2.png"
                      alt=""
                      className={`w-9 h-9 rounded-full border-2 object-cover`}
                      style={{ borderColor: avatarBorderColor }}
                    />
                    <img
                      src="/images/avatar-p3.png"
                      alt=""
                      className={`w-9 h-9 rounded-full border-2 object-cover`}
                      style={{ borderColor: avatarBorderColor }}
                    />
                    <div className={`w-9 h-9 rounded-full border-2 ${avatarOverflowBg} flex items-center justify-center text-[10px] font-bold`} style={{ borderColor: avatarBorderColor }}>
                      +8K
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${floatingText}`}>{t("hero.badge_trusted")}</div>
                    <div className={`text-[11px] ${floatingSubText}`}>{t("hero.badge_trusted_sub")}</div>
                  </div>
                </div>
              </div>

              {/* Decorative Circle — gold for RTL */}
              <div className={`absolute -z-10 -top-12 -end-12 w-48 h-48 rounded-full border ${decorBorderColor}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
