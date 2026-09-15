"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HouseInteriorSection from "@/components/HouseInteriorSection";
import DivisionModal from "@/components/DivisionModal";
import ConsultationModal from "@/components/ConsultationModal";
import { Division } from "@/data/divisions";
import { gsap } from "gsap";

export default function HomePage() {
  const [isInsideHouse, setIsInsideHouse] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationDivision, setConsultationDivision] = useState<string>("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleOpenConsultation = (divisionTitle?: string) => {
    setConsultationDivision(divisionTitle || "General Executive Office");
    setConsultationOpen(true);
  };

  const handleInquireFromDivision = (divisionTitle: string) => {
    setSelectedDivision(null);
    setConsultationDivision(divisionTitle);
    setConsultationOpen(true);
  };

  const handleEnterHouse = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        onComplete: () => {
          setIsInsideHouse(true);
          gsap.to(containerRef.current, { opacity: 1, scale: 1, duration: 0.6 });
        }
      });
    } else {
      setIsInsideHouse(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#071526] text-slate-100 selection:bg-[#c5a869] selection:text-[#071526]">
      <div ref={containerRef} className="transition-all duration-300">
        {!isInsideHouse ? (
          <div className="flex flex-col justify-between min-h-screen">
            {/* 1. Header / Navigation */}
            <Navbar onOpenConsultation={() => handleOpenConsultation()} />

            {/* 2. Hero Section with Interactive Begum House Facade */}
            <HeroSection
              onSelectDivision={(division) => setSelectedDivision(division)}
              onOpenConsultation={(divTitle) => handleOpenConsultation(divTitle)}
              onEnterHouse={handleEnterHouse}
            />
          </div>
        ) : (
          <div>
            {/* Inside House Interior UI matching screenshot */}
            <HouseInteriorSection
              onSelectDivision={(division) => setSelectedDivision(division)}
              onOpenConsultation={(divTitle) => handleOpenConsultation(divTitle)}
              onReturnToFacade={() => setIsInsideHouse(false)}
            />
          </div>
        )}
      </div>

      {/* Interactive Modals */}
      <DivisionModal
        division={selectedDivision}
        onClose={() => setSelectedDivision(null)}
        onInquire={handleInquireFromDivision}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        preselectedDivision={consultationDivision}
      />
    </main>
  );
}
