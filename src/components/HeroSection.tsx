"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { DIVISIONS, Division } from "@/data/divisions";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const AtmosphericDust = dynamic(() => import("./AtmosphericDust"), { ssr: false });

interface HeroSectionProps {
  onSelectDivision: (division: Division) => void;
  onOpenConsultation: (preselectedDivision?: string) => void;
  onEnterHouse?: () => void;
}

export default function HeroSection({
  onSelectDivision,
  onOpenConsultation,
  onEnterHouse,
}: HeroSectionProps) {
  const [isEntering, setIsEntering] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const goldFlashRef = useRef<HTMLDivElement>(null);
  const darkFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, []);

  const handleDoorClick = () => {
    if (isEntering) return;
    setIsEntering(true);

    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, { opacity: 0, x: -30, duration: 0.5 });
    }

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 6,
        filter: "brightness(2) blur(2px)",
        duration: 1.5,
        ease: "power2.inOut",
      });
    }

    if (goldFlashRef.current) {
      gsap.to(goldFlashRef.current, { opacity: 1, duration: 0.4, delay: 0.6 });
    }

    if (darkFadeRef.current) {
      gsap.to(darkFadeRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 0.8,
        onComplete: () => {
          if (onEnterHouse) onEnterHouse();
          setIsEntering(false);
        },
      });
    }
  };

  return (
    <section className="relative w-full bg-[#071526] overflow-hidden select-none min-h-[85vh] md:min-h-[700px] flex items-center justify-start max-w-[2000px] mx-auto">
      {/* WEBGL DUST */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isEntering ? 'opacity-0' : 'opacity-100'}`}>
        <AtmosphericDust />
      </div>

      {/* BACKGROUND GRAPHIC */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 opacity-40 lg:opacity-100"
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
      </div>

      {/* REAL HTML UI TEXT & BUTTONS */}
      {!isEntering && (
        <div
          ref={textContainerRef}
          className="relative z-30 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 px-6 md:px-12 lg:px-20 space-y-6 lg:ml-8 pointer-events-auto"
        >
          <div className="text-xs font-serif tracking-[0.25em] text-[#DFBE76] uppercase">
            WELCOME TO
          </div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            BEGUM HOUSE
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wider text-[#c5a869] uppercase">
            <span className="hidden lg:inline">◆</span>
            <span>GLOBAL SERVICES. INTELLIGENT OPERATIONS.</span>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-lg lg:max-w-xl">
            A modern UK business house connecting specialist expertise,
            intelligent operations, global delivery and opportunities across
            borders.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button
              type="button"
              onClick={() => onOpenConsultation()}
              className="px-6 py-3.5 rounded bg-[#c5a869] text-[#071526] text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(197,168,105,0.3)] hover:brightness-110 hover:shadow-[0_0_30px_rgba(197,168,105,0.5)] transition-all duration-300"
            >
              TALK TO BEGUM HOUSE
            </button>
          </div>
        </div>
      )}

      {/* CINEMATIC TRANSITION OVERLAYS */}
      <div
        ref={goldFlashRef}
        className="absolute inset-0 bg-[#c5a869] z-40 pointer-events-none mix-blend-overlay opacity-0"
      />
      <div
        ref={darkFadeRef}
        className="absolute inset-0 bg-[#071526] z-50 pointer-events-none opacity-0"
      />
    </section>
  );
}
