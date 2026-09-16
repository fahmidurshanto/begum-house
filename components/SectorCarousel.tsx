"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Building, Sparkles, Utensils, ShoppingBag, Factory, Stethoscope, Landmark, Globe } from "lucide-react";

interface SectorCard {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  stats: string;
}

const SECTORS: SectorCard[] = [
  {
    id: "hospitality",
    name: "Hospitality & Leisure",
    category: "Luxury Services",
    description: "Bespoke operational frameworks for luxury hotels, banquet venues, and fine dining groups.",
    icon: <Utensils className="w-6 h-6 text-[#c5a869]" />,
    bgGradient: "from-amber-950/60 to-slate-900",
    stats: "£120M Managed"
  },
  {
    id: "retail",
    name: "Omnichannel Retail",
    category: "Consumer Operations",
    description: "High-frequency supply chain optimization, automated inventory, and e-commerce growth.",
    icon: <ShoppingBag className="w-6 h-6 text-[#00d4ff]" />,
    bgGradient: "from-cyan-950/60 to-slate-900",
    stats: "3.4M Transactions/yr"
  },
  {
    id: "manufacturing",
    name: "Advanced Manufacturing",
    category: "Industrial Tech",
    description: "Smart factory AI integration, cross-border procurement, and lean quality control.",
    icon: <Factory className="w-6 h-6 text-emerald-400" />,
    bgGradient: "from-emerald-950/60 to-slate-900",
    stats: "40% Cycle Reduction"
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    category: "Institutional Care",
    description: "Clinical operational compliance, medical therapy center management, and digital health tech.",
    icon: <Stethoscope className="w-6 h-6 text-pink-400" />,
    bgGradient: "from-pink-950/60 to-slate-900",
    stats: "100% SLA Compliance"
  },
  {
    id: "investment",
    name: "Global Investment & Banking",
    category: "Capital Growth",
    description: "Structured corporate finance, treasury management, and institutional wealth preservation.",
    icon: <Landmark className="w-6 h-6 text-[#c5a869]" />,
    bgGradient: "from-amber-900/40 to-slate-900",
    stats: "£450M Portfolio"
  },
  {
    id: "opportunities",
    name: "International Opportunities",
    category: "Cross-Border",
    description: "Direct investment pipelines connecting UK enterprises with Türkiye, UAE, and global markets.",
    icon: <Globe className="w-6 h-6 text-[#00d4ff]" />,
    bgGradient: "from-[#071322] to-slate-900",
    stats: "14 Countries"
  }
];

export const SectorCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SECTORS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < SECTORS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative py-16 px-6 bg-[#03080e] border-t border-[#c5a869]/20 text-slate-100 overflow-hidden">
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#c5a869_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a869]/10 border border-[#c5a869]/30 text-[#c5a869] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Industry Coverage
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#f4ecd8] tracking-wide">
          SECTORS WE TRANSFORM
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto uppercase tracking-widest">
          Tailored Operational & Technical Excellence Across Key Industries
        </p>
      </div>

      {/* 3D Coverflow Container */}
      <div className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[380px] perspective-[1000px]">
        
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-30 p-3 rounded-full bg-[#071322]/80 border border-[#c5a869]/40 text-[#c5a869] hover:scale-110 hover:bg-[#c5a869] hover:text-[#071322] transition-all backdrop-blur-md shadow-2xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 z-30 p-3 rounded-full bg-[#071322]/80 border border-[#c5a869]/40 text-[#c5a869] hover:scale-110 hover:bg-[#c5a869] hover:text-[#071322] transition-all backdrop-blur-md shadow-2xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* CSS 3D Coverflow Cards */}
        <div className="relative w-full flex items-center justify-center h-80">
          {SECTORS.map((sector, idx) => {
            const offset = idx - activeIndex;
            const isActive = offset === 0;

            // Calculate 3D transforms based on distance from active card
            let transform = `translateX(${offset * 160}px) translateZ(${isActive ? 100 : -150}px) rotateY(${offset * -25}deg)`;
            let opacity = isActive ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.4);
            let zIndex = 20 - Math.abs(offset);

            return (
              <motion.div
                key={sector.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform,
                  opacity,
                  zIndex,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`absolute w-72 sm:w-80 h-80 p-6 rounded-2xl border bg-gradient-to-br ${sector.bgGradient} backdrop-blur-xl shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 ${
                  isActive
                    ? "border-[#c5a869] shadow-[0_0_35px_rgba(197,168,105,0.3)]"
                    : "border-slate-800 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 shadow-inner">
                    {sector.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a869] bg-[#c5a869]/10 px-2 py-1 rounded border border-[#c5a869]/20">
                    {sector.category}
                  </span>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-xl font-bold font-serif text-[#f4ecd8]">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Impact Metric:</span>
                  <span className="text-[#00d4ff] font-bold">{sector.stats}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {SECTORS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "w-8 bg-[#c5a869]" : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>

    </section>
  );
};
