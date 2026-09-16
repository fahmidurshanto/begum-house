"use client";

import React from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { Facade3DCanvas } from "@/components/Facade3DCanvas";
import { Sparkles, ShieldCheck, Calculator } from "lucide-react";

export const ClosedHouseHero: React.FC = () => {
  const { setIsRoiModalOpen } = useHouseStore();

  return (
    <div className="relative min-h-screen pt-20 flex flex-col justify-between bg-[#faf6f0] text-[#1a1a2e] overflow-hidden selection:bg-[#c5a869] selection:text-[#1a1a2e]">
      
      {/* Light Mode Pure 3D WebGL Procedural Mansion Facade Canvas */}
      <Facade3DCanvas />

      {/* Floating 4 Key Pillars Banner (Top Sub-Bar) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 w-full flex flex-wrap justify-between items-center text-xs tracking-[0.2em] font-medium text-[#c5a869] border-b border-[#c5a869]/30 pb-4">
        <span className="flex items-center gap-2 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a869]" /> UK-LED GLOBAL REACH
        </span>
        <div className="flex items-center gap-6 uppercase text-[11px] text-[#2d3748] font-semibold">
          <span>PEOPLE</span>
          <span className="text-[#c5a869]">◆</span>
          <span>PROCESS</span>
          <span className="text-[#c5a869]">◆</span>
          <span>TECHNOLOGY</span>
          <span className="text-[#c5a869]">◆</span>
          <span>OPPORTUNITY</span>
        </div>
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center items-start w-full pointer-events-none">
        
        {/* Left Side: Brand Statement (Button is mounted directly on 3D Door in Canvas) */}
        <div className="max-w-2xl text-left space-y-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf6f0]/90 border border-[#c5a869] text-[#c5a869] text-xs uppercase tracking-widest font-bold shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Institutional Excellence & Technology
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#1a1a2e] tracking-wide leading-tight drop-shadow">
              WELCOME TO <br />
              <span className="bg-gradient-to-r from-[#1a1a2e] via-[#c5a869] to-[#8c6d23] bg-clip-text text-transparent">
                BEGUM HOUSE
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#2d3748] tracking-wider">
              Global Services. Intelligent Operations.
            </p>
          </div>

          <p className="text-sm text-[#4a5568] max-w-lg leading-relaxed font-medium">
            Step inside our institutional sanctuary of enterprise solutions, cross-border corporate advisory, AI-driven transformations, and exclusive international opportunities.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsRoiModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-[#1a1a2e] bg-[#faf6f0]/90 border border-[#c5a869] rounded-full hover:bg-[#c5a869] hover:text-white shadow-lg transition-all backdrop-blur-md"
            >
              <Calculator className="w-4 h-4 text-[#c5a869]" />
              Calculate Savings ROI
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Footer Ribbon */}
      <div className="relative z-10 bg-[#faf6f0]/90 border-t border-[#c5a869]/30 py-4 px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-[#4a5568] font-medium gap-2">
          <span>© {new Date().getFullYear()} BEGUM HOUSE. ALL RIGHTS RESERVED.</span>
          <span className="text-[#c5a869] font-mono tracking-widest uppercase font-bold">
            LONDON • ISTANBUL • DUBAI
          </span>
        </div>
      </div>

    </div>
  );
};
