"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";

interface ConcessionPin {
  id: string;
  country: string;
  name: string;
  resources: string[];
  equipment: string;
  throughput: string;
  x: number; // percentage coordinate
  y: number; // percentage coordinate
  description: string;
}

const CONCESSIONS: ConcessionPin[] = [
  {
    id: "mali",
    country: "Mali",
    name: "Falea Bauxite & Iron Corridor",
    resources: ["Bauxite DSO", "Hematite Iron Ore", "Gold Tailings"],
    equipment: "145 Heavy Units Deployed",
    throughput: "8.5 MTPA Nominal",
    x: 28,
    y: 38,
    description: "Multi-year open-pit concession in southwestern Mali backed by a 94km heavy-haul arterial access road and river barge terminal."
  },
  {
    id: "drc",
    country: "Democratic Republic of Congo",
    name: "Katanga Copper-Cobalt Hub",
    resources: ["Grade-A Copper Cathode", "Cobalt Hydroxide", "Copper Blister Ingots"],
    equipment: "220 Heavy Units Deployed",
    throughput: "1,500 TPH Modular Crushing",
    x: 58,
    y: 58,
    description: "Central African extraction operations including 1,500 TPH primary crushing stations, overburden removal, and rail loop connection."
  },
  {
    id: "madagascar",
    country: "Madagascar",
    name: "Toamasina Bulk Rail Corridor",
    resources: ["Nickel-Cobalt Tailings", "Chromite Concentrate"],
    equipment: "620 Rolling Stock Units",
    throughput: "25-Tonne Axle Load Certified",
    x: 84,
    y: 66,
    description: "Specialized heavy-haul narrow-gauge rail corridor linking inland mineral tailings directly to deep-water ocean vessel berths."
  }
];

export function AfricaMiningMap() {
  const [activePin, setActivePin] = useState<ConcessionPin>(CONCESSIONS[0]);

  return (
    <div className="w-full bg-iron-white border border-slab-grey p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Map Graphic Container */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] md:min-h-[460px] bg-[#E8E5DD] p-4 border border-slab-grey">
          {/* Grid Overlay for Industrial Technical Aesthetic */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1A1A18 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* SVG Map of Africa (Engineered Silhouette) */}
          <svg
            viewBox="0 0 500 520"
            className="w-full max-w-[420px] h-auto drop-shadow-sm select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Continental Africa Outline */}
            <path
              d="M 120 80 
                 C 160 50, 260 40, 310 60 
                 C 370 70, 440 90, 430 150 
                 C 420 180, 410 200, 370 230 
                 C 340 250, 350 280, 360 320 
                 C 370 380, 350 420, 300 480 
                 C 260 510, 230 490, 220 440 
                 C 210 390, 190 350, 170 320 
                 C 140 290, 130 250, 120 230 
                 C 110 210, 70 190, 60 160 
                 C 50 120, 90 90, 120 80 Z"
              fill="#D8D4CA"
              stroke="#6B6B63"
              strokeWidth="2"
            />
            {/* Madagascar Island */}
            <path
              d="M 400 340 
                 C 420 330, 430 380, 415 440 
                 C 405 470, 395 460, 390 420 
                 C 385 380, 390 350, 400 340 Z"
              fill="#D8D4CA"
              stroke="#6B6B63"
              strokeWidth="2"
            />

            {/* Regional Outlines/Borders (Stylized Industrial) */}
            <path
              d="M 100 130 L 160 160 L 150 220 L 80 200 Z"
              fill={activePin.id === "mali" ? "rgba(179, 61, 38, 0.25)" : "rgba(26, 26, 24, 0.06)"}
              stroke={activePin.id === "mali" ? "#B33D26" : "#A6A298"}
              strokeWidth={activePin.id === "mali" ? "2" : "1"}
            />
            <path
              d="M 230 240 L 320 250 L 330 340 L 250 350 L 220 290 Z"
              fill={activePin.id === "drc" ? "rgba(179, 61, 38, 0.25)" : "rgba(26, 26, 24, 0.06)"}
              stroke={activePin.id === "drc" ? "#B33D26" : "#A6A298"}
              strokeWidth={activePin.id === "drc" ? "2" : "1"}
            />
          </svg>

          {/* Location Markers */}
          {CONCESSIONS.map((item) => {
            const isSelected = activePin.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePin(item)}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                aria-label={`Select concession in ${item.country}`}
              >
                <div className="relative flex items-center justify-center">
                  {/* Square marker (Zero border-radius) */}
                  <div
                    className={cn(
                      "w-5 h-5 flex items-center justify-center font-sans text-[10px] font-bold transition-all duration-200",
                      isSelected
                        ? "bg-oxide-red text-iron-white ring-4 ring-oxide-red/30 scale-110"
                        : "bg-earth-black text-iron-white hover:bg-oxide-red"
                    )}
                  >
                    ●
                  </div>
                  {/* Location label */}
                  <span
                    className={cn(
                      "absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 pointer-events-none transition-all",
                      isSelected
                        ? "bg-earth-black text-iron-white"
                        : "bg-iron-white/90 text-earth-black border border-slab-grey"
                    )}
                  >
                    {item.country}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-3 right-3 font-sans text-[10px] text-quarry-grey uppercase tracking-wide bg-iron-white/80 px-2 py-1 border border-slab-grey font-medium">
            FIG. 04 — CONTINENTAL EXTRACTION HUBS
          </div>
        </div>

        {/* Selected Hub Technical Data Callout */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-label text-oxide-red font-sans uppercase tracking-wide font-semibold">
                Active Operations Hub
              </span>
              <span className="text-xs font-sans text-quarry-grey font-medium">
                {activePin.country.toUpperCase()}
              </span>
            </div>

            <h3 className="text-heading-2 font-medium text-earth-black leading-tight mb-4">
              {activePin.name}
            </h3>

            <p className="text-body-sm text-quarry-grey mb-6 leading-relaxed">
              {activePin.description}
            </p>

            {/* Mineral Commodity Tags */}
            <div className="mb-6">
              <span className="block text-label text-earth-black mb-2 uppercase font-sans font-semibold">
                Key Minerals Extracted:
              </span>
              <div className="flex flex-wrap gap-2">
                {activePin.resources.map((res) => (
                  <Tag key={res} active>
                    {res}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Industrial Specs Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slab-grey font-sans text-xs mb-6">
              <div>
                <span className="block text-quarry-grey uppercase text-[11px] mb-1">
                  Fleet Allocated
                </span>
                <span className="font-semibold text-earth-black text-sm">
                  {activePin.equipment}
                </span>
              </div>
              <div>
                <span className="block text-quarry-grey uppercase text-[11px] mb-1">
                  Volume / Capacity
                </span>
                <span className="font-semibold text-earth-black text-sm">
                  {activePin.throughput}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-quarry-grey font-sans">
              Click pins to inspect concessions
            </span>
            <a
              href="/mining"
              className="text-label font-semibold text-oxide-red hover:underline uppercase tracking-wide font-sans"
            >
              Full Concession Data →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
