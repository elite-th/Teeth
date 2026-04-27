"use client";

import { useScrollReveal } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";

export default function Process() {
  const sectionRef = useScrollReveal();
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  const steps = [
    {
      number: 1,
      title: t("process.step_1_title"),
      description: t("process.step_1_desc"),
      gradient: "from-rose-400 to-rose-600",
      shadow: "shadow-rose-500/25",
    },
    {
      number: 2,
      title: t("process.step_2_title"),
      description: t("process.step_2_desc"),
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/25",
    },
    {
      number: 3,
      title: t("process.step_3_title"),
      description: t("process.step_3_desc"),
      gradient: "from-pink-400 to-fuchsia-500",
      shadow: "shadow-pink-500/25",
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #4a1525 0%, #5c1a2e 30%, #6b1d36 60%, #7f1d3d 100%)" }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Rose blur blob */}
      <div className="absolute top-0 start-0 w-[500px] h-[500px] bg-rose-600 rounded-full filter blur-[150px] opacity-10 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="reveal inline-flex items-center gap-2.5 text-rose-300 font-semibold text-[12px] mb-5">
            <span className="w-8 h-[2px] bg-rose-400/60 rounded-full" />
            {t("process.label")}
            <span className="w-8 h-[2px] bg-rose-400/60 rounded-full" />
          </span>
          <h2 className="reveal d1 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] mb-5">
            {t("process.heading")}
          </h2>
          <p className="reveal d2 text-rose-200/50 text-lg leading-[1.8]">
            {t("process.subtitle")}
          </p>
        </div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 stagger">
          {steps.map((step) => (
            <div key={step.number} className="proc-connector relative text-center">
              <div
                className="relative z-[1] process-card bg-white/[0.06] backdrop-blur-sm p-8 rounded-3xl border border-white/[0.08]"
                style={
                  isRtl
                    ? { boxShadow: "0 6px 28px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)" }
                    : {}
                }
              >
                <div
                  className={`proc-num w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg ${step.shadow}`}
                >
                  <span className="text-white font-display font-bold text-xl">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-rose-200/50 leading-[1.8]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
