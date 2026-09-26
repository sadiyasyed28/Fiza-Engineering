import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_FACTS } from "@/lib/siteFacts";

export const metadata: Metadata = {
  title: "Privacy Policy | Fiza Engineering",
  description: "Official Privacy Policy and data protection standards for Fiza Engineering Corporation operations and digital platforms.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Fiza Engineering Corporation",
    description: "Data protection and operational confidentiality standards.",
    url: "https://fiza-one.vercel.app/privacy",
    siteName: "Fiza Engineering Corporation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Fiza Engineering",
    description: "Data protection and operational confidentiality standards.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header */}
      <section className="bg-iron-white py-16 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-3 font-semibold">
            Governance & Compliance
          </span>
          <h1 className="text-display-lg sm:text-[3.25rem] font-medium text-earth-black leading-[0.95] mb-6">
            Privacy Policy
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-3xl leading-relaxed">
            Fiza Engineering Corporation is committed to maintaining strict confidentiality, data security, and transparent privacy practices across our international engineering, mineral logistics, and procurement portals.
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs font-sans text-quarry-grey">
            <span>Effective Date: January 1, {SITE_FACTS.foundedYear + SITE_FACTS.yearsInBusiness}</span>
            <span>·</span>
            <span>Document Ref: FEC-POL-PRIV-01</span>
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
                1. Information We Collect
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                In the course of executing engineering contracts, project procurement tenders, and institutional communications, we collect corporate contact details, technical specifications, and procurement documentation directly submitted through our portals.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Comprehensive enumeration of data categories including technical log files, IP telemetry, tender credential submissions, and institutional verification records.]
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                2. Operational Use of Information
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                Information provided is utilized strictly for evaluating project feasibility, responding to procurement and equipment inquiries, coordinating logistics corridors, and fulfilling statutory compliance across operational jurisdictions.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Specific legal bases for data processing under UAE DIFC Data Protection Law, GDPR reciprocal agreements, and regional African telecommunications regulations.]
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                3. Industrial Security & Non-Disclosure
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                All geological assay reports, commercial concession models, and proprietary equipment specifications are treated as confidential trade secrets protected by enterprise-grade cryptographic standards and operational non-disclosure protocols.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Technical encryption standards, SOC 2 compliance frameworks, and physical server redundancy architecture.]
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                4. Data Retention & Third-Party Disclosure
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                We do not sell, license, or monetize partner information. Data is shared exclusively with certified logistical operators, customs authorities, and financial institutions as required to execute authorized transactions.
              </p>
              <div className="p-4 bg-[#F5F3ED] border border-dashed border-slab-grey text-quarry-grey text-sm font-sans">
                [LEGAL TEXT TO BE SUPPLIED: Retention schedules, archival timelines, and international cross-border data transfer safe harbors.]
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-heading-2 font-medium text-earth-black mb-4 pb-2 border-b border-slab-grey">
                5. Compliance Inquiries & Contact
              </h2>
              <p className="text-body text-quarry-grey leading-relaxed mb-4">
                For inquiries concerning corporate privacy standards, data access requests, or regulatory filings, contact our corporate legal and compliance desk:
              </p>
              <div className="font-sans text-xs text-earth-black bg-iron-white p-4 border border-slab-grey space-y-1.5">
                <span className="block font-semibold">Corporate Compliance Officer</span>
                <span className="block text-quarry-grey">Fiza Engineering Corporation</span>
                <span className="block text-quarry-grey">{SITE_FACTS.contact.hqAddress}</span>
                <span className="block text-oxide-red font-medium">Email: {SITE_FACTS.contact.primaryEmail}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slab-grey flex items-center justify-between">
              <Link href="/terms" className="text-xs font-sans font-semibold text-oxide-red uppercase tracking-wide hover:underline">
                View Terms of Operations →
              </Link>
              <Link href="/contact" className="text-xs font-sans font-medium text-quarry-grey uppercase tracking-wide hover:text-earth-black">
                Contact Legal Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
