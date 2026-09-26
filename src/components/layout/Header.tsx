"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CONSOLIDATED_NAV = [
  { href: "/company", label: "Company" },
  { href: "/capabilities", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCompanyDropdownOpen(false);
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setCompanyDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setCompanyDropdownOpen(false);
    }, 120);
  };

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setCompanyDropdownOpen(false);
  };

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 px-6 md:px-12 flex items-center justify-between",
          scrolled || !isHome
            ? "bg-iron-white/55 backdrop-blur-xl backdrop-saturate-150 border-b border-white/50 text-earth-black shadow-sm"
            : "bg-earth-black/25 backdrop-blur-xl backdrop-saturate-150 border-b border-white/15 text-iron-white"
        )}
      >
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 md:gap-3 group select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-8 h-8 md:w-9 md:h-9 shrink-0 shadow-sm"
            aria-hidden="true"
          >
            <rect width="32" height="32" fill="#1A1A18" />
            <text x="7" y="24" fontFamily="sans-serif" fontWeight="800" fontSize="22" fill="#F2F0EB">
              F
            </text>
            <rect x="22" y="22" width="6" height="6" fill="#B33D26" />
          </svg>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-heading text-xl md:text-2xl font-semibold tracking-tight uppercase">
                FIZA
              </span>
              <span className="w-2 h-2 rounded-none bg-oxide-red inline-block" />
            </div>
            <span
              className={cn(
                "font-sans text-[9px] md:text-[10px] tracking-wide uppercase font-semibold leading-tight mt-0.5",
                scrolled || !isHome ? "text-quarry-grey" : "text-slab-grey"
              )}
            >
              Engineering Corporation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {CONSOLIDATED_NAV.map((link) => {
            const isCompany = link.href === "/company";
            const isActive = isCompany
              ? pathname === "/company" || pathname?.startsWith("/company/") || pathname === "/achievements"
              : pathname === link.href || (link.href !== "/" && pathname?.startsWith(`${link.href}/`));

            if (isCompany) {
              return (
                <div
                  key={link.href}
                  className="relative py-2"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/company"
                    onClick={handleCloseDropdown}
                    className={cn(
                      "text-body-sm font-medium tracking-wide uppercase transition-colors duration-200 flex items-center gap-1 relative py-1",
                      isActive
                        ? "text-oxide-red font-semibold"
                        : scrolled || !isHome
                        ? "text-earth-black hover:text-oxide-red"
                        : "text-iron-white/90 hover:text-iron-white"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        "opacity-70 transition-transform duration-200",
                        companyDropdownOpen && "rotate-180"
                      )}
                    />
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-oxide-red" />
                    )}
                  </Link>

                  {/* Dropdown for About / Company Section */}
                  {companyDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 z-50 animate-fade-in min-w-[240px]">
                      <div className="bg-iron-white border border-slab-grey shadow-lg p-2 font-sans">
                        <Link
                          href="/company"
                          onClick={handleCloseDropdown}
                          className="block px-3 py-2 text-xs text-earth-black hover:bg-[#EBE8E0] hover:text-oxide-red transition-colors"
                        >
                          <span className="font-semibold block uppercase tracking-wide">Company Overview</span>
                          <span className="text-[10px] text-quarry-grey font-sans block mt-0.5">
                            Profile, leadership & footprint
                          </span>
                        </Link>
                        <Link
                          href="/achievements"
                          onClick={handleCloseDropdown}
                          className="block px-3 py-2 text-xs text-earth-black hover:bg-[#EBE8E0] hover:text-oxide-red transition-colors border-t border-slab-grey/40"
                        >
                          <span className="font-semibold block uppercase tracking-wide">Certifications & Awards</span>
                          <span className="text-[10px] text-quarry-grey font-sans block mt-0.5">
                            ISO accreditations & milestones
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-body-sm font-medium tracking-wide uppercase transition-colors duration-200 relative py-1",
                  isActive
                    ? "text-oxide-red font-semibold"
                    : scrolled || !isHome
                    ? "text-earth-black hover:text-oxide-red"
                    : "text-iron-white/90 hover:text-iron-white"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-oxide-red" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button: Get in Touch */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-oxide-red text-iron-white text-xs font-semibold uppercase tracking-wide py-2.5 px-5 hover:bg-earth-black transition-colors duration-200 shadow-sm inline-flex items-center gap-1.5 font-sans"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 flex items-center justify-center transition-colors",
            scrolled || !isHome ? "text-earth-black" : "text-iron-white"
          )}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-coal-dark text-iron-white flex flex-col justify-between p-8 pt-28 lg:hidden animate-fade-in overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <span className="text-label text-dust-tan tracking-wide uppercase font-sans mb-2 font-semibold">
              Corporate Directory
            </span>
            {CONSOLIDATED_NAV.map((link) => {
              const isCompany = link.href === "/company";
              const isActive = isCompany
                ? pathname === "/company" || pathname?.startsWith("/company/") || pathname === "/achievements"
                : pathname === link.href || pathname?.startsWith(`${link.href}/`);

              return (
                <div key={link.href} className="border-b border-slab-grey/15 pb-3">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-medium tracking-tight uppercase hover:text-oxide-red transition-colors flex items-center justify-between",
                      isActive ? "text-oxide-red" : "text-iron-white"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={18} className="text-quarry-grey" />
                  </Link>

                  {/* Sub-item for Certifications & Awards under Company/About */}
                  {isCompany && (
                    <div className="pl-3 pt-2 font-sans text-sm">
                      <Link
                        href="/achievements"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "text-dust-tan/80 hover:text-oxide-red transition-colors flex items-center gap-2 py-1",
                          pathname === "/achievements" && "text-oxide-red font-semibold"
                        )}
                      >
                        <span className="text-oxide-red">↳</span>
                        <span className="uppercase text-xs tracking-wide">Certifications & Awards</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-8 border-t border-slab-grey/20 space-y-5">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-oxide-red text-iron-white text-center text-sm font-semibold uppercase tracking-wide py-3.5 block hover:bg-white hover:text-earth-black transition-colors font-sans"
            >
              Get in Touch
            </Link>

            <div className="text-xs font-sans text-quarry-grey space-y-1">
              <span className="block text-dust-tan font-semibold uppercase">
                Fiza Engineering Corporation
              </span>
              <span className="block">
                info@fizaengineering.com · Dubai · Africa
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
