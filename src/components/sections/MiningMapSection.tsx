import React from "react";
import { AfricaMiningMap } from "@/components/maps/AfricaMiningMap";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function MiningMapSection() {
  return (
    <section className="w-full bg-iron-white">
      <SectionDivider />
      <div className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Resource Footprint
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Mining Portfolio & Extraction Hubs
            </h2>
          </div>
          <p className="text-body-sm text-quarry-grey max-w-md">
            Direct operational presence across Mali, Democratic Republic of Congo, and Madagascar with dedicated rail and barge infrastructure.
          </p>
        </div>

        <AfricaMiningMap />
      </div>
    </section>
  );
}
