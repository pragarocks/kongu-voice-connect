import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { useState } from "react";

const districts = [
  { path: "/erode", label: "Erode" },
  { path: "/coimbatore", label: "Coimbatore" },
  { path: "/tiruppur", label: "Tiruppur" },
  { path: "/salem", label: "Salem" },
  { path: "/namakkal", label: "Namakkal" },
  { path: "/nilgiris", label: "Nilgiris" },
  { path: "/karur", label: "Karur" },
  { path: "/dharmapuri", label: "Dharmapuri" },
];

export default function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Main header */}
      <header className="site-header-clean">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          {/* Logo - much bigger */}
          <Link to="/" className="flex items-center gap-4 group">
            <img src="/images/kongu-times-logo.png" alt="The Kongu Times" className="h-16 md:h-[90px] w-auto" />
          </Link>

          {/* Center - Big prominent brand name */}
          <div className="hidden md:flex flex-col items-center">
            <span className="font-display text-3xl md:text-4xl font-black tracking-tight text-foreground/90 leading-none">
              THE KONGU TIMES
            </span>
            <span className="font-tamil text-sm md:text-base text-primary/80 mt-1 font-semibold">
              கொங்கு மண்டலத்தின் குரல்
            </span>
          </div>

          {/* Right side: Social icons + Date + Lang toggle */}
          <div className="hidden md:flex flex-col items-end gap-1.5">
            {/* Social + Date row */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="text-muted-foreground/60 hover:text-primary transition-colors"><Facebook size={18} /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground/60 hover:text-primary transition-colors"><Twitter size={18} /></a>
                <a href="#" aria-label="Instagram" className="text-muted-foreground/60 hover:text-primary transition-colors"><Instagram size={18} /></a>
                <a href="#" aria-label="YouTube" className="text-muted-foreground/60 hover:text-primary transition-colors"><Youtube size={18} /></a>
                <a href="#" aria-label="Telegram" className="text-muted-foreground/60 hover:text-primary transition-colors"><Send size={18} /></a>
              </div>
              <span className="w-px h-5 bg-border" />
              <span className="font-body text-xs text-muted-foreground">
                {new Date().toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            {/* Language toggle below date */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang("ta")}
                className={`font-body text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                  lang === "ta" ? "bg-primary text-primary-foreground" : "text-muted-foreground/50 hover:text-primary"
                }`}
              >
                தமிழ்
              </button>
              <span className="text-muted-foreground/30 text-[10px]">|</span>
              <button
                onClick={() => setLang("en")}
                className={`font-body text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                  lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground/50 hover:text-primary"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
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
            <Link to="/candidates-2026" className="nav-pill-special">
              🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
            </Link>
            {districts.map((d) => (
              <Link
                key={d.path}
                to={d.path}
                className={`nav-pill ${location.pathname === d.path ? "active" : ""}`}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg animate-fade-up z-40 relative">
          <div className="flex flex-col px-4 py-3 gap-1">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-border">
              <div className="flex items-center gap-2.5">
                <a href="#" className="text-muted-foreground/50"><Facebook size={16} /></a>
                <a href="#" className="text-muted-foreground/50"><Twitter size={16} /></a>
                <a href="#" className="text-muted-foreground/50"><Instagram size={16} /></a>
                <a href="#" className="text-muted-foreground/50"><Youtube size={16} /></a>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setLang("ta")} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lang === "ta" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>தமிழ்</button>
                <button onClick={() => setLang("en")} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>EN</button>
              </div>
            </div>
            <Link to="/" className="nav-pill" onClick={() => setMobileOpen(false)}>
              {t("Home", "முகப்பு")}
            </Link>
            <Link to="/candidates-2026" className="nav-pill-special text-center" onClick={() => setMobileOpen(false)}>
              🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
            </Link>
            {districts.map((d) => (
              <Link key={d.path} to={d.path} className="nav-pill" onClick={() => setMobileOpen(false)}>
                {d.label}
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
