import React from "react";
import { Handshake } from "lucide-react";

export function PartnersMention() {
  return (
    <section className="w-full bg-iron-white py-10 md:py-12 border-b border-slab-grey">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#EBE8DF] border border-slab-grey">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-oxide-red inline-block flex-shrink-0" />
            <p className="text-body-sm text-earth-black font-medium leading-relaxed">
              Strategic partnerships with <strong className="font-semibold text-earth-black">AELMET (USA)</strong> and <strong className="font-semibold text-earth-black">Eliixir Traintech (India)</strong> for railway modernization and rolling stock solutions.
            </p>
          </div>
          <span className="text-[11px] font-sans text-quarry-grey uppercase tracking-wide font-medium whitespace-nowrap pl-5 sm:pl-0 border-l sm:border-l-0 border-slab-grey">
            Global Technical Alliances
          </span>
        </div>
      </div>
    </section>
  );
}
