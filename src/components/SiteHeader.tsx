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

type NavLink = { path: string; label: string; special?: boolean };
const navLinks: NavLink[] = [
  { path: "/", label: "Home" },
  { path: "/candidates-2026", label: "Candidates 2026", special: true },
  ...districts,
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

  const dateStr = now.toLocaleDateString(lang === "ta" ? "ta-IN" : "en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/images/kongu-times-logo.png"
              alt="The Kongu Times"
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-lg md:text-xl font-black tracking-tight text-slate-900">
                The Kongu Times
              </span>
              <span className="font-tamil text-[10px] md:text-xs text-sky-600 font-semibold mt-0.5">
                கொங்கு டைம்ஸ்
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              if (link.special) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      active
                        ? "bg-pink-600 text-white shadow-sm"
                        : "bg-pink-50 text-pink-700 hover:bg-pink-100"
                    }`}
                  >
                    🗳 {t(link.label, "வேட்பாளர்கள் 2026")}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
                    active
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-700 hover:text-sky-700 hover:bg-sky-50/60"
                  }`}
                >
                  {link.path === "/" ? t(link.label, "முகப்பு") : link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Date + Social + Lang */}
          <div className="hidden md:flex items-center gap-4 ml-auto shrink-0">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{dateStr}</span>
            <div className="flex items-center gap-2 text-slate-400">
              <a href="#" aria-label="Facebook" className="hover:text-sky-600 transition-colors"><Facebook size={16} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-600 transition-colors"><Twitter size={16} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-600 transition-colors"><Instagram size={16} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-red-600 transition-colors"><Youtube size={16} /></a>
              <a href="#" aria-label="Telegram" className="hover:text-sky-500 transition-colors"><Send size={16} /></a>
            </div>
            <div className="flex items-center bg-slate-100 rounded-full p-0.5">
              <button
                onClick={() => setLang("en")}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                  lang === "en" ? "bg-sky-600 text-white shadow-sm" : "text-slate-600"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ta")}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                  lang === "ta" ? "bg-sky-600 text-white shadow-sm" : "text-slate-600"
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 animate-fade-up">
            <div className="flex flex-col gap-1 mb-3">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                      link.special
                        ? "bg-pink-50 text-pink-700"
                        : active
                        ? "bg-sky-50 text-sky-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.special ? "🗳 " : ""}
                    {link.path === "/" ? t(link.label, "முகப்பு") : link.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <span className="text-xs text-slate-500 font-medium">{dateStr}</span>
              <div className="flex items-center gap-3 text-slate-400">
                <a href="#" aria-label="Facebook" className="hover:text-sky-600"><Facebook size={16} /></a>
                <a href="#" aria-label="Twitter" className="hover:text-sky-600"><Twitter size={16} /></a>
                <a href="#" aria-label="Instagram" className="hover:text-pink-600"><Instagram size={16} /></a>
                <a href="#" aria-label="YouTube" className="hover:text-red-600"><Youtube size={16} /></a>
                <a href="#" aria-label="Telegram" className="hover:text-sky-500"><Send size={16} /></a>
              </div>
              <div className="flex items-center bg-slate-100 rounded-full p-0.5">
                <button onClick={() => setLang("en")} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${lang === "en" ? "bg-sky-600 text-white" : "text-slate-600"}`}>EN</button>
                <button onClick={() => setLang("ta")} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${lang === "ta" ? "bg-sky-600 text-white" : "text-slate-600"}`}>தமிழ்</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
