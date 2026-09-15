"use client";

import React from "react";
import { Globe2, ShieldCheck, Landmark, Network } from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalPresenceSection() {
  const hubs = [
    {
      city: "LONDON HQ",
      role: "Central Executive House & Sovereign Wealth Advisory",
      address: "Mayfair, London W1J, United Kingdom",
      stats: "Primary Seat & Operations",
    },
    {
      city: "DUBAI (DIFC)",
      role: "Middle East & GCC Trade Corridor Hub",
      address: "Gate Precinct, DIFC, UAE",
      stats: "Bilateral Trade & Cross-Border Capital",
    },
    {
      city: "SINGAPORE",
      role: "Asia-Pacific Direct Investment & Tech Alliances",
      address: "Marina Bay Financial Centre, Singapore",
      stats: "APAC Sovereign Syndicate Desk",
    },
    {
      city: "ZÜRICH",
      role: "Private Multi-Family Office Trust & Custody",
      address: "Bahnhofstrasse, Zürich, Switzerland",
      stats: "Asset Protection & Neutral Custody",
    },
  ];

  return (
    <section id="global-opportunities" className="py-24 bg-[#050D18] border-t border-b border-[#c5a869]/20 relative overflow-hidden">
      {/* World Map Grid Watermark */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#dfbe76 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left info */}
          <motion.div variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E243D] border border-[#c5a869]/30 text-xs tracking-[0.2em] font-serif text-[#DFBE76] uppercase">
              <Globe2 className="w-3.5 h-3.5" />
              <span>GLOBAL FOOTPRINT</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-serif text-white tracking-wide leading-snug"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              UK HERITAGE. <br />
              GLOBAL EXECUTION.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Begum House acts as an enduring bridge between the financial,
              legal, and institutional rigor of the United Kingdom and high-growth
              sovereign corridors across Europe, the Middle East, and Asia.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                <div className="text-3xl font-serif font-bold text-[#DFBE76]">
                  £4.2B+
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Collective Client Assets
                </div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#DFBE76]">
                  18+
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Sovereign Corridors
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hubs Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hubs.map((hub, idx) => (
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
                key={idx}
                className="bg-[#0B1C31]/70 border border-slate-800 hover:border-[#c5a869]/50 rounded-lg p-5 transition-all duration-200 hover:bg-[#0E243D]/90 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-sm font-serif font-bold tracking-wider text-[#DFBE76]"
                    style={{ fontFamily: "var(--font-cinzel), serif" }}
                  >
                    {hub.city}
                  </span>
                  <Landmark className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-xs font-semibold text-white mb-1">
                  {hub.role}
                </div>
                <div className="text-[11px] text-slate-400 mb-3">
                  {hub.address}
                </div>
                <div className="inline-block text-[10px] uppercase font-mono tracking-wider text-slate-300 bg-[#071526] px-2 py-0.5 rounded border border-slate-700">
                  {hub.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
