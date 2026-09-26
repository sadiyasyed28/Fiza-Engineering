import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, ProductItem } from "@/lib/products";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return {
      title: "Equipment Catalog | Fiza Engineering",
    };
  }

  const title = `${product.name} | Equipment Catalog | Fiza Engineering`;
  const description = `${product.name} (${product.category}). ${product.overview.slice(0, 135)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://fiza-one.vercel.app/products/${product.slug}`,
      siteName: "Fiza Engineering Corporation",
      type: "website",
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  const quoteHref = `/contact?type=${product.quoteType}&product=${encodeURIComponent(product.name)}`;

  return (
    <div className="w-full pt-[72px]">
      {/* Header Bar */}
      <section className="bg-iron-white py-14 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <Link
            href="/products"
            className="text-label text-oxide-red font-sans uppercase tracking-wide inline-flex items-center gap-2 mb-4 hover:underline font-semibold"
          >
            ← Back To Equipment & Fleet
          </Link>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div>
              <span className="font-sans text-xs text-quarry-grey uppercase tracking-wide block mb-1 font-medium">
                {product.category}
              </span>
              <h1 className="text-display-lg sm:text-[3rem] font-medium text-earth-black leading-[1.0]">
                {product.name}
              </h1>
            </div>
            <Link
              href={quoteHref}
              className="btn-primary !bg-oxide-red hover:!bg-earth-black text-xs py-3 px-6 whitespace-nowrap self-start md:self-auto"
            >
              Request quote →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Spec Sheet Section */}
      <section className="w-full bg-[#EBE8E0] py-20 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Image & Overview */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full bg-slab-grey border border-slab-grey mb-6 overflow-hidden">
                <Image
                  src={product.heroImage}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="img-cover"
                />
                <div className="absolute bottom-3 left-3 bg-earth-black text-iron-white font-sans text-[10px] px-2.5 py-1 uppercase tracking-wide font-medium">
                  EQUIPMENT PROFILE · {product.category.toUpperCase()}
                </div>
              </div>

              <div className="p-6 bg-iron-white border border-slab-grey mb-6">
                <span className="text-label text-earth-black font-sans uppercase tracking-wide block mb-2 font-bold">
                  Operational Overview
                </span>
                <p className="text-body-sm text-quarry-grey leading-relaxed">
                  {product.overview}
                </p>
              </div>

              {/* Download Spec Sheet Button (Disabled with Coming Soon if absent) */}
              <div className="bg-iron-white p-6 border border-slab-grey font-sans text-xs">
                <span className="text-label text-earth-black uppercase tracking-wide block mb-2 font-bold">
                  Technical Documentation
                </span>
                <p className="text-quarry-grey mb-4 text-[11px]">
                  Certified engineering spec sheets and load charts are provided directly to qualified engineering operators.
                </p>
                {product.specSheetPdf ? (
                  <a
                    href={product.specSheetPdf}
                    download
                    className="btn-primary w-full text-center block text-xs py-3"
                  >
                    Download Spec Sheet (PDF) ↓
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 px-4 bg-[#E8E5DD] border border-slab-grey text-quarry-grey font-sans text-xs uppercase tracking-wide cursor-not-allowed opacity-80 font-medium"
                  >
                    Download Spec Sheet (Coming soon)
                  </button>
                )}
              </div>
            </div>

            {/* Right: Technical Specs Table */}
            <div className="lg:col-span-6 bg-iron-white border border-slab-grey p-8 font-sans">
              <div className="flex items-center justify-between pb-4 border-b-2 border-earth-black mb-6">
                <span className="text-label font-bold text-earth-black uppercase tracking-wide">
                  Specifications Table
                </span>
                <span className="text-xs text-oxide-red font-semibold">
                  AUDITED SPECIFICATIONS
                </span>
              </div>

              <table className="w-full text-left text-xs">
                <tbody>
                  {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-[#F5F3ED]" : "bg-iron-white"}
                    >
                      <td className="py-3 px-4 font-semibold text-earth-black border-b border-slab-grey/40">
                        {specKey}
                      </td>
                      <td className="py-3 px-4 text-quarry-grey border-b border-slab-grey/40">
                        {specVal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 pt-6 border-t border-slab-grey">
                <span className="text-label font-bold text-earth-black uppercase tracking-wide block mb-3">
                  Qualified Operational Applications
                </span>
                <ul className="space-y-2 text-xs text-quarry-grey">
                  {product.applications.map((app, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-oxide-red inline-block" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="w-full bg-iron-white py-20 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
                Fleet & Equipment
              </span>
              <h2 className="text-heading-1 font-medium text-earth-black">
                Related Equipment & Plant
              </h2>
            </div>
            <Link
              href="/products"
              className="text-label font-bold text-earth-black hover:text-oxide-red uppercase tracking-wide font-sans text-xs hidden md:block"
            >
              View all equipment →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group border border-slab-grey p-6 bg-[#EBE8E0] hover:border-earth-black transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden mb-4 bg-slab-grey border border-slab-grey">
                    <Image
                      src={rel.heroImage}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="img-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="font-sans text-xs text-oxide-red uppercase tracking-wide block mb-1 font-medium">
                    {rel.category}
                  </span>
                  <h3 className="text-heading-3 font-medium text-earth-black group-hover:text-oxide-red transition-colors mb-2 text-base">
                    {rel.name}
                  </h3>
                  <p className="text-body-sm text-quarry-grey leading-relaxed line-clamp-2">
                    {rel.overview}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slab-grey/60 font-sans text-xs text-earth-black font-semibold">
                  View specifications →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement CTA Strip */}
      <section className="w-full bg-[#EBE8E0] py-16">
        <div className="max-w-content mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-heading-2 font-medium text-earth-black">
              Procure Machinery or Reserve Fleet Units
            </h3>
            <p className="text-body-sm text-quarry-grey mt-1">
              Direct factory commissioning, bonded port transit, and on-site operator training included.
            </p>
          </div>
          <Link
            href={quoteHref}
            className="btn-primary !bg-earth-black hover:!bg-oxide-red text-xs py-3 px-6 whitespace-nowrap"
          >
            Request quote →
          </Link>
        </div>
      </section>
    </div>
  );
}
