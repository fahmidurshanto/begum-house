"use client";

import React from "react";
import { Users, Settings, Cpu, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function ValueRibbon() {
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
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, staggerChildren: 0.1 }
        }
      }}
      className="w-full relative z-20 shadow-2xl border-t border-b border-[#c5a869]/30"
    >
      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[96px] bg-[#FAF7F0]">
        {/* Left Section: 4 Value Pillars in Ivory Theme */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#c5a869]/25 py-4 px-4 sm:px-8 lg:px-10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0 } }}
                  key={idx}
                  className="flex items-center space-x-3.5 py-2 md:py-0 px-3 first:pl-0 last:pr-0 group hover:translate-y-[-1px] transition-transform duration-200"
                >
                {/* Gold Circle / Badge Icon */}
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
                </motion.div>
              );
          })}
        </div>

        {/* Right Section: Navy Diagonal Wedge with Gold Italic Tagline */}
        <motion.div 
          variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } }}
          className="relative bg-[#071526] text-white flex items-center justify-center lg:justify-end px-8 py-5 lg:min-w-[380px] xl:min-w-[440px] overflow-hidden"
        >
          {/* Diagonal clip cut accent for desktop */}
          <div
            className="hidden lg:block absolute -left-7 top-0 bottom-0 w-14 bg-[#071526] -skew-x-12 border-l border-[#c5a869]/50 shadow-2xl z-10"
          />

          {/* Faint World Map Watermark Pattern */}
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
            {/* Diamond accent line */}
            <div className="flex items-center space-x-2 mt-1.5 opacity-80">
              <span className="h-[1px] w-8 bg-[#c5a869]/40" />
              <span className="text-[#c5a869] text-[9px]">◆</span>
              <span className="h-[1px] w-8 bg-[#c5a869]/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
