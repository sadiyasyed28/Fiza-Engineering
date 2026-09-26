"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const INQUIRY_TYPES = [
  { label: "General Corporate Inquiry", value: "general" },
  { label: "Mining Services & Fleet Mobilization", value: "mining-services" },
  { label: "Bulk Mineral Commodity Trading", value: "mineral-trading" },
  { label: "Heavy-Haul Railway Solutions", value: "railway-solutions" },
  { label: "Heavy Civil Infrastructure", value: "infrastructure" },
  { label: "Turnkey Industrial Plants EPC", value: "turnkey-plants" },
  { label: "Commercial Agriculture", value: "agriculture" },
  { label: "Equipment Procurement & Rebuild", value: "equipment-procurement" },
  { label: "Industrial Microgrids & Power", value: "industrial-power" },
];

function normalizeInquiryType(typeParam: string | null): string {
  if (!typeParam) return "general";
  const normalized = typeParam.toLowerCase().trim();
  if (normalized === "mining" || normalized === "mining-services") return "mining-services";
  if (normalized === "trading" || normalized === "mineral-trading") return "mineral-trading";
  if (normalized === "railway" || normalized === "railway-solutions") return "railway-solutions";
  if (normalized === "plant" || normalized === "turnkey-plants") return "turnkey-plants";
  if (normalized === "civil" || normalized === "infrastructure") return "infrastructure";
  if (normalized === "agro" || normalized === "agriculture") return "agriculture";
  if (normalized === "equipment" || normalized === "equipment-procurement") return "equipment-procurement";
  if (normalized === "power" || normalized === "energy" || normalized === "industrial-power") return "industrial-power";
  const found = INQUIRY_TYPES.find((t) => t.value === normalized);
  return found ? found.value : "general";
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [inquiryType, setInquiryType] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const typeParam = searchParams?.get("type");
    const productParam = searchParams?.get("product");

    if (typeParam) {
      setInquiryType(normalizeInquiryType(typeParam));
    }

    if (productParam) {
      const formattedProduct = productParam.replace(/-/g, " ");
      setFormData((prev) => ({
        ...prev,
        message: prev.message
          ? prev.message
          : `Inquiry regarding specifications, availability, or quotation for: ${formattedProduct}.`,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    // Client-side quick check
    const clientErrors: Record<string, string> = {};
    if (!formData.name.trim()) clientErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      clientErrors.email = "Please enter your corporate email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      clientErrors.email = "Please enter a valid email address.";
    }
    if (!formData.company.trim()) clientErrors.company = "Please enter your company or organization.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      clientErrors.message = "Please describe your operational requirements (at least 10 characters).";
    }

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setErrorMessage("Please complete all required fields highlighted below.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiryType,
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          _gotcha: honeypot, // Honeypot field for bot mitigation
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.fields) {
          setFieldErrors(result.fields);
        }
        setErrorMessage(result.error || "Submission failed. Please check your information and try again.");
      } else {
        setSubmitSuccess(true);
        // Note: strictly no localStorage storage
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (err) {
      setErrorMessage("Network error: Unable to send message. Please try again or email us directly at info@fizaengineering.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setErrorMessage(null);
    setFieldErrors({});
  };

  if (submitSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 md:p-10 bg-iron-white border border-slab-grey border-l-4 border-l-earth-black"
      >
        <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
          Inquiry Transmitted
        </span>
        <h3 className="text-heading-2 font-medium text-earth-black mb-3">
          Thank you for reaching out
        </h3>
        <p className="text-body-md text-quarry-grey leading-relaxed mb-6 font-sans">
          Your inquiry has been routed to our project engineering desk. A designated representative will review your operational requirements and respond within 24 operational hours.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="btn-secondary text-xs py-3.5 px-6 min-h-[44px] focus-visible:ring-2 focus-visible:ring-earth-black"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 bg-oxide-red/10 border-l-4 border-oxide-red text-earth-black text-sm"
        >
          <p className="font-semibold text-oxide-red mb-1">Unable to send message</p>
          <p className="text-body-sm text-quarry-grey">{errorMessage}</p>
        </div>
      )}

      {/* Honeypot field (hidden from legitimate users, catches spam bots) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-hp">Leave this field blank</label>
        <input
          id="website-hp"
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Inquiry Type Dropdown */}
      <Select
        id="inquiry-type"
        label="Inquiry Type"
        value={inquiryType}
        onChange={(e) => setInquiryType(e.target.value)}
        options={INQUIRY_TYPES}
      />

      {/* Name and Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="contact-name"
          label="Name"
          required
          placeholder="e.g. Jean-Marc Laurent"
          value={formData.name}
          error={fieldErrors.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" });
          }}
          disabled={isSubmitting}
        />
        <Input
          id="contact-company"
          label="Company"
          required
          placeholder="e.g. Société Minière de Kayes"
          value={formData.company}
          error={fieldErrors.company}
          onChange={(e) => {
            setFormData({ ...formData, company: e.target.value });
            if (fieldErrors.company) setFieldErrors({ ...fieldErrors, company: "" });
          }}
          disabled={isSubmitting}
        />
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="contact-email"
          label="Email"
          type="email"
          required
          placeholder="e.g. jm.laurent@smk-mining.com"
          value={formData.email}
          error={fieldErrors.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
          }}
          disabled={isSubmitting}
        />
        <Input
          id="contact-phone"
          label="Phone"
          type="tel"
          placeholder="e.g. +223 20 00 00 00"
          value={formData.phone}
          error={fieldErrors.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
            if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: "" });
          }}
          disabled={isSubmitting}
        />
      </div>

      {/* Message */}
      <Textarea
        id="contact-message"
        label="Message"
        rows={4}
        required
        placeholder="Specify project parameters, required equipment capacities, execution timeline, or off-take criteria..."
        value={formData.message}
        error={fieldErrors.message}
        onChange={(e) => {
          setFormData({ ...formData, message: e.target.value });
          if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: "" });
        }}
        disabled={isSubmitting}
      />

      {/* GDPR Consent Text */}
      <div className="pt-2">
        <p className="text-xs text-quarry-grey leading-relaxed">
          By submitting this form, you acknowledge and agree that your details will be processed in accordance with our{" "}
          <Link href="/privacy" className="text-earth-black underline hover:text-oxide-red transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full md:w-auto min-h-[44px] px-8 text-xs font-sans uppercase tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-earth-black focus-visible:ring-offset-2 font-semibold"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
