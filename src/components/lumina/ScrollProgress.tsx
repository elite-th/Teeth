"use client";

import { useScrollProgress } from "@/hooks/use-lumina";

export default function ScrollProgress() {
  const ref = useScrollProgress();
  return <div ref={ref} className="scroll-progress" style={{ width: "0%" }} />;
}
