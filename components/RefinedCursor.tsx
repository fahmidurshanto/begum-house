"use client";

import React, { useEffect, useState } from "react";

export const RefinedCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Smooth lag trailing effect
  useEffect(() => {
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <>
      {/* Inner Dot Cursor */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#c5a869] pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_10px_#c5a869]"
      />

      {/* Outer Ring Trailing Cursor */}
      <div
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${isHovered ? 1.6 : 1})`,
        }}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered
            ? "border-[#00d4ff] bg-[#00d4ff]/10 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
            : "border-[#c5a869]/60 bg-transparent shadow-[0_0_10px_rgba(197,168,105,0.2)]"
        }`}
      />
    </>
  );
};
