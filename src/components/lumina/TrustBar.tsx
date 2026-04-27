"use client";

import { useI18n } from "@/i18n/context";

export default function TrustBar() {
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  /* Logical gradient directions: fade from edges using warm white */
  const startFade = isRtl
    ? "linear-gradient(to left, #FAFAF7, transparent)"
    : "linear-gradient(to right, #FAFAF7, transparent)";
  const endFade = isRtl
    ? "linear-gradient(to right, #FAFAF7, transparent)"
    : "linear-gradient(to left, #FAFAF7, transparent)";

  /* Trustbar heading: disable uppercase tracking for RTL cursive text */
  const headingClass = isRtl
    ? "text-center text-[11px] font-semibold text-[#C5A059]/35 normal-case"
    : "text-center text-[11px] font-semibold text-[#C5A059]/35 uppercase tracking-[0.2em]";

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
      className="py-8 border-y border-[#C5A059]/10 overflow-hidden"
      style={{ background: "#FAFAF7" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-4">
        <p className={headingClass}>
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
              className="text-[#C5A059]/25 font-display font-bold text-xl whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
          {brands.map((brand, i) => (
            <span
              key={`b-${i}`}
              className="text-[#C5A059]/25 font-display font-bold text-xl whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
