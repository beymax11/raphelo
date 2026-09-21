import React from "react";
import { FragranceNotes as NotesType } from "@/types";

interface FragranceNotesProps {
  notes: NotesType;
}

export default function FragranceNotes({ notes }: FragranceNotesProps) {
  return (
    <div className="bg-[#E9E3D9]/40 border border-[#C8BDAF]/40 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C8BDAF]/30">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#68645E] block font-medium">
            Olfactive Architecture
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-[#1D1C1A]">
            The Olfactive Profile
          </h4>
        </div>
        <span className="text-xs font-sans text-[#68645E] italic">
          Evaporation Progression
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* TOP */}
        <div className="relative md:pr-6 md:border-r border-[#C8BDAF]/30">
          <div className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] bg-[#1D1C1A] text-[#F4F0E8] font-medium mb-3">
            Top Notes
          </div>
          <p className="text-[11px] text-[#68645E] uppercase tracking-wider mb-2 font-medium">
            Immediate Aura (0–20 min)
          </p>
          <ul className="space-y-1.5 font-serif text-lg text-[#1D1C1A]">
            {notes.top.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>

        {/* HEART */}
        <div className="relative md:px-3 md:border-r border-[#C8BDAF]/30">
          <div className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] bg-[#A8735B] text-[#F4F0E8] font-medium mb-3">
            Heart Notes
          </div>
          <p className="text-[11px] text-[#68645E] uppercase tracking-wider mb-2 font-medium">
            Core Character (20 min–4 hr)
          </p>
          <ul className="space-y-1.5 font-serif text-lg text-[#1D1C1A]">
            {notes.heart.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>

        {/* BASE */}
        <div className="relative md:pl-6">
          <div className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-[0.25em] bg-[#707462] text-[#F4F0E8] font-medium mb-3">
            Base Notes
          </div>
          <p className="text-[11px] text-[#68645E] uppercase tracking-wider mb-2 font-medium">
            Enduring Impression (4–12+ hr)
          </p>
          <ul className="space-y-1.5 font-serif text-lg text-[#1D1C1A]">
            {notes.base.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
