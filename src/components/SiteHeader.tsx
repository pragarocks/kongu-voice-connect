import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      {/* Top bar: date + social + lang */}
      <div className="border-b border-border bg-muted/40">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-1.5">
          <span className="font-body text-[11px] text-muted-foreground">{dateStr}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <a href="#" aria-label="Facebook" className="text-muted-foreground/50 hover:text-primary transition-colors"><Facebook size={14} /></a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground/50 hover:text-primary transition-colors"><Twitter size={14} /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground/50 hover:text-primary transition-colors"><Instagram size={14} /></a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground/50 hover:text-primary transition-colors"><Youtube size={14} /></a>
              <a href="#" aria-label="Telegram" className="text-muted-foreground/50 hover:text-primary transition-colors"><Send size={14} /></a>
            </div>
            <span className="w-px h-4 bg-border" />
            <div className="flex items-center gap-0.5">
              <button onClick={() => setLang("ta")} className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${lang === "ta" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>தமிழ்</button>
              <button onClick={() => setLang("en")} className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header: big logo + brand */}
      <header className="bg-background border-b border-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center px-4 md:px-6 py-3 md:py-4 gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/kongu-times-logo.png" alt="The Kongu Times" className="h-14 md:h-24 w-auto transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-5xl font-black tracking-tight text-foreground leading-none">
                THE KONGU TIMES
              </span>
              <span className="font-tamil text-xs md:text-lg text-primary mt-0.5 font-semibold">
                கொங்கு டைம்ஸ்
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Nav bar */}
      <nav className="site-header-clean !static border-b border-border sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-0">
          <div className="hidden md:flex items-center gap-0.5 overflow-x-auto scrollbar-hide py-1">
            <Link to="/" className={`nav-pill ${location.pathname === "/" ? "active" : ""}`}>
              {t("Home", "முகப்பு")}
            </Link>
            <Link to="/candidates-2026" className="nav-pill-special">
              🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}
            </Link>
            {districts.map((d) => (
              <Link key={d.path} to={d.path} className={`nav-pill ${location.pathname === d.path ? "active" : ""}`}>
                {d.label}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-foreground/60 p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg animate-fade-up z-40 relative">
          <div className="flex flex-col px-4 py-3 gap-1">
            <Link to="/" className="nav-pill" onClick={() => setMobileOpen(false)}>{t("Home", "முகப்பு")}</Link>
            <Link to="/candidates-2026" className="nav-pill-special text-center" onClick={() => setMobileOpen(false)}>🗳 {t("Candidates 2026", "வேட்பாளர்கள் 2026")}</Link>
            {districts.map((d) => (
              <Link key={d.path} to={d.path} className="nav-pill" onClick={() => setMobileOpen(false)}>{d.label}</Link>
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
