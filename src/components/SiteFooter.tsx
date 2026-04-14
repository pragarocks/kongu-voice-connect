import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { t } = useLanguage();
  const links = [
    { to: "/", label: t("Home", "முகப்பு") },
    { to: "/candidates-2026", label: t("Candidates 2026", "வேட்பாளர்கள் 2026") },
    { to: "/erode", label: "Erode" },
    { to: "/coimbatore", label: "Coimbatore" },
    { to: "/tiruppur", label: "Tiruppur" },
    { to: "/salem", label: "Salem" },
    { to: "/namakkal", label: "Namakkal" },
    { to: "/nilgiris", label: "Nilgiris" },
    { to: "/karur", label: "Karur" },
    { to: "/dharmapuri", label: "Dharmapuri" },
  ];

  return (
    <footer className="hero-gradient text-white/60 py-7 px-6">
      <div className="max-w-[1280px] mx-auto">
        <img src="/images/kongu-times-logo.png" alt="The Kongu Times" className="h-9 mb-3" />
        <div className="flex gap-5 mb-4 flex-wrap">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-xs text-white/50 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-white/30 flex-wrap gap-1.5 border-t border-white/10 pt-4">
          <span>© 2026 The Kongu Times · கொங்கு டைம்ஸ். {t("All rights reserved.", "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.")}</span>
          <span>{t("Source: Election Commission of India", "ஆதாரம்: இந்திய தேர்தல் ஆணையம்")}</span>
        </div>
      </div>
    </footer>
  );
}
