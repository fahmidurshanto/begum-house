"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DivisionModal from "@/components/DivisionModal";
import ConsultationModal from "@/components/ConsultationModal";
import { Division } from "@/data/divisions";

export default function HomePage() {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationDivision, setConsultationDivision] = useState<string>("");

  const handleOpenConsultation = (divisionTitle?: string) => {
    setConsultationDivision(divisionTitle || "General Executive Office");
    setConsultationOpen(true);
  };

  const handleInquireFromDivision = (divisionTitle: string) => {
    setSelectedDivision(null);
    setConsultationDivision(divisionTitle);
    setConsultationOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#071526] text-slate-100 flex flex-col justify-between selection:bg-[#c5a869] selection:text-[#071526]">
      {/* 1. Header / Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* 2. Hero Section with Interactive Begum House Facade and Value Ribbon */}
      <HeroSection
        onSelectDivision={(division) => setSelectedDivision(division)}
        onOpenConsultation={(divTitle) => handleOpenConsultation(divTitle)}
      />

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
