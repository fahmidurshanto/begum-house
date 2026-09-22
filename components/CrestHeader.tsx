"use client";

import React from "react";
import Image from "next/image";
import { useHouseStore } from "@/store/useHouseStore";
import { Calculator, Globe, Volume2, VolumeX } from "lucide-react";

export const CrestHeader: React.FC = () => {
  const { view, returnToFacade, setIsRoiModalOpen, setIsGlobalModalOpen, isSoundMuted, toggleSound } = useHouseStore();

  const isTransparentView = view === "FACADE" || view === "ATRIUM";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparentView
          ? "bg-transparent border-transparent shadow-none"
          : "bg-[#faf6f0]/90 backdrop-blur-md border-b border-[#c5a869]/30 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button
          onClick={returnToFacade}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#f3ede2] border border-[#c5a869] p-1 group-hover:scale-105 transition-transform duration-300 shadow-md">
            <Image
              src="/sources/Logo - Edited.png"
              alt="Begum House Crest"
              width={32}
              height={32}
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
        <nav className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-[#1a1a2e]">
          <button
            onClick={returnToFacade}
            className={`px-3 py-1.5 rounded-full border border-transparent hover:text-[#c5a869] hover:bg-[#1a1a2e] hover:border-[#c5a869]/40 shadow-sm transition-all duration-300 ${
              view === "FACADE" ? "text-[#c5a869] bg-[#1a1a2e] border-[#c5a869]/40" : ""
            }`}
          >
            The House
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
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
