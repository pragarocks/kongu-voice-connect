import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
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
      <header className="hero-gradient border-b-[3px] border-primary sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-2.5 gap-3">
          <Link to="/" className="flex-shrink-0">
            <img src="/images/kongu-times-logo.png" alt="The Kongu Times" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="hidden md:block text-center">
            <div className="font-tamil text-xs text-white/60">
              கொங்கு மண்டலத்தின் குரல் · Voice of the Kongu Region
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 bg-white/10 rounded-md p-0.5">
              <button
                onClick={() => setLang("ta")}
                className={`font-body text-[11px] font-semibold px-3 py-1 rounded transition-colors ${
                  lang === "ta" ? "bg-primary text-primary-foreground" : "text-white/55"
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLang("en")}
                className={`font-body text-[11px] font-semibold px-3 py-1 rounded transition-colors ${
                  lang === "en" ? "bg-primary text-primary-foreground" : "text-white/55"
                }`}
              >
                English
              </button>
            </div>
            <button
              className="md:hidden text-white/70 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-header-secondary border-b border-white/10">
        <div className="max-w-[1280px] mx-auto hidden md:flex items-center px-4 md:px-6 overflow-x-auto scrollbar-hide">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            🏠 {t("Home", "முகப்பு")}
          </Link>
          <Link
            to="/candidates-2026"
            className={`nav-link nav-link-special ${location.pathname === "/candidates-2026" ? "active" : ""}`}
          >
            🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
          </Link>
          {districts.map((d) => (
            <Link
              key={d.path}
              to={d.path}
              className={`nav-link ${location.pathname === d.path ? "active" : ""}`}
            >
              {d.en} · {d.ta}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-header-secondary border-b border-white/10 animate-fade-in-up">
          <div className="flex flex-col px-4 py-2">
            <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>
              🏠 {t("Home", "முகப்பு")}
            </Link>
            <Link to="/candidates-2026" className="nav-link nav-link-special" onClick={() => setMobileOpen(false)}>
              🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
            </Link>
            {districts.map((d) => (
              <Link key={d.path} to={d.path} className="nav-link" onClick={() => setMobileOpen(false)}>
                {d.en} · {d.ta}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Election banner */}
      <div className="election-banner-bg py-1.5 text-center">
        <div className="font-body text-xs font-semibold text-white flex items-center justify-center gap-2.5 flex-wrap px-4">
          <span className="bg-white/20 rounded px-2 py-0.5 text-[10px] tracking-wider">🗳 ELECTION 2026</span>
          <span>{t("Tamil Nadu Assembly Election · April 23, 2026 · Counting: May 4", "தமிழ்நாடு சட்டமன்றத் தேர்தல் · ஏப்ரல் 23, 2026 · எண்ணிக்கை: மே 4")}</span>
          <span className="bg-white/20 rounded px-2 py-0.5 text-[10px] tracking-wider">234 {t("Constituencies", "தொகுதிகள்")}</span>
        </div>
      </div>
    </>
  );
}
