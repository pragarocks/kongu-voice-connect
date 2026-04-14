import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleNews } from "@/data/sampleNews";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Clock, Newspaper } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const heroNews = sampleNews[0];
  const sideNews = sampleNews.slice(1, 4);
  const latestNews = sampleNews.slice(4);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Brand watermark */}
      <div className="brand-watermark">THE KONGU TIMES</div>

      <SiteHeader />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Main hero */}
            <div className="lg:col-span-3 animate-fade-up">
              <div className="hero-card aspect-[16/10] relative">
                <img
                  src={heroNews.image}
                  alt={t(heroNews.title_en, heroNews.title_ta)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex gap-2 mb-3">
                    <span className="district-tag">{heroNews.district}</span>
                    <span className="category-tag">{heroNews.category}</span>
                  </div>
                  <h1 className="font-display text-2xl md:text-3xl font-black text-white leading-tight mb-2 story-link">
                    {t(heroNews.title_en, heroNews.title_ta)}
                  </h1>
                  <p className="text-sm text-white/70 line-clamp-2 max-w-lg">
                    {t(heroNews.summary_en, heroNews.summary_ta)}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
                    <Clock size={12} /> <span>{heroNews.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side stories */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {sideNews.map((article, i) => (
                <div
                  key={article.id}
                  className="news-card-v2 flex gap-3 p-3 animate-fade-up"
                  style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                >
                  {article.image && (
                    <div className="w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={article.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col justify-center min-w-0">
                    <div className="flex gap-1.5 mb-1">
                      <span className="district-tag">{article.district}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold leading-snug line-clamp-2 story-link">
                      {t(article.title_en, article.title_ta)}
                    </h3>
                    <span className="text-[11px] text-muted-foreground mt-1">{article.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 pb-6">
          <Link
            to="/candidates-2026"
            className="flex items-center justify-between bg-foreground text-background rounded-xl px-6 py-4 group hover:opacity-95 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🗳</span>
              <div>
                <div className="font-display text-lg font-bold">
                  {t("Election 2026 — Full Candidate List", "தேர்தல் 2026 — முழு வேட்பாளர் பட்டியல்")}
                </div>
                <div className="font-tamil text-xs opacity-60">
                  {t("234 constituencies · All major parties", "234 தொகுதிகள் · அனைத்து முக்கிய கட்சிகள்")}
                </div>
              </div>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* Latest News */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-heading">{t("Latest News", "சமீபத்திய செய்திகள்")}</h2>
              <p className="font-tamil text-sm text-muted-foreground mt-3">
                {t("From all Kongu districts", "அனைத்து கொங்கு மாவட்டங்களிலிருந்தும்")}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <TrendingUp size={14} />
              <span>{t("Trending", "பிரபலமான")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestNews.map((article, i) => (
              <div
                key={article.id}
                className="news-card-v2 animate-fade-up group cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {article.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={article.image}
                      alt={t(article.title_en, article.title_ta)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex gap-1.5 mb-2">
                    <span className="district-tag">{article.district}</span>
                    <span className="category-tag">{article.category}</span>
                  </div>
                  <h3 className="font-display text-[15px] font-bold leading-snug mb-2 story-link">
                    {t(article.title_en, article.title_ta)}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {t(article.summary_en, article.summary_ta)}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock size={10} /> {article.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Districts grid */}
        <section className="bg-muted/50 py-10 px-4 md:px-6">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="section-heading mb-8">{t("Explore Districts", "மாவட்டங்களை ஆராயுங்கள்")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { path: "/erode", en: "Erode", ta: "ஈரோடு", emoji: "🌾", color: "from-amber-500 to-orange-600" },
                { path: "/coimbatore", en: "Coimbatore", ta: "கோயம்புத்தூர்", emoji: "🏭", color: "from-blue-500 to-indigo-600" },
                { path: "/tiruppur", en: "Tiruppur", ta: "திருப்பூர்", emoji: "👕", color: "from-teal-500 to-emerald-600" },
                { path: "/salem", en: "Salem", ta: "சேலம்", emoji: "⚙️", color: "from-gray-600 to-slate-700" },
                { path: "/namakkal", en: "Namakkal", ta: "நாமக்கல்", emoji: "🥚", color: "from-yellow-500 to-amber-600" },
                { path: "/nilgiris", en: "Nilgiris", ta: "நீலகிரி", emoji: "🍃", color: "from-green-500 to-emerald-700" },
                { path: "/karur", en: "Karur", ta: "கரூர்", emoji: "🧵", color: "from-purple-500 to-violet-600" },
                { path: "/dharmapuri", en: "Dharmapuri", ta: "தர்மபுரி", emoji: "🥭", color: "from-orange-500 to-red-600" },
              ].map((d, i) => (
                <Link
                  key={d.path}
                  to={d.path}
                  className="animate-scale-in group relative overflow-hidden rounded-xl p-5 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-90`} />
                  <div className="relative z-10">
                    <div className="text-2xl mb-2">{d.emoji}</div>
                    <div className="font-display text-base font-bold">{d.en}</div>
                    <div className="font-tamil text-xs opacity-80">{d.ta}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
