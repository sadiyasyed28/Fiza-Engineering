"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SITE_FACTS } from "@/lib/siteFacts";
import { cn } from "@/lib/utils";

const MILESTONES = [
  {
    year: "1994",
    title: "Establishment & International Commodity Trade",
    description: "Founded by Muhammed Farooghuddin, developing international mineral trading and heavy industrial equipment supply channels across the Middle East, Asia, and Africa."
  },
  {
    year: "2001",
    title: "Heavy Fleet Equipment Services",
    description: "Expanded direct operations with heavy earthmoving fleet deployment supporting industrial civil foundations and mining logistics."
  },
  {
    year: "2007",
    title: "Open-Pit Mining Concessions",
    description: "Awarded multi-year overburden stripping concessions in Mali, establishing on-site rebuild machine workshops."
  },
  {
    year: "2013",
    title: "Turnkey Industrial Plants Division",
    description: "Commissioned automated primary crushing circuits and expanded into Central Africa and the DRC copperbelt."
  },
  {
    year: "2018",
    title: "Direct Mineral Trading Corridors",
    description: "Structured direct off-take agreements for bauxite, high-grade hematite iron ore, and cathode copper to global markets."
  },
  {
    year: "2022",
    title: "Heavy-Haul Rail Infrastructure",
    description: "Executed railway track renewal and heavy-haul rolling stock operations across specialized mineral corridors."
  },
  {
    year: "2026",
    title: `Operations across ${SITE_FACTS.countries} countries`,
    description: `Operating mining, civil, rail, and agro-industrial infrastructure projects across ${SITE_FACTS.countries} countries on ${SITE_FACTS.continents} continents.`
  }
];

export function CompanyTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update horizontal track position and active milestone from vertical page scroll
  const updateScroll = useCallback(() => {
    if (!containerRef.current || !trackRef.current || !viewportRef.current) return;
    if (window.innerWidth < 1024) return;

    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Progress through the sticky section (0.0 at top entrance, 1.0 at exit)
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    // Calculate maximum horizontal travel so the last milestone (2026) rests comfortably in view
    const maxTrackScroll = Math.max(
      0,
      trackRef.current.scrollWidth - viewportRef.current.clientWidth + 80
    );

    // 1:1 hardware-accelerated translation directly on DOM to prevent 60fps React re-renders
    const translateX = progress * maxTrackScroll;
    trackRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;

    // Update thin technical progress rail directly on DOM
    if (progressLineRef.current) {
      progressLineRef.current.style.width = `${progress * 100}%`;
    }

    // Only update React state when active milestone index actually changes
    const newIdx = Math.min(
      MILESTONES.length - 1,
      Math.max(0, Math.round(progress * (MILESTONES.length - 1)))
    );

    if (newIdx !== activeIdxRef.current) {
      activeIdxRef.current = newIdx;
      setActiveIdx(newIdx);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateScroll]);

  // Jump to specific milestone (via click or keyboard)
  const jumpToMilestone = (idx: number) => {
    const clampedIdx = Math.max(0, Math.min(MILESTONES.length - 1, idx));
    activeIdxRef.current = clampedIdx;
    setActiveIdx(clampedIdx);

    const progress = clampedIdx / (MILESTONES.length - 1);

    if (window.innerWidth >= 1024 && containerRef.current) {
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const targetScrollY =
        containerRef.current.offsetTop + progress * totalScrollable;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    } else if (mobileScrollRef.current) {
      const card = mobileScrollRef.current.children[clampedIdx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }

    tabRefs.current[clampedIdx]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      jumpToMilestone(activeIdx - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      jumpToMilestone(activeIdx + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      jumpToMilestone(0);
    } else if (e.key === "End") {
      e.preventDefault();
      jumpToMilestone(MILESTONES.length - 1);
    }
  };

  // Mobile horizontal swipe observer
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current || window.innerWidth >= 1024) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 300;
    const currentIdx = Math.round(scrollLeft / cardWidth);
    const clamped = Math.max(0, Math.min(MILESTONES.length - 1, currentIdx));
    if (clamped !== activeIdx) {
      activeIdxRef.current = clamped;
      setActiveIdx(clamped);
    }
  };

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative w-full bg-[#EBE8E0] border-t border-slab-grey lg:h-[380vh] overflow-x-clip"
      aria-label="Historical Milestones Timeline"
    >
      {/* Sticky Viewport Stage (Pinned on Desktop) */}
      <div
        ref={viewportRef}
        className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between py-8 lg:py-10 overflow-hidden"
      >
        <div className="max-w-content mx-auto px-6 md:px-12 w-full flex flex-col justify-between h-full">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 lg:mb-3 gap-4 flex-shrink-0">
            <div>
              <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-1.5 font-semibold text-xs">
                Historical Milestones
              </span>
              <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
                {SITE_FACTS.yearsInBusinessStory}
              </h2>
            </div>

            {/* Stepper Controls in Header */}
            <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-wide">
              <span className="text-quarry-grey mr-2" aria-live="polite">
                Milestone <span className="text-earth-black font-bold">{String(activeIdx + 1).padStart(2, "0")}</span> / {String(MILESTONES.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => jumpToMilestone(activeIdx - 1)}
                disabled={activeIdx === 0}
                aria-label="Previous milestone"
                className="p-2 border border-slab-grey bg-iron-white text-earth-black hover:border-earth-black hover:bg-[#E2DFD7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => jumpToMilestone(activeIdx + 1)}
                disabled={activeIdx === MILESTONES.length - 1}
                aria-label="Next milestone"
                className="p-2 border border-slab-grey bg-iron-white text-earth-black hover:border-earth-black hover:bg-[#E2DFD7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Architectural Timeline Rail (Desktop) */}
          <div className="hidden lg:block w-full flex-shrink-0 mb-4" onKeyDown={handleKeyDown}>
            <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wide text-quarry-grey mb-2 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-oxide-red inline-block" />
                <span className="text-earth-black font-semibold">1994 Operational Inception</span>
              </span>
              <span className="text-oxide-red font-bold">
                ACTIVE CHRONOLOGY: {MILESTONES[activeIdx].year}
              </span>
              <span>Continuous Execution → {MILESTONES[MILESTONES.length - 1].year}</span>
            </div>

            {/* Thin Engineering Reference Rail */}
            <div className="relative w-full py-2">
              {/* Baseline Reference Line (1px) */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-slab-grey" />
              
              {/* Subtle Oxide-Red Progress Segment (1.5px Hairline) */}
              <div
                ref={progressLineRef}
                className="absolute top-1/2 left-0 h-[1.5px] -translate-y-1/2 bg-oxide-red transition-all duration-75 ease-out"
                style={{
                  width: `${(activeIdx / (MILESTONES.length - 1)) * 100}%`,
                }}
              />

              {/* Year Jump Tabs along Rail */}
              <div
                role="tablist"
                aria-label="Chronological Milestone Navigation"
                className="relative flex justify-between items-center w-full"
              >
                {MILESTONES.map((m, idx) => {
                  const isActive = idx === activeIdx;
                  const isPassed = idx <= activeIdx;
                  return (
                    <button
                      key={m.year}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      role="tab"
                      id={`timeline-tab-${m.year}`}
                      aria-selected={isActive}
                      aria-controls={`timeline-panel-${m.year}`}
                      tabIndex={isActive ? 0 : -1}
                      type="button"
                      onClick={() => jumpToMilestone(idx)}
                      className="group flex flex-col items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-oxide-red p-1 select-none cursor-pointer"
                      aria-label={`Milestone year ${m.year}`}
                    >
                      {/* Year Label: Clean, crisp, no oversized scaling */}
                      <span
                        className={cn(
                          "font-sans text-xs tracking-wide transition-colors duration-150 mb-1.5",
                          isActive
                            ? "font-bold text-earth-black"
                            : isPassed
                            ? "font-semibold text-earth-black"
                            : "font-medium text-quarry-grey group-hover:text-earth-black"
                        )}
                      >
                        {m.year}
                      </span>

                      {/* Engineering Reference Node Pin */}
                      <div
                        className={cn(
                          "w-2 h-2 transition-colors duration-150 z-10",
                          isActive
                            ? "bg-oxide-red ring-2 ring-oxide-red/30"
                            : isPassed
                            ? "bg-earth-black"
                            : "bg-iron-white border border-slab-grey group-hover:border-earth-black"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Horizontal Translating Track (Visual Journey Through History) */}
          <div className="hidden lg:block relative w-full flex-grow overflow-visible py-2">
            <div
              ref={trackRef}
              className="flex items-start will-change-transform"
              style={{ transform: "translate3d(0, 0, 0)" }}
            >
              {MILESTONES.map((milestone, idx) => {
                const isActive = idx === activeIdx;
                const isPassed = idx < activeIdx;

                return (
                  <div
                    key={milestone.year}
                    id={`timeline-panel-${milestone.year}`}
                    role="tabpanel"
                    aria-labelledby={`timeline-tab-${milestone.year}`}
                    className={cn(
                      "flex-shrink-0 w-[540px] xl:w-[600px] mr-10 xl:mr-14 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-40 translate-y-2.5 hover:opacity-75"
                    )}
                  >
                    {/* Visual Axis Connector Stem (Drop Line From Rail) */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div
                        className={cn(
                          "w-2 h-2 transition-colors duration-150",
                          isActive ? "bg-oxide-red" : isPassed ? "bg-earth-black" : "bg-slab-grey"
                        )}
                      />
                      <div
                        className={cn(
                          "h-[1px] flex-grow transition-colors duration-150",
                          isActive ? "bg-oxide-red" : "bg-slab-grey"
                        )}
                      />
                      <span className="font-sans text-[11px] uppercase tracking-wide text-quarry-grey font-medium">
                        REF #{milestone.year}-CORP
                      </span>
                    </div>

                    {/* Milestone Card Content: Fixed Architectural Height */}
                    <div
                      className={cn(
                        "bg-iron-white border p-7 xl:p-9 h-[360px] xl:h-[380px] flex flex-col justify-between transition-[border-color,box-shadow] duration-200",
                        isActive
                          ? "border-earth-black shadow-sm"
                          : "border-slab-grey"
                      )}
                    >
                      <div>
                        {/* Milestone Header */}
                        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-slab-grey/40 mb-5">
                          <div className="flex items-baseline gap-3">
                            <span
                              className={cn(
                                "font-sans text-4xl xl:text-5xl font-bold tracking-tight leading-none transition-colors duration-200",
                                isActive ? "text-oxide-red" : "text-earth-black"
                              )}
                            >
                              {milestone.year}
                            </span>
                            <span className="font-sans text-[11px] uppercase tracking-wide text-quarry-grey px-2 py-0.5 bg-[#EBE8E0] border border-slab-grey/40 font-semibold">
                              0{idx + 1} / 0{MILESTONES.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 font-sans text-[11px] text-quarry-grey uppercase tracking-wide font-medium">
                            <span
                              className={cn(
                                "w-1.5 h-1.5 inline-block transition-colors duration-150",
                                isActive ? "bg-oxide-red" : "bg-slab-grey"
                              )}
                            />
                            <span>{isActive ? "Active Era" : "Verified Record"}</span>
                          </div>
                        </div>

                        {/* Milestone Title & Description */}
                        <h3 className="text-heading-3 font-medium text-earth-black mb-3 leading-snug">
                          {milestone.title}
                        </h3>
                        <p className="text-body-sm text-quarry-grey leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>

                      {/* Technical Meta Footer */}
                      <div className="pt-4 border-t border-slab-grey/30 flex flex-wrap items-center justify-between text-[11px] font-sans text-quarry-grey uppercase tracking-wide gap-3 font-medium">
                        <span>OPERATIONAL STATUS: VERIFIED</span>
                        <span className="text-oxide-red font-semibold">
                          CONTINUOUS CORRIDOR EXECUTION
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile & Tablet (< 1024px) Year Selector Strip */}
          <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 py-1 mb-2 -mx-1 px-1 flex-shrink-0">
            {MILESTONES.map((m, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => jumpToMilestone(idx)}
                  className={cn(
                    "px-3 py-1 font-sans text-xs uppercase tracking-wide border transition-colors duration-150 flex-shrink-0 font-medium",
                    isActive
                      ? "bg-earth-black text-iron-white border-earth-black font-bold"
                      : "bg-iron-white text-quarry-grey border-slab-grey hover:border-earth-black hover:text-earth-black"
                  )}
                  aria-label={`Jump to milestone year ${m.year}`}
                >
                  {m.year}
                </button>
              );
            })}
          </div>

          {/* Mobile & Tablet (< 1024px) Horizontal Snap Track */}
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex lg:hidden overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 w-full py-3 mb-3"
          >
            {MILESTONES.map((milestone, idx) => (
              <div
                key={milestone.year}
                className="snap-center flex-shrink-0 w-[85vw] max-w-sm bg-iron-white border border-slab-grey p-6 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-slab-grey/40 mb-4">
                    <span className="font-sans text-4xl font-bold text-oxide-red tracking-tight leading-none">
                      {milestone.year}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-wide text-quarry-grey px-2 py-0.5 bg-[#EBE8E0] border border-slab-grey/40 font-semibold">
                      0{idx + 1} / 0{MILESTONES.length}
                    </span>
                  </div>
                  <h3 className="text-heading-3 font-medium text-earth-black mb-3 leading-snug">
                    {milestone.title}
                  </h3>
                  <p className="text-body-sm text-quarry-grey leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slab-grey/30 text-[10px] font-sans text-quarry-grey uppercase tracking-wide flex justify-between font-medium">
                  <span>ARCHIVE #{milestone.year}</span>
                  <span className="text-oxide-red font-semibold">OPERATIONAL</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation & Guidance Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3.5 border-t border-slab-grey flex-shrink-0">
            <button
              type="button"
              onClick={() => jumpToMilestone(activeIdx - 1)}
              disabled={activeIdx === 0}
              aria-label="Previous historical milestone"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slab-grey bg-iron-white font-sans text-xs uppercase tracking-wide font-semibold text-earth-black hover:border-earth-black hover:bg-[#E2DFD7] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous Year</span>
            </button>

            <div className="font-sans text-xs text-quarry-grey text-center font-medium">
              <span className="hidden lg:inline">
                Scroll vertically through timeline or use <kbd className="px-1.5 py-0.5 border border-slab-grey bg-iron-white text-earth-black text-[11px]">←</kbd> and <kbd className="px-1.5 py-0.5 border border-slab-grey bg-iron-white text-earth-black text-[11px]">→</kbd> keys
              </span>
              <span className="lg:hidden">
                Swipe horizontally or tap year buttons to navigate timeline
              </span>
            </div>

            <button
              type="button"
              onClick={() => jumpToMilestone(activeIdx + 1)}
              disabled={activeIdx === MILESTONES.length - 1}
              aria-label="Next historical milestone"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slab-grey bg-iron-white font-sans text-xs uppercase tracking-wide font-semibold text-earth-black hover:border-earth-black hover:bg-[#E2DFD7] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-150"
            >
              <span>Next Year</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
