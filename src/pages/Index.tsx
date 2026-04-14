import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleNews } from "@/data/sampleNews";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { t } = useLanguage();
  const heroNews = sampleNews.slice(0, 3);
  const latestNews = sampleNews.slice(3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-10 px-4 md:px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-black text-white mb-1">
              {t("Top Stories", "முக்கிய செய்திகள்")}
            </h1>
            <p className="font-tamil text-sm text-white/50 mb-6">
              {t("Breaking news from the Kongu region", "கொங்கு மண்டலத்தின் அண்மைய செய்திகள்")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {heroNews.map((article, i) => (
                <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="news-card bg-white/10 backdrop-blur border-white/10">
                    {article.image && (
                      <div className="aspect-video overflow-hidden">
                        <img src={article.image} alt={t(article.title_en, article.title_ta)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/30 text-primary-foreground">{article.district}</span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-foreground">{article.category}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold leading-tight mb-2 text-white">
                        {t(article.title_en, article.title_ta)}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2">{t(article.summary_en, article.summary_ta)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-6 px-4 md:px-6 border-b border-border">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex gap-3 flex-wrap justify-center">
              <Link to="/candidates-2026" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body text-sm font-bold hover:opacity-90 transition-opacity animate-pulse-glow">
                🗳 {t("View All Candidates 2026", "2026 வேட்பாளர்கள் அனைத்தையும் காண")}
              </Link>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="py-8 px-4 md:px-6">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-2xl font-bold mb-1">{t("Latest News", "சமீபத்திய செய்திகள்")}</h2>
            <p className="font-tamil text-sm text-muted-foreground mb-6">{t("From all Kongu districts", "அனைத்து கொங்கு மாவட்டங்களிலிருந்தும்")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestNews.map((article, i) => (
                <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
