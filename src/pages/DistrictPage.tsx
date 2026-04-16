import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleNews } from "@/data/sampleNews";
import { Clock, Newspaper } from "lucide-react";

interface DistrictInfo {
  en: string;
  ta: string;
  emoji: string;
  color: string;
}

const districtData: Record<string, DistrictInfo> = {
  erode: { en: "Erode", ta: "ஈரோடு", emoji: "🌾", color: "from-amber-500 to-orange-600" },
  coimbatore: { en: "Coimbatore", ta: "கோயம்புத்தூர்", emoji: "🏭", color: "from-blue-500 to-indigo-600" },
  tiruppur: { en: "Tiruppur", ta: "திருப்பூர்", emoji: "👕", color: "from-teal-500 to-emerald-600" },
  salem: { en: "Salem", ta: "சேலம்", emoji: "⚙️", color: "from-gray-600 to-slate-700" },
  namakkal: { en: "Namakkal", ta: "நாமக்கல்", emoji: "🥚", color: "from-yellow-500 to-amber-600" },
  nilgiris: { en: "Nilgiris", ta: "நீலகிரி", emoji: "🍃", color: "from-green-500 to-emerald-700" },
  karur: { en: "Karur", ta: "கரூர்", emoji: "🧵", color: "from-purple-500 to-violet-600" },
  dharmapuri: { en: "Dharmapuri", ta: "தர்மபுரி", emoji: "🥭", color: "from-orange-500 to-red-600" },
};

export default function DistrictPage({ district }: { district: string }) {
  const { t } = useLanguage();
  const info = districtData[district];
  const news = sampleNews.filter((n) => n.district.toLowerCase() === district.toLowerCase());

  if (!info) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Compact district header */}
        <div className="border-b border-border bg-muted/30">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-xl shadow`}>
              {info.emoji}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-black leading-none">
              {t(info.en, info.ta)}
            </h1>
          </div>
        </div>

        {/* News grid — starts immediately */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
          {news.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((article, i) => (
                <div key={article.id} className="news-card-v2 group cursor-pointer animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  {article.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={article.image} alt={t(article.title_en, article.title_ta)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-3">
                    <span className="category-tag text-[8px] mb-1 inline-block">{article.category}</span>
                    <h3 className="font-display text-sm font-bold leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                      {t(article.title_en, article.title_ta)}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{t(article.summary_en, article.summary_ta)}</p>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={9} /> {article.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground animate-fade-up">
              <Newspaper size={40} className="mx-auto mb-3 text-muted-foreground/20" />
              <p className="font-display text-lg font-bold">{t("More news coming soon", "மேலும் செய்திகள் விரைவில்")}</p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
