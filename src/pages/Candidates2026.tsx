import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import { candidates } from "@/data/candidates";
import { useState } from "react";

export default function CandidatesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = candidates.filter(
    (c) =>
      c.con.toLowerCase().includes(search.toLowerCase()) ||
      c.dmk.toLowerCase().includes(search.toLowerCase()) ||
      c.aiadmk.toLowerCase().includes(search.toLowerCase()) ||
      c.tvk.toLowerCase().includes(search.toLowerCase()) ||
      c.ntk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="hero-gradient py-8 px-4 md:px-6 border-b-[3px] border-primary">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-xs text-white/40 mb-2">
              <span className="text-primary">Home</span> › Candidates 2026
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-white">
              🗳 Candidates <span className="text-primary">2026</span>
            </h1>
            <div className="font-tamil text-lg text-white/65 mt-1">
              2026 தமிழ்நாடு சட்டமன்றத் தேர்தல் — வேட்பாளர்கள் பட்டியல்
            </div>
            <p className="text-sm text-white/45 mt-2">
              {t("All 234 constituencies · Polling: April 23, 2026 · Results: May 4, 2026", "அனைத்து 234 தொகுதிகள் · வாக்குப்பதிவு: ஏப்ரல் 23, 2026 · முடிவுகள்: மே 4, 2026")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4">
          <div className="flex gap-3 flex-wrap">
            <div className="stat-card">
              <div className="text-2xl font-bold">234</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{t("Constituencies", "தொகுதிகள்")}</div>
            </div>
            <div className="stat-card" style={{ borderTopColor: "#CC0000" }}>
              <div className="text-2xl font-bold" style={{ color: "#CC0000" }}>DMK</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">SPA Alliance</div>
            </div>
            <div className="stat-card" style={{ borderTopColor: "#1a7a2e" }}>
              <div className="text-2xl font-bold" style={{ color: "#1a7a2e" }}>AIADMK</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">NDA Alliance</div>
            </div>
            <div className="stat-card" style={{ borderTopColor: "#B8860B" }}>
              <div className="text-2xl font-bold" style={{ color: "#B8860B" }}>TVK</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Vijay's Party</div>
            </div>
            <div className="stat-card" style={{ borderTopColor: "#8B0000" }}>
              <div className="text-2xl font-bold" style={{ color: "#8B0000" }}>NTK</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Seeman</div>
            </div>
          </div>
        </div>

        {/* Legend & Search */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-4 flex-wrap items-center">
              <span className="party-pill-dmk text-[11px] tracking-wider font-bold">DMK (SPA)</span>
              <span className="party-pill-aiadmk text-[11px] tracking-wider font-bold">AIADMK (NDA)</span>
              <span className="party-pill-tvk text-[11px] tracking-wider font-bold">TVK</span>
              <span className="party-pill-ntk text-[11px] tracking-wider font-bold">NTK</span>
            </div>
            <input
              type="text"
              placeholder={t("Search constituency or candidate...", "தொகுதி அல்லது வேட்பாளரை தேடுங்கள்...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card border border-border rounded-lg px-4 py-2 text-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pb-12 overflow-x-auto">
          <table className="w-full border-collapse bg-card border border-border rounded-lg overflow-hidden text-[13px] shadow-md">
            <thead>
              <tr>
                <th className="bg-foreground text-background/60 p-3 text-left text-[10px] font-bold tracking-widest uppercase">AC</th>
                <th className="bg-foreground text-background/60 p-3 text-left text-[10px] font-bold tracking-widest uppercase">{t("Constituency · தொகுதி", "தொகுதி · Constituency")}</th>
                <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #1a0000, #8B0000)", color: "#FFB3B3" }}>DMK (SPA)</th>
                <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #0a2e14, #1a7a2e)", color: "#B8FFD0" }}>AIADMK (NDA)</th>
                <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #5c0000, #cc6600)", color: "#FFD700" }}>TVK</th>
                <th className="p-3 text-left text-[10px] font-bold tracking-wider uppercase" style={{ background: "linear-gradient(135deg, #3d0008, #8B0000)", color: "#FFB3B3" }}>NTK</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.ac}
                  className="animate-fade-in-up hover:bg-primary/5 transition-colors"
                  style={{ animationDelay: `${Math.min(i * 0.02, 1)}s` }}
                >
                  <td className="px-3 py-2 border-b border-border/50 font-bold text-muted-foreground text-[11px]">{c.ac}</td>
                  <td className="px-3 py-2 border-b border-border/50 font-bold min-w-[150px]">{c.con}</td>
                  <td className="px-3 py-2 border-b border-border/50"><span className="party-pill-dmk">{c.dmk}</span></td>
                  <td className="px-3 py-2 border-b border-border/50"><span className="party-pill-aiadmk">{c.aiadmk}</span></td>
                  <td className="px-3 py-2 border-b border-border/50"><span className="party-pill-tvk">{c.tvk}</span></td>
                  <td className="px-3 py-2 border-b border-border/50"><span className="party-pill-ntk">{c.ntk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              {t("No candidates found", "வேட்பாளர்கள் எவரும் காணப்படவில்லை")}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
