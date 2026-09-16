"use client";

import React, { useState } from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { X, Calculator, TrendingUp, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";

export const ROICalculatorModal: React.FC = () => {
  const { isRoiModalOpen, setIsRoiModalOpen } = useHouseStore();

  const [teamSize, setTeamSize] = useState(25);
  const [avgSalary, setAvgSalary] = useState(45000);
  const [automationPct, setAutomationPct] = useState(40);

  if (!isRoiModalOpen) return null;

  // Formula Calculations
  const totalPayroll = teamSize * avgSalary;
  const rawSavings = totalPayroll * (automationPct / 100) * 0.65; // ~65% net efficiency gain
  const netRoiPercentage = Math.round((rawSavings / (totalPayroll * 0.15)) * 100); // ROI vs ~15% service cost

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#071322] border-2 border-[#00d4ff]/60 rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.25)] p-6 sm:p-8 text-slate-100 overflow-hidden">
        
        {/* Top Hologram Cyan Light Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#00ffff] to-[#00d4ff] animate-pulse" />

        {/* Close Button */}
        <button
          onClick={() => setIsRoiModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-[#00d4ff]/40 text-slate-300 hover:text-[#00ffff] hover:border-[#00ffff] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff]">
            <Calculator className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-wide font-serif text-[#f4ecd8]">
              BEGUM HOUSE <span className="text-[#00d4ff]">ROI CALCULATOR</span>
            </h2>
            <p className="text-xs text-slate-300 uppercase tracking-widest">
              Central Atrium Hologram Kiosk Intelligence
            </p>
          </div>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Sliders Side */}
          <div className="space-y-6 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Operational Team Size:</span>
                <span className="text-[#00d4ff] font-mono text-sm">{teamSize} Employees</span>
              </div>
              <input
                type="range"
                min={5}
                max={250}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#00d4ff] cursor-pointer"
              />
            </div>

            {/* Slider 2: Average Annual Salary */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Avg. Annual Salary (£):</span>
                <span className="text-[#00d4ff] font-mono text-sm">£{avgSalary.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={120000}
                step={2500}
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full accent-[#00d4ff] cursor-pointer"
              />
            </div>

            {/* Slider 3: Target Process Automation */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-slate-300">Target Process Automation:</span>
                <span className="text-[#00d4ff] font-mono text-sm">{automationPct}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={85}
                value={automationPct}
                onChange={(e) => setAutomationPct(Number(e.target.value))}
                className="w-full accent-[#00d4ff] cursor-pointer"
              />
            </div>
          </div>

          {/* Results Side */}
          <div className="flex flex-col justify-between bg-gradient-to-br from-[#071322] to-slate-900/90 p-6 rounded-xl border border-[#00d4ff]/30 shadow-inner">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#00d4ff] font-bold block border-b border-[#00d4ff]/20 pb-2">
                Estimated Annual Savings
              </span>

              <div className="text-3xl sm:text-4xl font-extrabold text-[#00ffff] font-mono tracking-tight">
                £{Math.round(rawSavings).toLocaleString()}
                <span className="text-xs text-slate-400 font-sans block mt-1">/ Year Net Cost Optimization</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="p-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30">
                  <span className="text-xs text-slate-400 block">Est. ROI Return</span>
                  <span className="text-xl font-bold text-[#00d4ff] font-mono">+{netRoiPercentage}%</span>
                </div>
                <div className="p-3 rounded-lg bg-[#c5a869]/10 border border-[#c5a869]/30">
                  <span className="text-xs text-slate-400 block">Payback Period</span>
                  <span className="text-xl font-bold text-[#c5a869] font-mono">&lt; 4.2 Months</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  alert("Consultation request submitted! A Begum House financial advisor will reach out shortly.");
                  setIsRoiModalOpen(false);
                }}
                className="w-full py-3 px-4 rounded font-bold uppercase tracking-wider text-xs text-[#071322] bg-[#00d4ff] hover:bg-[#66e5ff] shadow-lg shadow-[#00d4ff]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Custom ROI Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
