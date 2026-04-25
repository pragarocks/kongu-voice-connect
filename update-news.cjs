const fs = require('fs');
const path = require('path');

const newsDirectory = path.join(__dirname, 'src', 'data', 'news');

// Coimbatore news
const coimbatoreNews = [
  {
    "id": "cbe-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Coimbatore Reports 73% Turnout; Early Leads Show Tight Race",
    "summary": "The industrial city recorded its highest voter participation in 24 years. Early counting trends show intense competition between NDA and ADMK in most constituencies."
  },
  {
    "id": "cbe-25-2",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Textile Magnates' Preferred Candidates Lead in Initial Counts",
    "summary": "Business-friendly candidates from industrial elite show strong performance in Coimbatore city limits as counting progresses."
  },
  {
    "id": "cbe-25-3",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Women Voters' Participation Crosses 75%",
    "summary": "Record female voter turnout demonstrates strong political engagement in the industrial hub, exceeding national average significantly."
  },
  {
    "id": "cbe-25-4",
    "featured": true,
    "category": "Business",
    "date": "April 25, 2026",
    "title": "Stock Market Reacts Positively to Exit Polls",
    "summary": "Coimbatore textile and manufacturing indices surge following exit polls suggesting business-friendly government formation."
  }
];

// Erode news
const erodeNews = [
  {
    "id": "erd-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Erode Records Strong 71% Turnout; Independent Surge Shocks Parties",
    "summary": "Agricultural district shows record participation. Independent candidates leading in early counts across three constituencies, challenging traditional party dominance."
  },
  {
    "id": "erd-25-2",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Farmer-Backed Independent Wins Big in Perundurai",
    "summary": "Candidate backed by agricultural unions leads significantly in early tallies, indicating strong rural voter preference for new leadership."
  },
  {
    "id": "erd-25-3",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Counting Progresses Smoothly; Minimal Complaints Reported",
    "summary": "Erode district administration reports peaceful counting process with strong security deployment and transparent verification procedures."
  },
  {
    "id": "erd-25-4",
    "featured": true,
    "category": "Agriculture",
    "date": "April 25, 2026",
    "title": "Agricultural Issues Dominate Campaign Results",
    "summary": "Water management and irrigation concerns proved decisive in voter preferences across rural constituencies."
  }
];

// Tiruppur news
const tiruppurNews = [
  {
    "id": "tpr-25-1",
    "featured": true,
    "category": "Business",
    "date": "April 25, 2026",
    "title": "Tiruppur Textile Hub Celebrates Pro-Business Exit Polls",
    "summary": "Knitwear and garment industry celebrates exit polls predicting business-friendly government. Stock indices surge 2.3% on optimism."
  },
  {
    "id": "tpr-25-2",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "67% Voter Turnout Recorded; Industry Leaders Vote in Significant Numbers",
    "summary": "Strong participation from textile sector employees and management demonstrates unified business sector engagement with electoral process."
  },
  {
    "id": "tpr-25-3",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Business-Friendly Candidates Lead in Tiruppur Constituencies",
    "summary": "Pro-industry candidates show commanding leads in early counting trends across urban and industrial areas of Tiruppur district."
  },
  {
    "id": "tpr-25-4",
    "featured": true,
    "category": "Business",
    "date": "April 25, 2026",
    "title": "Garment Exporters Prepare for Trade Expansion",
    "summary": "Industry associations draft expansion proposals based on election outcome predictions, targeting 25% growth in next fiscal year."
  }
];

// Salem news
const salemNews = [
  {
    "id": "sal-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Salem Results Show Photo Finish; Final Count Neck-and-Neck",
    "summary": "Industrial district records 69% turnout. Three constituencies showing razor-thin victory margins, with final results expected only after detailed verification."
  },
  {
    "id": "sal-25-2",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Salem City Delivers Surprising Results in Steel Belt",
    "summary": "Steel industry workers' votes show unexpected pattern, breaking pre-election predictions and surprising political analysts."
  },
  {
    "id": "sal-25-3",
    "featured": true,
    "category": "Infrastructure",
    "date": "April 25, 2026",
    "title": "Water Project Promises Influence Salem Voting Patterns",
    "summary": "€456-million water concession becomes key electoral issue with urban voters supporting infrastructure-focused candidates."
  },
  {
    "id": "sal-25-4",
    "featured": true,
    "category": "Civic",
    "date": "April 25, 2026",
    "title": "First-Time Voters Shape Salem's Electoral Outcome",
    "summary": "Record participation from youth voters (18-25) demonstrates strong civic engagement and new voter consciousness in Salem district."
  }
];

// Namakkal news
const namakkalNews = [
  {
    "id": "nam-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Namakkal Poultry Belt Records 68% Voting; Close Results Anticipated",
    "summary": "Agricultural district with poultry industry shows strong participation. Early trends indicate tight three-way contest in multiple constituencies."
  },
  {
    "id": "nam-25-2",
    "featured": true,
    "category": "Agriculture",
    "date": "April 25, 2026",
    "title": "Poultry Farmers' Votes Drive New Political Alignment",
    "summary": "Organized farming sector delivers unified vote based on industry-specific manifesto promises from competing parties."
  },
  {
    "id": "nam-25-3",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "DMK-ADMK Split Redivides Namakkal Constituencies",
    "summary": "Major party schism reverberates through rural Namakkal with candidate cross-overs influencing voter preferences significantly."
  },
  {
    "id": "nam-25-4",
    "featured": true,
    "category": "Civic",
    "date": "April 25, 2026",
    "title": "Women's Groups Achieve Record 76% Voting Participation",
    "summary": "Namakkal women voters exceed national averages, with self-help groups mobilizing unprecedented participation across villages."
  }
];

// Nilgiris news
const nilgirisNews = [
  {
    "id": "nil-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Nilgiris Hill District Celebrates 68% Tribal Participation",
    "summary": "Remote villages in Nilgiris achieve remarkable turnout with special polling stations in tribal settlements. Election commission hails civic participation."
  },
  {
    "id": "nil-25-2",
    "featured": true,
    "category": "Civic",
    "date": "April 25, 2026",
    "title": "Tribal Communities Vote in Record Numbers",
    "summary": "Special initiatives to include remote tribal settlements result in 68% participation, highest in district history."
  },
  {
    "id": "nil-25-3",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Environmental Issues Drive Nilgiris Voting Patterns",
    "summary": "Tribal voters prioritize environmental protection and forest conservation policies, with eco-friendly candidates showing strong leads."
  },
  {
    "id": "nil-25-4",
    "featured": true,
    "category": "Environment",
    "date": "April 25, 2026",
    "title": "Forest Conservation Emerges as Key Election Issue",
    "summary": "Nilgiris voters give priority to biodiversity protection and tribal land rights over traditional economic development promises."
  }
];

// Karur news
const karurNews = [
  {
    "id": "kar-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Karur Jewelry Hub Records Surprising 70% Turnout",
    "summary": "Small-scale industrial district delivers strong participation. Jewelry and textile workers show unified voting patterns based on business concerns."
  },
  {
    "id": "kar-25-2",
    "featured": true,
    "category": "Business",
    "date": "April 25, 2026",
    "title": "Gold Merchants' Association Influences Karur Results",
    "summary": "Organized jewelry sector delivers strategic voting block supporting candidates committed to MSME growth and export incentives."
  },
  {
    "id": "kar-25-3",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Youth Leadership Challenges Senior Candidates in Karur",
    "summary": "Younger candidates with business backgrounds surprisingly lead in early counts, signalling generational shift in voter preferences."
  },
  {
    "id": "kar-25-4",
    "featured": true,
    "category": "Civic",
    "date": "April 25, 2026",
    "title": "Karur's Progressive Voters Demand Inclusive Development",
    "summary": "Social welfare and equitable development emerge as priority issues, influencing results in urban constituencies."
  }
];

// Dharmapuri news
const dharmapuriNews = [
  {
    "id": "dha-25-1",
    "featured": true,
    "category": "Election",
    "date": "April 25, 2026",
    "title": "Dharmapuri Agricultural District Votes 66%; Results Show Agrarian Focus",
    "summary": "Farming-dominated district records strong turnout with agricultural issues dominating electoral outcome across constituencies."
  },
  {
    "id": "dha-25-2",
    "featured": true,
    "category": "Agriculture",
    "date": "April 25, 2026",
    "title": "Farmers' Collective Delivers Bloc Vote in Dharmapuri",
    "summary": "Organized agricultural groups mobilize strong support for candidates advocating minimum support prices and irrigation guarantees."
  },
  {
    "id": "dha-25-3",
    "featured": true,
    "category": "Politics",
    "date": "April 25, 2026",
    "title": "Mango Farmers' Issues Shape Dharmapuri Election",
    "summary": "Horticulture sector demands for export facilitation and crop insurance strongly influence voter choices in southern constituencies."
  },
  {
    "id": "dha-25-4",
    "featured": true,
    "category": "Civic",
    "date": "April 25, 2026",
    "title": "Rural Development Pledges Mobilize Dharmapuri Voters",
    "summary": "Infrastructure and connectivity promises resonate strongly with rural populations driving results across farming constituencies."
  }
];

// Write all files
fs.writeFileSync(path.join(newsDirectory, 'coimbatore.json'), JSON.stringify(coimbatoreNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'erode.json'), JSON.stringify(erodeNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'tiruppur.json'), JSON.stringify(tiruppurNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'salem.json'), JSON.stringify(salemNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'namakkal.json'), JSON.stringify(namakkalNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'nilgiris.json'), JSON.stringify(nilgirisNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'karur.json'), JSON.stringify(karurNews, null, 2));
fs.writeFileSync(path.join(newsDirectory, 'dharmapuri.json'), JSON.stringify(dharmapuriNews, null, 2));

console.log('✅ All district news files updated for April 25, 2026!');
console.log('📰 Updated files:');
console.log('  - coimbatore.json');
console.log('  - erode.json');
console.log('  - tiruppur.json');
console.log('  - salem.json');
console.log('  - namakkal.json');
console.log('  - nilgiris.json');
console.log('  - karur.json');
console.log('  - dharmapuri.json');
console.log('\n🎉 Page will auto-refresh with fresh election day coverage!');
