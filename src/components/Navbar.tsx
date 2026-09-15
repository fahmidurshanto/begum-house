"use client";

import React, { useState } from "react";
import Link from "next/link";
import CrestLogo from "./CrestLogo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("HOME");

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "OUR HOUSE", href: "#our-house" },
    { label: "SERVICES", href: "#services" },
    { label: "GLOBAL OPPORTUNITIES", href: "#global-opportunities" },
    { label: "SECTORS", href: "#sectors" },
    { label: "INSIGHTS", href: "#insights" },
    { label: "PARTNER WITH US", href: "#partner-with-us" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#071526]/95 backdrop-blur-md border-b border-[#c5a869]/20 transition-all duration-300 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Crest & Brand Name */}
        <Link href="/" className="group flex items-center">
          <CrestLogo size="md" />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
          {navLinks.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setActiveItem(item.label);
                  if (item.label === "PARTNER WITH US" && onOpenConsultation) {
                    e.preventDefault();
                    onOpenConsultation();
                  }
                }}
                className={`relative py-2 text-xs 2xl:text-[13px] font-medium tracking-[0.14em] transition-colors duration-200 uppercase ${
                  isActive
                    ? "text-[#DFBE76] font-semibold"
                    : "text-slate-300 hover:text-[#FFF2D6]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DFBE76] via-[#F5E4BE] to-[#DFBE76] rounded-full shadow-[0_1px_6px_rgba(223,190,118,0.6)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Slogan & Divider */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="h-8 w-[1px] bg-[#c5a869]/30" />
          <div className="text-right leading-tight">
            <p className="font-serif italic text-xs 2xl:text-sm text-slate-200 tracking-wide">
              Global Services.
            </p>
            <p className="font-serif italic text-xs 2xl:text-sm text-slate-400 tracking-wide">
              Intelligent Operations.
            </p>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-[#DFBE76] hover:bg-slate-800/60 focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071526]/98 border-b border-[#c5a869]/30 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="pb-3 border-b border-slate-800">
            <p className="font-serif italic text-sm text-[#DFBE76]">
              Global Services. Intelligent Operations.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setActiveItem(item.label);
                  setMobileMenuOpen(false);
                  if (item.label === "PARTNER WITH US" && onOpenConsultation) {
                    e.preventDefault();
                    onOpenConsultation();
                  }
                }}
                className={`px-3 py-2 text-sm tracking-wider uppercase rounded-md transition-colors ${
                  activeItem === item.label
                    ? "bg-[#c5a869]/15 text-[#DFBE76] font-semibold border-l-2 border-[#DFBE76]"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#c5a869] to-[#dfbe76] text-[#071526] font-semibold text-xs tracking-widest uppercase hover:brightness-110 transition-all shadow-md"
            >
              Talk to Begum House
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
