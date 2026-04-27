"use client";

import { useRef, useEffect } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    /* ── Lerp state ── */
    let cx = 0, cy = 0;   // current (animated) position
    let tx = 0, ty = 0;   // target position
    let hasMoved = false;
    let rafId: number;

    /* ── Pointer move — clientX/clientY are already viewport-relative,
     *  which is exactly what position:fixed needs. No scroll math needed! ── */
    const onPointerMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = "1";
        cx = tx; cy = ty;
      }
    };

    /* ── Hover detection via event delegation ── */
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        cursor.classList.add("hovering");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        if (
          !related ||
          (!related.closest("a") &&
            !related.closest("button") &&
            !related.closest("[data-hover]") &&
            related.tagName !== "A" &&
            related.tagName !== "BUTTON")
        ) {
          cursor.classList.remove("hovering");
        }
      }
    };

    /* ── Click ── */
    const onPointerDown = () => cursor.classList.add("clicking");
    const onPointerUp = () => cursor.classList.remove("clicking");

    /* ── Visibility: hide when mouse leaves the window ── */
    const onMouseLeave = () => { cursor.style.opacity = "0"; };
    const onMouseEnter = () => { if (hasMoved) cursor.style.opacity = "1"; };

    /* ── Animation loop ── */
    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} />;
}
