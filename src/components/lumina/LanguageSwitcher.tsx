"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { LOCALES, type Locale } from "@/i18n/types";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setClosing(true);
    // Wait for exit animation to complete
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 150);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeMenu]);

  const handleSelect = useCallback(
    (code: Locale) => {
      setLocale(code);
      closeMenu();
    },
    [setLocale, closeMenu]
  );

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          if (open) {
            closeMenu();
          } else {
            setOpen(true);
            setClosing(false);
          }
        }}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium text-white/55 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 transition-colors"
        aria-label={t("header.switch_lang")}
      >
        <Globe className="w-4 h-4" />
        <span>{current.label}</span>
      </button>

      {open && (
        <div
          className={`absolute top-full mt-1 start-0 sm:start-auto sm:end-0 bg-white rounded-xl shadow-xl border border-[#C5A059]/10 py-1.5 min-w-[140px] z-50 ${
            closing
              ? "animate-out fade-out-0 zoom-out-95 duration-150"
              : "animate-in fade-in-0 zoom-in-95 duration-150"
          }`}
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                locale === l.code
                  ? "bg-[#C5A059]/10 text-[#C5A059] font-semibold"
                  : "text-gray-500 hover:bg-[#C5A059]/5 hover:text-[#1E1E1E]"
              }`}
            >
              <span className="text-base">{l.label}</span>
              {locale === l.code && (
                <span className="ms-auto w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
