"use client";

import React from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { X, CheckCircle2, ArrowRight, Shield, Award } from "lucide-react";

export const ServiceRoomModal: React.FC = () => {
  const { selectedRoom, view, setSelectedRoom, setIsRoiModalOpen } = useHouseStore();

  if (!selectedRoom || view === "ROOM") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#071322] border border-[#c5a869]/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c5a869] via-[#f4ecd8] to-[#c5a869]" />

        {/* Close Button */}
        <button
          onClick={() => setSelectedRoom(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-[#c5a869]/40 text-slate-300 hover:text-[#c5a869] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#c5a869]/20 text-[#c5a869] text-xs uppercase font-bold tracking-widest">
            {selectedRoom.category} Division
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#f4ecd8]">
            {selectedRoom.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedRoom.fullDesc}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          {selectedRoom.keyMetrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <span className="text-lg sm:text-xl font-bold font-mono text-[#c5a869] block">
                {metric.value}
              </span>
              <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Included Capabilities */}
        <div className="mb-8">
          <h4 className="text-xs uppercase tracking-widest text-[#c5a869] font-bold mb-3">
            Core Service Offerings
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedRoom.services.map((srv, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#c5a869] shrink-0" />
                <span>{srv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              setSelectedRoom(null);
              setIsRoiModalOpen(true);
            }}
            className="text-xs text-[#00d4ff] hover:underline font-semibold"
          >
            Calculate ROI for this Division →
          </button>

          <button
            onClick={() => {
              alert(`Consultation booked for ${selectedRoom.title}!`);
              setSelectedRoom(null);
            }}
            className="px-6 py-3 rounded bg-gradient-to-r from-[#c5a869] to-[#d8be82] text-[#071322] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#c5a869]/20 transition-all flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
