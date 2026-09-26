import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AfricaMiningMap } from "@/components/maps/AfricaMiningMap";
import { MINERALS } from "@/lib/constants";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Tag } from "@/components/ui/Tag";
import { SITE_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Mining Concessions & Ports | Fiza Engineering",
  description:
    "Direct extraction concessions and logistical transport corridors across Mali, the Democratic Republic of Congo, and Madagascar coastal terminals.",
  alternates: {
    canonical: "/mining",
  },
  openGraph: {
    title: "Mining Concessions & Ports | Fiza Engineering",
    description:
      "Direct extraction concessions and logistical transport corridors across Mali, the Democratic Republic of Congo, and Madagascar coastal terminals.",
    url: "https://fiza-one.vercel.app/mining",
    siteName: "Fiza Engineering Corporation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mining Concessions & Ports | Fiza Engineering",
    description:
      "Direct extraction concessions and logistical transport corridors across Mali, the Democratic Republic of Congo, and Madagascar coastal terminals.",
  },
};

export default function MiningPage() {
  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header */}
      <section className="bg-iron-white py-20 md:py-28 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-3 font-semibold">
            Open-Pit Extraction & Processing
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            Mining Portfolio
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed">
            Direct operational presence across Mali, Democratic Republic of Congo, and Madagascar. High-tonnage overburden stripping, deposit feasibility, and bulk mineral haulage.
          </p>
        </div>
      </section>

      {/* Map-Centric Operations Section */}
      <section className="w-full bg-[#EBE8E0] py-20 md:py-28 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Interactive Concession Matrix
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Continental Extraction Bases
            </h2>
          </div>

          <AfricaMiningMap />
        </div>
      </section>

      {/* Country-Specific Operational Profiles */}
      <section className="w-full bg-iron-white py-20 md:py-28 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Territorial Breakdown
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Concession Operations
            </h2>
          </div>

          <div className="space-y-16">
            {/* Mali Operational Profile */}
            <div id="mali" className="border border-slab-grey p-8 md:p-12 bg-[#EBE8E0]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-sans text-xs text-oxide-red uppercase tracking-wide font-semibold">
                      JURISDICTION 01 · WEST AFRICA
                    </span>
                    <Tag active>ACTIVE EXTRACTION</Tag>
                  </div>
                  <h3 className="text-heading-1 font-medium text-earth-black mb-4">
                    Mali Concessions & Fleet Depot
                  </h3>
                  <p className="text-body text-quarry-grey leading-relaxed mb-6">
                    Anchored by the Falea bauxite deposit and our 35,000 m² heavy machinery rebuild depot in Bamako. Over 145 heavy machines deployed across continuous overburden stripping, haul road maintenance, and river barge loading logistics along the Niger waterway.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-sans text-xs border-t border-slab-grey pt-4">
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Primary Mineral</span>
                      <span className="text-earth-black font-semibold text-sm">Bauxite DSO (Al₂O₃ 48%)</span>
                    </div>
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Active Fleet</span>
                      <span className="text-earth-black font-semibold text-sm">145 Heavy Units</span>
                    </div>
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Infrastructure</span>
                      <span className="text-earth-black font-semibold text-sm">94 km Arterial Road</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 relative aspect-[16/10] bg-slab-grey border border-slab-grey">
                  <Image
                    src={SITE_IMAGES.miningPage.mali.src}
                    alt={SITE_IMAGES.miningPage.mali.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="img-cover"
                  />
                </div>
              </div>
            </div>

            {/* DRC Operational Profile */}
            <div id="drc" className="border border-slab-grey p-8 md:p-12 bg-[#EBE8E0]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-sans text-xs text-oxide-red uppercase tracking-wide font-semibold">
                      JURISDICTION 02 · CENTRAL AFRICA
                    </span>
                    <Tag active>ACTIVE EXTRACTION</Tag>
                  </div>
                  <h3 className="text-heading-1 font-medium text-earth-black mb-4">
                    Katanga Copper-Cobalt Operations
                  </h3>
                  <p className="text-body text-quarry-grey leading-relaxed mb-6">
                    Operating inside the Kolwezi mining district with over 220 heavy pieces. We operate turnkey 1,500 TPH primary crushing stations and are constructing the 180 km Manono critical minerals access route to connect hard-rock lithium deposits to regional rail.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-sans text-xs border-t border-slab-grey pt-4">
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Key Commodities</span>
                      <span className="text-earth-black font-semibold text-sm">Grade-A Copper & Cobalt</span>
                    </div>
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Crushing Capacity</span>
                      <span className="text-earth-black font-semibold text-sm">1,500 TPH Modular Plant</span>
                    </div>
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Local Personnel</span>
                      <span className="text-earth-black font-semibold text-sm">520 Operators & Mechanics</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 relative aspect-[16/10] bg-slab-grey border border-slab-grey">
                  <Image
                    src={SITE_IMAGES.miningPage.drc.src}
                    alt={SITE_IMAGES.miningPage.drc.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="img-cover"
                  />
                </div>
              </div>
            </div>

            {/* Madagascar Operational Profile */}
            <div id="madagascar" className="border border-slab-grey p-8 md:p-12 bg-[#EBE8E0]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-sans text-xs text-oxide-red uppercase tracking-wide font-semibold">
                      JURISDICTION 03 · EAST AFRICA MARITIME
                    </span>
                    <Tag status="COMPLETED">RAIL OPERATIONAL</Tag>
                  </div>
                  <h3 className="text-heading-1 font-medium text-earth-black mb-4">
                    Toamasina Bulk Rail Corridor
                  </h3>
                  <p className="text-body text-quarry-grey leading-relaxed mb-6">
                    A completed 42-kilometer heavy-haul narrow-gauge railway modernization connecting inland mineral tailings directly to deep-water bulk export berths. Upgraded to 25-tonne axle load ratings with automated mechanized track tamping.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-sans text-xs border-t border-slab-grey pt-4">
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Track Upgraded</span>
                      <span className="text-earth-black font-semibold text-sm">42 Kilometers Heavy Rail</span>
                    </div>
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Axle Rating</span>
                      <span className="text-earth-black font-semibold text-sm">25.0 Tonnes Certified</span>
                    </div>
                    <div>
                      <span className="text-quarry-grey block uppercase text-[10px]">Rolling Stock</span>
                      <span className="text-earth-black font-semibold text-sm">620 Managed Railcars</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 relative aspect-[16/10] bg-slab-grey border border-slab-grey">
                  <Image
                    src={SITE_IMAGES.miningPage.madagascar.src}
                    alt={SITE_IMAGES.miningPage.madagascar.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="img-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mineral Commodity Specifications */}
      <section className="w-full bg-[#E5E2D9] py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
                Physical Commodities
              </span>
              <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
                Mineral Resources Traded
              </h2>
            </div>
            <Link
              href="/capabilities/mineral-trading"
              className="text-label font-semibold text-earth-black hover:text-oxide-red uppercase tracking-wide font-sans inline-flex items-center gap-2"
            >
              Commodity Trading Desk <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MINERALS.map((min) => (
              <div
                key={min.id}
                className="bg-iron-white border border-slab-grey p-8 flex flex-col justify-between font-sans"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-slab-grey">
                    <span className="text-2xl font-bold text-oxide-red font-heading">
                      {min.chemicalSymbol}
                    </span>
                    <span className="text-xs text-quarry-grey uppercase font-sans">
                      Annual: {min.annualVolume}
                    </span>
                  </div>

                  <h3 className="text-heading-3 font-medium text-earth-black mb-2">
                    {min.name}
                  </h3>

                  <div className="text-xs text-earth-black font-semibold mb-4">
                    Grade Basis: {min.grade}
                  </div>

                  <p className="text-body-sm font-sans text-quarry-grey leading-relaxed mb-6">
                    {min.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-[#EBE8E0] p-4 border border-slab-grey mb-6">
                    {min.specifications.map((spec, sIdx) => (
                      <div key={sIdx}>
                        <span className="block text-[10px] text-quarry-grey uppercase">{spec.label}</span>
                        <span className="font-semibold text-earth-black">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slab-grey flex items-center justify-between">
                  <span className="text-[11px] text-quarry-grey">
                    Hubs: {min.hubs[0]}
                  </span>
                  <Link
                    href="/contact"
                    className="text-label font-semibold text-oxide-red uppercase tracking-wide hover:underline font-sans"
                  >
                    Inquire Assay Sheet →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
