import React from "react";
import Link from "next/link";
import CrestLogo from "./CrestLogo";
import { Mail, Phone, MapPin, Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#040D18] text-slate-300 border-t border-[#c5a869]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <CrestLogo size="lg" />
            </Link>
            <p className="font-serif italic text-sm text-[#DFBE76] tracking-wide">
              Global Services. Intelligent Operations.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Begum House is a distinguished UK multi-disciplinary business house
              harmonizing specialist expertise, intelligent operations, and cross-border
              capital syndication for sovereign and private clients worldwide.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#DFBE76] shrink-0" />
                <span>14 Berkeley Square, Mayfair, London W1J 6BD, UK</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#DFBE76] shrink-0" />
                <span>+44 (0) 20 7946 0988</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#DFBE76] shrink-0" />
                <span>executive@begumhouse.co.uk</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4
              className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#DFBE76] mb-4"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-[#DFBE76] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Our House
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#DFBE76] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#global-opportunities" className="hover:text-[#DFBE76] transition-colors">
                  Global Opportunities
                </a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-[#DFBE76] transition-colors">
                  Sectors & Chambers
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-[#DFBE76] transition-colors">
                  House Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Divisions */}
          <div>
            <h4
              className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#DFBE76] mb-4"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              CHAMBERS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Financial Services
                </a>
              </li>
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Real Estate Estates
                </a>
              </li>
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Mental Counseling
                </a>
              </li>
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Architecture Solutions
                </a>
              </li>
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Global Opportunities
                </a>
              </li>
              <li>
                <a href="#our-house" className="hover:text-[#DFBE76] transition-colors">
                  Strategic Partnerships
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Discretion */}
          <div>
            <h4
              className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#DFBE76] mb-4"
              style={{ fontFamily: "var(--font-cinzel), serif" }}
            >
              GOVERNANCE
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              All mandates operate under strict institutional confidentiality and
              fiduciary governance.
            </p>
            <div className="p-3 rounded bg-[#071526] border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-[#DFBE76] font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>UK Registered</span>
              </div>
              <p>Companies House No. 12984102</p>
              <p>Registered Office: London, UK</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Begum House Holdings Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Mandate
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Fiduciary Standards
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
