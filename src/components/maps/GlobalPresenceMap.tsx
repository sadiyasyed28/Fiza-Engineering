import React from "react";
import { SITE_FACTS } from "@/lib/siteFacts";

export function GlobalPresenceMap() {
  return (
    <div className="w-full bg-[#E8E5DD] border border-slab-grey p-8 md:p-10 relative overflow-hidden">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-1 font-semibold">
              Global Presence & Corridors
            </span>
            <h3 className="text-heading-2 font-medium text-earth-black">
              {SITE_FACTS.countries} Countries. {SITE_FACTS.continents} Continents. Direct Operational Control.
            </h3>
          </div>
          <div className="text-left md:text-right">
            <span className="text-display-lg font-medium text-earth-black leading-none block">
              {SITE_FACTS.continents}
            </span>
            <span className="text-xs font-sans uppercase text-quarry-grey tracking-wide font-medium">
              Active Continents of Operation
            </span>
          </div>
        </div>

        {/* Technical Presence Grid & Hubs: 4 Hubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slab-grey">
          <div className="bg-iron-white p-6 border border-slab-grey">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-earth-black">
                West Africa
              </span>
              <span className="w-2 h-2 bg-oxide-red inline-block" />
            </div>
            <h4 className="text-heading-4 font-medium text-earth-black mb-2">Mali & Regional Basin</h4>
            <p className="text-body-sm text-quarry-grey leading-relaxed">
              Bauxite concessions, iron ore infrastructure, and central 35,000 m² heavy machine rebuild base in Bamako.
            </p>
          </div>

          <div className="bg-iron-white p-6 border border-slab-grey">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-earth-black">
                Central & Southern Africa
              </span>
              <span className="w-2 h-2 bg-earth-black inline-block" />
            </div>
            <h4 className="text-heading-4 font-medium text-earth-black mb-2">DRC & Madagascar</h4>
            <p className="text-body-sm text-quarry-grey leading-relaxed">
              Active gold & copper mining operations, ilmenite mineral sands, and heavy-haul rail port connections.
            </p>
          </div>

          <div className="bg-iron-white p-6 border border-slab-grey">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-earth-black">
                Middle East (HQ)
              </span>
              <span className="w-2 h-2 bg-earth-black inline-block" />
            </div>
            <h4 className="text-heading-4 font-medium text-earth-black mb-2">Dubai DIFC Hub</h4>
            <p className="text-body-sm text-quarry-grey leading-relaxed">
              Corporate headquarters, concession structuring, and international physical mineral trading operations.
            </p>
          </div>

          <div className="bg-iron-white p-6 border border-slab-grey">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-earth-black">
                International Markets
              </span>
              <span className="w-2 h-2 bg-earth-black inline-block" />
            </div>
            <h4 className="text-heading-4 font-medium text-earth-black mb-2">Global Trade Corridors</h4>
            <p className="text-body-sm text-quarry-grey leading-relaxed">
              Direct off-take supply agreements with international smelting syndicates and industrial commodity consumers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
