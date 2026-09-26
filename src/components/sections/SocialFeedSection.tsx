import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_POSTS } from "@/lib/constants";

export function SocialFeedSection() {
  return (
    <section className="w-full bg-[#E5E2D9] py-20 md:py-28 border-t border-b border-slab-grey">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-2 font-semibold">
              From The Field
            </span>
            <h2 className="text-display-lg font-medium text-earth-black leading-[0.95]">
              Live Site Dispatches
            </h2>
          </div>
          <Link
            href="/social"
            className="text-label font-bold text-earth-black hover:text-oxide-red uppercase tracking-wide inline-flex items-center gap-2 font-sans transition-colors"
          >
            All Field Logs <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOCIAL_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-iron-white border border-slab-grey p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 text-xs font-sans">
                  <span className="bg-earth-black text-iron-white px-2 py-0.5 uppercase tracking-wide font-semibold text-[11px]">
                    {post.platform}
                  </span>
                  <span className="text-quarry-grey">{post.date}</span>
                </div>

                <p className="text-body-sm text-earth-black leading-relaxed mb-6 font-normal">
                  {post.content}
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slab-grey border border-slab-grey/40">
                <Image
                  src={post.image}
                  alt={post.platform}
                  fill
                  className="img-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
