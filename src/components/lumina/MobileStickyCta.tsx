"use client";

import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { scrollToElement } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";

export default function MobileStickyCta() {
  const [show, setShow] = useState(false);
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  useEffect(() => {
    const bookingSection = document.querySelector("#booking");
    if (!bookingSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (window.scrollY < 400) {
            setShow(false);
          } else {
            setShow(!entry.isIntersecting);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    observer.observe(bookingSection);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY < 400 && show) setShow(false);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  return (
    <div
      className={`mobile-sticky-cta lg:hidden fixed bottom-0 left-0 right-0 z-40 ${
        show ? "show" : ""
      }`}
    >
      <div className="bg-white/90 backdrop-blur-xl border-t border-rose-200/60 px-4 py-3">
        <button
          className={`btn-cta w-full flex items-center justify-center gap-2 font-bold shadow-lg ${
            isRtl
              ? "rounded-2xl px-6 py-4 text-[14px] border-2 border-[#C5A059] bg-transparent text-[#C5A059] hover:bg-[#C5A059] hover:text-white shadow-[#C5A059]/15 hover:shadow-[#C5A059]/30"
              : "rounded-xl px-6 py-3.5 text-[13px] text-gray-900 shadow-amber-500/20"
          }`}
          onClick={() => scrollToElement("#booking")}
        >
          <CalendarCheck className="w-4 h-4" />
          {t("mobileCta.book")}
        </button>
      </div>
    </div>
  );
}
