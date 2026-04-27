"use client";

import { Microscope, Sparkles, HeartHandshake, Award, ArrowRight } from "lucide-react";
import { useScrollReveal, scrollToElement } from "@/hooks/use-lumina";
import MagneticWrap from "@/components/lumina/MagneticWrap";
import { useI18n } from "@/i18n/context";

export default function About() {
  const sectionRef = useScrollReveal();
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  const features = [
    {
      icon: Microscope,
      title: t("about.feature_1_title"),
      description: t("about.feature_1_desc"),
      gradient: "from-amber-100 to-amber-200",
      iconColor: "text-amber-700",
    },
    {
      icon: Sparkles,
      title: t("about.feature_2_title"),
      description: t("about.feature_2_desc"),
      gradient: "from-orange-100 to-orange-200",
      iconColor: "text-orange-700",
    },
    {
      icon: HeartHandshake,
      title: t("about.feature_3_title"),
      description: t("about.feature_3_desc"),
      gradient: "from-yellow-100 to-yellow-200",
      iconColor: "text-yellow-700",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 relative"
      style={{ background: "linear-gradient(180deg, #FAF9F6 0%, #FBF7F0 40%, #F5EFE4 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="reveal-left relative">
            <div
              className="relative rounded-[2rem] overflow-hidden shadow-xl shadow-amber-900/8"
              style={
                isRtl
                  ? { boxShadow: "0 12px 44px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)" }
                  : {}
              }
            >
              <img
                src="/images/dentist-portrait.png"
                alt={t("about.img_alt")}
                className="w-full h-[440px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 start-0 end-0 p-6 sm:p-8">
                <div
                  className="bg-white/15 backdrop-blur-xl rounded-2xl p-5 border border-white/15"
                  style={
                    isRtl
                      ? {
                          background: "rgba(255,255,255,0.88)",
                          borderColor: "rgba(180,83,9,0.1)",
                          boxShadow: "0 8px 28px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div
                        className={`font-bold text-sm ${
                          isRtl ? "text-amber-900" : "text-white"
                        }`}
                      >
                        {t("about.badge_name")}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isRtl ? "text-amber-700/50" : "text-white/50"
                        }`}
                      >
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
                backgroundImage: "radial-gradient(circle,#b45309 2px,transparent 2px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>

          {/* Right: Content */}
          <div>
            <div className="reveal">
              <span className="inline-flex items-center gap-2.5 text-amber-700 font-semibold text-[12px] mb-5">
                <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                {t("about.label")}
              </span>
            </div>

            <h2
              className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] mb-6"
              style={{ color: "#451a03" }}
            >
              {t("about.heading_l1")} <span className="text-amber-600">{t("about.heading_l2")}</span>
            </h2>

            <p className="reveal d2 text-amber-800/50 text-lg leading-[1.8] mb-10">
              {t("about.description")}
            </p>

            <div className="space-y-5 mb-10 stagger">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-amber-100/40 transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                    style={
                      isRtl
                        ? { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }
                        : {}
                    }
                  >
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-1 text-[15px]">{feature.title}</h4>
                    <p className="text-sm text-amber-800/45 leading-[1.8]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal d5">
              <MagneticWrap>
                <button
                  onClick={() => scrollToElement("#booking")}
                  className={`btn-cta inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-[13px] shadow-lg ${
                    isRtl
                      ? "border-2 border-[#C5A059] bg-transparent text-[#C5A059] hover:bg-[#C5A059] hover:text-white shadow-[#C5A059]/15 hover:shadow-[#C5A059]/30 rounded-2xl py-4 text-[14px]"
                      : "text-gray-900 shadow-amber-500/20"
                  }`}
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
