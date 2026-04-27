"use client";

import { Wrench, Gem, Sun, HeartPulse, Smile, WandSparkles, Baby, Search, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";

export default function Services() {
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";
  const sectionRef = useScrollReveal();

  const services = [
    {
      icon: Wrench,
      title: t("services.svc_1_title"),
      description: t("services.svc_1_desc"),
      iconGradient: "from-indigo-50 to-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: Gem,
      title: t("services.svc_2_title"),
      description: t("services.svc_2_desc"),
      iconGradient: "from-violet-50 to-violet-100",
      iconColor: "text-violet-600",
    },
    {
      icon: Sun,
      title: t("services.svc_3_title"),
      description: t("services.svc_3_desc"),
      iconGradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: HeartPulse,
      title: t("services.svc_4_title"),
      description: t("services.svc_4_desc"),
      iconGradient: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Smile,
      title: t("services.svc_5_title"),
      description: t("services.svc_5_desc"),
      iconGradient: "from-fuchsia-50 to-fuchsia-100",
      iconColor: "text-fuchsia-600",
    },
    {
      icon: WandSparkles,
      title: t("services.svc_6_title"),
      description: t("services.svc_6_desc"),
      iconGradient: "from-cyan-50 to-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: Baby,
      title: t("services.svc_7_title"),
      description: t("services.svc_7_desc"),
      iconGradient: "from-amber-50 to-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: Search,
      title: t("services.svc_8_title"),
      description: t("services.svc_8_desc"),
      iconGradient: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={isRtl
        ? { background: "linear-gradient(180deg, #FAFAF7 0%, #F7F3EC 50%, #F5F0E8 100%)" }
        : { background: "linear-gradient(180deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%)" }
      }
    >
      {/* Background blur blob */}
      <div className={isRtl ? "absolute top-0 end-0 w-[700px] h-[700px] bg-[#C5A059] rounded-full filter blur-[150px] opacity-[0.06] -translate-y-1/3 translate-x-1/3" : "absolute top-0 end-0 w-[700px] h-[700px] bg-indigo-300 rounded-full filter blur-[150px] opacity-20 -translate-y-1/3 translate-x-1/3"} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className={`reveal inline-flex items-center gap-2.5 font-semibold text-[12px] mb-5 ${isRtl ? "text-[#C5A059]" : "text-indigo-600"}`}>
            <span className={isRtl ? "w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full" : "w-8 h-[2px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full"} />
            {t("services.label")}
            <span className={isRtl ? "w-8 h-[2px] bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full" : "w-8 h-[2px] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full"} />
          </span>
          <h2
            className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] mb-5"
            style={{ color: isRtl ? "#1E1E1E" : "#1e1b4b" }}
          >
            {t("services.heading")}
          </h2>
          <p className={`reveal d2 text-lg leading-[1.8] ${isRtl ? "text-[#1E1E1E]/40" : "text-indigo-800/40"}`}>
            {t("services.subtitle")}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-7 cursor-pointer group"
              style={
                isRtl
                  ? { boxShadow: "0 4px 24px rgba(197,160,89,0.06), 0 1px 6px rgba(0,0,0,0.03)", border: "1px solid rgba(197,160,89,0.10)" }
                  : {}
              }
            >
              <div
                className={`svc-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${service.iconGradient} ${service.iconColor} flex items-center justify-center mb-5`}
                style={isRtl ? { background: "linear-gradient(to bottom right, rgba(197,160,89,0.08), rgba(212,175,55,0.12))" } : {}}
              >
                <service.icon className="w-5 h-5 text-lg" />
              </div>
              <h3 className="font-bold text-[16px] mb-2.5" style={{ color: isRtl ? "#1E1E1E" : "#1e1b4b" }}>
                {service.title}
              </h3>
              <p className={isRtl ? "text-[13px] text-[#1E1E1E]/40 leading-[1.8] mb-4" : "text-[13px] text-indigo-800/40 leading-[1.8] mb-4"}>{service.description}</p>
              <div className={isRtl ? "svc-arrow flex items-center gap-1.5 text-[#C5A059] text-[12px] font-bold" : "svc-arrow flex items-center gap-1.5 text-indigo-600 text-[12px] font-bold"}>
                <span>{t("services.learn_more")}</span>
                <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
