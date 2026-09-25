"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  className?: string;
}

/**
 * Exact cubic-bezier solver for cubic-bezier(0.16, 1, 0.3, 1)
 * High-performance industrial ease-out: smooth initial rise, flawless deceleration, zero overshoot.
 */
function solveCubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x: number) {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleCurveX(t) - x;
      if (Math.abs(xEst) < 1e-5) return t;
      const dX = sampleCurveDerivativeX(t);
      if (Math.abs(dX) < 1e-5) break;
      t -= xEst / dX;
    }
    let t0 = 0.0;
    let t1 = 1.0;
    t = x;
    if (t < t0) return t0;
    if (t > t1) return t1;
    while (t0 < t1) {
      const xEst = sampleCurveX(t);
      if (Math.abs(xEst - x) < 1e-5) return t;
      if (x > xEst) t0 = t;
      else t1 = t;
      t = (t1 + t0) * 0.5;
    }
    return t;
  }

  return function ease(x: number) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.min(1, Math.max(0, sampleCurveY(solveCurveX(x))));
  };
}

const fizaEaseOut = solveCubicBezier(0.16, 1, 0.3, 1);

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 900,
  delay = 0,
  trigger = false,
  className,
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Strict Accessibility: respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    if (!trigger || hasStarted) return;
    setHasStarted(true);

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easedProgress = fizaEaseOut(progress);
        const nextValue = Math.round(easedProgress * target);

        setCurrent(nextValue);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCurrent(target); // settle precisely on target, zero overshoot
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [trigger, target, duration, delay, hasStarted]);

  return (
    <span className={cn("inline-flex items-baseline tabular-nums select-none", className)}>
      <span>{current}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
