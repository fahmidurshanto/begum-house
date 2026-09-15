"use client";

import React, { useState } from "react";
import { X, CheckCircle, Send, Building, Shield } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDivision?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  preselectedDivision = "",
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    division: preselectedDivision || "Financial Services",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#071526] border border-[#c5a869]/50 rounded-xl shadow-2xl overflow-hidden z-10">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#c5a869] via-[#dfbe76] to-[#c5a869]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-serif tracking-[0.2em] text-[#c5a869] uppercase mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Executive Inquiries</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-serif text-white tracking-wide mb-2"
                style={{ fontFamily: "var(--font-cinzel), serif" }}
              >
                TALK TO BEGUM HOUSE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Connect with our Senior Partners and Sector Heads in London. All communications are strictly confidential.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Alexander Sinclair"
                    className="w-full px-3.5 py-2.5 bg-[#0B1C31] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-[#DFBE76] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                      Direct Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@domain.com"
                      className="w-full px-3.5 py-2.5 bg-[#0B1C31] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-[#DFBE76] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                      Organization / Entity
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Family Office / Enterprise"
                      className="w-full px-3.5 py-2.5 bg-[#0B1C31] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-[#DFBE76] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Department of Interest
                  </label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0B1C31] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-[#DFBE76] transition-colors"
                  >
                    <option value="Financial Services">Financial Services</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Mental Counseling">Mental Counseling</option>
                    <option value="Architecture Solutions">Architecture Solutions</option>
                    <option value="Global Opportunities">Global Opportunities</option>
                    <option value="Partner With Us">Strategic Partnership</option>
                    <option value="General Executive Office">General Executive Office</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Nature of Mandate
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly outline your objectives or transaction scope..."
                    className="w-full px-3.5 py-2.5 bg-[#0B1C31] border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-[#DFBE76] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded bg-gradient-to-r from-[#DFBE76] to-[#C5A869] text-[#071526] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a869]/20 flex items-center justify-center text-[#DFBE76]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif text-white">Inquiry Received</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you, <span className="text-[#DFBE76] font-semibold">{formData.name || "Client"}</span>. Our Managing Director for {formData.division} will review your message under non-disclosure terms and reach out promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2 border border-[#c5a869] text-[#DFBE76] rounded text-xs uppercase tracking-wider hover:bg-[#c5a869]/10 transition-colors"
              >
                Return to Begum House
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
