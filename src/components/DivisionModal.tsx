"use client";

import React from "react";
import { Division } from "@/data/divisions";
import { X, ArrowRight, ShieldCheck, Mail, Building, TrendingUp, Home, HeartHandshake, Compass, Globe, Handshake } from "lucide-react";

interface DivisionModalProps {
  division: Division | null;
  onClose: () => void;
  onInquire: (divisionName: string) => void;
}

export default function DivisionModal({
  division,
  onClose,
  onInquire,
}: DivisionModalProps) {
  if (!division) return null;

  const renderIcon = (name: string) => {
    const props = { className: "w-8 h-8 text-[#DFBE76]" };
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
        return <Building {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#071526] border border-[#c5a869]/50 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10">
        {/* Top Gold Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#c5a869] via-[#dfbe76] to-[#c5a869]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-lg bg-[#0E243D] border border-[#c5a869]/40 shadow-inner">
              {renderIcon(division.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-serif tracking-[0.2em] text-[#c5a869] uppercase">
                <span>BEGUM HOUSE DIVISION</span>
                <span>•</span>
                <span>{division.floor === "upper" ? "Level 2 Chambers" : "Ground Level Suite"}</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-serif text-white tracking-wide mt-1"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                {division.title}
              </h3>
              <p className="text-sm font-serif italic text-slate-300 mt-1">
                {division.tagline}
              </p>
            </div>
          </div>

          {/* Body Description */}
          <div className="bg-[#0B1C31]/80 rounded-lg p-5 border border-slate-800">
            <p className="text-sm text-slate-200 leading-relaxed">
              {division.description}
            </p>
          </div>

          {/* Highlights & Capabilities */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#DFBE76] mb-3">
              Key Capabilities & Operations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {division.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-300 bg-[#0A1B2E] p-2.5 rounded border border-slate-800/80"
                >
                  <ShieldCheck className="w-4 h-4 text-[#c5a869] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#c5a869]/20">
            {division.keyStats.map((stat, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#DFBE76]">
                  {stat.value}
                </span>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-[#c5a869]" />
              <span>{division.leadContact}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onInquire(division.title);
                }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#071526] bg-gradient-to-r from-[#DFBE76] to-[#C5A869] hover:brightness-110 rounded transition-all shadow-md"
              >
                <span>Engage Division</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
