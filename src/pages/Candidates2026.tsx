import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { candidates } from "@/data/candidates";
import { useState, useMemo } from "react";
import { Search, BarChart3, Users, MapPin, Vote, LayoutGrid, Table } from "lucide-react";
import { Link } from "react-router-dom";

const partyFilters = ["All", "DMK", "AIADMK", "TVK", "NTK"] as const;

export default function CandidatesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [partyFilter, setPartyFilter] = useState<string>("All");

  const filtered = useMemo(() => candidates.filter(
    (c) =>
      (c.con.toLowerCase().includes(search.toLowerCase()) ||
      c.dmk.toLowerCase().includes(search.toLowerCase()) ||
      c.aiadmk.toLowerCase().includes(search.toLowerCase()) ||
      c.tvk.toLowerCase().includes(search.toLowerCase()) ||
      c.ntk.toLowerCase().includes(search.toLowerCase()) ||
      c.ac.toString().includes(search))
  ), [search]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden py-14 md:py-20 px-4 md:px-6">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
          
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="text-xs text-muted-foreground mb-4 animate-fade-up">
              <Link to="/" className="text-primary font-semibold hover:underline">Home</Link>
              <span className="mx-2">›</span>
              Candidates 2026
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                  <Vote size={12} className="animate-pulse" />
                  {t("ELECTION 2026", "தேர்தல் 2026")}
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-black leading-none mb-3">
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
                {[
                  { icon: BarChart3, value: "234", label: t("Seats", "இடங்கள்"), color: "text-primary" },
                  { icon: Users, value: "4", label: t("Parties", "கட்சிகள்"), color: "text-accent" },
                  { icon: MapPin, value: "38", label: t("Districts", "மாவட்டங்கள்"), color: "text-secondary" },
                ].map((stat, i) => (
                  <div key={stat.label} className="stat-bubble bg-card border border-border hover:border-primary/20" style={{ animationDelay: `${i * 0.1}s` }}>
                    <stat.icon size={18} className={`${stat.color} mb-1`} />
                    <span className="text-2xl font-black animate-count-up" style={{ animationDelay: `${i * 0.15}s` }}>{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-5 sticky top-[60px] z-30 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Party filters */}
            <div className="flex gap-2 flex-wrap">
              {partyFilters.map((party) => (
                <button
                  key={party}
                  onClick={() => setPartyFilter(party)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${
                    partyFilter === party
                      ? party === "DMK" ? "pill-dmk" 
                      : party === "AIADMK" ? "pill-aiadmk"
                      : party === "TVK" ? "pill-tvk"
                      : party === "NTK" ? "pill-ntk"
                      : "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {party === "All" ? t("All Parties", "அனைத்தும்") : party}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("Search constituency or candidate...", "தொகுதி / வேட்பாளர் தேடுங்கள்...")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-muted border-0 rounded-full pl-9 pr-4 py-2.5 text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="flex bg-muted rounded-full p-0.5">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-2 rounded-full transition-all ${viewMode === "cards" ? "bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-full transition-all ${viewMode === "table" ? "bg-foreground text-background" : "text-muted-foreground"}`}
                >
                  <Table size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3">
          <span className="text-xs text-muted-foreground">
            {t(`Showing ${filtered.length} of 234 constituencies`, `234 தொகுதிகளில் ${filtered.length} காட்டப்படுகிறது`)}
          </span>
        </div>

        {/* Card View */}
        {viewMode === "cards" ? (
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((c, i) => (
                <div
                  key={c.ac}
                  className="candidate-row animate-fade-up group relative"
                  style={{ animationDelay: `${Math.min(i * 0.02, 0.6)}s` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="font-display text-lg font-black text-primary/60">{c.ac}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-bold mb-3 group-hover:text-primary transition-colors duration-300">{c.con}</h3>
                        <div className="grid grid-cols-2 gap-1.5">
                          <span className="pill-dmk text-[11px] truncate">{c.dmk}</span>
                          <span className="pill-aiadmk text-[11px] truncate">{c.aiadmk}</span>
                          <span className="pill-tvk text-[11px] truncate">{c.tvk}</span>
                          <span className="pill-ntk text-[11px] truncate">{c.ntk}</span>
                        </div>
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
            <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
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
                      className="animate-fade-up hover:bg-primary/[0.04] transition-colors even:bg-muted/30 group"
                      style={{ animationDelay: `${Math.min(i * 0.015, 0.8)}s` }}
                    >
                      <td className="px-3 py-3 border-b border-border/30 font-bold text-muted-foreground text-[11px]">{c.ac}</td>
                      <td className="px-3 py-3 border-b border-border/30 font-bold group-hover:text-primary transition-colors">{c.con}</td>
                      <td className="px-3 py-3 border-b border-border/30"><span className="pill-dmk text-[11px]">{c.dmk}</span></td>
                      <td className="px-3 py-3 border-b border-border/30"><span className="pill-aiadmk text-[11px]">{c.aiadmk}</span></td>
                      <td className="px-3 py-3 border-b border-border/30"><span className="pill-tvk text-[11px]">{c.tvk}</span></td>
                      <td className="px-3 py-3 border-b border-border/30"><span className="pill-ntk text-[11px]">{c.ntk}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground animate-fade-up">
            <Search size={40} className="mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-lg font-semibold">{t("No candidates found", "வேட்பாளர்கள் காணப்படவில்லை")}</p>
            <p className="text-sm mt-1">{t("Try a different search term", "வேறு தேடல் சொல்லை முயற்சிக்கவும்")}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
