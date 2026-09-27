import React from "react";
import Link from "next/link";
import { Pickaxe, Coins, TrainTrack, ArrowRight } from "lucide-react";
import { CAPABILITIES } from "@/lib/constants";

const DIVISION_ICONS: { [key: string]: React.ReactNode } = {
  "mining-services": <Pickaxe size={24} className="text-earth-black" />,
  "mineral-trading": <Coins size={24} className="text-earth-black" />,
  "railway-solutions": <TrainTrack size={24} className="text-earth-black" />,
};

const DIVISION_BUTTON_LABELS: { [key: string]: string } = {
  "mining-services": "Explore mining services",
  "mineral-trading": "Explore mineral trading",
  "railway-solutions": "Explore railway solutions",
};

export function CapabilitiesGrid() {
  // Home page presents ONLY the 3 primary divisions
  const primaryDivisions = CAPABILITIES.slice(0, 3);

  return (
    <section className="w-full bg-[#EFECE5] py-10 sm:py-12 md:py-18 border-b border-slab-grey">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-oxide-red inline-block flex-shrink-0" />
              <span className="text-label text-earth-black font-sans uppercase tracking-wide font-semibold">
                Operational Scope
              </span>
            </div>
            <h2 className="text-display-sm sm:text-[2.75rem] font-medium text-earth-black leading-[1.05] sm:leading-[1.0]">
              Three Primary Divisions
            </h2>
          </div>
          <Link
            href="/capabilities"
            className="text-label font-bold text-earth-black hover:text-oxide-red uppercase tracking-wide inline-flex items-center gap-2 transition-colors font-sans w-full md:w-auto mt-2 md:mt-0"
          >
            See all services <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Primary Divisions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {primaryDivisions.map((division) => (
            <div
              key={division.id}
              className="bg-iron-white border border-slab-grey border-t-4 border-t-oxide-red p-6 sm:p-8 md:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-earth-black group"
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="p-3 bg-[#E8E5DD] border border-slab-grey group-hover:bg-oxide-red group-hover:text-iron-white transition-colors">
                    {DIVISION_ICONS[division.id]}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-sans text-oxide-red font-bold uppercase tracking-wide text-right ml-2">
                    Primary Division
                  </span>
                </div>

                <h3 className="text-xl sm:text-heading-2 font-medium text-earth-black mb-3 group-hover:text-oxide-red transition-colors">
                  {division.title}
                </h3>

                <p className="text-sm sm:text-body-sm text-earth-black font-medium mb-3 leading-snug">
                  {division.tagline}
                </p>

                <p className="text-sm sm:text-body-sm text-quarry-grey leading-relaxed mb-6">
                  {division.description}
                </p>

                {/* Scope Highlights */}
                <div className="pt-4 border-t border-slab-grey/60 space-y-2 mb-8">
                  {division.scope.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start sm:items-center gap-2 text-xs font-sans text-quarry-grey font-medium">
                      <span className="w-1.5 h-1.5 bg-oxide-red inline-block flex-shrink-0 mt-1 sm:mt-0" />
                      <span className="leading-snug sm:leading-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distinct Action Button */}
              <div className="pt-5 border-t border-slab-grey">
                <Link
                  href={`/capabilities/${division.slug}`}
                  className="w-full bg-[#EAE7DF] border border-slab-grey hover:bg-earth-black hover:text-iron-white hover:border-earth-black transition-colors font-sans text-[11px] sm:text-xs uppercase tracking-wide font-semibold py-3 sm:py-3.5 px-4 flex items-center justify-between text-earth-black group-hover:bg-oxide-red group-hover:text-iron-white group-hover:border-oxide-red whitespace-normal sm:whitespace-nowrap"
                >
                  <span>{DIVISION_BUTTON_LABELS[division.id] || "View division details"}</span>
                  <ArrowRight size={14} className="flex-shrink-0 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
