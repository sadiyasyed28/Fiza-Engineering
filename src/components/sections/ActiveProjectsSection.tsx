import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ActiveProjectsSection() {
  // Pull featured projects from the exact same data source as /projects: 3 strongest ACTIVE projects
  const activeProjects = PROJECTS.filter((p) => p.status === "ACTIVE").slice(0, 3);

  return (
    <section className="w-full bg-iron-white py-10 sm:py-12 md:py-18 border-b border-slab-grey">
      <div className="max-w-content mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-oxide-red inline-block flex-shrink-0" />
              <span className="text-label text-earth-black font-sans tracking-wide uppercase font-semibold">
                Execution on the ground
              </span>
            </div>
            <h2 className="text-display-sm sm:text-[2.75rem] font-medium text-earth-black leading-[1.05] sm:leading-[0.98]">
              Featured Active Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-label font-semibold text-earth-black hover:text-oxide-red uppercase tracking-wide inline-flex items-center gap-2 transition-colors font-sans w-full md:w-auto mt-2 md:mt-0"
          >
            Browse all projects <ArrowRight size={14} />
          </Link>
        </div>

        {/* Exactly 3 Real Active Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeProjects.map((project) => {
            // Filter out unverified figures (Structural Steel Erection & Overhead Crane Capacity)
            const safeStats = project.stats
              .filter(
                (stat) =>
                  !stat.label.includes("Structural Steel") &&
                  !stat.label.includes("Overhead Crane")
              )
              .slice(0, 2);

            return (
              <div
                key={project.id}
                className="bg-iron-white border border-slab-grey flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-earth-black group"
              >
                <div>
                  {/* Project Image Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slab-grey/40 border-b border-slab-grey">
                    <Image
                      src={project.image}
                      alt={project.imageAlt || project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="img-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 flex-wrap">
                      <span className="bg-earth-black text-iron-white font-sans text-[10px] uppercase font-semibold tracking-wide px-2 py-0.5 whitespace-nowrap">
                        {project.country}
                      </span>
                      <span className="bg-oxide-red text-iron-white font-sans text-[10px] uppercase font-semibold tracking-wide px-2 py-0.5 flex items-center gap-1 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse flex-shrink-0" />
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-earth-black/85 text-dust-tan font-sans text-[10px] uppercase tracking-wide px-2 py-0.5">
                      {project.sector}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-7">
                    {/* Country only - removed unverified region lines */}
                    <span className="font-sans text-xs uppercase tracking-wide text-oxide-red font-semibold block mb-1">
                      {project.country}
                    </span>
                    <h3 className="text-xl sm:text-heading-2 font-medium text-earth-black mb-3 group-hover:text-oxide-red transition-colors leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-sm sm:text-body-sm text-quarry-grey leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Highlights from safe verified stats */}
                    <div className="space-y-2 border-t border-slab-grey/40 pt-4">
                      {safeStats.map((stat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-earth-black font-sans">
                          <CheckCircle2 size={13} className="text-oxide-red mt-0.5 shrink-0" />
                          <span>
                            <strong className="font-semibold">{stat.label}:</strong> {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="p-5 sm:p-6 md:p-7 pt-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full bg-[#EAE7DF] border border-slab-grey hover:bg-earth-black hover:text-iron-white hover:border-earth-black transition-colors font-sans text-[11px] sm:text-xs uppercase font-semibold tracking-wide py-3 sm:py-3.5 px-4 flex items-center justify-between text-earth-black group-hover:bg-oxide-red group-hover:text-iron-white group-hover:border-oxide-red whitespace-normal sm:whitespace-nowrap"
                  >
                    <span>Inspect project specifications</span>
                    <ArrowRight size={14} className="flex-shrink-0 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
