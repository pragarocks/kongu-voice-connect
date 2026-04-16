import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { candidates } from "@/data/candidates";
import { useState, useMemo } from "react";
import { Search, LayoutGrid, Table, Vote } from "lucide-react";

const partyFilters = ["All", "DMK", "AIADMK", "TVK", "NTK"] as const;

export default function CandidatesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [partyFilter, setPartyFilter] = useState<string>("All");

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
        {/* Compact hero */}
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold mb-2">
                  <Vote size={11} className="animate-pulse" />
                  {t("ELECTION 2026", "தேர்தல் 2026")}
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-black leading-none">
                  <span className="shimmer-text">{t("Candidates", "வேட்பாளர்கள்")}</span>
                  <span className="text-primary ml-2">2026</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {t("234 constituencies · Polling: April 23 · Results: May 4", "234 தொகுதிகள் · வாக்குப்பதிவு: ஏப்ரல் 23 · முடிவுகள்: மே 4")}
                </p>
              </div>
              <div className="flex gap-3 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                {[
                  { value: "234", label: t("Seats", "இடங்கள்") },
                  { value: "4", label: t("Parties", "கட்சிகள்") },
                  { value: "38", label: t("Districts", "மாவட்டங்கள்") },
                ].map((stat, i) => (
                  <div key={stat.label} className="stat-bubble bg-card border border-border px-4 py-3">
                    <span className="text-xl font-black text-primary">{stat.value}</span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky controls */}
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex gap-1.5 flex-wrap">
              {partyFilters.map((party) => (
                <button
                  key={party}
                  onClick={() => setPartyFilter(party)}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all duration-200 ${
                    partyFilter === party
                      ? party === "DMK" ? "pill-dmk" : party === "AIADMK" ? "pill-aiadmk" : party === "TVK" ? "pill-tvk" : party === "NTK" ? "pill-ntk" : "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {party === "All" ? t("All", "அனைத்தும்") : party}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("Search...", "தேடுங்கள்...")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-muted border-0 rounded-full pl-8 pr-3 py-2 text-xs w-52 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex bg-muted rounded-full p-0.5">
                <button onClick={() => setViewMode("cards")} className={`p-1.5 rounded-full transition-all ${viewMode === "cards" ? "bg-foreground text-background" : "text-muted-foreground"}`}>
                  <LayoutGrid size={13} />
                </button>
                <button onClick={() => setViewMode("table")} className={`p-1.5 rounded-full transition-all ${viewMode === "table" ? "bg-foreground text-background" : "text-muted-foreground"}`}>
                  <Table size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-2">
          <span className="text-[10px] text-muted-foreground">{filtered.length} / 234</span>
        </div>

        {/* Card View */}
        {viewMode === "cards" ? (
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((c, i) => (
                <div key={c.ac} className="candidate-row animate-fade-up group" style={{ animationDelay: `${Math.min(i * 0.015, 0.5)}s` }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="font-display text-sm font-black text-primary/60">{c.ac}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold mb-2 group-hover:text-primary transition-colors truncate">{c.con}</h3>
                      <div className="space-y-0.5 text-[10px]">
                        <div className="flex items-center gap-1.5"><span className="pill-dmk !px-1.5 !py-0 !text-[9px]">DMK</span><span className="truncate">{c.dmk}</span></div>
                        <div className="flex items-center gap-1.5"><span className="pill-aiadmk !px-1.5 !py-0 !text-[9px]">ADMK</span><span className="truncate">{c.aiadmk}</span></div>
                        <div className="flex items-center gap-1.5"><span className="pill-tvk !px-1.5 !py-0 !text-[9px]">TVK</span><span className="truncate">{c.tvk}</span></div>
                        <div className="flex items-center gap-1.5"><span className="pill-ntk !px-1.5 !py-0 !text-[9px]">NTK</span><span className="truncate">{c.ntk}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-8 overflow-x-auto">
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr>
                    <th className="bg-foreground text-background/60 p-2.5 text-left text-[9px] font-bold tracking-widest uppercase w-12">AC</th>
                    <th className="bg-foreground text-background/60 p-2.5 text-left text-[9px] font-bold tracking-widest uppercase">{t("Constituency", "தொகுதி")}</th>
                    <th className="p-2.5 text-left text-[9px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #2d0000, #CC0000)", color: "#FFD4D4" }}>DMK</th>
                    <th className="p-2.5 text-left text-[9px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #0a2e14, #228B22)", color: "#C8FFC8" }}>AIADMK</th>
                    <th className="p-2.5 text-left text-[9px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #8B4513, #DAA520)", color: "#FFFACD" }}>TVK</th>
                    <th className="p-2.5 text-left text-[9px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #4a0010, #8B0000)", color: "#FFB3C1" }}>NTK</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.ac} className="animate-fade-up hover:bg-primary/[0.03] transition-colors even:bg-muted/30 group" style={{ animationDelay: `${Math.min(i * 0.01, 0.5)}s` }}>
                      <td className="px-2.5 py-2 border-b border-border/30 font-bold text-muted-foreground text-[10px]">{c.ac}</td>
                      <td className="px-2.5 py-2 border-b border-border/30 font-bold group-hover:text-primary transition-colors whitespace-nowrap text-[11px]">{c.con}</td>
                      <td className="px-2.5 py-2 border-b border-border/30 whitespace-nowrap text-[10px]">{c.dmk}</td>
                      <td className="px-2.5 py-2 border-b border-border/30 whitespace-nowrap text-[10px]">{c.aiadmk}</td>
                      <td className="px-2.5 py-2 border-b border-border/30 whitespace-nowrap text-[10px]">{c.tvk}</td>
                      <td className="px-2.5 py-2 border-b border-border/30 whitespace-nowrap text-[10px]">{c.ntk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground animate-fade-up">
            <Search size={32} className="mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-base font-semibold">{t("No candidates found", "வேட்பாளர்கள் காணப்படவில்லை")}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
