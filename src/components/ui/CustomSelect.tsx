"use client";

import React, { useState, useRef, useEffect, useId, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectOptionItem = string | SelectOption;

export interface CustomSelectProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOptionItem[];
  placeholder?: string;
  className?: string;
  panelClassName?: string;
  disabled?: boolean;
  error?: string;
  name?: string;
  "aria-label"?: string;
  variant?: "standard" | "underline";
}

export function CustomSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
  panelClassName,
  disabled = false,
  error,
  name,
  "aria-label": ariaLabel,
  variant = "standard",
}: CustomSelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const buttonId = `${selectId}-button`;
  const listboxId = `${selectId}-listbox`;
  const labelId = `${selectId}-label`;
  const errorId = `${selectId}-error`;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Normalize options into { value, label } items
  const normalizedOptions: SelectOption[] = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === "string") {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : placeholder || (normalizedOptions[0] ? normalizedOptions[0].label : "Select option");

  // Keep highlighted index in sync when opening
  useEffect(() => {
    if (isOpen) {
      const idx = normalizedOptions.findIndex((opt) => opt.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, normalizedOptions, value]);

  // Ensure highlighted option is scrolled into view in scrollable panel
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex, isOpen]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDownOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside);

    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
    };
  }, [isOpen]);

  // Accessible keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < normalizedOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : normalizedOptions.length - 1
        );
        break;
      case "Home":
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setHighlightedIndex(normalizedOptions.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
          const selected = normalizedOptions[highlightedIndex];
          onChange(selected.value);
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelectOption = (optVal: string) => {
    onChange(optVal);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", label && "flex flex-col")}>
      {label && (
        <label
          id={labelId}
          htmlFor={buttonId}
          className={
            variant === "underline"
              ? "form-label cursor-pointer"
              : "block text-label font-mono text-quarry-grey uppercase tracking-wider mb-1.5 text-[11px]"
          }
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id={buttonId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
        aria-label={ariaLabel}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0
            ? `${buttonId}-option-${highlightedIndex}`
            : undefined
        }
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full flex items-center justify-between text-left font-mono text-xs cursor-pointer select-none transition-all duration-150",
          variant === "underline"
            ? "bg-transparent border-b border-slab-grey py-3 text-earth-black focus:outline-none focus:border-b-oxide-red min-h-[44px]"
            : "bg-[#F4F2EC] hover:bg-[#EFECE4] text-earth-black border border-[#D0CCC2] hover:border-earth-black px-3.5 py-2.5 min-h-[42px] focus:outline-none focus:border-oxide-red focus:ring-1 focus:ring-oxide-red/30",
          isOpen &&
            (variant === "underline"
              ? "border-b-oxide-red"
              : "border-oxide-red ring-1 ring-oxide-red/30 bg-[#FFFFFF]"),
          error && "border-oxide-red text-oxide-red",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <span className="truncate pr-2 font-mono">{displayLabel}</span>
        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 text-quarry-grey transition-transform duration-200 ease-out",
            isOpen && "transform rotate-180 text-oxide-red"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Hidden input for HTML form integration */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Glassmorphism Options Panel */}
      {isOpen && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={label ? labelId : buttonId}
          className={cn(
            "absolute top-[calc(100%+4px)] left-0 right-0 z-50 max-h-60 overflow-y-auto",
            "bg-[#F4F2EC]/95 backdrop-blur-md border border-[#C8C4B8]",
            "shadow-[0_8px_20px_rgba(26,26,24,0.08)]",
            "rounded-none py-1 focus:outline-none animate-dropdown-open",
            panelClassName
          )}
        >
          {normalizedOptions.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightedIndex;

            return (
              <li
                key={opt.value}
                ref={(el) => {
                  optionRefs.current[idx] = el;
                }}
                id={`${buttonId}-option-${idx}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectOption(opt.value)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={cn(
                  "relative flex items-center justify-between px-3.5 py-2.5 text-xs font-mono cursor-pointer transition-colors duration-150 select-none",
                  isSelected
                    ? "bg-[#E6E3DA] text-earth-black font-semibold border-l-2 border-oxide-red pl-[12px]"
                    : isHighlighted
                    ? "bg-[#EBE7DE] text-earth-black border-l-2 border-transparent pl-[12px]"
                    : "bg-transparent text-earth-black hover:bg-[#EBE7DE] border-l-2 border-transparent pl-[12px]"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <Check
                    size={13}
                    className="shrink-0 text-oxide-red ml-2"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <span
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs text-oxide-red mt-1 font-mono uppercase tracking-wider"
        >
          {error}
        </span>
      )}
    </div>
  );
}
