import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleNews } from "@/data/sampleNews";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Clock, Flame, Zap } from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const heroNews = sampleNews[0];
  const sideNews = sampleNews.slice(1, 6);
  const trendingNews = sampleNews.slice(1, 5);
  const latestNews = sampleNews.slice(6, 12);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Breaking News */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-2">
          <div className="flex items-center gap-2 animate-fade-up">
            <span className="flex items-center gap-1 bg-destructive text-destructive-foreground px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider animate-pulse">
              <Zap size={10} /> {t("Breaking", "முக்கிய")}
            </span>
            <p className="text-sm font-semibold truncate">{t(heroNews.title_en, heroNews.title_ta)}</p>
          </div>
        </div>

        {/* Hero Grid — dense Google Trends style */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main hero */}
            <div className="lg:col-span-8 animate-fade-up">
              <div className="hero-card aspect-[16/9] relative group cursor-pointer">
                <img src={heroNews.image} alt={t(heroNews.title_en, heroNews.title_ta)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-7">
                  <div className="flex gap-2 mb-2">
                    <span className="district-tag bg-white/20 text-white backdrop-blur-sm">{heroNews.district}</span>
                    <span className="category-tag bg-white/20 text-white backdrop-blur-sm">{heroNews.category}</span>
                  </div>
                  <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight mb-2 story-link">
                    {t(heroNews.title_en, heroNews.title_ta)}
                  </h1>
                  <p className="text-sm text-white/80 line-clamp-2 max-w-lg">{t(heroNews.summary_en, heroNews.summary_ta)}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                    <Clock size={11} /> <span>{heroNews.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side stories — compact list */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {sideNews.map((article, i) => (
                <div key={article.id} className="news-card-v2 group cursor-pointer animate-fade-up" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
                  <div className="flex gap-2.5 p-2.5">
                    {article.image && (
                      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="district-tag w-fit mb-0.5 text-[8px]">{article.district}</span>
                      <h3 className="font-display text-[11px] font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {t(article.title_en, article.title_ta)}
                      </h3>
                      <span className="text-[9px] text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock size={8} /> {article.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending — horizontal strip */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 mb-3 animate-fade-up">
            <Flame size={16} className="text-primary" />
            <h2 className="section-heading text-lg">{t("Trending Now", "இப்போது பிரபலமானவை")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trendingNews.map((article, i) => (
              <div key={`trending-${article.id}`} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-muted/60 transition-colors animate-fade-up cursor-pointer group" style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="font-display text-2xl font-black text-primary/20 leading-none mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-xs font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{t(article.title_en, article.title_ta)}</h3>
                  <span className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Clock size={9} /> {article.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 pb-4">
          <Link to="/candidates-2026" className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary text-white rounded-xl px-5 py-4 group hover:shadow-lg transition-all duration-500 animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-float">🗳</span>
              <div>
                <div className="font-display text-base md:text-lg font-bold">{t("Election 2026 — Full Candidate List", "தேர்தல் 2026 — முழு வேட்பாளர் பட்டியல்")}</div>
                <div className="font-tamil text-[11px] opacity-80">{t("234 constituencies · All major parties", "234 தொகுதிகள் · அனைத்து முக்கிய கட்சிகள்")}</div>
              </div>
            </div>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </section>

        {/* Latest News Grid — high density */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="animate-fade-up">
              <h2 className="section-heading text-lg">{t("Latest News", "சமீபத்திய செய்திகள்")}</h2>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <TrendingUp size={13} />
              <span>{t("View All", "அனைத்தும்")}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((article, i) => (
              <div key={article.id} className="news-card-v2 animate-fade-up group cursor-pointer" style={{ animationDelay: `${i * 0.06}s` }}>
                {article.image && (
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={article.image} alt={t(article.title_en, article.title_ta)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="district-tag bg-white/90 backdrop-blur-sm text-[8px]">{article.district}</span>
                      <span className="category-tag bg-white/90 backdrop-blur-sm text-[8px]">{article.category}</span>
                    </div>
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-display text-sm font-bold leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">{t(article.title_en, article.title_ta)}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{t(article.summary_en, article.summary_ta)}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={9} /> {article.date}</span>
                    <span className="text-[10px] text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{t("Read more →", "மேலும் →")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Districts grid — compact */}
        <section className="bg-muted/40 py-8 px-4 md:px-6">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="section-heading text-lg mb-5 animate-fade-up">{t("Explore Districts", "மாவட்டங்களை ஆராயுங்கள்")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { path: "/erode", label: "Erode", emoji: "🌾", color: "from-amber-500 to-orange-600" },
                { path: "/coimbatore", label: "Coimbatore", emoji: "🏭", color: "from-blue-500 to-indigo-600" },
                { path: "/tiruppur", label: "Tiruppur", emoji: "👕", color: "from-teal-500 to-emerald-600" },
                { path: "/salem", label: "Salem", emoji: "⚙️", color: "from-gray-600 to-slate-700" },
                { path: "/namakkal", label: "Namakkal", emoji: "🥚", color: "from-yellow-500 to-amber-600" },
                { path: "/nilgiris", label: "Nilgiris", emoji: "🍃", color: "from-green-500 to-emerald-700" },
                { path: "/karur", label: "Karur", emoji: "🧵", color: "from-purple-500 to-violet-600" },
                { path: "/dharmapuri", label: "Dharmapuri", emoji: "🥭", color: "from-orange-500 to-red-600" },
              ].map((d, i) => (
                <Link key={d.path} to={d.path} className="animate-scale-in group relative overflow-hidden rounded-xl p-4 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg" style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-90`} />
                  <div className="relative z-10">
                    <div className="text-2xl mb-1 group-hover:animate-float">{d.emoji}</div>
                    <div className="font-display text-sm font-bold">{d.label}</div>
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
