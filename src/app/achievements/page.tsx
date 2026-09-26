import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  Achievement,
  AchievementCategory,
  getVisibleAchievements,
} from "@/lib/achievements";
import { SITE_FACTS } from "@/lib/siteFacts";
import { FileText, ExternalLink } from "lucide-react";

function normalizeCategory(param: string | undefined): "ALL" | AchievementCategory {
  if (!param) return "ALL";
  const normalized = param.trim().toLowerCase();
  if (normalized === "certifications" || normalized === "certification") return "Certifications";
  if (normalized === "awards" || normalized === "award") return "Awards";
  if (normalized === "milestones" || normalized === "milestone") return "Milestones";
  if (normalized === "partnerships" || normalized === "partnership") return "Partnerships";
  return "ALL";
}

function AchievementCard({ item }: { item: Achievement }) {
  const isCertification = item.category === "Certifications";
  const isMilestone = item.isInternalMilestone || item.category === "Milestones";

  return (
    <div className="relative group">
      {/* Timeline indicator pin */}
      <div className="absolute -left-[41px] md:-left-[73px] top-2 w-4 h-4 bg-earth-black group-hover:bg-oxide-red transition-colors" />

      <div className="bg-iron-white border border-slab-grey p-6 md:p-8 max-w-3xl group-hover:border-earth-black transition-colors">
        {/* Card Header: Category & Year */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-oxide-red uppercase tracking-wider font-semibold">
              {item.category}
            </span>
            {!item.verified && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-quarry-grey bg-[#EBE8E0] px-2 py-0.5 border border-slab-grey">
                Pending Verification
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-earth-black font-bold">
            {item.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-heading-2 font-medium text-earth-black mb-2">
          {item.title}
        </h3>

        {/* Issuer / Auditor */}
        <div className="text-label text-quarry-grey font-mono uppercase tracking-wider block mb-3">
          {isMilestone ? (
            <span>Benchmark: {item.issuer}</span>
          ) : (
            <span>Audited / Issued by: {item.issuer}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-body-sm text-quarry-grey leading-relaxed mb-6 font-sans">
          {item.description}
        </p>

        {/* Certification Details: Certificate Number & PDF link */}
        {isCertification && (
          <div className="pt-4 border-t border-slab-grey/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="text-quarry-grey">
              <span className="text-earth-black font-semibold">Certificate No: </span>
              <span>{item.certificateNumber || "Pending owner submission"}</span>
            </div>

            <div>
              {item.evidenceUrl ? (
                <a
                  href={item.evidenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-oxide-red hover:underline font-semibold"
                >
                  <FileText size={14} />
                  <span>View certificate (PDF)</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-[11px] text-quarry-grey italic">
                  Certificate on file upon owner confirmation
                </span>
              )}
            </div>
          </div>
        )}

        {/* Non-certification evidence link if available */}
        {!isCertification && item.evidenceUrl && (
          <div className="pt-4 border-t border-slab-grey/40 text-xs font-mono">
            <a
              href={item.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-oxide-red hover:underline font-semibold"
            >
              <FileText size={14} />
              <span>View documentation</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AchievementsPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = normalizeCategory(searchParams?.category);
  const visibleItems = getVisibleAchievements();

  // Sort by year descending
  const sortedItems = [...visibleItems].sort((a, b) => b.year - a.year);

  // Filter according to category
  const filteredItems = sortedItems.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  // Split into Third-Party credentials vs Internal Milestones when viewing ALL
  const thirdPartyItems = filteredItems.filter(
    (item) => !item.isInternalMilestone && item.category !== "Milestones"
  );
  const milestoneItems = filteredItems.filter(
    (item) => item.isInternalMilestone || item.category === "Milestones"
  );

  // Organization JSON-LD listing verified certifications
  const verifiedCerts = ACHIEVEMENTS.filter(
    (item) => item.verified && item.category === "Certifications"
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: SITE_FACTS.companyName,
    url: "https://fiza-one.vercel.app",
    logo: "https://fiza-one.vercel.app/icon.svg",
    description: "Heavy engineering, open-pit mining concessions, and heavy-haul railway corridors.",
    ...(verifiedCerts.length > 0
      ? {
          hasCredential: verifiedCerts.map((cert) => ({
            "@type": "EducationalOccupationalCredential",
            name: cert.title,
            credentialCategory: "certification",
            recognizedBy: {
              "@type": "Organization",
              name: cert.issuer,
            },
          })),
        }
      : {}),
  };

  return (
    <div className="w-full pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Header */}
      <section className="relative bg-iron-white py-16 md:py-24 border-b border-slab-grey overflow-hidden">
        {/* Background Industrial Image Integration */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/capabilities/industrial-microgrids.jpg"
            alt="Fiza Engineering standards, industrial microgrids, and verified quality operations"
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
            Standards, Accreditations & Milestones
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            Certifications & Awards
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed">
            International ISO safety accreditations, continental infrastructure awards, and operational mining milestones earned across more than {SITE_FACTS.yearsInBusinessLower} of engineering delivery in Africa and the Middle East.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-slab-grey">
            <span className="text-label font-mono text-earth-black uppercase tracking-wider mr-2">
              Category:
            </span>
            {ACHIEVEMENT_CATEGORIES.map((cat) => {
              const href = cat === "ALL" ? "/achievements" : `/achievements?category=${cat}`;
              const isActive = selectedCategory === cat;

              return (
                <Link
                  key={cat}
                  href={href}
                  scroll={false}
                  className={`tag min-h-[36px] transition-colors ${
                    isActive
                      ? "tag--active"
                      : "hover:bg-earth-black hover:text-iron-white"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="w-full bg-[#EBE8E0] py-16 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {filteredItems.length === 0 ? (
            /* Empty State */
            <div className="bg-iron-white border border-slab-grey p-12 text-center max-w-2xl mx-auto my-8 font-mono">
              <span className="text-label text-oxide-red uppercase tracking-widest block mb-2">
                No Results Found
              </span>
              <h3 className="font-sans text-heading-2 font-medium text-earth-black mb-3">
                No credentials listed under {selectedCategory}
              </h3>
              <p className="text-body-sm text-quarry-grey mb-6 font-sans">
                All corporate credentials, third-party audits, and partnership agreements are submitted to rigorous legal review prior to public confirmation.
              </p>
              <Link
                href="/achievements"
                scroll={false}
                className="btn-secondary text-xs py-3 px-6 inline-block"
              >
                View all categories
              </Link>
            </div>
          ) : selectedCategory === "ALL" ? (
            /* Grouped View when ALL is selected */
            <div className="space-y-20">
              {/* Group 1: Third-Party Certifications, Awards & Partnerships */}
              {thirdPartyItems.length > 0 && (
                <div>
                  <div className="mb-10">
                    <span className="text-label text-oxide-red font-mono uppercase tracking-widest block mb-1">
                      External Governance
                    </span>
                    <h2 className="text-heading-1 font-medium text-earth-black">
                      Certifications & Industry Awards
                    </h2>
                  </div>

                  <div className="relative border-l-2 border-earth-black ml-4 md:ml-10 pl-8 md:pl-16 space-y-12">
                    {thirdPartyItems.map((item) => (
                      <AchievementCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* Group 2: Internal Milestones */}
              {milestoneItems.length > 0 && (
                <div className="pt-8 border-t border-slab-grey/50">
                  <div className="mb-10">
                    <span className="text-label text-oxide-red font-mono uppercase tracking-widest block mb-1">
                      Internal Operations
                    </span>
                    <h2 className="text-heading-1 font-medium text-earth-black">
                      Milestones
                    </h2>
                    <p className="text-body-sm text-quarry-grey max-w-xl mt-1">
                      Internal production thresholds, earthmoving volumes, and equipment availability benchmarks achieved across company operations.
                    </p>
                  </div>

                  <div className="relative border-l-2 border-earth-black ml-4 md:ml-10 pl-8 md:pl-16 space-y-12">
                    {milestoneItems.map((item) => (
                      <AchievementCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Single Category Filtered View */
            <div>
              <div className="mb-10">
                <span className="text-label text-oxide-red font-mono uppercase tracking-widest block mb-1">
                  Filter: {selectedCategory}
                </span>
                <h2 className="text-heading-1 font-medium text-earth-black">
                  {selectedCategory === "Milestones" ? "Milestones" : selectedCategory}
                </h2>
              </div>

              <div className="relative border-l-2 border-earth-black ml-4 md:ml-10 pl-8 md:pl-16 space-y-12">
                {filteredItems.map((item) => (
                  <AchievementCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
