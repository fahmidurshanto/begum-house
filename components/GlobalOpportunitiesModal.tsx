"use client";

import React from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { GLOBAL_OPPORTUNITIES } from "@/data/houseData";
import { X, Globe, CheckCircle2, ArrowRight } from "lucide-react";

export const GlobalOpportunitiesModal: React.FC = () => {
  const { isGlobalModalOpen, setIsGlobalModalOpen, selectedGlobalTab, setIsGlobalModalOpen: setTab } = useHouseStore();

  if (!isGlobalModalOpen) return null;

  const activeOpp = GLOBAL_OPPORTUNITIES.find((o) => o.id === selectedGlobalTab) || GLOBAL_OPPORTUNITIES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#071322] border border-[#c5a869]/60 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c5a869] via-[#00d4ff] to-[#c5a869]" />

        {/* Close Button */}
        <button
          onClick={() => setIsGlobalModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-[#c5a869]/40 text-slate-300 hover:text-[#c5a869] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#c5a869]/20 text-[#c5a869] border border-[#c5a869]/40">
            <Globe className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#f4ecd8]">
              GLOBAL OPPORTUNITIES
            </h2>
            <p className="text-xs text-slate-300 uppercase tracking-widest">
              Explore Beyond Borders • UK-Led International Access
            </p>
          </div>
        </div>

        {/* Country/Tab Navigation Strip */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
          {GLOBAL_OPPORTUNITIES.map((opp) => (
            <button
              key={opp.id}
              onClick={() => setTab(true, opp.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${
                selectedGlobalTab === opp.id
                  ? "bg-[#c5a869] text-[#071322] shadow-lg shadow-[#c5a869]/30"
                  : "bg-slate-900 text-slate-300 hover:text-[#c5a869] border border-slate-800"
              }`}
            >
              <span>{opp.flag}</span>
              <span>{opp.country}</span>
            </button>
          ))}
        </div>

        {/* Active Country Detail Body */}
        <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-6">
          <div>
            <span className="text-xs text-[#c5a869] uppercase tracking-widest font-mono font-bold block mb-1">
              {activeOpp.flag} {activeOpp.country} Highlight
            </span>
            <h3 className="text-xl font-bold text-[#f4ecd8] font-serif">
              {activeOpp.tagline}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              {activeOpp.description}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Key Strategic Advantages
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeOpp.highlights.map((h, idx) => (
                <div key={idx} className="p-3 rounded bg-[#071322] border border-[#c5a869]/30 text-xs text-slate-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a869] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                alert(`Inquiry sent for ${activeOpp.country} Global Opportunities!`);
                setIsGlobalModalOpen(false);
              }}
              className="px-6 py-3 rounded bg-gradient-to-r from-[#c5a869] to-[#d8be82] text-[#071322] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a869]/20 transition-all flex items-center gap-2"
            >
              <span>Inquire About {activeOpp.country}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
