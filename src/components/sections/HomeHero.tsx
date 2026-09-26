"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_FACTS, yearsInBusinessDecade } from "@/lib/siteFacts";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    src: "/images/hero-real.jpg",
    alt: "Fiza Engineering heavy open-pit mining operations with hydraulic excavators and haul fleet",
  },
  {
    src: "/images/capabilities/heavy-infrastructure.jpg",
    alt: "Fiza Engineering heavy civil works, industrial infrastructure, and arterial transport corridor operations",
  },
  {
    src: "/images/capabilities/railway-solutions.jpg",
    alt: "Fiza Engineering heavy-haul rail logistics, locomotives, and mineral transport operations",
  },
  {
    src: "/images/capabilities/turnkey-plants.jpg",
    alt: "Fiza Engineering turnkey processing plants, modular EPC engineering, and industrial facilities",
  },
  {
    src: "/images/capabilities/equipment-rebuild.jpg",
    alt: "Fiza Engineering certified heavy machinery rebuild depot, powertrain overhaul, and fleet mobilization",
  },
];

export function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let timer: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!document.hidden) {
          setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }
      }, 6000);
    };

    startTimer();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startTimer();
      } else if (timer) {
        clearInterval(timer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero Main Frame */}
      <section className="relative w-full min-h-[580px] lg:h-[82vh] max-h-[880px] flex flex-col justify-end overflow-hidden bg-coal-dark">
        {/* Background Slideshow: subtle automatic crossfade & Ken Burns effect */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.src}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-[1800ms] ease-in-out",
                  isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
                )}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className={cn(
                    "img-cover object-center will-change-transform",
                    "transition-transform duration-[7000ms] ease-out motion-reduce:transform-none motion-reduce:transition-none",
                    isActive ? "scale-[1.05]" : "scale-[1.01]"
                  )}
                />
              </div>
            );
          })}

          {/* Subtle Industrial Mesh Texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-[2]"
            style={{
              backgroundImage: "radial-gradient(rgba(242, 240, 235, 0.35) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Cinematic Dark Coal Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth-black via-earth-black/70 to-earth-black/35 z-[2]" />
        </div>

        {/* Hero Copy & Actions */}
        <div className="relative z-10 max-w-content mx-auto w-full px-6 md:px-12 pb-14 md:pb-20 pt-32">
          <div className="max-w-3xl">
            {/* Overline with established date from siteFacts */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2.5 h-2.5 bg-oxide-red inline-block" />
              <span className="font-sans text-xs uppercase tracking-wide text-dust-tan font-semibold">
                Est. {SITE_FACTS.foundedYear} · {SITE_FACTS.yearsInBusinessLabel} Direct Execution
              </span>
            </div>

            {/* Specific Headline naming actual operations */}
            <h1 className="text-display-lg sm:text-[3.25rem] md:text-[3.75rem] font-medium text-iron-white tracking-tight leading-[0.96] mb-5">
              Mining, rail and heavy civil works across Africa.
            </h1>

            {/* Concise Subtext: exactly 16 words (max 20 words) */}
            <p className="text-body-lg text-dust-tan max-w-2xl mb-8 leading-relaxed font-normal">
              Direct open-pit concessions, heavy-haul railway corridors, and turnkey processing plants operating across key African resource jurisdictions.
            </p>

            {/* Specific, Non-Duplicate CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="btn-primary !bg-oxide-red hover:!bg-earth-black text-iron-white text-xs py-3.5 px-7 font-sans uppercase tracking-wide font-semibold shadow-sm transition-colors"
              >
                View active projects
              </Link>
              <Link
                href="/capabilities"
                className="btn-secondary !border-iron-white !text-iron-white hover:!bg-iron-white hover:!text-earth-black text-xs py-3.5 px-7 font-sans uppercase tracking-wide font-semibold transition-colors"
              >
                See our services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Single Stats Row directly under the hero (Kept ONCE on the page, imported from siteFacts) */}
      <section className="w-full bg-[#181816] border-b border-slab-grey/20 text-iron-white py-5 md:py-6">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 sm:gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slab-grey/15">
            <div className="pt-4 md:pt-0">
              <span className="font-sans text-xs uppercase tracking-wide text-quarry-grey block mb-1 font-semibold">
                Fleet Capacity
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl sm:text-4xl font-semibold text-oxide-red">
                  <AnimatedCounter target={SITE_FACTS.fleetSizeNumber} suffix="+" duration={1800} delay={0} />
                </span>
                <span className="text-xs font-sans text-dust-tan font-medium">Machines</span>
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <span className="font-sans text-xs uppercase tracking-wide text-quarry-grey block mb-1 font-semibold">
                Jurisdictions
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl sm:text-4xl font-semibold text-iron-white">
                  <AnimatedCounter target={SITE_FACTS.countries} duration={1800} delay={120} />
                </span>
                <span className="text-xs font-sans text-dust-tan font-medium">Countries</span>
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <span className="font-sans text-xs uppercase tracking-wide text-quarry-grey block mb-1 font-semibold">
                Global Footprint
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl sm:text-4xl font-semibold text-iron-white">
                  <AnimatedCounter target={SITE_FACTS.continents} duration={1800} delay={240} />
                </span>
                <span className="text-xs font-sans text-dust-tan font-medium">Continents</span>
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <span className="font-sans text-xs uppercase tracking-wide text-quarry-grey block mb-1 font-semibold">
                Track Record
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl sm:text-4xl font-semibold text-oxide-red">
                  <AnimatedCounter target={yearsInBusinessDecade} suffix="+ Years" duration={1800} delay={360} />
                </span>
                <span className="text-xs font-sans text-dust-tan font-medium">Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
