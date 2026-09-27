import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FOUNDER_INFO } from "@/lib/constants";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SITE_FACTS, currentYear } from "@/lib/siteFacts";
import { SITE_IMAGES } from "@/lib/images";
import { PersonPlaceholder } from "@/components/ui/PersonPlaceholder";
import { CompanyTimeline } from "@/components/sections/CompanyTimeline";
import { MapPin, Building2, CheckCircle2 } from "lucide-react";

// What Sets Us Apart - figures pulled from siteFacts or marked with TODO
const WHAT_SETS_US_APART = [
  {
    metric: SITE_FACTS.fleetSize,
    label: "Heavy Equipment Units",
    title: "100% Owned Fleet",
    desc: "We own and operate our excavators, haulers, and track equipment directly, avoiding third-party rental delays."
  },
  {
    // TODO: OWNER TO VERIFY - 14 facilities figure
    metric: SITE_FACTS.commissionedFacilities,
    label: "Industrial Facilities",
    title: "EPC Engineering",
    desc: "Our teams assemble turnkey processing plants, crushing stations, and electrical control centers in-house."
  },
  {
    metric: SITE_FACTS.railTrackKm,
    label: "Corridors Maintained",
    title: "Heavy-Haul Rail Competency",
    desc: "We rehabilitate and operate specialized 32-tonne axle-load railway tracks to move extraction volume to coastal ports."
  },
  {
    metric: SITE_FACTS.ltifrRate,
    label: "LTIFR Safety Rating",
    title: "Safety Governance",
    desc: "Operational sites follow ISO 45001 standards with regular supervisor briefings and safety audits."
  },
  {
    // TODO: OWNER TO VERIFY - 35,000 m² Bamako rebuild workshop footprint
    metric: "35,000",
    suffix: "m²",
    label: "Rebuild Workshops",
    title: "Regional Machine Rebuild Bases",
    desc: `Powertrain overhaul workshops in Bamako support operations and maintain fleet availability at ${SITE_FACTS.fleetAvailability}.`
  },
  {
    // TODO: OWNER TO VERIFY - Ministries and ports partnership claim
    metric: String(SITE_FACTS.countries),
    label: "Active Jurisdictions",
    title: "Pan-African Relationships",
    desc: `We maintain working relationships with national resource ministries, port authorities, and local communities established over ${SITE_FACTS.yearsInBusinessLower}.`
  }
];

// How We Work - Actual engineering project execution
const PROCESS_STEPS = [
  {
    step: "01",
    name: "ASSESS",
    desc: "Geological validation, site survey, and deposit feasibility scoping."
  },
  {
    step: "02",
    name: "MOBILISE",
    desc: "Fleet deployment, logistics planning, and local workforce onboarding."
  },
  {
    step: "03",
    name: "EXECUTE",
    desc: "Round-the-clock extraction, civil construction, or plant commissioning."
  },
  {
    step: "04",
    name: "DELIVER",
    desc: "Tonnage targets met, site restoration, and handover documentation."
  }
];

// TODO: OWNER TO VERIFY - Timeline milestones and historical dates
export default function CompanyPage() {
  return (
    <div className="w-full pt-[72px]">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[460px] flex items-end overflow-hidden bg-coal-dark">
        {/* // TODO: REPLACE WITH REAL FIZA PHOTO */}
        <Image
          src="/images/capabilities/mining-services.jpg"
          alt="Aerial view of large-scale open-pit mining operations and mineral excavation benches"
          fill
          priority
          sizes="100vw"
          className="img-cover object-center"
        />
        <div className="dark-overlay-heavy" />
        <div className="relative z-10 max-w-content mx-auto w-full px-6 md:px-12 pb-16">
          <span className="text-label text-dust-tan font-sans uppercase tracking-wide block mb-3 font-semibold">
            Company Profile & History
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-iron-white leading-[0.95]">
            Fiza Engineering Corporation.
          </h1>
          <p className="text-body-lg text-dust-tan max-w-2xl mt-4 font-normal leading-relaxed">
            An integrated mining, rail and heavy engineering company founded in 1994 and headquartered in Dubai, with operations across Africa.
          </p>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="w-full py-20 md:py-28 bg-iron-white border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-oxide-red inline-block" />
                <span className="text-label text-earth-black font-sans uppercase tracking-wide font-semibold">
                  Who We Are
                </span>
              </div>
              <h2 className="text-display-lg font-medium text-earth-black leading-[0.98] mb-8">
                Heavy industrial operations across key African corridors.
              </h2>
              {/* Reduced to two short paragraphs, max 90 words total (currently 51 words) */}
              <div className="space-y-5 text-quarry-grey text-body-lg leading-relaxed max-w-editorial">
                <p>
                  Established in {SITE_FACTS.foundedYear} by Muhammed Farooghuddin, Fiza Engineering Corporation develops industrial infrastructure, operates extraction concessions, and manages direct commodity supply chains across Africa.
                </p>
                <p>
                  Our field operations include active open-pit mining in Mali and the Democratic Republic of Congo, heavy freight railway rehabilitation in Madagascar, and physical mineral trading to international industrial markets.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] border border-slab-grey lg:-mr-8 overflow-hidden bg-slab-grey/40">
              {/* // TODO: REPLACE WITH REAL FIZA PHOTO */}
              <Image
                src={SITE_IMAGES.company.fieldOps.src}
                alt="Engineers reviewing site plans"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="img-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-earth-black text-iron-white px-3 py-1 font-sans text-[10px] uppercase tracking-wide font-medium">
                Engineers reviewing site plans
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operating Principles */}
      <section className="w-full bg-iron-white border-t border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="mb-14">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Foundational Tenets
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Operating Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slab-grey pt-10">
            {/* Principle 1 */}
            <div className="p-8 bg-[#EBE8E0] border border-slab-grey flex flex-col justify-between">
              <div>
                <h3 className="text-heading-2 font-medium text-earth-black mb-3">
                  Direct control of equipment
                </h3>
                <p className="text-quarry-grey text-body-sm leading-relaxed">
                  We own, maintain, and dispatch our heavy machinery fleet directly. On-site technical workshops and mobile field mechanics handle repairs immediately, keeping operations on schedule.
                </p>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="p-8 bg-[#EBE8E0] border border-slab-grey flex flex-col justify-between">
              <div>
                <h3 className="text-heading-2 font-medium text-earth-black mb-3">
                  Local employment and training
                </h3>
                {/* // TODO: OWNER TO VERIFY - Over 90% domestic workforce claim */}
                <p className="text-quarry-grey text-body-sm leading-relaxed">
                  We invest in local workforce capacity. Over 90% of our on-site personnel and technical teams are recruited and trained within the countries where we operate.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="p-8 bg-[#EBE8E0] border border-slab-grey flex flex-col justify-between">
              <div>
                <h3 className="text-heading-2 font-medium text-earth-black mb-3">
                  Measured, reported results
                </h3>
                <p className="text-quarry-grey text-body-sm leading-relaxed">
                  We track operational progress through verified metric tonnes extracted, kilometers of track ballasted, and machine operating hours logged without lost-time safety incidents.
                </p>
              </div>
            </div>

            {/* Principle 4 */}
            <div className="p-8 bg-[#EBE8E0] border border-slab-grey flex flex-col justify-between">
              <div>
                <h3 className="text-heading-2 font-medium text-earth-black mb-3">
                  Site restoration
                </h3>
                <p className="text-quarry-grey text-body-sm leading-relaxed">
                  We integrate concurrent backfilling, topsoil preservation, and engineered drainage into our active pit extraction plans to stabilize land contours and protect local watersheds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What Sets Us Apart */}
      <section className="w-full bg-[#E5E2D9] py-20 md:py-28 border-t border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Operational Scale
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHAT_SETS_US_APART.map((item, idx) => (
              <div key={idx} className="bg-iron-white p-8 border border-slab-grey flex flex-col justify-between">
                <div>
                  <div className="flex flex-col mb-4 pb-3 border-b border-slab-grey">
                    <div className="flex items-baseline leading-none whitespace-nowrap mb-2">
                      <span className="text-display-lg font-medium text-earth-black leading-none">
                        {item.metric}
                      </span>
                      {item.suffix && (
                        <span className="text-xl sm:text-2xl font-medium text-earth-black ml-1">
                          {item.suffix}
                        </span>
                      )}
                    </div>
                    <span className="font-sans text-[10px] text-quarry-grey uppercase tracking-wide block font-medium">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-heading-3 font-medium text-earth-black mb-3 min-h-[3.6rem] flex items-start">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-quarry-grey leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How We Work */}
      <section className="w-full py-20 md:py-28 bg-iron-white border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Operating Methodology
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="border-t-2 border-earth-black pt-6">
                <span className="font-sans text-2xl font-bold text-oxide-red block mb-3">
                  {step.step}
                </span>
                <h3 className="text-heading-3 font-medium text-earth-black mb-2">
                  {step.name}
                </h3>
                <p className="text-body-sm text-quarry-grey leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <CompanyTimeline />

      {/* 7. Leadership Section (Muhammed Farooghuddin ONLY) */}
      <section id="leadership" className="w-full bg-iron-white py-20 md:py-28 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Executive Governance
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Corporate Leadership
            </h2>
          </div>

          <div className="max-w-3xl border border-slab-grey bg-[#EAE7DF] p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Neutral placeholder portrait labelled [Photo to be supplied] */}
              <div className="md:col-span-4 max-w-[220px]">
                <PersonPlaceholder
                  name={FOUNDER_INFO.name}
                  title={FOUNDER_INFO.title}
                  className="w-full aspect-square"
                />
              </div>

              {/* Founder Profile & Quote */}
              <div className="md:col-span-8">
                <h3 className="text-heading-2 font-medium text-earth-black mb-1">
                  {FOUNDER_INFO.name}
                </h3>
                <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-4 font-semibold">
                  {FOUNDER_INFO.title}
                </span>

                <p className="text-body text-earth-black/85 leading-relaxed mb-6 font-normal">
                  {FOUNDER_INFO.bio}
                </p>

                <blockquote className="border-l-2 border-oxide-red pl-4 py-1 bg-iron-white/70 p-3 border border-slab-grey/30">
                  <p className="font-heading text-sm sm:text-base italic text-earth-black leading-snug">
                    &ldquo;{FOUNDER_INFO.quote}&rdquo;
                  </p>
                  <cite className="block text-[11px] font-sans text-quarry-grey uppercase tracking-wide mt-2 not-italic font-medium">
                    — {FOUNDER_INFO.name}, {FOUNDER_INFO.title}
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Global Presence */}
      <section id="global" className="w-full bg-[#E5E2D9] py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-oxide-red inline-block" />
              <span className="text-label text-earth-black font-sans uppercase tracking-wide font-semibold">
                Operating Footprint
              </span>
            </div>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Global Presence & Offices
            </h2>
            <p className="text-body-lg text-quarry-grey max-w-2xl mt-4 leading-relaxed font-normal">
              Direct headquarters and regional operations depots coordinating active mining extraction, heavy fleet mobilization, and freight rail logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SITE_FACTS.offices.map((office, idx) => (
              <div
                key={idx}
                className="bg-iron-white border border-slab-grey p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 active:border-earth-black lg:hover:-translate-y-1 lg:hover:shadow-md lg:hover:border-earth-black"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slab-grey">
                    <span className="font-sans text-xs font-bold uppercase tracking-wide text-oxide-red">
                      {office.country}
                    </span>
                    <span className="font-sans text-[10px] sm:text-[11px] text-quarry-grey uppercase tracking-wide font-medium">
                      Operational Hub
                    </span>
                  </div>

                  <h3 className="text-heading-3 sm:text-heading-2 font-medium text-earth-black mb-2 flex items-center gap-2">
                    <Building2 size={18} className="text-oxide-red shrink-0 sm:w-5 sm:h-5" />
                    <span>{office.city}</span>
                  </h3>

                  <p className="text-body-sm text-earth-black font-medium mb-4">
                    {office.type}
                  </p>

                  <div className="space-y-2 text-xs font-sans text-quarry-grey border-t border-slab-grey/40 pt-4 font-medium">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-oxide-red mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-slab-grey flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <span className="font-sans text-[11px] text-earth-black font-medium break-all sm:break-normal">
                    {office.email}
                  </span>
                  <Link
                    href="/contact"
                    className="text-label font-sans font-bold text-oxide-red uppercase tracking-wide hover:underline active:text-earth-black"
                  >
                    Office Details →
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
