"use client";

import { useState, useEffect, useCallback } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { scrollToElement } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";
import MagneticWrap from "@/components/lumina/MagneticWrap";
import LanguageSwitcher from "@/components/lumina/LanguageSwitcher";

/* Inline SVG tooth icon */
function ToothIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 7 4 7.5C3 8 2 9 2 10.5C2 12 3 13 4 13C4.5 13 5 12.8 5.5 12.5C6 14 6.5 16 7 18C7.5 20 8 22 9 22C10 22 10.5 20 11 18C11.3 16.8 11.6 15.5 12 15C12.4 15.5 12.7 16.8 13 18C13.5 20 14 22 15 22C16 22 16.5 20 17 18C17.5 16 18 14 18.5 12.5C19 12.8 19.5 13 20 13C21 13 22 12 22 10.5C22 9 21 8 20 7.5C19 7 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, dir } = useI18n();

  const NAV_LINKS = [
    { label: t("header.nav_about"), href: "#about" },
    { label: t("header.nav_services"), href: "#services" },
    { label: t("header.nav_process"), href: "#process" },
    { label: t("header.nav_results"), href: "#gallery" },
    { label: t("header.nav_contact"), href: "#contact" },
  ];

  /* ── Shadow on scroll (rAF-optimized) ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Smooth scroll handler ── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToElement(href);
      setMenuOpen(false);
    },
    [],
  );

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Universal CTA button — solid gold for dark glass header ── */
  const headerCtaClass =
    "btn-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#C5A059] text-[#1E1E1E] hover:bg-[#D4AF37] hover:text-[#1E1E1E] font-bold text-[13px] shadow-lg shadow-[#C5A059]/40 hover:shadow-[#C5A059]/55";

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 header-glass transition-all duration-500 bg-[#121212]/92 border-b border-[#C5A059]/15 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[72px] lg:h-[84px]">
          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#C5A059]/20 group-hover:shadow-[#C5A059]/40 transition-all duration-300 group-hover:rotate-6">
              <ToothIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[22px] tracking-tight text-[#D4AF37]">
                Lumina
              </span>
              <span className="font-display font-light text-[10px] mt-0.5 text-[#C5A059]/70">
                {t("header.logo_sub")}
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link text-[13px] font-medium text-white/75 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop Right Section ── */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-[13px] font-medium text-white/55 hover:text-[#D4AF37] transition-colors"
            >
              <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#C5A059]/10">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              </span>
              (123) 456-7890
            </a>
            <MagneticWrap>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement("#booking");
                }}
                className={headerCtaClass}
              >
                {t("header.book_now")}
                <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
              </a>
            </MagneticWrap>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            aria-label={t("header.menu_aria")}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full origin-center transition-all duration-300 bg-white ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 bg-white ${
                  menuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full origin-center transition-all duration-300 bg-white ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu (slide down) ── */}
      <div
        className="lg:hidden overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out header-glass bg-[#121212]/95"
        style={{ maxHeight: menuOpen ? "500px" : "0px" }}
      >
        <div className="px-5 py-5 space-y-1 border-t border-[#C5A059]/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 rounded-xl text-[15px] font-medium text-white/65 hover:text-[#D4AF37] hover:bg-[#C5A059]/6 transition-colors text-start"
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher - Mobile */}
          <div className="px-4 py-3 relative">
            <LanguageSwitcher />
          </div>

          {/* Phone link */}
          <a
            href="tel:+1234567890"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-[#D4AF37] bg-[#C5A059]/10"
          >
            <Phone className="w-4 h-4" />
            (123) 456-7890
          </a>

          {/* Book Now CTA */}
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#booking");
              setMenuOpen(false);
            }}
            className="btn-cta flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm shadow-lg bg-[#C5A059] text-[#1E1E1E] shadow-[#C5A059]/40"
          >
            {t("header.book_consultation")}
            <ArrowRight className="w-3 h-3 rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </header>
  );
}
