import React, { Suspense } from "react";
import Image from "next/image";
import { SITE_FACTS } from "@/lib/siteFacts";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  const offices = SITE_FACTS.offices;
  const hqOffice = offices.find((o) => o.city === "Dubai") || offices[0];
  const regionalOffices = offices.filter((o) => o.city !== "Dubai");

  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header with Integrated Industrial Imagery */}
      <section className="relative bg-iron-white py-16 md:py-24 border-b border-slab-grey overflow-hidden">
        {/* Background Industrial Image Integration */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/capabilities/turnkey-plants.jpg"
            alt="Fiza Engineering turnkey processing plants, EPC engineering, and industrial facilities"
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
          {/* Editorial Gradient Blend: Guarantees 100% Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-iron-white via-iron-white/65 sm:via-iron-white/40 to-iron-white/5 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-iron-white/55 via-transparent to-iron-white/15" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-mono uppercase tracking-[0.2em] block mb-3">
            Inquiries & Operational Procurement
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            Contact us
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed">
            Reach our project engineering teams across Africa and our international headquarters in Dubai.
          </p>
        </div>
      </section>

      {/* Split Layout: Contact Info Left, Form Right */}
      <section className="w-full bg-[#EBE8E0] py-16 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Hub Locations (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              {/* Corporate Headquarters */}
              <div id="hq" className="scroll-mt-28">
                <span className="text-label text-oxide-red font-mono uppercase tracking-widest block mb-2">
                  Headquarters
                </span>
                <h2 className="text-heading-2 font-medium text-earth-black mb-4">
                  Corporate Headquarters
                </h2>

                <div className="bg-iron-white border border-slab-grey p-6 font-mono">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-sans text-heading-3 font-medium text-earth-black">
                      {hqOffice.city}
                    </h3>
                    <span className="text-xs text-oxide-red font-bold uppercase">
                      {hqOffice.country}
                    </span>
                  </div>

                  <span className="text-[11px] text-quarry-grey block mb-3 uppercase">
                    {hqOffice.type}
                  </span>

                  <div className="text-xs space-y-2 text-earth-black pt-3 border-t border-slab-grey">
                    {/* TODO: OWNER TO VERIFY: DIFC Gate Precinct, Building 4, Level 7, Dubai */}
                    <p className="font-sans text-quarry-grey leading-relaxed">
                      {hqOffice.address}
                    </p>

                    {hqOffice.mapUrl && (
                      <p>
                        <a
                          href={hqOffice.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-mono text-oxide-red hover:underline min-h-[32px] py-1"
                        >
                          View on Google Maps ↗
                        </a>
                      </p>
                    )}

                    {/* TODO: OWNER TO VERIFY: +971 4 362 8800 */}
                    <p className="font-semibold pt-1">
                      Tel:{" "}
                      <a
                        href={`tel:${hqOffice.phone}`}
                        className="hover:text-oxide-red underline decoration-dotted min-h-[44px] py-1 inline-block"
                      >
                        {hqOffice.phone}
                      </a>
                    </p>

                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${hqOffice.email}`}
                        className="text-oxide-red hover:underline min-h-[44px] py-1 inline-block"
                      >
                        {hqOffice.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Regional Operations Hubs */}
              <div id="offices" className="scroll-mt-28 space-y-6">
                <div>
                  <span className="text-label text-oxide-red font-mono uppercase tracking-widest block mb-2">
                    Regional Network
                  </span>
                  <h2 className="text-heading-2 font-medium text-earth-black">
                    Regional Operations Hubs
                  </h2>
                </div>

                <div className="space-y-6">
                  {regionalOffices.map((office) => (
                    <div
                      key={office.city}
                      className="bg-iron-white border border-slab-grey p-6 font-mono"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-sans text-heading-3 font-medium text-earth-black">
                          {office.city}
                        </h3>
                        <span className="text-xs text-oxide-red font-bold uppercase">
                          {office.country}
                        </span>
                      </div>

                      <span className="text-[11px] text-quarry-grey block mb-3 uppercase">
                        {office.type}
                      </span>

                      <div className="text-xs space-y-2 text-earth-black pt-3 border-t border-slab-grey">
                        {/* TODO: OWNER TO VERIFY: office address */}
                        <p className="font-sans text-quarry-grey leading-relaxed">
                          {office.address}
                        </p>

                        {office.mapUrl && (
                          <p>
                            <a
                              href={office.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs font-mono text-oxide-red hover:underline min-h-[32px] py-1"
                            >
                              View on Google Maps ↗
                            </a>
                          </p>
                        )}

                        {/* TODO: OWNER TO VERIFY: office phone number */}
                        <p className="font-semibold pt-1">
                          Tel:{" "}
                          <a
                            href={`tel:${office.phone}`}
                            className="hover:text-oxide-red underline decoration-dotted min-h-[44px] py-1 inline-block"
                          >
                            {office.phone}
                          </a>
                        </p>

                        <p>
                          Email:{" "}
                          <a
                            href={`mailto:${office.email}`}
                            className="text-oxide-red hover:underline min-h-[44px] py-1 inline-block"
                          >
                            {office.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Operational Inquiry Form (7 Columns) */}
            <div id="form" className="scroll-mt-28 lg:col-span-7">
              <div className="bg-iron-white border border-slab-grey p-8 md:p-12">
                <span className="text-label text-oxide-red font-mono uppercase tracking-widest block mb-2">
                  Direct Intake
                </span>
                <h2 className="text-heading-1 font-medium text-earth-black mb-8">
                  Send an inquiry
                </h2>

                <Suspense
                  fallback={
                    <div className="font-mono text-xs text-quarry-grey py-12">
                      Loading inquiry form...
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
