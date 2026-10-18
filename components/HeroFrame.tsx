"use client";

import { useRef } from "react";

// The hero picture, tilting a few degrees towards the pointer as it moves over the hero. The tilt is written as two custom properties; the
// stylesheet turns them into the transform and drops them under reduced motion.
export function HeroFrame({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function tilt(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    el.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);
    el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
  }

  function rest() {
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div ref={ref} onPointerMove={tilt} onPointerLeave={rest} className={`hero-tilt ${className}`}>
      <div className="hero-in">{children}</div>
    </div>
  );
}
