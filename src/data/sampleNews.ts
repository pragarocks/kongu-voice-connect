import type { NewsArticle } from "@/components/NewsCard";
import modiCoimbatore from "@/assets/modi-coimbatore.jpg";
import mainNews from "@/data/news/main.json";

const mainHero: NewsArticle = {
  id: mainNews.featured.id,
  title_en: mainNews.featured.title,
  title_ta: mainNews.featured.title,
  summary_en: mainNews.featured.summary,
  summary_ta: mainNews.featured.summary,
  district: "Tamil Nadu",
  category: mainNews.featured.category,
  date: mainNews.featured.date,
  image: modiCoimbatore,
};

const mainSide: NewsArticle[] = mainNews.sideNews.map((n) => ({
  id: n.id,
  title_en: n.title,
  title_ta: n.title,
  summary_en: n.summary,
  summary_ta: n.summary,
  district: "Tamil Nadu",
  category: n.category,
  date: n.date,
  image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop",
}));

const mainGrid: NewsArticle[] = mainNews.gridNews.map((n) => ({
  id: n.id,
  title_en: n.title,
  title_ta: n.title,
  summary_en: n.summary,
  summary_ta: n.summary,
  district: "Tamil Nadu",
  category: n.category,
  date: n.date,
  image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=400&fit=crop",
}));

export const sampleNews: NewsArticle[] = [
  mainHero,
  ...mainSide,
  {
    id: "1",
    title_en: "PM Modi's Grand Roadshow Lights Up Coimbatore – Massive Crowds Greet BJP Star Campaigner",
    title_ta: "கோயம்புத்தூரில் பிரதமர் மோடியின் மாபெரும் ரோட்ஷோ – பாஜக நட்சத்திர பிரச்சாரகரை வரவேற்ற மக்கள் வெள்ளம்",
    summary_en: "Prime Minister Narendra Modi held a high-voltage roadshow in Coimbatore today, drawing massive crowds along the campaign route as the NDA intensifies its final-phase push across the Kongu belt.",
    summary_ta: "கொங்கு மண்டலத்தில் என்.டி.ஏ-வின் இறுதிக்கட்ட பிரச்சாரம் தீவிரமடையும் நிலையில், பிரதமர் நரேந்திர மோடி இன்று கோயம்புத்தூரில் மாபெரும் ரோட்ஷோ நடத்தினார்.",
    district: "Coimbatore", category: "Election", date: "April 18, 2026",
    image: modiCoimbatore
  },
  ...mainGrid,
  {
    id: "2",
    title_en: "Coimbatore Traffic Diversions in Force as Campaign Rallies Reach Peak",
    title_ta: "பிரச்சார பேரணிகள் உச்சம் – கோயம்புத்தூரில் போக்குவரத்து திருப்பிவிடல் அமல்",
    summary_en: "Major traffic diversions are in effect across Coimbatore city as back-to-back political events fill the calendar. Heavy vehicle movement has been restricted on key entry routes to ease congestion.",
    summary_ta: "கோயம்புத்தூர் நகரம் முழுவதும் தொடர்ச்சியான அரசியல் நிகழ்வுகள் காரணமாக போக்குவரத்து திருப்பிவிடல் நடைமுறையில் உள்ளது. முக்கிய நுழைவு சாலைகளில் கனரக வாகனங்கள் கட்டுப்படுத்தப்பட்டுள்ளன.",
    district: "Coimbatore", category: "Election", date: "April 18, 2026",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop"
  },
  {
    id: "3",
    title_en: "Home Voting Begins for Elderly and Differently-Abled Across Kongu Districts",
    title_ta: "கொங்கு மாவட்டங்களில் முதியோர், மாற்றுத்திறனாளிகளுக்கு வீட்டு வாக்குப்பதிவு தொடக்கம்",
    summary_en: "District election teams have started the home voting facility for senior citizens and persons with disabilities across Erode, Coimbatore, Tiruppur and Salem ahead of polling day.",
    summary_ta: "வாக்குப்பதிவு நாளுக்கு முன்னதாக ஈரோடு, கோயம்புத்தூர், திருப்பூர், சேலம் ஆகிய மாவட்டங்களில் மூத்த குடிமக்கள் மற்றும் மாற்றுத்திறனாளிகளுக்கு வீட்டு வாக்குப்பதிவு வசதி தொடங்கியுள்ளது.",
    district: "Erode", category: "Election", date: "April 17, 2026",
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=600&h=400&fit=crop"
  },
  {
    id: "4",
    title_en: "Tiruppur Industries Pivot Toward Sustainable, ESG-Driven Manufacturing",
    title_ta: "திருப்பூர் தொழில்கள் நிலையான, ESG சார்ந்த உற்பத்தியை நோக்கி திரும்புகின்றன",
    summary_en: "Export associations in Tiruppur are accelerating sustainability and compliance standards as global buyers tighten ESG requirements, with worker wage agreements also finalized this week.",
    summary_ta: "உலக வாடிக்கையாளர்கள் ESG தேவைகளை இறுக்கப்படுத்துவதால், திருப்பூர் ஏற்றுமதி சங்கங்கள் நிலைத்தன்மை மற்றும் இணக்க தரங்களை விரைவுபடுத்தி வருகின்றன.",
    district: "Tiruppur", category: "Industry", date: "April 17, 2026",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop"
  },
  {
    id: "5",
    title_en: "Salem Sees Spike in Chain-Snatching Cases Amid Election Season",
    title_ta: "தேர்தல் காலத்தில் சேலத்தில் சங்கிலி பறிப்பு வழக்குகள் அதிகரிப்பு",
    summary_en: "Police in Salem have launched coordinated investigations after a string of chain-snatching incidents raised public safety concerns during the busy election period.",
    summary_ta: "பரபரப்பான தேர்தல் காலத்தில் தொடர் சங்கிலி பறிப்பு சம்பவங்கள் பொதுமக்கள் பாதுகாப்பு குறித்த கவலையை எழுப்பியுள்ள நிலையில், சேலம் காவல்துறை ஒருங்கிணைந்த விசாரணையை தொடங்கியுள்ளது.",
    district: "Salem", category: "Election", date: "April 17, 2026",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=400&fit=crop"
  },
  {
    id: "6",
    title_en: "Namakkal Protests Highlight Cold Storage and Transport Worker Demands",
    title_ta: "குளிர்பதன கிடங்கு, போக்குவரத்து தொழிலாளர் கோரிக்கைகளை முன்னிலைப்படுத்தும் நாமக்கல் போராட்டங்கள்",
    summary_en: "Major demonstrations in Namakkal have spotlighted long-pending demands for cold storage infrastructure and welfare measures for transport workers ahead of the polls.",
    summary_ta: "தேர்தலுக்கு முன்னதாக நாமக்கல்லில் நடைபெற்ற முக்கிய ஆர்ப்பாட்டங்கள், குளிர்பதன கிடங்கு உள்கட்டமைப்பு மற்றும் போக்குவரத்து தொழிலாளர் நலன் தொடர்பான நீண்டகால கோரிக்கைகளை முன்னிலைப்படுத்தியுள்ளன.",
    district: "Namakkal", category: "Election", date: "April 16, 2026",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop"
  },
  {
    id: "7",
    title_en: "Drone Curbs and Tighter Security Cover Coimbatore as VIP Visits Surge",
    title_ta: "விஐபி வருகைகள் அதிகரிப்பு – கோயம்புத்தூரில் ட்ரோன் கட்டுப்பாடு, பாதுகாப்பு பலப்படுத்தல்",
    summary_en: "Authorities have imposed drone restrictions and stepped up multi-layer security across Coimbatore as senior national leaders line up campaign visits in the final stretch.",
    summary_ta: "இறுதிக்கட்டத்தில் மூத்த தேசியத் தலைவர்கள் வரிசையாக பிரச்சாரத்திற்கு வருகை தருவதால், கோயம்புத்தூர் முழுவதும் ட்ரோன் கட்டுப்பாடுகள் விதிக்கப்பட்டு பாதுகாப்பு பலப்படுத்தப்பட்டுள்ளது.",
    district: "Coimbatore", category: "Election", date: "April 17, 2026",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop"
  },
  {
    id: "8",
    title_en: "Erode Faces Triple Challenge: Elections, Heatwave and Waste Management",
    title_ta: "ஈரோடு முக்கோண சவால்: தேர்தல், வெப்ப அலை, கழிவு மேலாண்மை",
    summary_en: "Election preparations in Erode are entering the final lap even as heatwave conditions disrupt daily routines and plastic waste continues to strain urban and rural sanitation systems.",
    summary_ta: "வெப்ப அலை அன்றாட வாழ்க்கையை பாதிக்கும் நிலையிலும், பிளாஸ்டிக் கழிவு நகர்ப்புற மற்றும் கிராமப்புற தூய்மை அமைப்புகளை சவாலுக்குள்ளாக்கும் நிலையிலும், ஈரோட்டில் தேர்தல் ஏற்பாடுகள் இறுதிக்கட்டத்தை எட்டியுள்ளன.",
    district: "Erode", category: "Election", date: "April 16, 2026",
    image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=600&h=400&fit=crop"
  },
  {
    id: "9",
    title_en: "Worker Wage Agreement Finalised in Tiruppur Textile Sector",
    title_ta: "திருப்பூர் ஜவுளித் துறையில் தொழிலாளர் ஊதிய ஒப்பந்தம் இறுதி",
    summary_en: "Industry bodies and unions in Tiruppur have signed off on a fresh wage agreement, with labour welfare emerging as a decisive issue in the run-up to polling day.",
    summary_ta: "திருப்பூரில் தொழில் அமைப்புகள் மற்றும் தொழிற்சங்கங்கள் புதிய ஊதிய ஒப்பந்தத்தில் கையெழுத்திட்டுள்ளன; வாக்குப்பதிவை நோக்கி தொழிலாளர் நலன் முக்கிய தேர்தல் விவகாரமாக மாறியுள்ளது.",
    district: "Tiruppur", category: "Industry", date: "April 16, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
  },
  {
    id: "10",
    title_en: "Tax Raids Conducted on Several Business Establishments in Salem",
    title_ta: "சேலத்தில் பல வணிக நிறுவனங்களில் வரித்துறை சோதனை",
    summary_en: "Income tax teams carried out searches at multiple business premises in Salem, while political protests over recent policy decisions intensified across the district.",
    summary_ta: "வருமான வரித்துறை குழுக்கள் சேலத்தில் பல வணிக இடங்களில் சோதனை நடத்தியதுடன், சமீபத்திய கொள்கை முடிவுகளுக்கு எதிரான அரசியல் போராட்டங்களும் மாவட்டம் முழுவதும் தீவிரமடைந்தன.",
    district: "Salem", category: "Election", date: "April 16, 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    id: "11",
    title_en: "Dharmapuri Mango Belt Gears Up for Peak Harvest Season",
    title_ta: "தர்மபுரி மாம்பழ பகுதி உச்ச அறுவடை பருவத்திற்கு தயார்",
    summary_en: "Mango growers across Dharmapuri are preparing for the peak harvest as traders from across South India arrive, even as the campaign trail rolls through the district.",
    summary_ta: "தென்னிந்தியா முழுவதிலுமிருந்து வியாபாரிகள் வந்துசேரும் நிலையில், தர்மபுரியில் மாம்பழ விவசாயிகள் உச்ச அறுவடைக்கு தயாராகி வருகின்றனர்.",
    district: "Dharmapuri", category: "Culture", date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=400&fit=crop"
  },
  {
    id: "12",
    title_en: "Namakkal Voter Awareness Drive Targets First-Time and Women Voters",
    title_ta: "நாமக்கல் வாக்காளர் விழிப்புணர்வு பிரச்சாரம் – புதிய மற்றும் பெண் வாக்காளர்களை இலக்காகக் கொண்டு",
    summary_en: "District officials in Namakkal are running a focused SVEEP drive to boost turnout among first-time and women voters, with women empowerment a key plank of campaign messaging.",
    summary_ta: "நாமக்கல் மாவட்ட அதிகாரிகள், புதிய மற்றும் பெண் வாக்காளர்களின் வாக்களிப்பை அதிகரிக்க இலக்கு வைத்த SVEEP பிரச்சாரத்தை நடத்தி வருகின்றனர்.",
    district: "Namakkal", category: "Election", date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop"
  },
];
