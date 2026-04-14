import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { candidates } from "@/data/candidates";
import { useState, useMemo } from "react";
import { Search, ChevronDown, BarChart3, Users, MapPin, Vote } from "lucide-react";

export default function CandidatesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  const filtered = useMemo(() => candidates.filter(
    (c) =>
      c.con.toLowerCase().includes(search.toLowerCase()) ||
      c.dmk.toLowerCase().includes(search.toLowerCase()) ||
      c.aiadmk.toLowerCase().includes(search.toLowerCase()) ||
      c.tvk.toLowerCase().includes(search.toLowerCase()) ||
      c.ntk.toLowerCase().includes(search.toLowerCase()) ||
      c.ac.toString().includes(search)
  ), [search]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="page-hero-clean">
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="text-xs text-muted-foreground mb-4 animate-fade-up">
              <span className="text-primary font-semibold">Home</span>
              <span className="mx-2">›</span>
              Candidates 2026
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <Vote size={12} />
                  {t("ELECTION 2026", "தேர்தல் 2026")}
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-black leading-none mb-2">
                  <span className="shimmer-text">{t("Candidates", "வேட்பாளர்கள்")}</span>
                  <span className="text-primary ml-3">2026</span>
                </h1>
                <p className="font-tamil text-base text-muted-foreground mt-2">
                  2026 தமிழ்நாடு சட்டமன்றத் தேர்தல் — வேட்பாளர்கள் பட்டியல்
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("All 234 constituencies · Polling: April 23, 2026 · Results: May 4, 2026", "அனைத்து 234 தொகுதிகள் · வாக்குப்பதிவு: ஏப்ரல் 23 · முடிவுகள்: மே 4")}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="stat-bubble bg-card border border-border">
                  <BarChart3 size={18} className="text-primary mb-1" />
                  <span className="text-2xl font-black animate-count-up">234</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("Seats", "இடங்கள்")}</span>
                </div>
                <div className="stat-bubble bg-card border border-border">
                  <Users size={18} className="text-accent mb-1" />
                  <span className="text-2xl font-black animate-count-up" style={{ animationDelay: "0.1s" }}>4</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("Parties", "கட்சிகள்")}</span>
                </div>
                <div className="stat-bubble bg-card border border-border">
                  <MapPin size={18} className="text-secondary mb-1" />
                  <span className="text-2xl font-black animate-count-up" style={{ animationDelay: "0.2s" }}>38</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("Districts", "மாவட்டங்கள்")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Party legend + Search */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="pill-dmk">DMK (SPA)</span>
              <span className="pill-aiadmk">AIADMK (NDA)</span>
              <span className="pill-tvk">TVK</span>
              <span className="pill-ntk">NTK</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("Search constituency or candidate...", "தொகுதி / வேட்பாளர் தேடுங்கள்...")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-muted border-0 rounded-full pl-9 pr-4 py-2 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="flex bg-muted rounded-full p-0.5">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${viewMode === "cards" ? "bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${viewMode === "table" ? "bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-2">
          <span className="text-xs text-muted-foreground">
            {t(`Showing ${filtered.length} of 234 constituencies`, `234 தொகுதிகளில் ${filtered.length} காட்டப்படுகிறது`)}
          </span>
        </div>

        {/* Card View */}
        {viewMode === "cards" ? (
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((c, i) => (
                <div
                  key={c.ac}
                  className="candidate-row animate-fade-up group"
                  style={{ animationDelay: `${Math.min(i * 0.02, 0.6)}s` }}
                >
                  <div className="flex items-start gap-4">
                    {/* AC number */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                      <span className="font-display text-lg font-black text-foreground/30">{c.ac}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base font-bold mb-2.5 group-hover:text-primary transition-colors">{c.con}</h3>
                      <div className="grid grid-cols-2 gap-1.5">
                        <span className="pill-dmk text-[11px] truncate">{c.dmk}</span>
                        <span className="pill-aiadmk text-[11px] truncate">{c.aiadmk}</span>
                        <span className="pill-tvk text-[11px] truncate">{c.tvk}</span>
                        <span className="pill-ntk text-[11px] truncate">{c.ntk}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Table View */
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-12 overflow-x-auto">
            <div className="rounded-xl border border-border overflow-hidden shadow-sm">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr>
                    <th className="bg-foreground text-background/60 p-3 text-left text-[10px] font-bold tracking-widest uppercase w-14">AC</th>
                    <th className="bg-foreground text-background/60 p-3 text-left text-[10px] font-bold tracking-widest uppercase">{t("Constituency", "தொகுதி")}</th>
                    <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #2d0000, #CC0000)", color: "#FFD4D4" }}>DMK (SPA)</th>
                    <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #0a2e14, #228B22)", color: "#C8FFC8" }}>AIADMK (NDA)</th>
                    <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #8B4513, #DAA520)", color: "#FFFACD" }}>TVK</th>
                    <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #4a0010, #8B0000)", color: "#FFB3C1" }}>NTK</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr
                      key={c.ac}
                      className="animate-fade-up hover:bg-primary/[0.03] transition-colors even:bg-muted/30"
                      style={{ animationDelay: `${Math.min(i * 0.015, 0.8)}s` }}
                    >
                      <td className="px-3 py-2.5 border-b border-border/30 font-bold text-muted-foreground text-[11px]">{c.ac}</td>
                      <td className="px-3 py-2.5 border-b border-border/30 font-bold">{c.con}</td>
                      <td className="px-3 py-2.5 border-b border-border/30"><span className="pill-dmk text-[11px]">{c.dmk}</span></td>
                      <td className="px-3 py-2.5 border-b border-border/30"><span className="pill-aiadmk text-[11px]">{c.aiadmk}</span></td>
                      <td className="px-3 py-2.5 border-b border-border/30"><span className="pill-tvk text-[11px]">{c.tvk}</span></td>
                      <td className="px-3 py-2.5 border-b border-border/30"><span className="pill-ntk text-[11px]">{c.ntk}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Search size={32} className="mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-lg font-semibold">{t("No candidates found", "வேட்பாளர்கள் காணப்படவில்லை")}</p>
            <p className="text-sm mt-1">{t("Try a different search term", "வேறு தேடல் சொல்லை முயற்சிக்கவும்")}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
