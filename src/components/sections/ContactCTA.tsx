import React from "react";
import Link from "next/link";
import { SITE_FACTS } from "@/lib/siteFacts";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="w-full bg-coal-dark text-iron-white py-12 md:py-18 dark-section">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-oxide-red inline-block" />
              <span className="text-label text-dust-tan font-sans uppercase tracking-wide font-semibold">
                Contact
              </span>
            </div>

            <h2 className="text-display-lg sm:text-[3rem] font-medium text-iron-white leading-[0.96] mb-6">
              Talk to our team.
            </h2>

            <p className="text-quarry-grey text-body-lg max-w-xl mb-8 leading-relaxed font-normal">
              Whether mobilizing equipment for an open-pit concession, engineering heavy-haul rail, or structuring direct mineral off-takes, our engineering teams are ready to deploy.
            </p>

            <div>
              <Link
                href="/contact"
                className="btn-primary !bg-oxide-red hover:!bg-iron-white hover:!text-earth-black text-xs py-4 px-8 font-sans uppercase tracking-wide font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
              >
                <span>Contact the team</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Quick Direct Contacts Block */}
          <div className="lg:col-span-5 bg-[#1F1F1D] border border-slab-grey/20 p-8 space-y-5">
            <span className="font-sans text-xs uppercase tracking-wide text-dust-tan font-semibold block border-b border-slab-grey/15 pb-3">
              Direct Inquiries
            </span>

            <div className="flex items-start gap-3 text-xs font-sans">
              <MapPin size={16} className="text-oxide-red shrink-0 mt-0.5" />
              <div>
                <span className="text-iron-white block font-medium">Headquarters</span>
                <span className="text-quarry-grey">{SITE_FACTS.contact.hqAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs font-sans">
              <Mail size={16} className="text-oxide-red shrink-0 mt-0.5" />
              <div>
                <span className="text-iron-white block font-medium">Email</span>
                <a
                  href={`mailto:${SITE_FACTS.contact.primaryEmail}`}
                  className="text-dust-tan hover:text-oxide-red transition-colors"
                >
                  {SITE_FACTS.contact.primaryEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs font-sans">
              <Phone size={16} className="text-oxide-red shrink-0 mt-0.5" />
              <div>
                <span className="text-iron-white block font-medium">Telephone</span>
                <a
                  href={`tel:${SITE_FACTS.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="text-dust-tan hover:text-oxide-red transition-colors"
                >
                  {SITE_FACTS.contact.primaryPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
