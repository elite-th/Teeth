"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  PhoneCall,
} from "lucide-react";
import { scrollToElement } from "@/hooks/use-lumina";
import { useI18n } from "@/i18n/context";

/* Inline SVG tooth icon */
function ToothIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 7.5 3 6.5 4.5C5.5 6 5 7 4 7.5C3 8 2 9 2 10.5C2 12 3 13 4 13C4.5 13 5 12.8 5.5 12.5C6 14 6.5 16 7 18C7.5 20 8 22 9 22C10 22 10.5 20 11 18C11.3 16.8 11.6 15.5 12 15C12.4 15.5 12.7 16.8 13 18C13.5 20 14 22 15 22C16 22 16.5 20 17 18C17.5 16 18 14 18.5 12.5C19 12.8 19.5 13 20 13C21 13 22 12 22 10.5C22 9 21 8 20 7.5C19 7 18.5 6 17.5 4.5C16.5 3 14.5 2 12 2Z" />
    </svg>
  );
}

export default function Footer() {
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  const quickLinks = [
    { label: t("footer.link_about"), href: "#about" },
    { label: t("footer.link_services"), href: "#services" },
    { label: t("footer.link_gallery"), href: "#gallery" },
    { label: t("footer.link_booking"), href: "#booking" },
  ];

  const workingHours = [
    { days: t("footer.day_mon_thu"), hours: t("footer.hours_mon_thu") },
    { days: t("footer.day_fri"), hours: t("footer.hours_fri") },
    { days: t("footer.day_sat"), hours: t("footer.hours_sat") },
    { days: t("footer.day_sun"), hours: t("footer.hours_closed"), closed: true },
  ];

  const legalLinks = [
    t("footer.legal_privacy"),
    t("footer.legal_terms"),
    t("footer.legal_hipaa"),
  ];

  /* Column headers: keep uppercase/tracking for LTR (English), normal-case for RTL cursive */
  const colHeaderClass = isRtl
    ? "font-semibold text-[11px] text-white/40 mb-5 normal-case"
    : "font-semibold text-[11px] uppercase tracking-[0.15em] text-white/40 mb-5";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a0a0a 0%, #141210 40%, #1A1815 100%)",
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-20">
        {/* 4-column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Logo & Social */}
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A059] to-[#D4AF37] flex items-center justify-center">
                <ToothIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-xl text-white">Lumina</span>
                <span className={isRtl ? "font-display font-light text-[10px] text-[#C5A059]/60 mt-0.5" : "font-display font-light text-[10px] text-[#C5A059]/60 tracking-[0.15em] uppercase mt-0.5"}>
                  {t("footer.logo_sub")}
                </span>
              </div>
            </a>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              {t("footer.about")}
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C5A059] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={colHeaderClass}>
              {t("footer.col_links")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToElement(link.href)}
                    className="text-white/30 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className={colHeaderClass}>
              {t("footer.col_contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                <span className="text-white/30 text-sm leading-relaxed whitespace-pre-line">
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="tel:+1234567890" className="text-white/30 text-sm hover:text-[#D4AF37] transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:hello@luminadental.com" className="text-white/30 text-sm hover:text-[#D4AF37] transition-colors">
                  hello@luminadental.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Working Hours */}
          <div>
            <h4 className={colHeaderClass}>
              {t("footer.col_hours")}
            </h4>
            <ul className="space-y-3">
              {workingHours.map((row) => (
                <li key={row.days} className="flex justify-between text-sm">
                  <span className="text-white/30">{row.days}</span>
                  <span className={row.closed ? "text-white/20 font-medium" : "text-white/60 font-medium"}>
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/15">
              <PhoneCall className="w-3 h-3 text-[#C5A059]" />
              <span className="text-[11px] text-[#D4AF37] font-semibold">{t("footer.emergency")}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
