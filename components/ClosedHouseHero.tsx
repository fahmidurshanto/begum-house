"use client";

import React from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { Calculator, ShieldCheck, Sparkles } from "lucide-react";

export const ClosedHouseHero: React.FC = () => {
  const { setIsRoiModalOpen } = useHouseStore();

  return (
    <div className="relative min-h-screen pt-20 flex flex-col justify-between bg-transparent text-slate-100 overflow-hidden selection:bg-[#c5a869] selection:text-[#0b1528] pointer-events-none">
      
      {/* Top Key Pillars Sub-Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 w-full flex flex-wrap justify-between items-center text-xs tracking-[0.2em] font-medium text-[#c5a869] border-b border-[#c5a869]/30 pb-4">
        <span className="flex items-center gap-2 font-bold drop-shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a869]" /> UK-LED GLOBAL REACH
        </span>
        <div className="flex items-center gap-6 uppercase text-[11px] text-slate-100 font-bold drop-shadow-md">
          <span>PEOPLE</span>
          <span className="text-[#c5a869]">◆</span>
          <span>PROCESS</span>
          <span className="text-[#c5a869]">◆</span>
          <span>TECHNOLOGY</span>
          <span className="text-[#c5a869]">◆</span>
          <span>OPPORTUNITY</span>
        </div>
      </div>

      {/* Main Hero Typography Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center items-start w-full pointer-events-none">
        <div className="max-w-xl text-left space-y-6 pointer-events-auto bg-[#091322]/75 p-6 sm:p-8 rounded-2xl border border-[#c5a869]/40 backdrop-blur-md shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#091322]/90 border border-[#c5a869] text-[#c5a869] text-xs uppercase tracking-widest font-bold shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Institutional Excellence & Technology
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#c5a869] block">
              WELCOME TO
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-wide leading-none drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-[#f5ede0] to-[#c5a869] bg-clip-text text-transparent">
                BEGUM HOUSE
              </span>
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-200 tracking-wider pt-1 drop-shadow">
              Global Services. Intelligent Operations.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal drop-shadow">
            A modern UK business house connecting specialist expertise, intelligent operations, global delivery, and exclusive international opportunities across borders.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsRoiModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-extrabold text-[#00d4ff] bg-[#091322]/90 border border-[#00d4ff]/60 rounded-full hover:bg-[#00d4ff] hover:text-[#0b1528] shadow-lg transition-all backdrop-blur-md cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#00d4ff]" />
              Calculate Savings ROI
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Ribbon */}
      <div className="relative z-10 bg-[#091322]/90 border-t border-[#c5a869]/30 py-4 px-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-medium gap-2">
          <span>© {new Date().getFullYear()} BEGUM HOUSE. ALL RIGHTS RESERVED.</span>
          <span className="text-[#c5a869] font-mono tracking-widest uppercase font-bold">
            LONDON • ISTANBUL • DUBAI
          </span>
        </div>
      </div>

    </div>
  );
};
