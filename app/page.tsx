"use client";

import React, { useEffect } from "react";
import { useHouseStore } from "@/store/useHouseStore";
import { CrestHeader } from "@/components/CrestHeader";
import { ClosedHouseHero } from "@/components/ClosedHouseHero";
import { House3DScene } from "@/components/House3DScene";
import { SectorCarousel } from "@/components/SectorCarousel";
import { ROICalculatorModal } from "@/components/ROICalculatorModal";
import { ServiceRoomModal } from "@/components/ServiceRoomModal";
import { GlobalOpportunitiesModal } from "@/components/GlobalOpportunitiesModal";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { RefinedCursor } from "@/components/RefinedCursor";
import { SERVICE_ROOMS } from "@/data/houseData";
import { ArrowUpRight, ChevronRight, Layers, Cpu, Compass, HeartPulse, Briefcase, GraduationCap, TrendingUp, Calculator, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const renderBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case "Layers": return <Layers className="w-4 h-4" />;
    case "TrendingUp": return <TrendingUp className="w-4 h-4" />;
    case "Cpu": return <Cpu className="w-4 h-4" />;
    case "Compass": return <Compass className="w-4 h-4" />;
    case "HeartPulse": return <HeartPulse className="w-4 h-4" />;
    case "Briefcase": return <Briefcase className="w-4 h-4" />;
    case "GraduationCap": return <GraduationCap className="w-4 h-4" />;
    default: return <ChevronRight className="w-4 h-4" />;
  }
};

function ScrollTracker() {
  const { setScrollProgress } = useHouseStore();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setScrollProgress]);

  return null;
}

export default function HomePage() {
  const { view, scrollProgress, returnToFacade, setSelectedRoom, setIsRoiModalOpen, setIsGlobalModalOpen } = useHouseStore();

  return (
    <SmoothScrollProvider>
      <RefinedCursor />
      <main id="scroll-container" className="min-h-[400vh] bg-[#faf6f0] text-[#1a1a2e] relative font-sans selection:bg-[#c5a869] selection:text-[#1a1a2e]">
        <ScrollTracker />
        
        {/* Fixed Master Viewport Container */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Header */}
          <CrestHeader />

          {/* Continuous WebGL 3D Scene */}
          <House3DScene />

          {/* Facade Text Overlay (Visible when at Facade level) */}
          {view === "FACADE" && <ClosedHouseHero />}

          {/* Atrium Hotspots Overlay (Visible when inside Atrium) */}
          {view === "ATRIUM" && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Top Control Bar */}
              <div className="absolute top-24 left-6 z-30 flex items-center gap-4 pointer-events-auto">
                <button
                  onClick={returnToFacade}
                  className="px-4 py-2 text-xs font-extrabold uppercase tracking-widest rounded bg-[#faf6f0]/90 text-[#1a1a2e] border border-[#c5a869] hover:bg-[#c5a869] hover:text-white transition-all backdrop-blur-md shadow-lg"
                >
                  ← Return to Facade
                </button>

                <div className="flex items-center gap-2 bg-[#faf6f0]/90 px-3 py-1.5 rounded border border-[#c5a869]/40 text-xs text-[#2d3748] font-mono">
                  <span>3D Corridor Depth:</span>
                  <div className="w-24 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#c5a869] to-[#00d4ff] transition-all duration-150" style={{ width: `${Math.round(scrollProgress * 100)}%` }} />
                  </div>
                  <span className="text-[#c5a869] font-bold">{Math.round(scrollProgress * 100)}%</span>
                </div>
              </div>

              {/* 7 Room Pins */}
              {SERVICE_ROOMS.map((room) => (
                <div
                  key={room.id}
                  style={{ left: `${room.xPct}%`, top: `${room.yPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <div className="group relative">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#faf6f0]/95 border-2 border-[#c5a869] text-[#1a1a2e] hover:bg-[#c5a869] hover:text-white hover:scale-110 shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer font-bold"
                    >
                      <span className="p-1 rounded-full bg-[#c5a869]/20 text-[#c5a869] group-hover:text-white">
                        {renderBadgeIcon(room.badgeIcon)}
                      </span>
                      <span className="text-xs font-bold tracking-wide whitespace-nowrap">
                        {room.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a869] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-lg bg-[#faf6f0] border border-[#c5a869] text-[#2d3748] text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-2xl z-50">
                      <p className="font-bold text-[#c5a869] mb-1">{room.category}</p>
                      <p className="text-[11px] leading-relaxed text-[#4a5568]">{room.shortDesc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom Quick Bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 px-6 py-3 rounded-full bg-[#faf6f0]/95 border border-[#c5a869]/50 text-xs text-[#1a1a2e] font-bold backdrop-blur-md shadow-xl pointer-events-auto">
                <span className="text-[#c5a869]">ATRIUM FEATURES:</span>
                <button onClick={() => setIsRoiModalOpen(true)} className="hover:text-[#c5a869] flex items-center gap-1.5 transition-colors font-medium">
                  <Calculator className="w-3.5 h-3.5 text-[#00d4ff]" /> ROI Calculator
                </button>
                <span className="text-[#c5a869]">|</span>
                <button onClick={() => setIsGlobalModalOpen(true)} className="hover:text-[#c5a869] flex items-center gap-1.5 transition-colors font-medium">
                  <Globe className="w-3.5 h-3.5 text-[#c5a869]" /> Global Opportunities
                </button>
              </div>

              {/* 3D Sector Coverflow Carousel Section */}
              {scrollProgress > 0.7 && (
                <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto bg-[#faf6f0]">
                  <SectorCarousel />
                </div>
              )}
            </div>
          )}

          {/* Modals & Drawers */}
          <ROICalculatorModal />
          <ServiceRoomModal />
          <GlobalOpportunitiesModal />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
