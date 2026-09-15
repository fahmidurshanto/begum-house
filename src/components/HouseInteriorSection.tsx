import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { DIVISIONS, Division } from "@/data/divisions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Calculator,
  Building2,
  Globe,
  TrendingUp,
  HeartHandshake,
  Stethoscope,
  X,
  Users,
  Compass,
  DoorOpen,
  Monitor,
  ChevronRight
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic imports for 3D WebGL elements to prevent SSR issues
const Atrium3DGlobe = dynamic(() => import("./Atrium3DGlobe"), { ssr: false });
const AtmosphericDust = dynamic(() => import("./AtmosphericDust"), { ssr: false });

interface HouseInteriorSectionProps {
  onSelectDivision: (division: Division) => void;
  onOpenConsultation: (preselectedDivision?: string) => void;
  onReturnToFacade?: () => void;
}

function GlassSignPlaqueCTA({
  title,
  icon: Icon,
  isActive = false,
}: {
  title: string;
  icon: any;
  isActive?: boolean;
}) {
  return (
    <div
      className={`bg-[#071526]/45 hover:bg-[#071526]/65 border-2 ${
        isActive
          ? "bg-[#071526]/75 border-[#DFBE76] shadow-[0_0_35px_rgba(223,190,118,0.9)] scale-105"
          : "border-[#DFBE76]/60 hover:border-[#DFBE76]"
      } rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 backdrop-blur-md min-w-[170px] sm:min-w-[210px] shadow-2xl group-hover:border-[#DFBE76]`}
    >
      <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-[#DFBE76] mb-2 filter drop-shadow-[0_0_8px_rgba(223,190,118,0.8)]" />
      <h3
        className="text-[11px] sm:text-xs font-serif font-bold text-white tracking-widest leading-snug uppercase max-w-[190px]"
        style={{ fontFamily: "var(--font-cinzel), var(--font-playfair), Georgia, serif" }}
      >
        {title}
      </h3>
    </div>
  );
}

export default function HouseInteriorSection({
  onSelectDivision,
  onOpenConsultation,
  onReturnToFacade,
}: HouseInteriorSectionProps) {
  const [showRoiModal, setShowRoiModal] = useState(false);
  const [roiCapital, setRoiCapital] = useState(500000);
  const [roiTermYears, setRoiTermYears] = useState(5);

  const [isZooming, setIsZooming] = useState(false);
  const [activeHoverHotspot, setActiveHoverHotspot] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const lobbyContainerRef = useRef<HTMLDivElement>(null);
  const goldFlashRef = useRef<HTMLDivElement>(null);
  const darkFadeRef = useRef<HTMLDivElement>(null);

  const calculatedYield = Math.round(roiCapital * (1 + 0.125 * roiTermYears));

  const getServiceByTitle = (titlePartial: string) => {
    return DIVISIONS.find((d) => d.title.toLowerCase().includes(titlePartial.toLowerCase())) || DIVISIONS[0];
  };

  const canvasRef = useRef<HTMLDivElement>(null);

  // Track Mouse Pointer Position for First-Person 3D Camera Perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZooming || !canvasRef.current || !lobbyContainerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

    // Dynamic 3D perspective origin to follow first-person eye target
    canvasRef.current.style.perspectiveOrigin = `${xPct.toFixed(1)}% ${yPct.toFixed(1)}%`;
    lobbyContainerRef.current.style.transformOrigin = `${xPct.toFixed(1)}% ${yPct.toFixed(1)}%`;

    // Subtle first-person head yaw and pitch tilt
    const yaw = (xPct - 50) * 0.05;
    const pitch = (50 - yPct) * 0.04;
    gsap.to(lobbyContainerRef.current, {
      rotateY: yaw,
      rotateX: pitch,
      duration: 0.5,
      ease: "power1.out",
    });
  };

  // Setup GSAP ScrollTrigger for First-Person (FPV) 3D Camera Walkthrough Zoom
  useEffect(() => {
    if (!sectionRef.current || !lobbyContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1400",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(lobbyContainerRef.current, {
        scale: 1.65,
        z: 550,
        rotateX: 2.5,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle Hotspot Click with GSAP Zoom Transition
  const handleHotspotClick = (
    originPercent: string,
    action: () => void
  ) => {
    if (isZooming) return;
    setIsZooming(true);

    if (lobbyContainerRef.current) {
      lobbyContainerRef.current.style.transformOrigin = originPercent;
      gsap.to(lobbyContainerRef.current, {
        scale: 4.8,
        z: 900,
        filter: "brightness(1.7) blur(1.5px)",
        duration: 1.3,
        ease: "power2.inOut",
      });
    }

    if (goldFlashRef.current) {
      gsap.to(goldFlashRef.current, { opacity: 1, duration: 0.4, delay: 0.5 });
    }

    if (darkFadeRef.current) {
      gsap.to(darkFadeRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 0.7,
        onComplete: () => {
          action();
          setIsZooming(false);
          if (lobbyContainerRef.current) {
            gsap.to(lobbyContainerRef.current, { scale: 1, z: 0, filter: "brightness(1) blur(0px)", duration: 0.5 });
          }
          if (goldFlashRef.current) gsap.to(goldFlashRef.current, { opacity: 0, duration: 0.3 });
          if (darkFadeRef.current) gsap.to(darkFadeRef.current, { opacity: 0, duration: 0.3 });
        },
      });
    }
  };

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-[#071526] text-white flex flex-col justify-between overflow-x-hidden select-none font-sans">
      <main
        id="lobby-canvas"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-[1920px] mx-auto min-h-[900px] flex flex-col justify-between items-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%", transformStyle: "preserve-3d" }}
      >
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
          <AtmosphericDust />
        </div>

        <div
          ref={lobbyContainerRef}
          className="relative w-full h-[850px] md:h-[1050px] overflow-hidden transform-gpu will-change-transform"
          style={{ transformOrigin: "50% 50%", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          {/* Base Lobby Visual Reference Image with top navbar crop/scale */}
          <div className="relative w-full h-[108%] -top-[6%] overflow-hidden">
            <img
              src="/home_page_ui_reference.jpg"
              alt="Begum House Grand Atrium Lobby"
              className="w-full h-full object-cover object-center transform-gpu scale-105 origin-bottom"
            />
          </div>

          {/* Top Dark Glass Gradient Overlay (covers any lingering top navbar baked in image) */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#071526] via-[#071526]/85 to-transparent z-20 pointer-events-none" />

          {/* Ambient Shader Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071526]/80 via-transparent to-[#071526]/40 pointer-events-none" />

          {/* 
            =========================================================
            INTERACTIVE ROOM / BOOTH / DOORWAY HOTSPOTS WITH GLASS PLAQUE CTAS
            =========================================================
          */}

          {/* 1. FOREGROUND LEFT: SHARED SERVICES POD */}
          <div
            onClick={() =>
              handleHotspotClick("18% 65%", () =>
                onSelectDivision(getServiceByTitle("Shared Services"))
              )
            }
            onMouseEnter={() => setActiveHoverHotspot("shared-services")}
            onMouseLeave={() => setActiveHoverHotspot(null)}
            className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center transition-all duration-300"
            style={{
              left: "4%",
              top: "46%",
              width: "28%",
              height: "36%",
            }}
            title="Click to Enter Shared Services Pod"
          >
            <GlassSignPlaqueCTA
              title="SHARED SERVICES & GLOBAL DELIVERY"
              icon={Users}
              isActive={activeHoverHotspot === "shared-services"}
            />
          </div>

          {/* 2. FOREGROUND RIGHT: ARCHITECTURE & DESIGN STUDIO */}
          <div
            onClick={() =>
              handleHotspotClick("82% 67%", () =>
                onSelectDivision(getServiceByTitle("Architecture"))
              )
            }
            onMouseEnter={() => setActiveHoverHotspot("architecture")}
            onMouseLeave={() => setActiveHoverHotspot(null)}
            className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center transition-all duration-300"
            style={{
              right: "4%",
              top: "48%",
              width: "28%",
              height: "36%",
            }}
            title="Click to Enter Architecture Studio"
          >
            <GlassSignPlaqueCTA
              title="ARCHITECTURE & DESIGN"
              icon={Compass}
              isActive={activeHoverHotspot === "architecture"}
            />
          </div>

          {/* 3. MIDGROUND LEFT: FINANCE OPERATIONS */}
          <div
            onClick={() =>
              handleHotspotClick("26% 47%", () =>
                onSelectDivision(getServiceByTitle("Finance Operations"))
              )
            }
            onMouseEnter={() => setActiveHoverHotspot("finance")}
            onMouseLeave={() => setActiveHoverHotspot(null)}
            className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center transition-all duration-300"
            style={{
              left: "16%",
              top: "35%",
              width: "20%",
              height: "22%",
            }}
            title="Click to Enter Finance Operations"
          >
            <GlassSignPlaqueCTA
              title="FINANCE OPERATIONS & TRANSFORMATION"
              icon={TrendingUp}
              isActive={activeHoverHotspot === "finance"}
            />
          </div>

          {/* 4. MIDGROUND RIGHT: INTERNATIONAL & THERAPY (MENTAL HEALTH) */}
          <div
            onClick={() =>
              handleHotspotClick("74% 47%", () =>
                onSelectDivision(getServiceByTitle("Mental Health"))
              )
            }
            onMouseEnter={() => setActiveHoverHotspot("therapy")}
            onMouseLeave={() => setActiveHoverHotspot(null)}
            className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center transition-all duration-300"
            style={{
              right: "16%",
              top: "35%",
              width: "20%",
              height: "22%",
            }}
            title="Click to Enter Counseling Suite"
          >
            <GlassSignPlaqueCTA
              title="MENTAL HEALTH & COUNSELLING"
              icon={HeartHandshake}
              isActive={activeHoverHotspot === "therapy"}
            />
          </div>

          {/* 5. CENTER STAGE: INSIGHTS ROI CALCULATOR PEDESTAL */}
          <div
            onClick={() => handleHotspotClick("50% 61%", () => setShowRoiModal(true))}
            onMouseEnter={() => setActiveHoverHotspot("roi")}
            onMouseLeave={() => setActiveHoverHotspot(null)}
            className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center transition-all duration-300"
            style={{
              left: "38%",
              top: "48%",
              width: "24%",
              height: "24%",
            }}
            title="Click to Launch 3D ROI Calculator"
          >
            <GlassSignPlaqueCTA
              title="INSIGHTS ROI CALCULATOR"
              icon={Calculator}
              isActive={activeHoverHotspot === "roi"}
            />
          </div>

          {/* 6. UPPER MEZZANINE RIGHT: INTERNATIONAL PROPERTY */}
          <div
            onClick={() =>
              handleHotspotClick("75% 27%", () =>
                onSelectDivision(getServiceByTitle("Global Opportunities"))
              )
            }
            onMouseEnter={() => setActiveHoverHotspot("property")}
            onMouseLeave={() => setActiveHoverHotspot(null)}
            className="absolute z-30 cursor-pointer group flex flex-col items-center justify-center transition-all duration-300"
            style={{
              right: "17%",
              top: "18%",
              width: "16%",
              height: "16%",
            }}
            title="Click to Enter International Property Suite"
          >
            <GlassSignPlaqueCTA
              title="INTERNATIONAL PROPERTY"
              icon={Globe}
              isActive={activeHoverHotspot === "property"}
            />
          </div>

        </div>

        {/* CINEMATIC TRANSITION OVERLAYS */}
        <div
          ref={goldFlashRef}
          className="absolute inset-0 bg-[#c5a869] z-40 pointer-events-none mix-blend-overlay opacity-0"
        />
        <div
          ref={darkFadeRef}
          className="absolute inset-0 bg-[#071526] z-50 pointer-events-none opacity-0"
        />
      </main>

      {/* Footer Bar */}
      <footer className="bg-[#040D18] border-t border-slate-800 py-4 px-4 md:px-8 text-slate-400 text-[11px]">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2024 BEGUM HOUSE. ALL RIGHTS RESERVED.</div>
          <div className="text-[#DFBE76] font-serif tracking-widest text-[10px] uppercase font-semibold">
            GLOBAL SERVICES. INTELLIGENT OPERATIONS.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => alert("Careers page active")} className="hover:text-white transition-colors">CAREERS</button>
            <span>|</span>
            <button onClick={() => alert("Legal notice")} className="hover:text-white transition-colors">LEGAL</button>
            <span>|</span>
            <button onClick={() => alert("Privacy policy")} className="hover:text-white transition-colors">PRIVACY</button>
          </div>
        </div>
      </footer>

      {/* INSIGHTS ROI CALCULATOR MODAL */}
      {showRoiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in duration-200">
          <div className="bg-[#0B1C31] border-2 border-[#DFBE76] rounded-2xl max-w-lg w-full p-6 text-white shadow-[0_0_50px_rgba(223,190,118,0.4)] relative">
              <button 
                onClick={() => setShowRoiModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#071526] border border-[#DFBE76] rounded-xl text-[#DFBE76]">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#DFBE76]">
                    BEGUM HOUSE 3D ROI CALCULATOR
                  </h3>
                  <p className="text-xs text-slate-300">
                    3D Projected Return & Operational Yield Estimator
                  </p>
                </div>
              </div>

              <div className="space-y-5 my-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Capital Deployed (£)</span>
                    <span className="text-[#DFBE76] font-mono font-bold text-sm">
                      £{roiCapital.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={100000} 
                    max={5000000} 
                    step={50000} 
                    value={roiCapital} 
                    onChange={(e) => setRoiCapital(Number(e.target.value))}
                    className="w-full accent-[#DFBE76] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Investment Horizon (Years)</span>
                    <span className="text-[#DFBE76] font-mono font-bold text-sm">
                      {roiTermYears} Years
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={10} 
                    step={1} 
                    value={roiTermYears} 
                    onChange={(e) => setRoiTermYears(Number(e.target.value))}
                    className="w-full accent-[#DFBE76] cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-[#071526] rounded-xl border border-[#DFBE76]/40 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Projected Portfolio Value
                    </div>
                    <div className="text-2xl font-bold font-mono text-[#DFBE76]">
                      £{calculatedYield.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Est. Annual Yield
                    </div>
                    <div className="text-sm font-bold text-emerald-400">
                      +12.5% p.a.
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowRoiModal(false);
                  onOpenConsultation(`ROI Mandate: £${roiCapital.toLocaleString()} for ${roiTermYears} Years`);
                }}
                className="w-full py-3.5 rounded-xl bg-[#c5a869] text-[#071526] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all"
              >
                REQUEST CUSTOM INVESTMENT MANDATE →
              </button>

            </div>
          </div>
        )}
    </div>
  );
}
