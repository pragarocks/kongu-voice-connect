import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { sampleNews } from "@/data/sampleNews";

interface DistrictInfo {
  en: string;
  ta: string;
  epithet_en: string;
  epithet_ta: string;
}

const districtData: Record<string, DistrictInfo> = {
  erode: { en: "Erode", ta: "ஈரோடு", epithet_en: "Turmeric Capital of India", epithet_ta: "இந்தியாவின் மஞ்சள் தலைநகர்" },
  coimbatore: { en: "Coimbatore", ta: "கோயம்புத்தூர்", epithet_en: "Manchester of South India", epithet_ta: "தென்னிந்தியாவின் மான்செஸ்டர்" },
  tiruppur: { en: "Tiruppur", ta: "திருப்பூர்", epithet_en: "Knitwear Capital of India", epithet_ta: "இந்தியாவின் நிட்வேர் தலைநகர்" },
  salem: { en: "Salem", ta: "சேலம்", epithet_en: "Steel City of Tamil Nadu", epithet_ta: "தமிழ்நாட்டின் எஃகு நகரம்" },
  namakkal: { en: "Namakkal", ta: "நாமக்கல்", epithet_en: "Egg Capital of India", epithet_ta: "இந்தியாவின் முட்டை தலைநகர்" },
  nilgiris: { en: "Nilgiris", ta: "நீலகிரி", epithet_en: "Queen of Hill Stations", epithet_ta: "மலை நிலையங்களின் ராணி" },
  karur: { en: "Karur", ta: "கரூர்", epithet_en: "Textile Capital of Tamil Nadu", epithet_ta: "தமிழ்நாட்டின் ஜவுளி தலைநகர்" },
  dharmapuri: { en: "Dharmapuri", ta: "தர்மபுரி", epithet_en: "Mango Capital of Tamil Nadu", epithet_ta: "தமிழ்நாட்டின் மாம்பழ தலைநகர்" },
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
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="hero-gradient py-10 px-4 md:px-6 border-b-[3px] border-primary">
          <div className="max-w-[1280px] mx-auto animate-slide-in">
            <div className="text-xs text-white/40 mb-2">
              <span className="text-primary">Home</span> › {info.en}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-white">
              {info.en} <span className="text-primary">·</span>{" "}
              <span className="font-tamil">{info.ta}</span>
            </h1>
            <p className="text-lg text-white/60 mt-2 italic">
              {t(info.epithet_en, info.epithet_ta)}
            </p>
          </div>
        </div>

        {/* Categories */}
        <section className="py-6 px-4 md:px-6 border-b border-border">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <span key={cat} className="category-badge text-sm px-4 py-1.5 cursor-pointer hover:bg-secondary/20 transition-colors">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* News */}
        <section className="py-8 px-4 md:px-6">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-2xl font-bold mb-6">
              {t(`Latest from ${info.en}`, `${info.ta} செய்திகள்`)}
            </h2>
            {news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {news.map((article, i) => (
                  <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <NewsCard article={article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <div className="text-4xl mb-3">📰</div>
                <p className="text-lg font-semibold">{t("More news coming soon", "மேலும் செய்திகள் விரைவில்")}</p>
                <p className="text-sm mt-1">{t(`Stay tuned for the latest from ${info.en}`, `${info.ta} செய்திகளுக்கு காத்திருங்கள்`)}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
