"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HouseInteriorSection from "@/components/HouseInteriorSection";
import DivisionModal from "@/components/DivisionModal";
import ConsultationModal from "@/components/ConsultationModal";
import { Division } from "@/data/divisions";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [isInsideHouse, setIsInsideHouse] = useState(false);
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
    <main className="min-h-screen bg-[#071526] text-slate-100 selection:bg-[#c5a869] selection:text-[#071526]">
      <AnimatePresence mode="wait">
        {!isInsideHouse ? (
          <motion.div 
            key="facade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between min-h-screen"
          >
            {/* 1. Header / Navigation */}
            <Navbar onOpenConsultation={() => handleOpenConsultation()} />

            {/* 2. Hero Section with Interactive Begum House Facade */}
            <HeroSection
              onSelectDivision={(division) => setSelectedDivision(division)}
              onOpenConsultation={(divTitle) => handleOpenConsultation(divTitle)}
              onEnterHouse={() => setIsInsideHouse(true)}
            />
          </motion.div>
        ) : (
          <motion.div 
            key="interior"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Inside House Interior UI matching screenshot */}
            <HouseInteriorSection
              onSelectDivision={(division) => setSelectedDivision(division)}
              onOpenConsultation={(divTitle) => handleOpenConsultation(divTitle)}
              onReturnToFacade={() => setIsInsideHouse(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
