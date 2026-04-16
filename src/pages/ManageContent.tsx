import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Edit2, X, Check, Newspaper } from "lucide-react";

const DISTRICTS = ["erode", "coimbatore", "tiruppur", "salem", "namakkal", "nilgiris", "karur", "dharmapuri"] as const;

const CATEGORIES = ["Election", "Industry", "Infrastructure", "Culture", "Education", "Sports", "Health"] as const;

interface ManagedArticle {
  id: string;
  title_en: string;
  title_ta: string;
  summary_en: string;
  summary_ta: string;
  district: string;
  category: string;
  date: string;
  image: string;
}

const STORAGE_KEY = "kongu-times-managed-content";

function loadArticles(): ManagedArticle[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveArticles(articles: ManagedArticle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

const emptyArticle: Omit<ManagedArticle, "id"> = {
  title_en: "", title_ta: "", summary_en: "", summary_ta: "",
  district: "erode", category: "Election",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  image: "",
};

export default function ManageContent() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<ManagedArticle[]>(loadArticles);
  const [activeDistrict, setActiveDistrict] = useState<string>("erode");
  const [editing, setEditing] = useState<ManagedArticle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { saveArticles(articles); }, [articles]);

  const districtArticles = articles.filter(a => a.district.toLowerCase() === activeDistrict);

  const startNew = () => {
    setEditing({ ...emptyArticle, id: crypto.randomUUID(), district: activeDistrict });
    setIsNew(true);
  };

  const startEdit = (article: ManagedArticle) => {
    setEditing({ ...article });
    setIsNew(false);
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      setArticles(prev => [...prev, editing]);
    } else {
      setArticles(prev => prev.map(a => a.id === editing.id ? editing : a));
    }
    setEditing(null);
    setIsNew(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const cancelEdit = () => {
    setEditing(null);
    setIsNew(false);
  };

  const updateField = (field: keyof ManagedArticle, value: string) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <Newspaper size={24} className="text-primary" />
              <div>
                <h1 className="font-display text-3xl font-black">
                  {t("Manage Content", "உள்ளடக்கத்தை நிர்வகிக்கவும்")}
                </h1>
                <p className="text-background/50 text-sm mt-1">
                  {t("Add, edit, and manage news content for each district", "ஒவ்வொரு மாவட்டத்திற்கும் செய்தி உள்ளடக்கத்தை நிர்வகிக்கவும்")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* District tabs */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {DISTRICTS.map(d => (
              <button
                key={d}
                onClick={() => { setActiveDistrict(d); setEditing(null); }}
                className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all capitalize ${
                  activeDistrict === d
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Add button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold capitalize">
              {activeDistrict} — {districtArticles.length} {t("articles", "கட்டுரைகள்")}
            </h2>
            <button
              onClick={startNew}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} /> {t("Add Article", "கட்டுரை சேர்")}
            </button>
          </div>

          {saved && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 animate-fade-up">
              <Check size={14} /> {t("Content saved successfully!", "உள்ளடக்கம் வெற்றிகரமாக சேமிக்கப்பட்டது!")}
            </div>
          )}

          {/* Editor */}
          {editing && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-scale-in shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold">
                  {isNew ? t("New Article", "புதிய கட்டுரை") : t("Edit Article", "கட்டுரையைத் திருத்து")}
                </h3>
                <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Title (English)</label>
                  <input value={editing.title_en} onChange={e => updateField("title_en", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Title (Tamil)</label>
                  <input value={editing.title_ta} onChange={e => updateField("title_ta", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background font-tamil" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Summary (English)</label>
                  <textarea value={editing.summary_en} onChange={e => updateField("summary_en", e.target.value)} rows={3}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background resize-none" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Summary (Tamil)</label>
                  <textarea value={editing.summary_ta} onChange={e => updateField("summary_ta", e.target.value)} rows={3}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background resize-none font-tamil" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Category</label>
                  <select value={editing.category} onChange={e => updateField("category", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Date</label>
                  <input value={editing.date} onChange={e => updateField("date", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Image URL</label>
                  <input value={editing.image} onChange={e => updateField("image", e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button onClick={cancelEdit} className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground rounded-full border border-border">
                  {t("Cancel", "ரத்து")}
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-bold hover:bg-primary/90 transition-colors">
                  <Save size={13} /> {t("Save", "சேமி")}
                </button>
              </div>
            </div>
          )}

          {/* Articles list */}
          {districtArticles.length > 0 ? (
            <div className="space-y-3">
              {districtArticles.map((article, i) => (
                <div key={article.id} className="bg-card border border-border/50 rounded-xl p-4 flex gap-4 items-start hover:shadow-md transition-all animate-fade-up group" style={{ animationDelay: `${i * 0.05}s` }}>
                  {article.image && (
                    <img src={article.image} alt="" className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="category-tag text-[8px]">{article.category}</span>
                      <span className="text-[10px] text-muted-foreground">{article.date}</span>
                    </div>
                    <h4 className="text-sm font-bold line-clamp-1">{article.title_en}</h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{article.summary_en}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(article)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground animate-fade-up">
              <Newspaper size={40} className="mx-auto mb-3 text-muted-foreground/20" />
              <p className="font-display text-lg font-bold mb-2">{t("No articles yet", "இன்னும் கட்டுரைகள் இல்லை")}</p>
              <p className="text-sm">{t("Click 'Add Article' to create your first article for this district.", "இந்த மாவட்டத்திற்கான முதல் கட்டுரையை உருவாக்க 'கட்டுரை சேர்' என்பதைக் கிளிக் செய்யுங்கள்.")}</p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
