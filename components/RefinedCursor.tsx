"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const RefinedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !auraRef.current) return;

    // Create GSAP quickTo setters for ultra-smooth 60fps tracking
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.08, ease: "power3.out" });

    const xToAura = gsap.quickTo(auraRef.current, "x", { duration: 0.22, ease: "power2.out" });
    const yToAura = gsap.quickTo(auraRef.current, "y", { duration: 0.22, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToAura(e.clientX);
      yToAura(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        document.body.style.cursor === "pointer";

      if (isInteractive) {
        gsap.to(cursorRef.current, {
          scale: 1.35,
          rotation: -8,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
        gsap.to(auraRef.current, {
          scale: 1.6,
          opacity: 0.9,
          borderColor: "#00d4ff",
          backgroundColor: "rgba(0, 212, 255, 0.15)",
          duration: 0.3,
        });
      } else {
        gsap.to(cursorRef.current, {
          scale: 1.0,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(auraRef.current, {
          scale: 1.0,
          opacity: 0.6,
          borderColor: "rgba(197, 168, 105, 0.5)",
          backgroundColor: "transparent",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* GSAP-Animated Hand PNG Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <img
          src="/sources/hand.png"
          alt="Custom Hand Cursor"
          className="w-24 h-24 object-contain drop-shadow-[0_0_18px_rgba(197,168,105,0.95)]"
        />
      </div>

      {/* GSAP-Animated Trailing Aura Ring */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 w-24 h-24 rounded-full border border-[#c5a869]/50 bg-transparent pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 select-none"
      />
    </>
  );
};
