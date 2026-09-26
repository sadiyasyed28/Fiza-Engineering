"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  NEWS_ARTICLES,
  NEWS_CATEGORIES,
  getVisibleArticles,
  NewsArticle,
} from "@/lib/news";
import { formatDate } from "@/lib/utils";

function normalizeTopic(param: string | null): string {
  if (!param) return "ALL";
  const normalized = param.toUpperCase().replace(/[+_-]/g, " ").trim();
  const match = NEWS_CATEGORIES.find(
    (c) => c.toUpperCase() === normalized
  );
  return match || "ALL";
}

function NewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicParam = searchParams?.get("topic") ?? null;
  const [selectedTopic, setSelectedTopic] = useState("ALL");

  useEffect(() => {
    setSelectedTopic(normalizeTopic(topicParam));
  }, [topicParam]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    if (topic === "ALL") {
      router.push("/news", { scroll: false });
    } else {
      router.push(`/news?topic=${encodeURIComponent(topic)}`, { scroll: false });
    }
  };

  const allVisible = getVisibleArticles();

  const filteredArticles = allVisible.filter((a) => {
    if (selectedTopic === "ALL") return true;
    return a.category === selectedTopic;
  });

  // Calculate counts per topic
  const getTopicCount = (topic: string) => {
    if (topic === "ALL") return allVisible.length;
    return allVisible.filter((a) => a.category === topic).length;
  };

  const featured = filteredArticles[0];
  const remaining = filteredArticles.slice(1);

  return (
    <div className="w-full pt-[72px]">
      {/* Editorial Header with Integrated Industrial Imagery */}
      <section className="relative bg-iron-white py-20 md:py-24 border-b border-slab-grey overflow-hidden">
        {/* Background Industrial Image Integration */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/capabilities/railway-solutions.jpg"
            alt="Fiza Engineering heavy-haul rail logistics, locomotives, and mineral transport operations"
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
          {/* Editorial Gradient Blend: Guarantees 100% Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-iron-white via-iron-white/65 sm:via-iron-white/40 to-iron-white/5 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-iron-white/55 via-transparent to-iron-white/15" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 md:px-12">
          <span className="text-label text-oxide-red font-mono uppercase tracking-[0.2em] block mb-3 font-semibold">
            News
          </span>
          <h1 className="text-display-lg sm:text-[3.5rem] md:text-display-xl font-medium text-earth-black leading-[0.95] mb-6">
            News
          </h1>
          <p className="text-body-lg text-quarry-grey max-w-2xl leading-relaxed">
            Project announcements, fleet mobilizations, and operational updates from Fiza operations across Africa.
          </p>

          {/* Topic Chips with Article Counts */}
          <div className="flex flex-wrap items-center gap-3 mt-10 pt-6 border-t border-slab-grey">
            <span className="text-label font-mono text-earth-black uppercase tracking-wider mr-2 font-bold text-xs">
              Topic:
            </span>
            {NEWS_CATEGORIES.map((topic) => {
              const count = getTopicCount(topic);
              return (
                <button
                  key={topic}
                  onClick={() => handleTopicChange(topic)}
                  className={`tag cursor-pointer ${
                    selectedTopic === topic
                      ? "tag--active !bg-earth-black !text-iron-white"
                      : "hover:bg-earth-black hover:text-iron-white"
                  }`}
                >
                  {topic} ({count})
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-xs font-mono text-quarry-grey">
            Showing <span className="font-semibold text-earth-black">{filteredArticles.length}</span> of {allVisible.length} articles
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full bg-[#EBE8E0] py-16 md:py-24">
        <div className="max-w-content mx-auto px-6 md:px-12">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-iron-white border border-slab-grey p-12 max-w-lg mx-auto font-mono">
              <h3 className="text-heading-3 font-sans text-earth-black mb-2">No articles found</h3>
              <p className="text-quarry-grey text-xs mb-6 font-sans">
                No published articles match the selected topic.
              </p>
              <button
                onClick={() => handleTopicChange("ALL")}
                className="btn-primary text-xs py-2 px-5"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Story */}
              {featured && (
                <Link
                  href={`/news/${featured.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-iron-white border border-slab-grey p-6 md:p-10 hover:border-earth-black transition-colors"
                >
                  <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-slab-grey border border-slab-grey">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt || featured.title}
                      fill
                      priority
                      className="img-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-quarry-grey mb-3">
                        <span className="bg-earth-black text-iron-white px-2 py-0.5 uppercase tracking-wider text-[10px] font-semibold">
                          {featured.category}
                        </span>
                        <span>·</span>
                        <span>{formatDate(featured.date)}</span>
                        <span>·</span>
                        <span>{featured.readingTime}</span>
                      </div>

                      <h2 className="text-display-lg sm:text-[2rem] font-medium text-earth-black leading-[1.1] group-hover:text-oxide-red transition-colors mb-4">
                        {featured.title}
                      </h2>

                      <p className="text-body text-quarry-grey leading-relaxed line-clamp-4 mb-4">
                        {featured.summary}
                      </p>

                      <div className="text-xs font-mono text-quarry-grey mb-6">
                        By <span className="font-semibold text-earth-black">{featured.author.name}</span>, {featured.author.role}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slab-grey">
                      <span className="text-label font-bold text-oxide-red uppercase tracking-wider font-mono inline-flex items-center gap-1">
                        Read article →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Remaining Stories Grid */}
              {remaining.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {remaining.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/news/${article.slug}`}
                      className="group bg-iron-white border border-slab-grey p-6 flex flex-col justify-between hover:border-earth-black transition-colors"
                    >
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slab-grey mb-4 border border-slab-grey">
                          <Image
                            src={article.image}
                            alt={article.imageAlt || article.title}
                            fill
                            className="img-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-quarry-grey mb-2">
                          <span className="text-oxide-red font-semibold uppercase">{article.category}</span>
                          <span>·</span>
                          <span>{formatDate(article.date)}</span>
                          <span>·</span>
                          <span>{article.readingTime}</span>
                        </div>

                        <h3 className="text-heading-2 font-medium text-earth-black group-hover:text-oxide-red transition-colors mb-3 leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-body-sm text-quarry-grey leading-relaxed line-clamp-3 mb-4">
                          {article.summary}
                        </p>

                        <div className="text-xs font-mono text-quarry-grey mb-6">
                          By <span className="font-semibold text-earth-black">{article.author.name}</span>, {article.author.role}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slab-grey">
                        <span className="text-label font-bold text-earth-black group-hover:text-oxide-red uppercase tracking-wider font-mono inline-flex items-center gap-1 transition-colors">
                          Read article →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-[100px] text-center font-mono text-xs">
          Loading newsroom...
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  );
}
