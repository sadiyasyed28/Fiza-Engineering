import React from "react";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const generatedId = React.useId();
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : generatedId);
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full flex flex-col mb-6">
      {label && (
        <label htmlFor={inputId} className="form-label cursor-pointer">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "form-input min-h-[44px] focus:outline-none focus:border-b-oxide-red focus-visible:ring-2 focus-visible:ring-oxide-red/40",
          error && "border-b-oxide-red",
          className
        )}
        {...props}
      />
      {error && (
        <span
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs text-oxide-red mt-1 font-sans uppercase tracking-wide font-medium"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export interface SelectProps {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
  value?: string | number | readonly string[];
  onChange?: (e: any) => void;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  value,
  onChange,
  name,
  disabled,
}: SelectProps) {
  return (
    <div className="w-full mb-6">
      <CustomSelect
        id={id}
        label={label}
        error={error}
        options={options}
        className={className}
        value={String(value ?? "")}
        onChange={(val) => {
          if (typeof onChange === "function") {
            const syntheticEvent = {
              target: { value: val, name: name || id || "" },
              currentTarget: { value: val, name: name || id || "" },
            };
            onChange(syntheticEvent);
          }
        }}
        disabled={disabled}
        name={name}
        variant="underline"
      />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, rows = 4, ...props }: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : generatedId);
  const errorId = `${textareaId}-error`;

  return (
    <div className="w-full flex flex-col mb-6">
      {label && (
        <label htmlFor={textareaId} className="form-label cursor-pointer">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "form-input resize-none min-h-[120px] focus:outline-none focus:border-b-oxide-red focus-visible:ring-2 focus-visible:ring-oxide-red/40",
          error && "border-b-oxide-red",
          className
        )}
        {...props}
      />
      {error && (
        <span
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs text-oxide-red mt-1 font-sans uppercase tracking-wide font-medium"
        >
          {error}
        </span>
      )}
    </div>
  );
}
