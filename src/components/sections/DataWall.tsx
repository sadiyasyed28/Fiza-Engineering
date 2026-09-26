import React from "react";
import { COMPANY_STATS } from "@/lib/constants";

export function DataWall() {
  return (
    <section className="w-full bg-coal-dark text-iron-white py-20 md:py-24 dark-section border-t border-b border-slab-grey/20">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Pattern B: The Data Wall Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Stats Grid (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
              {COMPANY_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="border-t border-slab-grey/20 pt-6 flex flex-col justify-between"
                >
                  <div className="mb-2">
                    <span className="font-sans text-display-lg md:text-[3.25rem] font-semibold leading-none block tracking-tight text-iron-white">
                      <span className={stat.highlight ? "text-oxide-red" : "text-iron-white"}>
                        {stat.value}
                      </span>
                    </span>
                  </div>
                  <span className="text-body-sm text-dust-tan font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Contextual Paragraph (4 Columns) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slab-grey/20 pt-8 lg:pt-0 lg:pl-10">
            <span className="text-label text-dust-tan font-sans uppercase tracking-wide block mb-3 font-semibold">
              Operational model
            </span>
            <h3 className="text-heading-2 font-medium text-iron-white mb-4">
              Vertically integrated operations.
            </h3>
            <p className="text-quarry-grey text-body-sm leading-relaxed">
              We own 100% of our fleet machinery, operate our own logistics corridors, and manage extraction concessions directly through end-to-end operational control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
