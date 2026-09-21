"use client";

import React from "react";
import Image from "next/image";
import { useHouseStore } from "@/store/useHouseStore";
import { Calculator, Globe, Volume2, VolumeX } from "lucide-react";

export const CrestHeader: React.FC = () => {
  const { view, returnToFacade, setIsRoiModalOpen, setIsGlobalModalOpen, isSoundMuted, toggleSound } = useHouseStore();

  const isFacade = view === "FACADE";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isFacade
          ? "bg-transparent border-transparent shadow-none"
          : "bg-[#faf6f0]/90 backdrop-blur-md border-b border-[#c5a869]/30 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button
          onClick={returnToFacade}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-[#f3ede2] border border-[#c5a869] p-1 group-hover:scale-105 transition-transform duration-300 shadow-md">
            <Image
              src="/sources/Logo - Edited.png"
              alt="Begum House Crest"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="block font-serif text-xl font-bold tracking-[0.25em] text-[#1a1a2e] group-hover:text-[#c5a869] transition-colors">
              BEGUM HOUSE
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-[#1a1a2e] uppercase font-bold">
              Global Services • Intelligent Operations
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.15em] text-[#2d3748]">
          <button
            onClick={returnToFacade}
            className={`hover:text-[#c5a869] transition-colors ${view === "FACADE" ? "text-[#c5a869] border-b-2 border-[#c5a869] pb-1" : ""}`}
          >
            The House
          </button>
          
          <button
            onClick={() => setIsGlobalModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#c5a869] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#c5a869]" />
            Global Opportunities
          </button>

          <button
            onClick={() => setIsRoiModalOpen(true)}
            className="flex items-center gap-1.5 text-[#1a1a2e] hover:text-[#c5a869] transition-colors font-bold"
          >
            <Calculator className="w-3.5 h-3.5 text-[#c5a869] animate-pulse" />
            ROI Calculator
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full border border-[#c5a869]/40 bg-[#f3ede2] text-[#1a1a2e] hover:text-[#c5a869] hover:border-[#c5a869] transition-all"
            title={isSoundMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#c5a869]" />}
          </button>

          <button
            onClick={() => setIsRoiModalOpen(true)}
            className="px-4 py-2 text-xs font-extrabold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#c5a869] to-[#e8d5a7] text-[#1a1a2e] hover:brightness-105 shadow-md shadow-[#c5a869]/20 transition-all active:scale-95"
          >
            Calculate ROI
          </button>
        </div>

      </div>
    </header>
  );
};
