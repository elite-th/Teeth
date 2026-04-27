"use client";

import { useRef, useCallback } from "react";

/**
 * MagneticWrap — wraps a child .btn-cta element and applies a magnetic
 * pull effect on mouse hover. This avoids the React 19 lint issue
 * with returning refs from hooks.
 */
export default function MagneticWrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const btn = wrap.querySelector(".btn-cta") as HTMLElement;
    if (!btn) return;
    const r = wrap.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const btn = wrap.querySelector(".btn-cta") as HTMLElement;
    if (!btn) return;
    btn.style.transform = "translate(0,0)";
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`magnetic-wrap ${className}`}
    >
      {children}
    </div>
  );
}
