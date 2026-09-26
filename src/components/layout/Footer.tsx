import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_FACTS } from "@/lib/siteFacts";

export function Footer() {
  return (
    <footer className="bg-coal-dark text-iron-white pt-20 pb-12 border-t border-slab-grey/20">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Tier 1: Brand & Executive Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14">
          <div className="lg:col-span-6 flex flex-col justify-start">
            <Link href="/" className="inline-flex flex-col group w-fit select-none">
              <div className="flex items-center gap-2">
                <span className="font-heading text-3xl font-semibold tracking-tight uppercase text-iron-white">
                  FIZA
                </span>
                <span className="w-2.5 h-2.5 rounded-none bg-oxide-red inline-block" />
              </div>
              <span className="font-sans text-xs tracking-wide uppercase text-dust-tan mt-1 font-semibold">
                Engineering Corporation
              </span>
            </Link>
            <p className="mt-5 text-quarry-grey max-w-md text-body-sm leading-relaxed">
              Multidisciplinary heavy engineering, open-pit mining operations, turnkey plant EPC, and heavy-haul railway logistics connecting resource deposits to international markets.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="bg-earth-black text-dust-tan font-sans text-[11px] uppercase tracking-wide px-2.5 py-1 border border-slab-grey/20 font-medium">
                Established {SITE_FACTS.foundedYear}
              </span>
              <span className="text-quarry-grey text-xs font-sans">
                {SITE_FACTS.yearsInBusinessExcellence}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slab-grey/20 lg:pl-10 pt-8 lg:pt-0">
            <div>
              <span className="text-label text-dust-tan uppercase tracking-wide block mb-2 font-sans font-semibold">
                Global Footprint & Regional Hubs
              </span>
              <p className="text-body-sm text-iron-white font-medium mb-4">
                {SITE_FACTS.footprintRegions}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-dust-tan pt-2 border-t border-slab-grey/15">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-oxide-red shrink-0" />
                  <a href={`mailto:${SITE_FACTS.contact.primaryEmail}`} className="hover:text-iron-white transition-colors truncate">
                    {SITE_FACTS.contact.primaryEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-oxide-red shrink-0" />
                  {/* TODO: OWNER TO VERIFY: +971 4 362 8800 */}
                  <span className="text-quarry-grey">
                    {SITE_FACTS.contact.primaryPhone}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin size={14} className="text-oxide-red shrink-0" />
                  <a
                    href={SITE_FACTS.contact.hqMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-iron-white transition-colors"
                  >
                    DIFC, Dubai (HQ) · Bamako · Kinshasa · Sandton
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="btn-primary !bg-oxide-red hover:!bg-iron-white hover:!text-earth-black text-xs py-3 px-6 shadow-sm inline-block"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-[1px] bg-slab-grey/20 w-full mb-12" />

        {/* Tier 2: 6-Column Navigation Grid Matching Simplified Navbar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 pb-16">
          {/* Column 1: Company */}
          <div className="flex flex-col space-y-3">
            <span className="text-label font-sans text-dust-tan tracking-wide uppercase font-semibold">
              Company
            </span>
            <Link href="/company" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              About Fiza
            </Link>
            <Link href="/company#leadership" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Founder & Leadership
            </Link>
            <Link href="/company#timeline" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              {SITE_FACTS.yearsInBusinessStory}
            </Link>
            <Link href="/company#global" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Global Presence
            </Link>
          </div>

          {/* Column 2: Services / Capabilities */}
          <div className="flex flex-col space-y-3">
            <span className="text-label font-sans text-dust-tan tracking-wide uppercase font-semibold">
              Services
            </span>
            <Link href="/capabilities/mining-services" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Mining Services
            </Link>
            <Link href="/capabilities/mineral-trading" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Mineral Trading
            </Link>
            <Link href="/capabilities/railway-solutions" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Railway Solutions
            </Link>
            <Link href="/capabilities/turnkey-plants" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Turnkey Plants
            </Link>
            <Link href="/capabilities" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              All Services →
            </Link>
          </div>

          {/* Column 3: Projects */}
          <div className="flex flex-col space-y-3">
            <span className="text-label font-sans text-dust-tan tracking-wide uppercase font-semibold">
              Projects
            </span>
            <Link href="/projects" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Project Portfolio
            </Link>
            <Link href="/projects?filter=ACTIVE" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Active Concessions
            </Link>
            <Link href="/projects?filter=COMPLETED" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Commissioned Assets
            </Link>
            <Link href="/mining" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Mining Corridors
            </Link>
          </div>

          {/* Column 4: Products */}
          <div className="flex flex-col space-y-3">
            <span className="text-label font-sans text-dust-tan tracking-wide uppercase font-semibold">
              Products
            </span>
            <Link href="/products?category=Heavy+Mining+Fleet" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Heavy Mining Fleet
            </Link>
            <Link href="/products?category=Turnkey+Plant+Modules" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Crusher Stations
            </Link>
            <Link href="/products?category=Railway+Solutions" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Locomotives
            </Link>
            <Link href="/products?category=Traded+Minerals" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Traded Minerals
            </Link>
          </div>

          {/* Column 5: News */}
          <div className="flex flex-col space-y-3">
            <span className="text-label font-sans text-dust-tan tracking-wide uppercase font-semibold">
              News
            </span>
            <Link href="/news" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Newsroom
            </Link>
            <Link href="/social" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Field Reports
            </Link>
            <Link href="/achievements" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Certifications & Awards
            </Link>
          </div>

          {/* Column 6: Contact */}
          <div className="flex flex-col space-y-3">
            <span className="text-label font-sans text-dust-tan tracking-wide uppercase font-semibold">
              Contact
            </span>
            <Link href="/contact#hq" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Corporate Headquarters
            </Link>
            <Link href="/contact#offices" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Regional Operations Hubs
            </Link>
            <Link href="/contact#form" className="text-body-sm text-quarry-grey hover:text-iron-white transition-colors">
              Project Procurement Tender
            </Link>
          </div>
        </div>

        {/* Tier 3: Copyright & Policy Links */}
        <div className="pt-8 border-t border-slab-grey/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans text-quarry-grey">
          <div>
            © {SITE_FACTS.foundedYear + SITE_FACTS.yearsInBusiness} {SITE_FACTS.companyName}. Established {SITE_FACTS.foundedYear}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-iron-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-iron-white transition-colors">
              Terms of Operations
            </Link>
            <Link href="/achievements" className="hover:text-iron-white transition-colors">
              Certifications & Awards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
