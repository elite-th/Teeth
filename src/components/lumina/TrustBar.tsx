"use client";

import { useI18n } from "@/i18n/context";

export default function TrustBar() {
  const { t, dir } = useI18n();

  /* Logical gradient directions: in LTR fade-in from edges, in RTL flip */
  const startFade = dir === "rtl"
    ? "linear-gradient(to left, #FAF9F6, transparent)"
    : "linear-gradient(to right, #FAF9F6, transparent)";
  const endFade = dir === "rtl"
    ? "linear-gradient(to right, #FAF9F6, transparent)"
    : "linear-gradient(to left, #FAF9F6, transparent)";

  const brands = [
    t("trustbar.brand_1"),
    t("trustbar.brand_2"),
    t("trustbar.brand_3"),
    t("trustbar.brand_4"),
    t("trustbar.brand_5"),
    t("trustbar.brand_6"),
  ];

  return (
    <section
      className="py-8 border-y border-stone-200/60 overflow-hidden"
      style={{ background: "#FAF9F6" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-4">
        <p className="text-center text-[11px] font-semibold text-stone-300 uppercase tracking-[0.2em]">
          {t("trustbar.heading")}
        </p>
      </div>
      <div className="relative">
        <div
          className="absolute start-0 top-0 bottom-0 w-24 z-10"
          style={{ background: startFade }}
        />
        <div
          className="absolute end-0 top-0 bottom-0 w-24 z-10"
          style={{ background: endFade }}
        />
        <div className="logo-scroll flex items-center gap-16 w-max">
          {brands.map((brand, i) => (
            <span
              key={`a-${i}`}
              className="text-stone-300 font-display font-bold text-xl whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
          {brands.map((brand, i) => (
            <span
              key={`b-${i}`}
              className="text-stone-300 font-display font-bold text-xl whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
