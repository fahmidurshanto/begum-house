"use client";

import React, { useEffect, useRef } from "react";
import { DIVISIONS, Division } from "@/data/divisions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingUp,
  Home,
  HeartHandshake,
  Compass,
  Globe,
  Handshake,
  ArrowUpRight,
  Shield,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HouseSectorsSectionProps {
  onSelectDivision: (division: Division) => void;
  onOpenConsultation: (divisionTitle?: string) => void;
}

export default function HouseSectorsSection({
  onSelectDivision,
  onOpenConsultation,
}: HouseSectorsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sector-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-[#DFBE76]" };
    switch (name) {
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "Home":
        return <Home {...props} />;
      case "HeartHandshake":
        return <HeartHandshake {...props} />;
      case "Compass":
        return <Compass {...props} />;
      case "Globe":
        return <Globe {...props} />;
      case "Handshake":
        return <Handshake {...props} />;
      default:
        return <Shield {...props} />;
    }
  };

  return (
    <section id="our-house" className="py-24 bg-[#071526] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a869]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0E243D] rounded-full blur-3xl pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E243D] border border-[#c5a869]/30 text-xs tracking-[0.2em] font-serif text-[#DFBE76] uppercase">
            <span>DISCIPLINES OF THE HOUSE</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            THE SIX CORE PILLARS
          </h2>

          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-[#c5a869]/40" />
            <span className="text-[#DFBE76] text-xs">◆</span>
            <span className="h-[1px] w-12 bg-[#c5a869]/40" />
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Each wing of Begum House unites deep institutional heritage with
            unrivaled modern execution, delivering integrated value for global
            enterprises, sovereign entities, and distinguished family offices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DIVISIONS.map((division) => (
            <div
              key={division.id}
              className="sector-card group relative bg-[#0B1C31]/90 hover:bg-[#0E243D] border border-slate-800 hover:border-[#c5a869]/60 rounded-xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 opacity-0"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-lg bg-[#071526] border border-[#c5a869]/30 group-hover:border-[#c5a869] group-hover:scale-105 transition-all shadow-md">
                  {getIcon(division.iconName)}
                </div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800">
                  {division.floor === "upper" ? "Floor II" : "Floor I"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <h3
                  className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#DFBE76] transition-colors"
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {division.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  {division.tagline}
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6">
                {division.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80 mb-5">
                {division.keyStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-base font-serif font-bold text-[#DFBE76]">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectDivision(division)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFBE76] group-hover:text-white transition-colors"
                >
                  <span>Chamber Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(division.title)}
                  className="text-[11px] uppercase tracking-wider px-3 py-1.5 rounded bg-[#071526] hover:bg-[#c5a869] text-slate-300 hover:text-[#071526] font-semibold border border-slate-700 hover:border-[#c5a869] transition-all"
                >
                  Mandate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
