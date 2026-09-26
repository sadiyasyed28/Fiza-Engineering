import React from "react";
import { cn } from "@/lib/utils";

interface PersonPlaceholderProps {
  name: string;
  title?: string;
  className?: string;
}

export function PersonPlaceholder({ name, title, className }: PersonPlaceholderProps) {
  // Compute initials for clean corporate monogram
  const initials = name
    .split(" ")
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    // TODO: [Photo to be supplied] - replace monogram placeholder when verified official portrait is provided
    <div
      className={cn(
        "relative w-full aspect-square bg-coal-dark border border-slab-grey/40 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden group-hover:border-earth-black transition-colors shadow-sm",
        className
      )}
      role="img"
      aria-label={`Official portrait monogram for ${name}`}
    >
      {/* Subtle blueprint grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(242, 240, 235, 0.4) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Clean Monogram Circle / Tile */}
      <div className="relative z-10 w-20 h-20 bg-[#1F1F1D] border border-slab-grey/30 flex items-center justify-center mb-3 shadow-inner">
        <span className="font-sans text-2xl font-bold tracking-wide text-iron-white">
          {initials}
        </span>
      </div>

      {/* Name and Title (clean, no [Photo to be supplied] text) */}
      <span className="relative z-10 font-heading text-sm font-semibold text-iron-white line-clamp-1">
        {name}
      </span>
      {title && (
        <span className="relative z-10 text-[11px] font-sans text-dust-tan line-clamp-1 mt-0.5">
          {title}
        </span>
      )}
    </div>
  );
}
