"use client";

import React, { useEffect, useRef } from "react";
import { Users, Settings, Cpu, Compass } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValueRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Users,
      title: "PEOPLE",
      subtitle: "Expertise & Experience",
    },
    {
      icon: Settings,
      title: "PROCESS",
      subtitle: "Efficiency & Structure",
    },
    {
      icon: Cpu,
      title: "TECHNOLOGY",
      subtitle: "Innovation & Automation",
    },
    {
      icon: Compass,
      title: "OPPORTUNITY",
      subtitle: "Growth & Global Reach",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full relative z-20 shadow-2xl border-t border-b border-[#c5a869]/30 opacity-0"
    >
      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[96px] bg-[#FAF7F0]">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#c5a869]/25 py-4 px-4 sm:px-8 lg:px-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-3.5 py-2 md:py-0 px-3 first:pl-0 last:pr-0 group hover:translate-y-[-1px] transition-transform duration-200"
              >
                <div className="w-10 h-10 rounded-full border border-[#c5a869]/50 bg-white/80 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#c5a869] group-hover:shadow-[0_0_12px_rgba(197,168,105,0.3)] transition-all">
                  <Icon className="w-5 h-5 text-[#071526] stroke-[1.6]" />
                </div>

                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xs tracking-[0.16em] text-[#071526] uppercase">
                    {pillar.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-600 font-sans tracking-wide">
                    {pillar.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="relative bg-[#071526] text-white flex items-center justify-center lg:justify-end px-8 py-5 lg:min-w-[380px] xl:min-w-[440px] overflow-hidden"
        >
          <div
            className="hidden lg:block absolute -left-7 top-0 bottom-0 w-14 bg-[#071526] -skew-x-12 border-l border-[#c5a869]/50 shadow-2xl z-10"
          />

          <div
            className="absolute inset-0 opacity-10 bg-repeat bg-center pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#c5a869 1px, transparent 1px)`,
              backgroundSize: "12px 12px",
            }}
          />

          <div className="relative z-20 text-center lg:text-right flex flex-col items-center lg:items-end">
            <span
              className="text-[#DFBE76] text-xs sm:text-sm tracking-[0.2em] font-serif uppercase font-semibold"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              YOUR TRUSTED PARTNER
            </span>
            <span
              className="font-serif italic text-sm sm:text-base text-slate-200 tracking-wide mt-0.5"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              for a Smarter, Stronger Tomorrow.
            </span>
            <div className="flex items-center space-x-2 mt-1.5 opacity-80">
              <span className="h-[1px] w-8 bg-[#c5a869]/40" />
              <span className="text-[#c5a869] text-[9px]">◆</span>
              <span className="h-[1px] w-8 bg-[#c5a869]/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
