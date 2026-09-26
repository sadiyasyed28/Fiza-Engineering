import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CAPABILITIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Fiza Engineering",
  description:
    "Comprehensive engineering, mining, rail, civil infrastructure, turnkey plants, agriculture, and industrial power services across Africa.",
  alternates: {
    canonical: "/capabilities",
  },
  openGraph: {
    title: "Services | Fiza Engineering",
    description:
      "Comprehensive engineering, mining, rail, civil infrastructure, turnkey plants, agriculture, and industrial power services across Africa.",
    url: "https://fiza-one.vercel.app/capabilities",
    siteName: "Fiza Engineering Corporation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Fiza Engineering",
    description:
      "Comprehensive engineering, mining, rail, civil infrastructure, turnkey plants, agriculture, and industrial power services across Africa.",
  },
};

export default function CapabilitiesPage() {
  const top3 = CAPABILITIES.slice(0, 3);
  const other5 = CAPABILITIES.slice(3);

  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header with Breadcrumb & Integrated Industrial Imagery */}
      <section className="relative bg-iron-white py-16 md:py-24 border-b border-slab-grey overflow-hidden">
        {/* Background Industrial Image Integration */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/capabilities/heavy-infrastructure.jpg"
            alt="Fiza Engineering heavy civil works, industrial infrastructure, and arterial transport corridor operations"
            fill
            priority
            sizes="100vw"
            className="img-cover object-center lg:object-right opacity-75 lg:opacity-90 mix-blend-multiply"
          />
          {/* Subtle Industrial Mesh Texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(26, 26, 24, 0.25) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Editorial Gradient Blend: Guarantees 100% Text Readability while revealing real machinery */}
          <div className="absolute inset-0 bg-gradient-to-r from-iron-white via-iron-white/65 sm:via-iron-white/40 to-iron-white/5 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-iron-white/55 via-transparent to-iron-white/15" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="text-label text-oxide-red font-sans uppercase tracking-wide mb-4 flex items-center gap-2 font-semibold">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-quarry-grey">/</span>
            <span className="text-earth-black font-semibold">Services</span>
          </nav>

          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            Services
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed font-normal">
            Eight integrated operational divisions providing mining extraction, freight rail logistics, heavy civil works, industrial plants, and utility power across Africa.
          </p>
        </div>
      </section>

      {/* Sticky Jump-Link Navigation Bar (hidden on mobile if it overflows) */}
      <nav
        aria-label="Services Navigation"
        className="sticky top-[72px] z-20 bg-earth-black text-iron-white border-b border-slab-grey/25 hidden md:block shadow-sm"
      >
        <div className="max-w-content mx-auto px-6 md:px-12 flex items-center gap-6 py-3.5 text-xs font-sans uppercase tracking-wide overflow-x-auto services-scrollbar">
          <span className="text-oxide-red font-semibold shrink-0">Jump To:</span>
          {CAPABILITIES.map((cap) => (
            <a
              key={cap.id}
              href={`#${cap.slug}`}
              className="text-dust-tan/85 hover:text-iron-white transition-colors whitespace-nowrap"
            >
              {cap.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Top 3 Featured Services (Large Feature Blocks) */}
      <section className="w-full bg-[#F4F2EC] py-20 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12 space-y-20">
          <div>
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Primary Sectors
            </span>
            <h2 className="text-display-md md:text-display-lg font-medium text-earth-black leading-[0.98]">
              Core Operations
            </h2>
          </div>

          <div className="space-y-16">
            {top3.map((cap, idx) => (
              <div
                key={cap.id}
                id={cap.slug}
                className="scroll-mt-36 bg-iron-white border border-slab-grey p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-sm"
              >
                {/* Visual Half */}
                <div className={`lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden bg-slab-grey ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="img-cover"
                  />
                  <div className="absolute inset-0 bg-earth-black/25 pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-earth-black text-iron-white font-sans text-[11px] uppercase tracking-wide px-3 py-1 z-10 font-semibold">
                    SERVICE 0{idx + 1}
                  </div>
                </div>

                {/* Content Half */}
                <div className={`lg:col-span-6 flex flex-col justify-between ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    {/* Big Stat Callout */}
                    <div className="mb-6 pb-6 border-b border-slab-grey">
                      <div className="flex items-baseline gap-3">
                        <span className="font-sans text-4xl sm:text-5xl font-semibold text-oxide-red leading-none">
                          {cap.bigStat.value}
                        </span>
                        <span className="font-sans text-xs uppercase tracking-wide text-quarry-grey font-medium">
                          {cap.bigStat.label}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-display-sm sm:text-heading-1 font-medium text-earth-black mb-3">
                      {cap.title}
                    </h3>

                    <p className="text-body text-quarry-grey leading-relaxed mb-6 font-normal">
                      {cap.description}
                    </p>

                    <div className="mb-8">
                      <span className="text-label text-earth-black font-sans uppercase tracking-wide block mb-3 font-semibold">
                        Operational Scope:
                      </span>
                      <ul className="space-y-2 font-sans text-xs text-earth-black/85">
                        {cap.scope.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 bg-oxide-red inline-block mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slab-grey">
                    <Link
                      href={`/capabilities/${cap.slug}`}
                      className="btn-primary !bg-oxide-red hover:!bg-earth-black text-iron-white text-xs py-3.5 px-6 font-sans uppercase tracking-wide font-semibold inline-flex items-center gap-2 transition-colors"
                    >
                      View service <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={`/contact?type=${cap.slug}`}
                      className="btn-secondary !border-earth-black !text-earth-black hover:!bg-earth-black hover:!text-iron-white text-xs py-3.5 px-6 font-sans uppercase tracking-wide font-semibold transition-colors"
                    >
                      Enquire about this service
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remaining 5 Services (Compact Grid of Cards) */}
      <section className="w-full bg-[#EBE8E0] py-20 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="mb-14">
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              Specialized Divisions
            </span>
            <h2 className="text-display-md md:text-display-lg font-medium text-earth-black leading-[0.98]">
              Industrial & Infrastructure Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {other5.map((cap, idx) => (
              <div
                key={cap.id}
                id={cap.slug}
                className="scroll-mt-36 bg-iron-white border border-slab-grey p-6 flex flex-col justify-between hover:border-earth-black transition-colors shadow-sm"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden mb-5 bg-slab-grey">
                    <Image
                      src={cap.image}
                      alt={cap.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="img-cover"
                    />
                    <div className="absolute inset-0 bg-earth-black/25 pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-earth-black text-iron-white font-sans text-[10px] uppercase tracking-wide px-2 py-0.5 z-10 font-semibold">
                      SERVICE 0{idx + 4}
                    </div>
                  </div>

                  {/* Big Stat Callout */}
                  <div className="mb-4 pb-3 border-b border-slab-grey">
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-2xl font-semibold text-oxide-red leading-none">
                        {cap.bigStat.value}
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-wide text-quarry-grey font-medium">
                        {cap.bigStat.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-heading-2 font-medium text-earth-black mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-body-sm text-quarry-grey mb-5 leading-relaxed font-normal">
                    {cap.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-[11px] text-earth-black font-sans uppercase tracking-wide block mb-2 font-semibold">
                      Key Scope:
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-earth-black/85">
                      {cap.scope.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-oxide-red inline-block mt-1 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-slab-grey flex items-center justify-between">
                  <Link
                    href={`/capabilities/${cap.slug}`}
                    className="text-label font-bold text-oxide-red hover:underline uppercase tracking-wide font-sans inline-flex items-center gap-1"
                  >
                    View service <ArrowRight size={13} />
                  </Link>
                  <Link
                    href={`/contact?type=${cap.slug}`}
                    className="text-[11px] font-sans uppercase tracking-wide text-quarry-grey hover:text-earth-black transition-colors font-medium"
                  >
                    Enquire →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="w-full bg-coal-dark py-20 text-iron-white">
        <div className="max-w-content mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-label text-dust-tan font-sans uppercase tracking-wide block mb-2 font-semibold">
              Commercial Tenders & Projects
            </span>
            <h2 className="text-display-md font-medium text-iron-white">
              Tell us about your project
            </h2>
            <p className="text-body text-dust-tan max-w-xl mt-3 font-normal leading-relaxed">
              Connect directly with our engineering project managers and commercial teams. We evaluate concession feasibility, equipment fleet requirements, and logistical corridors.
            </p>
          </div>
          <Link
            href="/contact?type=mining-services"
            className="btn-primary !bg-oxide-red hover:!bg-iron-white hover:!text-earth-black text-iron-white text-xs py-4 px-8 font-sans uppercase tracking-wide font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-2"
          >
            Tell us about your project <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
