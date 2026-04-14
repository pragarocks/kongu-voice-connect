import { useLanguage } from "@/contexts/LanguageContext";

interface NewsArticle {
  id: string;
  title_en: string;
  title_ta: string;
  summary_en: string;
  summary_ta: string;
  district: string;
  category: string;
  image?: string;
  date: string;
}

export default function NewsCard({ article }: { article: NewsArticle }) {
  const { t } = useLanguage();

  return (
    <div className="news-card animate-fade-in-up">
      {article.image && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img src={article.image} alt={t(article.title_en, article.title_ta)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <span className="district-badge">{article.district}</span>
          <span className="category-badge">{article.category}</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-tight mb-2">
          {t(article.title_en, article.title_ta)}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {t(article.summary_en, article.summary_ta)}
        </p>
        <time className="text-xs text-muted-foreground">{article.date}</time>
      </div>
    </div>
  );
}

export type { NewsArticle };
