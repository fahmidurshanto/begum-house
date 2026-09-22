"use client";

import React from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { Calculator, ShieldCheck, Sparkles } from "lucide-react";

export const ClosedHouseHero: React.FC = () => {
  const { setIsRoiModalOpen } = useHouseStore();

  return (
    <div className="relative min-h-screen pt-20 flex flex-col justify-between bg-transparent text-slate-100 overflow-hidden selection:bg-[#c5a869] selection:text-[#0b1528] pointer-events-none">

      {/* Top Key Pillars Sub-Bar */}


      {/* Main Hero Typography Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 flex-1 flex flex-col justify-start items-start w-full pointer-events-none">

        <div className="max-w-xl text-left space-y-6 pointer-events-auto bg-transparent p-0 ml-4 sm:ml-12">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] font-black text-[#894426] block drop-shadow-[0_2px_8px_rgba(30,5,12,0.95)]">
              WELCOME TO
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#4a0e1c] tracking-wider leading-none drop-shadow-[0_2px_12px_rgba(251,245,235,0.9)] [text-shadow:_0_2px_14px_rgba(30,5,12,0.9)]">
              BEGUM HOUSE
            </h1>
            <p className="text-sm sm:text-base font-black text-[#5a1224] tracking-wider pt-1 drop-shadow-[0_1px_8px_rgba(251,245,235,0.85)] [text-shadow:_0_2px_10px_rgba(30,5,12,0.8)]">
              Global Services. Intelligent Operations.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Footer Ribbon */}
      <div className="relative z-10 bg-transparent py-4 px-6 border-t-0 shadow-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-200 font-extrabold gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span>© {new Date().getFullYear()} BEGUM HOUSE. ALL RIGHTS RESERVED.</span>
          <span className="text-[#c5a869] font-mono tracking-widest uppercase font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            LONDON • ISTANBUL • DUBAI
          </span>
        </div>
      </div>

    </div>
  );
};
