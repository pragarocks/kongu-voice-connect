import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleNews } from "@/data/sampleNews";
import { Clock, ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

interface DistrictInfo {
  en: string;
  ta: string;
  epithet_en: string;
  epithet_ta: string;
  emoji: string;
  color: string;
}

const districtData: Record<string, DistrictInfo> = {
  erode: { en: "Erode", ta: "ஈரோடு", epithet_en: "Turmeric Capital of India", epithet_ta: "இந்தியாவின் மஞ்சள் தலைநகர்", emoji: "🌾", color: "from-amber-500 to-orange-600" },
  coimbatore: { en: "Coimbatore", ta: "கோயம்புத்தூர்", epithet_en: "Manchester of South India", epithet_ta: "தென்னிந்தியாவின் மான்செஸ்டர்", emoji: "🏭", color: "from-blue-500 to-indigo-600" },
  tiruppur: { en: "Tiruppur", ta: "திருப்பூர்", epithet_en: "Knitwear Capital of India", epithet_ta: "இந்தியாவின் நிட்வேர் தலைநகர்", emoji: "👕", color: "from-teal-500 to-emerald-600" },
  salem: { en: "Salem", ta: "சேலம்", epithet_en: "Steel City of Tamil Nadu", epithet_ta: "தமிழ்நாட்டின் எஃகு நகரம்", emoji: "⚙️", color: "from-gray-600 to-slate-700" },
  namakkal: { en: "Namakkal", ta: "நாமக்கல்", epithet_en: "Egg Capital of India", epithet_ta: "இந்தியாவின் முட்டை தலைநகர்", emoji: "🥚", color: "from-yellow-500 to-amber-600" },
  nilgiris: { en: "Nilgiris", ta: "நீலகிரி", epithet_en: "Queen of Hill Stations", epithet_ta: "மலை நிலையங்களின் ராணி", emoji: "🍃", color: "from-green-500 to-emerald-700" },
  karur: { en: "Karur", ta: "கரூர்", epithet_en: "Textile Capital of Tamil Nadu", epithet_ta: "தமிழ்நாட்டின் ஜவுளி தலைநகர்", emoji: "🧵", color: "from-purple-500 to-violet-600" },
  dharmapuri: { en: "Dharmapuri", ta: "தர்மபுரி", epithet_en: "Mango Capital of Tamil Nadu", epithet_ta: "தமிழ்நாட்டின் மாம்பழ தலைநகர்", emoji: "🥭", color: "from-orange-500 to-red-600" },
};

export default function DistrictPage({ district }: { district: string }) {
  const { t } = useLanguage();
  const info = districtData[district];
  const news = sampleNews.filter(
    (n) => n.district.toLowerCase() === district.toLowerCase()
  );

  if (!info) return null;

  const categories = ["Election", "Infrastructure", "Industry", "Culture"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="page-hero-clean">
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="text-xs text-muted-foreground mb-4 animate-fade-up">
              <Link to="/" className="text-primary font-semibold hover:underline">Home</Link>
              <span className="mx-2">›</span>
              {info.en}
            </div>
            <div className="flex items-center gap-4 animate-fade-up">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-3xl shadow-lg animate-float`}>
                {info.emoji}
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-black leading-none">
                  {info.en}
                  <span className="text-primary mx-2">·</span>
                  <span className="font-tamil">{info.ta}</span>
                </h1>
                <p className="text-base text-muted-foreground mt-1 italic">
                  {t(info.epithet_en, info.epithet_ta)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-border">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} className="text-xs font-semibold px-4 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-200">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
          <h2 className="section-heading mb-8">
            {t(`Latest from ${info.en}`, `${info.ta} செய்திகள்`)}
          </h2>
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.map((article, i) => (
                <div
                  key={article.id}
                  className="news-card-v2 group cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {article.image && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={article.image} alt={t(article.title_en, article.title_ta)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex gap-1.5 mb-2">
                      <span className="district-tag">{article.district}</span>
                      <span className="category-tag">{article.category}</span>
                    </div>
                    <h3 className="font-display text-base font-bold leading-snug mb-2 story-link">
                      {t(article.title_en, article.title_ta)}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {t(article.summary_en, article.summary_ta)}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock size={10} /> {article.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground animate-fade-up">
              <Newspaper size={48} className="mx-auto mb-4 text-muted-foreground/20" />
              <p className="font-display text-xl font-bold">{t("More news coming soon", "மேலும் செய்திகள் விரைவில்")}</p>
              <p className="text-sm mt-2 max-w-sm mx-auto">{t(`Stay tuned for the latest updates from ${info.en}. Our reporters are on the ground.`, `${info.ta} பற்றிய சமீபத்திய செய்திகளுக்கு காத்திருங்கள்.`)}</p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
