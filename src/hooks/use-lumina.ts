"use client";

import { useEffect, useRef } from "react";

// Scroll reveal hook using IntersectionObserver
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Unobserve after reveal — no need to re-animate
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all reveal elements within the container
    const revealEls = el.querySelectorAll(
      ".reveal,.reveal-left,.reveal-right,.reveal-scale,.stagger"
    );
    revealEls.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

// Scroll progress hook — rAF-optimized
export function useScrollProgress() {
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollProgressRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        el.style.width = progress + "%";
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollProgressRef;
}

// Stat counter hook
export function useStatCounter(
  target: number,
  isDecimal: boolean = false,
  duration: number = 1600
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let cur = 0;
            const step = target / 40;
            const timer = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(timer);
              }
              el.textContent = isDecimal ? cur.toFixed(1) : Math.floor(cur).toString();
            }, duration / 40);
            // Unobserve after animation starts
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isDecimal, duration]);

  return ref;
}

// Smooth easing — quintic in-out for buttery scroll feel
function easeInOutQuint(t: number): number {
  return t < 0.5
    ? 16 * t * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

// Cancel any in-flight scroll animation
let activeScrollRaf: number | null = null;

export function scrollToElement(id: string) {
  // Cancel previous scroll if still animating
  if (activeScrollRaf !== null) {
    cancelAnimationFrame(activeScrollRaf);
    activeScrollRaf = null;
  }

  const el = document.querySelector(id);
  const header = document.getElementById("header");
  if (!el) return;

  const headerOffset = header?.offsetHeight || 0;
  const targetTop = el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 16;
  const startTop = window.pageYOffset;
  const distance = targetTop - startTop;

  // Skip if already at target
  if (Math.abs(distance) < 2) return;

  // Longer duration for longer distances; minimum 500ms for smooth feel
  const duration = Math.min(1400, Math.max(500, Math.abs(distance) * 0.55));
  let startTime: number | null = null;

  function animate(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuint(progress);

    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      activeScrollRaf = requestAnimationFrame(animate);
    } else {
      activeScrollRaf = null;
    }
  }

  activeScrollRaf = requestAnimationFrame(animate);
}
