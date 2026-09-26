"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PRODUCTS,
  TRADED_MINERALS,
  ALL_CATALOG_ITEMS,
  EQUIPMENT_CATEGORIES,
  SHOW_PRODUCT_SPECS,
  ProductItem,
} from "@/lib/products";

const CATEGORIES = [
  "ALL",
  "Heavy Mining Fleet",
  "Turnkey Plant Modules",
  "Railway Solutions",
  "Traded Minerals",
];

function normalizeCategory(catParam: string | null): string {
  if (!catParam) return "ALL";
  const normalized = catParam.toLowerCase().replace(/[+_-]/g, " ").trim();
  if (normalized === "heavy mining fleet" || normalized === "mining fleet") {
    return "Heavy Mining Fleet";
  }
  if (
    normalized === "turnkey plant modules" ||
    normalized === "crusher stations" ||
    normalized === "crushers"
  ) {
    return "Turnkey Plant Modules";
  }
  if (
    normalized === "railway solutions" ||
    normalized === "locomotives" ||
    normalized === "rail"
  ) {
    return "Railway Solutions";
  }
  if (
    normalized === "traded minerals" ||
    normalized === "minerals" ||
    normalized === "commodities"
  ) {
    return "Traded Minerals";
  }
  const match = CATEGORIES.find(
    (c) => c.toLowerCase() === normalized
  );
  return match || "ALL";
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams?.get("category") ?? null;
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    setSelectedCategory(normalizeCategory(catParam));
  }, [catParam]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "ALL") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const filteredItems = ALL_CATALOG_ITEMS.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header with Integrated Industrial Imagery */}
      <section className="relative bg-iron-white py-20 md:py-24 border-b border-slab-grey overflow-hidden">
        {/* Background Industrial Image Integration */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/capabilities/equipment-rebuild.jpg"
            alt="Fiza Engineering heavy equipment rebuild depot, powertrain overhaul, and fleet mobilization"
            fill
            priority
            sizes="100vw"
            className="img-cover object-center lg:object-right opacity-75 lg:opacity-90 mix-blend-multiply"
          />
          {/* Subtle Industrial Mesh Texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(26, 26, 24, 0.25) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Editorial Gradient Blend: Guarantees 100% Text & Category Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-iron-white via-iron-white/65 sm:via-iron-white/40 to-iron-white/5 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-iron-white/55 via-transparent to-iron-white/15" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-mono uppercase tracking-[0.2em] block mb-3 font-semibold">
            {SHOW_PRODUCT_SPECS ? "Equipment & Machinery Catalog" : "Fleet & Equipment"}
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            {SHOW_PRODUCT_SPECS ? "Industrial Equipment Catalog" : "Fleet & Equipment"}
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-3xl leading-relaxed">
            {SHOW_PRODUCT_SPECS
              ? "Technical specifications for heavy mining excavators, modular primary crushing stations, rigid haul trucks, and freight locomotives."
              : "Heavy mining machinery, modular plant units, railway rolling stock, and commercial minerals owned, procured, and supplied by Fiza Engineering Corporation."}
          </p>


          {/* Equipment Categories Overview (When in Fleet Mode) */}
          {!SHOW_PRODUCT_SPECS && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slab-grey">
              {EQUIPMENT_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 bg-[#F5F3ED] border border-slab-grey font-mono text-xs"
                >
                  <span className="font-bold text-earth-black uppercase tracking-wider block mb-1">
                    {cat.name}
                  </span>
                  {cat.fleetCount && (
                    <span className="text-oxide-red text-[11px] font-semibold block mb-2">
                      {cat.fleetCount}
                    </span>
                  )}
                  <p className="text-quarry-grey text-[11px] leading-relaxed font-sans">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Horizontal Category Filter */}
          <div className="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-slab-grey">
            <span className="text-label font-mono text-earth-black uppercase tracking-wider mr-2 font-bold text-xs">
              Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`tag cursor-pointer ${
                  selectedCategory === cat
                    ? "tag--active !bg-earth-black !text-iron-white"
                    : "hover:bg-earth-black hover:text-iron-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs font-mono text-quarry-grey">
            Showing <span className="font-semibold text-earth-black">{filteredItems.length}</span> of {ALL_CATALOG_ITEMS.length} items
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="w-full bg-[#EBE8E0] py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-iron-white border border-slab-grey p-12 max-w-lg mx-auto font-mono">
              <h3 className="text-heading-3 font-sans text-earth-black mb-2">No items found</h3>
              <p className="text-quarry-grey text-xs mb-6 font-sans">
                No equipment or mineral items match the selected category.
              </p>
              <button
                onClick={() => handleCategoryChange("ALL")}
                className="btn-primary text-xs py-2 px-5"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {filteredItems.map((item) => {
                const isMachinery = item.category !== "Traded Minerals";
                const detailHref = isMachinery ? `/products/${item.slug}` : "/capabilities/mineral-trading";
                const quoteHref = `/contact?type=${item.quoteType}&product=${encodeURIComponent(item.name)}`;

                return (
                  <div
                    key={item.id}
                    className="group bg-iron-white border border-slab-grey p-8 flex flex-col justify-between hover:border-earth-black transition-colors"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slab-grey mb-6 border border-slab-grey">
                        <Image
                          src={item.heroImage}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="img-cover transition-transform duration-300 group-hover:scale-[1.02] saturate-[0.85]"
                        />
                        {isMachinery && (
                          <div className="absolute inset-0 bg-blue-900/10 mix-blend-color pointer-events-none" />
                        )}
                        {SHOW_PRODUCT_SPECS && item.modelNumber && (
                          <div className="absolute top-3 left-3 bg-earth-black text-iron-white font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                            {item.modelNumber}
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-earth-black/85 text-iron-white font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                          {item.category}
                        </div>
                      </div>

                      <span className="font-mono text-xs text-oxide-red uppercase tracking-wider block mb-2 font-bold">
                        {item.category}
                      </span>

                      <h2 className="text-heading-2 font-medium text-earth-black mb-3">
                        {item.name}
                      </h2>

                      <p className="text-body-sm text-quarry-grey leading-relaxed mb-6">
                        {item.overview}
                      </p>

                      {/* 3 Key Specs in a Small Table */}
                      <table className="w-full text-xs font-mono mb-6 border border-slab-grey/40">
                        <tbody>
                          {item.keySpecs.map((spec, i) => (
                            <tr
                              key={i}
                              className={i % 2 === 0 ? "bg-[#F5F3ED]" : "bg-iron-white"}
                            >
                              <td className="py-2 px-3 font-semibold text-earth-black border-b border-slab-grey/40">
                                {spec.label}
                              </td>
                              <td className="py-2 px-3 text-quarry-grey border-b border-slab-grey/40 text-right">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-6 border-t border-slab-grey flex items-center justify-between gap-4">
                      {isMachinery ? (
                        <Link
                          href={detailHref}
                          className="text-label font-bold text-earth-black hover:text-oxide-red uppercase tracking-wider font-mono text-xs inline-flex items-center gap-1"
                        >
                          View project / details →
                        </Link>
                      ) : (
                        <span className="text-xs font-mono text-quarry-grey">
                          Audited Off-take Supply
                        </span>
                      )}

                      <Link
                        href={quoteHref}
                        className="btn-primary !bg-oxide-red hover:!bg-earth-black text-xs py-2.5 px-4 whitespace-nowrap"
                      >
                        Request quote →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-[100px] text-center font-mono text-xs">
          Loading equipment catalog...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
