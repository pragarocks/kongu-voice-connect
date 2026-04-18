import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Instagram, Youtube, Send, MapPin, Mail, Phone } from "lucide-react";

export default function SiteFooter() {
  const { t } = useLanguage();

  const districtLinks = [
    { to: "/erode", label: "Erode · ஈரோடு" },
    { to: "/coimbatore", label: "Coimbatore · கோயம்புத்தூர்" },
    { to: "/tiruppur", label: "Tiruppur · திருப்பூர்" },
    { to: "/salem", label: "Salem · சேலம்" },
    { to: "/namakkal", label: "Namakkal · நாமக்கல்" },
    { to: "/nilgiris", label: "Nilgiris · நீலகிரி" },
    { to: "/karur", label: "Karur · கரூர்" },
    { to: "/dharmapuri", label: "Dharmapuri · தர்மபுரி" },
  ];

  return (
    <footer className="footer-clean">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/images/kongu-times-logo.png" alt="The Kongu Times" className="h-20 mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("Voice of the Kongu Region. Delivering trusted news from 8 districts of Western Tamil Nadu.", "கொங்கு மண்டலத்தின் குரல். மேற்கு தமிழ்நாட்டின் 8 மாவட்டங்களிலிருந்து நம்பகமான செய்திகள்.")}
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:scale-110 transition-transform"><Facebook size={22} /></a>
              <a href="#" aria-label="Twitter" className="text-[#1DA1F2] hover:scale-110 transition-transform"><Twitter size={22} /></a>
              <a href="#" aria-label="Instagram" className="text-[#E4405F] hover:scale-110 transition-transform"><Instagram size={22} /></a>
              <a href="#" aria-label="YouTube" className="text-[#FF0000] hover:scale-110 transition-transform"><Youtube size={22} /></a>
              <a href="#" aria-label="Telegram" className="text-[#0088CC] hover:scale-110 transition-transform"><Send size={22} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold mb-3">{t("Quick Links", "விரைவு இணைப்புகள்")}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("Home", "முகப்பு")}</Link>
              <Link to="/candidates-2026" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("Candidates 2026", "வேட்பாளர்கள் 2026")}</Link>
            </div>
          </div>

          {/* Districts */}
          <div>
            <h4 className="font-display text-sm font-bold mb-3">{t("Districts", "மாவட்டங்கள்")}</h4>
            <div className="flex flex-col gap-2">
              {districtLinks.slice(0, 4).map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold mb-3">&nbsp;</h4>
            <div className="flex flex-col gap-2">
              {districtLinks.slice(4).map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <span>© 2026 The Kongu Times · கொங்கு டைம்ஸ். {t("All rights reserved.", "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.")}</span>
          <span>{t("Source: Election Commission of India", "ஆதாரம்: இந்திய தேர்தல் ஆணையம்")}</span>
        </div>
      </div>
    </footer>
  );
}
