import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";

const districts = [
  { path: "/erode", en: "Erode", ta: "ஈரோடு" },
  { path: "/coimbatore", en: "Coimbatore", ta: "கோயம்புத்தூர்" },
  { path: "/tiruppur", en: "Tiruppur", ta: "திருப்பூர்" },
  { path: "/salem", en: "Salem", ta: "சேலம்" },
  { path: "/namakkal", en: "Namakkal", ta: "நாமக்கல்" },
  { path: "/nilgiris", en: "Nilgiris", ta: "நீலகிரி" },
  { path: "/karur", en: "Karur", ta: "கரூர்" },
  { path: "/dharmapuri", en: "Dharmapuri", ta: "தர்மபுரி" },
];

export default function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Social bar */}
      <div className="social-bar">
        <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook"><Facebook size={13} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={13} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={13} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={13} /></a>
            <a href="#" aria-label="Telegram"><Send size={13} /></a>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLang("ta")}
              className={`font-body text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                lang === "ta" ? "bg-primary text-primary-foreground" : "text-white/40 hover:text-white/70"
              }`}
            >
              தமிழ்
            </button>
            <span className="text-white/20 text-[10px]">|</span>
            <button
              onClick={() => setLang("en")}
              className={`font-body text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                lang === "en" ? "bg-primary text-primary-foreground" : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="site-header-clean">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/kongu-times-logo.png" alt="The Kongu Times" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="hidden md:flex flex-col items-center">
            <span className="font-display text-lg font-black tracking-tight text-foreground/10">
              THE KONGU TIMES
            </span>
            <span className="font-tamil text-[10px] text-muted-foreground -mt-1">
              கொங்கு மண்டலத்தின் குரல்
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-body">{new Date().toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <button
            className="md:hidden text-foreground/60 p-1.5 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="border-t border-border">
          <div className="max-w-[1280px] mx-auto hidden md:flex items-center gap-1 px-4 md:px-6 py-2 overflow-x-auto scrollbar-hide">
            <Link to="/" className={`nav-pill ${location.pathname === "/" ? "active" : ""}`}>
              {t("Home", "முகப்பு")}
            </Link>
            <Link to="/candidates-2026" className={`nav-pill-special`}>
              🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
            </Link>
            {districts.map((d) => (
              <Link
                key={d.path}
                to={d.path}
                className={`nav-pill ${location.pathname === d.path ? "active" : ""}`}
              >
                {d.en} · <span className="font-tamil">{d.ta}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg animate-fade-up z-40 relative">
          <div className="flex flex-col px-4 py-3 gap-1">
            <Link to="/" className="nav-pill" onClick={() => setMobileOpen(false)}>
              {t("Home", "முகப்பு")}
            </Link>
            <Link to="/candidates-2026" className="nav-pill-special text-center" onClick={() => setMobileOpen(false)}>
              🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
            </Link>
            {districts.map((d) => (
              <Link key={d.path} to={d.path} className="nav-pill" onClick={() => setMobileOpen(false)}>
                {d.en} · <span className="font-tamil">{d.ta}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Election ticker */}
      <div className="bg-foreground py-1.5 overflow-hidden">
        <div className="election-ticker">
          <div className="election-ticker-inner flex items-center gap-8 text-[11px] font-semibold text-white/80">
            <span className="flex items-center gap-2">
              <span className="bg-primary rounded px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">LIVE</span>
              🗳 {t("Tamil Nadu Assembly Election 2026", "2026 தமிழ்நாடு சட்டமன்றத் தேர்தல்")}
            </span>
            <span>📅 {t("Polling: April 23, 2026", "வாக்குப்பதிவு: ஏப்ரல் 23, 2026")}</span>
            <span>📊 {t("Counting: May 4, 2026", "எண்ணிக்கை: மே 4, 2026")}</span>
            <span>🏛️ 234 {t("Constituencies", "தொகுதிகள்")}</span>
            <span className="flex items-center gap-2">
              <span className="bg-primary rounded px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">LIVE</span>
              🗳 {t("Tamil Nadu Assembly Election 2026", "2026 தமிழ்நாடு சட்டமன்றத் தேர்தல்")}
            </span>
            <span>📅 {t("Polling: April 23, 2026", "வாக்குப்பதிவு: ஏப்ரல் 23, 2026")}</span>
            <span>📊 {t("Counting: May 4, 2026", "எண்ணிக்கை: மே 4, 2026")}</span>
            <span>🏛️ 234 {t("Constituencies", "தொகுதிகள்")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
