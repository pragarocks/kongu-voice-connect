import { useState, useMemo } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { districtNews, districtMeta, type DistrictNewsItem } from "@/data/districtNews";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

const categoryStyles: Record<string, string> = {
  Election: "bg-sky-50 text-sky-700 border-sky-200",
  Campaign: "bg-orange-50 text-orange-700 border-orange-200",
  Awareness: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Enforcement: "bg-rose-50 text-rose-700 border-rose-200",
};

const categories = ["All", "Election", "Campaign", "Awareness", "Enforcement"] as const;

export default function DistrictPage({ district }: { district: string }) {
  const meta = districtMeta[district];
  const allNews = districtNews[district] || [];
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const featured = allNews.find((n) => n.featured);
  const filteredNews = useMemo(() => {
    const rest = allNews.filter((n) => !n.featured);
    if (activeCategory === "All") return rest;
    return rest.filter((n) => n.category === activeCategory);
  }, [allNews, activeCategory]);

  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center text-slate-500">District not found</main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Page title */}
        <section className="bg-gradient-to-b from-sky-50 to-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-10">
            <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tight animate-fade-up">
              {meta.name}
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2">{meta.tagline}</p>
          </div>
        </section>

        {/* Featured headline */}
        {featured && (
          <section className="max-w-[1280px] mx-auto px-4 md:px-6 pt-8">
            <FeaturedCard item={featured} />
          </section>
        )}

        {/* Category filters */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 pt-8 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 pb-3">
            <h2 className="font-display text-xl md:text-2xl font-black text-slate-900">
              Latest News
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === cat
                      ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News grid */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 pb-16">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNews.map((item, i) => (
                <NewsArticleCard key={item.id} item={item} delay={i * 0.05} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Newspaper size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-display text-lg font-bold">No articles in this category</p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FeaturedCard({ item }: { item: DistrictNewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 text-white shadow-lg hover:shadow-xl transition-shadow animate-fade-up">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
      <div className="relative grid md:grid-cols-2 gap-0">
        {item.image && (
          <div className="md:order-2 overflow-hidden bg-slate-900/20">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full max-h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
        <div className="p-6 md:p-10 md:order-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-[10px] font-bold uppercase tracking-wider">
              ★ Featured
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border bg-white/95 ${categoryStyles[item.category] ?? "text-slate-700 border-slate-200"}`}>
              {item.category}
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-black leading-tight mb-3 max-w-3xl">
            {item.title}
          </h2>
          <p className="text-white/85 text-sm md:text-base max-w-2xl leading-relaxed mb-4">
            {item.summary}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {item.date}
            </span>
            <span className="flex items-center gap-1.5 font-semibold group-hover:gap-2 transition-all">
              Read more <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function NewsArticleCard({ item, delay }: { item: DistrictNewsItem; delay: number }) {
  return (
    <article
      className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer animate-fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${categoryStyles[item.category]}`}>
          {item.category}
        </span>
        <time className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <Calendar size={10} />
          {item.date}
        </time>
      </div>
      <h3 className="font-display text-base md:text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-sky-700 transition-colors line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{item.summary}</p>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-sky-600 group-hover:gap-1.5 flex items-center gap-1 transition-all">
          Read article <ArrowRight size={11} />
        </span>
      </div>
    </article>
  );
}
