"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SOCIAL_POSTS } from "@/lib/constants";

const PLATFORMS = ["ALL", "DISPATCH: MALI", "FIELD LOG: DRC", "LOGISTICS: SIKASSO"];

export default function SocialPage() {
  const [activePlatform, setActivePlatform] = useState("ALL");

  const filteredPosts = SOCIAL_POSTS.filter((post) => {
    if (activePlatform === "ALL") return true;
    return post.platform === activePlatform;
  });

  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header */}
      <section className="bg-iron-white py-20 md:py-24 border-b border-slab-grey">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-sans uppercase tracking-wide block mb-3 font-semibold">
            Real-Time Operations
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            Field Dispatches
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed">
            Unfiltered photographic logs, shift reports, and equipment delivery dispatches direct from active pit cuts and rail sidings.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-slab-grey">
            <span className="text-label font-sans text-earth-black uppercase tracking-wide mr-2 font-semibold">
              Region Hub:
            </span>
            {PLATFORMS.map((plat) => (
              <button
                key={plat}
                onClick={() => setActivePlatform(plat)}
                className={`tag cursor-pointer ${
                  activePlatform === plat ? "tag--active" : "hover:bg-earth-black hover:text-iron-white"
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of Posts */}
      <section className="w-full bg-[#EBE8E0] py-20 md:py-28">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-iron-white border border-slab-grey p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-sans">
                    <span className="bg-earth-black text-iron-white px-2 py-0.5 uppercase tracking-wide font-semibold">
                      {post.platform}
                    </span>
                    <span className="text-quarry-grey">{post.date}</span>
                  </div>

                  <p className="text-body-sm text-earth-black leading-relaxed mb-6">
                    {post.content}
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slab-grey border border-slab-grey">
                  <Image
                    src={post.image}
                    alt={post.platform}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="img-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-earth-black/85 text-iron-white font-sans text-[9px] px-2 py-0.5 uppercase tracking-wide font-medium">
                    FIELD DISPATCH VERIFIED
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
