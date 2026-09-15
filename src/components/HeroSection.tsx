"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DIVISIONS, Division } from "@/data/divisions";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AtmosphericDust = dynamic(() => import("./AtmosphericDust"), { ssr: false });

interface HeroSectionProps {
  onSelectDivision: (division: Division) => void;
  onOpenConsultation: (preselectedDivision?: string) => void;
}

export default function HeroSection({
  onSelectDivision,
  onOpenConsultation,
}: HeroSectionProps) {
  const [isEntering, setIsEntering] = useState(false);

  const textAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.5, ease: "easeInOut" },
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const handleDoorClick = () => {
    if (isEntering) return;
    setIsEntering(true);
    
    // 1. Wait for the zoom animation and screen blackout to finish
    setTimeout(() => {
      const section = document.getElementById("our-house");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      
      // 2. Wait for the scroll to complete, then fade the blackout away and reset state
      // so if they scroll back up, the hero looks normal again.
      setTimeout(() => {
        setIsEntering(false);
      }, 1000);
    }, 1300);
  };

  return (
    <section className="relative w-full bg-[#071526] overflow-hidden select-none min-h-[85vh] md:min-h-[700px] flex items-center justify-start max-w-[2000px] mx-auto">
      
      {/* 
        =========================================================
        WEBGL DUST (Base Layer)
        =========================================================
      */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isEntering ? 'opacity-0' : 'opacity-100'}`}>
        <AtmosphericDust />
      </div>

      {/* 
        =========================================================
        BACKGROUND & CINEMATIC CINEMA GRAPHIC
        =========================================================
      */}
      <motion.div 
        className="absolute inset-0 z-10 opacity-40 lg:opacity-100"
        initial={{ scale: 1, filter: "brightness(1) blur(0px)" }}
        animate={isEntering ? { 
          scale: 6, // Massive zoom into the door
          filter: "brightness(2) blur(2px)", // Blow out the lighting
        } : { 
          scale: 1, 
          filter: "brightness(1) blur(0px)" 
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} 
        style={{ transformOrigin: "center 70%" }} 
      >
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[65%] h-full cursor-pointer"
          onClick={handleDoorClick}
          title="Click Main Door to Enter"
        >
          <Image
            src="/clean_mansion.jpg"
            alt="Begum House Mansion"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          />

          {/* Invisible interactive door area for explicit targeting */}
          {!isEntering && (
            <div 
              onClick={(e) => { e.stopPropagation(); handleDoorClick(); }}
              className="absolute z-50 cursor-pointer"
              style={{
                left: "50%",
                top: "70%",
                transform: "translate(-50%, -50%)",
                width: "140px",
                height: "200px"
              }}
              title="Click Main Door to Enter"
            />
          )}
        </div>
      </motion.div>

      {/* Gradient Overlay removed per request */}

      {/* 
        =========================================================
        REAL HTML UI TEXT & BUTTONS (Fades out during transition)
        =========================================================
      */}
      <AnimatePresence>
        {!isEntering && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textAnimationVariants}
            className="relative z-30 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 px-6 md:px-12 lg:px-20 space-y-6 lg:ml-8 pointer-events-auto"
          >
            <motion.div variants={itemVariants} className="text-xs font-serif tracking-[0.25em] text-[#DFBE76] uppercase">
              WELCOME TO
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              BEGUM HOUSE
            </motion.h1>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wider text-[#c5a869] uppercase">
              <span className="hidden lg:inline">◆</span>
              <span>GLOBAL SERVICES. INTELLIGENT OPERATIONS.</span>
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-300 leading-relaxed max-w-lg lg:max-w-xl">
              A modern UK business house connecting specialist expertise,
              intelligent operations, global delivery and opportunities across
              borders.
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button
                type="button"
                onClick={() => onOpenConsultation()}
                className="px-6 py-3.5 rounded bg-[#c5a869] text-[#071526] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(197,168,105,0.3)] hover:brightness-110 hover:shadow-[0_0_30px_rgba(197,168,105,0.5)] transition-all duration-300"
              >
                TALK TO BEGUM HOUSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        =========================================================
        CINEMATIC TRANSITION OVERLAYS
        =========================================================
      */}
      {/* Golden flash */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isEntering ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.6 }} // Triggers halfway through the zoom
        className="absolute inset-0 bg-[#c5a869] z-40 pointer-events-none mix-blend-overlay"
      />
      {/* Dark fade to match the next section's background color */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isEntering ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }} // Completes the blackout just before scroll
        className="absolute inset-0 bg-[#071526] z-50 pointer-events-none"
      />

    </section>
  );
}
