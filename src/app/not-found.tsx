import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, Layers, Phone } from "lucide-react";
import { SITE_FACTS } from "@/lib/siteFacts";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] pt-[120px] pb-24 bg-[#EBE8E0] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-iron-white border-2 border-earth-black p-8 md:p-14 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-earth-black text-dust-tan font-sans text-xs uppercase px-2.5 py-1 tracking-wide font-semibold">
            Status 404
          </span>
          <span className="text-quarry-grey font-sans text-xs uppercase tracking-wide font-medium">
            Coordinates Not Located
          </span>
        </div>

        <h1 className="text-display-lg font-medium text-earth-black leading-[0.95] mb-4">
          Route Not Found
        </h1>

        <p className="text-body text-quarry-grey leading-relaxed mb-8">
          The requested sector or document does not exist in the Fiza Engineering Corporation operational index. It may have been relocated during system restructuring or requires direct dispatch assistance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slab-grey mb-8 font-sans text-xs">
          <Link
            href="/"
            className="flex items-center gap-3 p-3.5 border border-slab-grey hover:border-earth-black hover:bg-[#F5F3ED] transition-colors group"
          >
            <Home size={16} className="text-oxide-red" />
            <span className="text-earth-black font-semibold group-hover:text-oxide-red transition-colors">
              Return to Homepage
            </span>
          </Link>
          <Link
            href="/capabilities"
            className="flex items-center gap-3 p-3.5 border border-slab-grey hover:border-earth-black hover:bg-[#F5F3ED] transition-colors group"
          >
            <Compass size={16} className="text-oxide-red" />
            <span className="text-earth-black font-semibold group-hover:text-oxide-red transition-colors">
              Engineering Capabilities
            </span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-3 p-3.5 border border-slab-grey hover:border-earth-black hover:bg-[#F5F3ED] transition-colors group"
          >
            <Layers size={16} className="text-oxide-red" />
            <span className="text-earth-black font-semibold group-hover:text-oxide-red transition-colors">
              Active Projects Portfolio
            </span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 p-3.5 border border-slab-grey hover:border-earth-black hover:bg-[#F5F3ED] transition-colors group"
          >
            <Phone size={16} className="text-oxide-red" />
            <span className="text-earth-black font-semibold group-hover:text-oxide-red transition-colors">
              Contact Corporate Offices
            </span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slab-grey flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-quarry-grey">
          <span>{SITE_FACTS.companyName} · Established {SITE_FACTS.foundedYear}</span>
          <span>Inquiries: {SITE_FACTS.contact.primaryEmail}</span>
        </div>
      </div>
    </div>
  );
}
