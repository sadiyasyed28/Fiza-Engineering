import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  highlight?: boolean;
  className?: string;
}

export function StatCard({ value, label, highlight, className }: StatCardProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "text-display-lg md:text-[4rem] font-medium leading-none tracking-tight font-sans",
          highlight ? "text-oxide-red" : "text-inherit"
        )}
      >
        {value}
      </span>
      <span className="mt-2 text-body-sm text-quarry-grey max-w-[200px] uppercase font-sans tracking-wide leading-snug font-medium">
        {label}
      </span>
    </div>
  );
}
