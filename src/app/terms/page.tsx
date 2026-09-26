import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_FACTS } from "@/lib/siteFacts";

export const metadata: Metadata = {
  title: "Terms of Operations | Fiza Engineering",
  description: "Terms of operations, procurement tender conditions, and commercial protocols for Fiza Engineering Corporation projects.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Operations | Fiza Engineering Corporation",
    description: "Operational guidelines, procurement conditions, and site safety frameworks.",
    url: "https://fiza-one.vercel.app/terms",
    siteName: "Fiza Engineering Corporation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Operations | Fiza Engineering",
    description: "Operational guidelines and procurement protocols.",
  },
};

export default function TermsPage() {
  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header */}
      <section className="bg-iron-white py-16 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-3 font-semibold">
            Commercial Governance
          </span>
          <h1 className="text-display-lg sm:text-[3.25rem] font-medium text-earth-black leading-[0.95] mb-6">
            Terms of Operations
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-3xl leading-relaxed">
            These terms define the operating conditions, procurement standards, and contractual frameworks governing all direct engineering, concession operations, equipment supply, and commodity trading engagements.
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs font-sans text-quarry-grey">
            <span>Effective Date: January 1, {SITE_FACTS.foundedYear + SITE_FACTS.yearsInBusiness}</span>
            <span>·</span>
            <span>Document Ref: FEC-OPS-COND-04</span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="bg-[#EBE8E0] py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="bg-iron-white border border-slab-grey p-8 md:p-14 space-y-12 max-w-4xl">
            {/* Section 1 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                1. Scope of Operations & Engagements
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                Fiza Engineering Corporation undertakes multidisciplinary contracts covering overburden stripping, turnkey plant engineering, heavy-haul railway modernizations, and physical mineral trading. All engagements are executed under formal commercial EPC agreements or bilaterally ratified concessions.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Formal contractual scope definitions, project milestone verification procedures, and turnkey handover acceptance criteria.]
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                2. Tender Submissions & Procurement
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                Submissions through our digital procurement channels are evaluated on technical capability, safety accreditations, and equipment availability. Proposals submitted do not constitute a binding obligation until formalized by an authorized executive contract.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Bid bonding conditions, performance guarantee requirements, and vendor vetting protocols under international engineering standards.]
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                3. Concession & Field Site Access
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                All personnel, contractor representatives, and third-party inspectors accessing active mine pits, railway tracks, or heavy equipment depots must strictly adhere to ISO 45001 safety mandates and local statutory mining regulations.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Comprehensive liability releases, PPE compliance enforcement, and emergency site evacuation indemnity protocols.]
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                4. Equipment Specifications & Performance Ratings
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                Published equipment specifications, machine tonnages, and engine ratings represent engineered nominal standards under benchmark conditions. Exact operational throughput depends on geotechnical parameters, fuel quality, and site topography.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Technical warranty limitations, OEM equipment tolerances, and wear-part replacement liability terms.]
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                5. Governing Law & Dispute Resolution
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                Unless stipulated otherwise in a specific bilateral concession, all commercial agreements and site operations are governed under Dubai International Financial Centre (DIFC) arbitration rules or the International Chamber of Commerce (ICC), Paris.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Arbitration venue specifications, choice of law clauses, and force majeure parameters covering geopolitical and climatic disruptions.]
              </div>
            </div>

            <div className="pt-6 border-t border-slab-grey flex items-center justify-between">
              <Link href="/privacy" className="text-xs font-sans font-semibold text-oxide-red uppercase tracking-wide hover:underline">
                View Privacy Policy →
              </Link>
              <Link href="/contact" className="text-xs font-sans font-medium text-quarry-grey uppercase tracking-wide hover:text-earth-black">
                Contact Legal Operations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
