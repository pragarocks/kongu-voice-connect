import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { candidates } from "@/data/candidates";
import { useState, useMemo } from "react";
import { Search, Vote, Users, ChevronDown, ChevronUp } from "lucide-react";
import leaderStalin from "@/assets/leader-stalin.png";
import leaderEps from "@/assets/leader-eps.png";
import leaderVijay from "@/assets/leader-vijay.png";
import leaderSeeman from "@/assets/leader-seeman.png";

const partyConfig: Record<string, { label: string; labelTa: string; className?: string }> = {
  All: { label: "All", labelTa: "அனைத்தும்" },
  DMK: { label: "DMK (SPA)", labelTa: "திமுக", className: "pill-dmk" },
  AIADMK: { label: "AIADMK (NDA)", labelTa: "அதிமுக", className: "pill-aiadmk" },
  TVK: { label: "TVK", labelTa: "திவிக", className: "pill-tvk" },
  NTK: { label: "NTK", labelTa: "நதக", className: "pill-ntk" },
};

type PartyKey = string;

export default function CandidatesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [partyFilter, setPartyFilter] = useState<PartyKey>("All");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = candidates.filter(
      (c) =>
        c.con.toLowerCase().includes(q) ||
        c.dmk.toLowerCase().includes(q) ||
        c.aiadmk.toLowerCase().includes(q) ||
        c.tvk.toLowerCase().includes(q) ||
        c.ntk.toLowerCase().includes(q) ||
        c.ac.toString().includes(q)
    );
    if (sortAsc) {
      result = [...result].sort((a, b) => a.ac - b.ac);
    } else {
      result = [...result].sort((a, b) => b.ac - a.ac);
    }
    return result;
  }, [search, sortAsc]);

  const leaderCards = [
    { headline: t("DMK Alliance", "திமுக கூட்டணி"), party: "DMK", leader: "M. K. Stalin", img: leaderStalin, accent: "border-l-4 border-l-red-700", badge: "bg-red-700" },
    { headline: t("NDA Alliance", "தேமுதிக கூட்டணி"), party: "AIADMK", leader: "Edappadi K. Palaniswami", img: leaderEps, accent: "border-l-4 border-l-green-700", badge: "bg-green-700" },
    { headline: t("Vijay's Party", "விஜய் கட்சி"), party: "TVK", leader: "Thalapathy Vijay", img: leaderVijay, accent: "border-l-4 border-l-amber-600", badge: "bg-amber-600" },
    { headline: t("Seeman's NTK", "சீமான் நாதக"), party: "NTK", leader: "Seeman", img: leaderSeeman, accent: "border-l-4 border-l-rose-800", badge: "bg-rose-800" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="animate-fade-up">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-primary" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
                    {t("Tamil Nadu Assembly", "தமிழ்நாடு சட்டமன்றம்")}
                  </span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-black leading-none mb-2">
                  {t("Candidates", "வேட்பாளர்கள்")} <span className="text-primary">2026</span>
                </h1>
                <p className="text-background/60 text-sm">
                  {t("234 constituencies · Polling: April 23, 2026 · Results: May 4, 2026",
                    "234 தொகுதிகள் · வாக்குப்பதிவு: ஏப்ரல் 23, 2026 · முடிவுகள்: மே 4, 2026")}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-background/10 backdrop-blur rounded-xl px-4 py-3 animate-fade-up ${s.color || ""}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="text-lg font-black text-primary">{s.value}</div>
                  <div className="text-[10px] text-background/50 uppercase tracking-wider font-bold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky controls */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            {/* Party filters */}
            <div className="flex gap-2 flex-wrap">
              {(Object.keys(partyConfig) as PartyKey[]).map((key) => {
                const cfg = partyConfig[key];
                const isActive = partyFilter === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPartyFilter(key)}
                    className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? key === "All"
                          ? "bg-foreground text-background"
                          : cfg.className || ""
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {t(cfg.label, cfg.labelTa)}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("Search constituency or candidate...", "தொகுதி அல்லது வேட்பாளரைத் தேடுங்கள்...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-muted border-0 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="max-w-7xl mx-auto px-4 py-2">
          <span className="text-[11px] text-muted-foreground font-medium">{filtered.length} of 234 constituencies</span>
        </div>

        {/* Table */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-border overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th
                    className="bg-foreground text-background/70 px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase w-16 cursor-pointer select-none"
                    onClick={() => setSortAsc(!sortAsc)}
                  >
                    <span className="flex items-center gap-1">
                      AC {sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </span>
                  </th>
                  <th className="bg-foreground text-background/70 px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    {t("Constituency", "தொகுதி")}
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-red-100" style={{ background: "linear-gradient(135deg, #2d0000, #991b1b)" }}>
                    DMK (SPA)
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-green-100" style={{ background: "linear-gradient(135deg, #0a2e14, #166534)" }}>
                    AIADMK (NDA)
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-amber-100" style={{ background: "linear-gradient(135deg, #78350f, #b45309)" }}>
                    TVK
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-rose-100" style={{ background: "linear-gradient(135deg, #4a0010, #7f1d1d)" }}>
                    NTK
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  if (partyFilter !== "All") {
                    const partyKey = partyFilter.toLowerCase() as keyof typeof c;
                    if (partyKey !== "ac" && partyKey !== "con" && (!c[partyKey] || c[partyKey] === "—")) return null;
                  }
                  return (
                    <tr
                      key={c.ac}
                      className="group hover:bg-primary/[0.04] transition-colors even:bg-muted/30 animate-fade-up"
                      style={{ animationDelay: `${Math.min(i * 0.008, 0.4)}s` }}
                    >
                      <td className="px-4 py-2.5 border-b border-border/30 text-[11px] font-bold text-muted-foreground">{c.ac}</td>
                      <td className="px-4 py-2.5 border-b border-border/30 text-[12px] font-bold group-hover:text-primary transition-colors">{c.con}</td>
                      <td className="px-4 py-2.5 border-b border-border/30">
                        <span className="inline-block bg-red-50 text-red-900 text-[11px] px-2.5 py-0.5 rounded-full font-medium">{c.dmk}</span>
                      </td>
                      <td className="px-4 py-2.5 border-b border-border/30">
                        <span className="inline-block bg-green-50 text-green-900 text-[11px] px-2.5 py-0.5 rounded-full font-medium">{c.aiadmk}</span>
                      </td>
                      <td className="px-4 py-2.5 border-b border-border/30">
                        <span className="inline-block bg-amber-50 text-amber-900 text-[11px] px-2.5 py-0.5 rounded-full font-medium">{c.tvk}</span>
                      </td>
                      <td className="px-4 py-2.5 border-b border-border/30">
                        <span className="inline-block bg-rose-50 text-rose-900 text-[11px] px-2.5 py-0.5 rounded-full font-medium">{c.ntk}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((c, i) => {
              if (partyFilter !== "All") {
                const partyKey = partyFilter.toLowerCase() as keyof typeof c;
                if (partyKey !== "ac" && partyKey !== "con" && (!c[partyKey] || c[partyKey] === "—")) return null;
              }
              return (
                <div
                  key={c.ac}
                  className="bg-card rounded-xl border border-border/50 p-4 animate-fade-up hover:shadow-md transition-all"
                  style={{ animationDelay: `${Math.min(i * 0.02, 0.5)}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="font-display text-sm font-black text-primary">{c.ac}</span>
                    </div>
                    <h3 className="font-display text-sm font-bold">{c.con}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-red-50 rounded-lg p-2">
                      <span className="text-[9px] font-bold text-red-700 uppercase">DMK</span>
                      <p className="text-[11px] font-medium text-red-900 mt-0.5">{c.dmk}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <span className="text-[9px] font-bold text-green-700 uppercase">AIADMK</span>
                      <p className="text-[11px] font-medium text-green-900 mt-0.5">{c.aiadmk}</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <span className="text-[9px] font-bold text-amber-700 uppercase">TVK</span>
                      <p className="text-[11px] font-medium text-amber-900 mt-0.5">{c.tvk}</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-2">
                      <span className="text-[9px] font-bold text-rose-700 uppercase">NTK</span>
                      <p className="text-[11px] font-medium text-rose-900 mt-0.5">{c.ntk}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground animate-fade-up">
              <Search size={36} className="mx-auto mb-3 text-muted-foreground/20" />
              <p className="font-display text-lg font-bold">{t("No candidates found", "வேட்பாளர்கள் காணப்படவில்லை")}</p>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
