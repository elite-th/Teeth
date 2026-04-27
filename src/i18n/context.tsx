"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useSyncExternalStore,
  useRef,
  type ReactNode,
} from "react";
import { type Locale, type Direction, getDirection } from "./types";

import en from "./en.json";
import fa from "./fa.json";
import ar from "./ar.json";

/* ------------------------------------------------------------------ */
/*  Translation dictionaries                                           */
/* ------------------------------------------------------------------ */
const messages: Record<Locale, typeof en> = { en, fa, ar };

/* ------------------------------------------------------------------ */
/*  Context shape                                                      */
/* ------------------------------------------------------------------ */
interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Helper: resolve nested key like "hero.badge"                      */
/* ------------------------------------------------------------------ */
function getNestedValue(obj: Record<string, unknown>, keyPath: string): string {
  const keys = keyPath.split(".");
  let current: unknown = obj;
  for (const k of keys) {
    if (current == null || typeof current !== "object") return keyPath;
    current = (current as Record<string, unknown>)[k];
  }
  return typeof current === "string" ? current : keyPath;
}

/* ------------------------------------------------------------------ */
/*  External store for locale — avoids hydration mismatch              */
/*  During SSR and hydration, always returns "en".                     */
/*  After mount, reads from localStorage.                              */
/* ------------------------------------------------------------------ */
const LOCALE_KEY = "lumina-locale";
const VALID_LOCALES: Locale[] = ["en", "fa", "ar"];

let clientReady = false;

function subscribeToLocale(callback: () => void) {
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("locale-update", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("locale-update", handler);
  };
}

function getLocaleSnapshot(): Locale {
  if (!clientReady) return "en"; // Match server during hydration
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved && VALID_LOCALES.includes(saved as Locale)) return saved as Locale;
  return "en";
}

function getLocaleServerSnapshot(): Locale {
  return "en";
}

/* ------------------------------------------------------------------ */
/*  useLayoutEffect that works in SSR                                  */
/* ------------------------------------------------------------------ */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot,
  );

  const dir = getDirection(locale);

  /* After mount, allow reading from localStorage */
  useEffect(() => {
    clientReady = true;
    // Trigger re-render to pick up the real locale from localStorage
    window.dispatchEvent(new Event("locale-update"));
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    const prevLocale = localStorage.getItem(LOCALE_KEY);
    if (prevLocale === newLocale) return; // no change, skip

    // Save scroll position before the switch
    const scrollY = window.scrollY;

    // Mark as transitioning (triggers CSS opacity transition to mask the reflow)
    document.documentElement.setAttribute("data-i18n-transitioning", "true");

    localStorage.setItem(LOCALE_KEY, newLocale);

    // Small delay to let the CSS transition mask kick in
    setTimeout(() => {
      // Trigger re-render via the external store subscription
      window.dispatchEvent(new Event("locale-update"));

      // After the layout has settled, restore scroll position and end transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
          document.documentElement.removeAttribute("data-i18n-transitioning");
        });
      });
    }, 80);
  }, []);

  /* Apply dir & lang to <html> synchronously (before paint) */
  useIsomorphicLayoutEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", dir);
    html.setAttribute("lang", locale);
  }, [locale, dir]);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(messages[locale] as unknown as Record<string, unknown>, key) || key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, dir, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
