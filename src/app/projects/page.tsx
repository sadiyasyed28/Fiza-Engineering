"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { PROJECTS, Project } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight, RotateCcw } from "lucide-react";

const STATUS_CHIPS = ["ALL", "ACTIVE", "IN DEVELOPMENT", "COMPLETED"];
const COUNTRIES = ["ALL", "Mali", "Democratic Republic of Congo", "Madagascar"];
const SECTORS = [
  "ALL",
  "Mining Services & Rail",
  "Turnkey Plants",
  "Railway Solutions",
  "Infrastructure",
  "Infrastructure & Mining",
  "Commercial Agriculture"
];

function normalizeStatusParam(param: string | null): string {
  if (!param) return "ALL";
  const upper = param.toUpperCase().trim();
  if (upper === "IN_DEVELOPMENT" || upper === "IN DEVELOPMENT") return "IN DEVELOPMENT";
  if (upper === "ACTIVE") return "ACTIVE";
  if (upper === "COMPLETED") return "COMPLETED";
  return "ALL";
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [countryFilter, setCountryFilter] = useState("ALL");
  const [sectorFilter, setSectorFilter] = useState("ALL");

  useEffect(() => {
    const filterParam = searchParams?.get("filter") ?? null;
    if (filterParam) {
      setStatusFilter(normalizeStatusParam(filterParam));
    }
  }, [searchParams]);

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    if (status === "ALL") {
      router.push("/projects", { scroll: false });
    } else {
      const urlParam = status === "IN DEVELOPMENT" ? "IN_DEVELOPMENT" : status;
      router.push(`/projects?filter=${urlParam}`, { scroll: false });
    }
  };

  const handleClearFilters = () => {
    setStatusFilter("ALL");
    setCountryFilter("ALL");
    setSectorFilter("ALL");
    router.push("/projects", { scroll: false });
  };

  const filteredProjects = PROJECTS.filter((p) => {
    // Status filter
    if (statusFilter !== "ALL") {
      const matchStatus =
        statusFilter === "IN DEVELOPMENT"
          ? p.status === "IN_DEVELOPMENT"
          : p.status === statusFilter;
      if (!matchStatus) return false;
    }

    // Country filter
    if (countryFilter !== "ALL" && p.country !== countryFilter) {
      return false;
    }

    // Sector filter
    if (sectorFilter !== "ALL" && p.sector !== sectorFilter && p.category !== sectorFilter) {
      return false;
    }

    return true;
  });

  const isFiltered = statusFilter !== "ALL" || countryFilter !== "ALL" || sectorFilter !== "ALL";

  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header */}
      <section className="bg-iron-white py-16 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="text-label text-oxide-red font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-quarry-grey">/</span>
            <span className="text-earth-black font-semibold">Projects</span>
          </nav>

          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            Projects
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed font-normal">
            Mining, rail, plant and infrastructure projects in Mali, the DRC and Madagascar.
          </p>

          {/* Interactive Filters: Status Chips + Dropdowns */}
          <div className="mt-10 pt-6 border-t border-slab-grey space-y-6">
            {/* Status Chips */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-label font-mono text-earth-black uppercase tracking-wider mr-2 font-semibold">
                Status:
              </span>
              {STATUS_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleStatusChange(chip)}
                  className={`tag cursor-pointer font-mono text-xs transition-colors ${
                    statusFilter === chip
                      ? "tag--active !bg-earth-black !text-iron-white"
                      : "bg-[#EBE8E0] text-earth-black hover:bg-earth-black hover:text-iron-white"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Country and Sector Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-label font-mono text-quarry-grey uppercase tracking-wider mb-1.5 text-[11px]">
                  Filter by Country
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full bg-[#F4F2EC] border border-slab-grey p-2.5 font-mono text-xs text-earth-black focus:outline-none focus:border-earth-black"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c === "ALL" ? "All Countries" : c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-label font-mono text-quarry-grey uppercase tracking-wider mb-1.5 text-[11px]">
                  Filter by Sector
                </label>
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="w-full bg-[#F4F2EC] border border-slab-grey p-2.5 font-mono text-xs text-earth-black focus:outline-none focus:border-earth-black"
                >
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s === "ALL" ? "All Sectors" : s}
                    </option>
                  ))}
                </select>
              </div>

              {isFiltered && (
                <div className="flex items-end">
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-oxide-red hover:underline py-2.5"
                  >
                    <RotateCcw size={13} /> Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Result Count */}
            <div className="text-xs font-mono text-quarry-grey pt-2">
              Showing <span className="font-semibold text-earth-black">{filteredProjects.length}</span> of{" "}
              <span className="font-semibold text-earth-black">{PROJECTS.length}</span> projects
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full bg-[#EBE8E0] py-20 md:py-28 min-h-[400px]">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {filteredProjects.length === 0 ? (
            /* Plain empty-state message with Clear filters button */
            <div className="bg-iron-white border border-slab-grey p-12 text-center max-w-lg mx-auto">
              <h3 className="text-heading-2 font-medium text-earth-black mb-3">
                No projects found
              </h3>
              <p className="text-body-sm text-quarry-grey leading-relaxed mb-6 font-normal">
                No projects match the selected status, country, or sector criteria.
              </p>
              <button
                onClick={handleClearFilters}
                className="btn-primary !bg-oxide-red hover:!bg-earth-black text-iron-white text-xs py-3 px-6 font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2"
              >
                <RotateCcw size={13} /> Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const years = project.timeline || (project.endYear ? `${project.startYear} - ${project.endYear}` : `${project.startYear} - Present`);
                const keyFig = project.keyFigure || project.stats[0];

                return (
                  <div
                    key={project.slug}
                    className="group bg-iron-white border border-slab-grey p-6 flex flex-col justify-between hover:border-earth-black transition-colors shadow-sm"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slab-grey mb-6">
                        <Image
                          src={project.image}
                          alt={project.imageAlt || project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="img-cover transition-transform duration-500 group-hover:scale-[1.05] saturate-[0.85]"
                        />
                        {/* Vignette Overlay */}
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none mix-blend-multiply" />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-earth-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          <span className="text-iron-white font-mono text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-1.5">
                            View Project <ArrowRight size={14} />
                          </span>
                        </div>

                        <div className="absolute top-3 left-3 bg-earth-black text-iron-white font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 z-20">
                          {project.country}
                        </div>
                      </div>

                      {/* Header Row: Status Badge, Country & Years */}
                      <div className="flex items-center justify-between mb-3">
                        <Tag active={project.status === "ACTIVE"}>
                          {project.status === "IN_DEVELOPMENT" ? "IN DEVELOPMENT" : project.status}
                        </Tag>
                        <span className="font-mono text-xs text-quarry-grey">
                          {years}
                        </span>
                      </div>

                      {/* Sector */}
                      <span className="text-label text-oxide-red font-mono uppercase tracking-wider block mb-2 font-semibold">
                        {project.sector}
                      </span>

                      {/* Title */}
                      <h2 className="text-heading-2 font-medium text-earth-black group-hover:text-oxide-red transition-colors mb-3 leading-snug">
                        <Link href={`/projects/${project.slug}`}>
                          {project.name}
                        </Link>
                      </h2>

                      {/* Summary (plain language, <= 35 words) */}
                      <p className="text-body-sm text-quarry-grey leading-relaxed mb-6 font-normal">
                        {project.summary}
                      </p>
                    </div>

                    {/* Card Footer: One Key Figure + View project */}
                    <div className="pt-4 border-t border-slab-grey flex items-center justify-between">
                      {keyFig && (
                        <div className="font-mono text-xs">
                          <span className="font-bold text-earth-black">{keyFig.value}</span>
                          <span className="text-[10px] text-quarry-grey block uppercase tracking-wider">
                            {keyFig.label}
                          </span>
                        </div>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-label font-bold text-oxide-red uppercase tracking-wider font-mono inline-flex items-center gap-1 hover:underline ml-auto"
                      >
                        View project <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-[100px] text-center font-mono text-xs text-quarry-grey">
          Loading project portfolio...
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
