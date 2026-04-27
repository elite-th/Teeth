"use client";

import { Microscope, Sparkles, HeartHandshake, Award, ArrowRight } from "lucide-react";
import { useScrollReveal, scrollToElement } from "@/hooks/use-lumina";
import MagneticWrap from "@/components/lumina/MagneticWrap";
import { useI18n } from "@/i18n/context";

export default function About() {
  const sectionRef = useScrollReveal();
  const { t } = useI18n();

  const features = [
    {
      icon: Microscope,
      title: t("about.feature_1_title"),
      description: t("about.feature_1_desc"),
    },
    {
      icon: Sparkles,
      title: t("about.feature_2_title"),
      description: t("about.feature_2_desc"),
    },
    {
      icon: HeartHandshake,
      title: t("about.feature_3_title"),
      description: t("about.feature_3_desc"),
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 relative"
      style={{ background: "linear-gradient(180deg, #FAFAF7 0%, #FBF7F0 50%, #F5EFE4 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="reveal-left relative">
            <div
              className="relative rounded-[2rem] overflow-hidden shadow-xl shadow-amber-900/8"
              style={{ boxShadow: "0 12px 44px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <img
                src="/images/dentist-portrait.png"
                alt={t("about.img_alt")}
                className="w-full h-[440px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/30 via-transparent to-transparent" />
              <div className="absolute bottom-0 start-0 end-0 p-6 sm:p-8">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderColor: "rgba(197,160,89,0.3)",
                    boxShadow: "0 8px 28px rgba(197,160,89,0.10), 0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#D4AF37] flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#1E1E1E]">
                        {t("about.badge_name")}
                      </div>
                      <div className="text-xs mt-0.5 text-[#1E1E1E]/40">
                        {t("about.badge_sub")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -top-6 -start-6 w-28 h-28 opacity-15 hidden lg:block"
              style={{
                backgroundImage: "radial-gradient(circle,#C5A059 2px,transparent 2px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>

          {/* Right: Content */}
          <div>
            <div className="reveal">
              <span className="inline-flex items-center gap-2.5 font-semibold text-[12px] mb-5 text-[#8B7355]">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full" />
                {t("about.label")}
              </span>
            </div>

            <h2
              className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] mb-6"
              style={{ color: "#1E1E1E" }}
            >
              {t("about.heading_l1")} <span className="text-[#C5A059]">{t("about.heading_l2")}</span>
            </h2>

            <p className="reveal d2 text-lg leading-[1.8] mb-10 text-[#1E1E1E]/45">
              {t("about.description")}
            </p>

            <div className="space-y-5 mb-10 stagger">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#C5A059]/5 transition-colors"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(to bottom right, rgba(197,160,89,0.10), rgba(212,175,55,0.15))",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    <feature.icon className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] mb-1 text-[15px]">{feature.title}</h4>
                    <p className="text-sm text-[#1E1E1E]/40 leading-[1.8]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal d5">
              <MagneticWrap>
                <button
                  onClick={() => scrollToElement("#booking")}
                  className="btn-cta inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#C5A059] text-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#1E1E1E] font-bold text-[14px] shadow-lg shadow-[#C5A059]/40 hover:shadow-[#C5A059]/55"
                >
                  {t("about.cta")} <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
                </button>
              </MagneticWrap>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
