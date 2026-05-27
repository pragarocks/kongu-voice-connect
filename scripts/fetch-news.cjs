'use strict';

const fs = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────

const NEWS_DIR = path.join(__dirname, '..', 'src', 'data', 'news');

const DISTRICTS = [
  { slug: 'erode',      query: 'Erode Tamil Nadu news',           name: 'Erode' },
  { slug: 'coimbatore', query: 'Coimbatore Tamil Nadu news',      name: 'Coimbatore' },
  { slug: 'tiruppur',   query: 'Tiruppur Tamil Nadu news',        name: 'Tiruppur' },
  { slug: 'salem',      query: 'Salem Tamil Nadu news',           name: 'Salem' },
  { slug: 'namakkal',   query: 'Namakkal Tamil Nadu news',        name: 'Namakkal' },
  { slug: 'nilgiris',   query: 'Nilgiris Ooty Tamil Nadu news',   name: 'Nilgiris' },
  { slug: 'karur',      query: 'Karur Tamil Nadu news',           name: 'Karur' },
  { slug: 'dharmapuri', query: 'Dharmapuri Tamil Nadu news',      name: 'Dharmapuri' },
];

const KONGU_QUERY = 'Kongu region Tamil Nadu news';
const MAX_ARTICLES_PER_DISTRICT = 6;
const MAX_TRENDING = 8;
const KEEP_DAYS = 7;
const AI_CALL_DELAY_MS = 1200;

// ─── RSS Parsing ──────────────────────────────────────────────────────────────

function extractTag(xml, tag) {
  // CDATA first
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1];

  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(re);
  return match ? match[1] : '';
}

function stripHTML(str) {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeHTMLEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

function parseRSSXML(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRe.exec(xml)) !== null) {
    const chunk = match[1];
    const title       = decodeHTMLEntities(stripHTML(extractTag(chunk, 'title'))).trim();
    const description = decodeHTMLEntities(stripHTML(extractTag(chunk, 'description'))).trim();
    const link        = extractTag(chunk, 'link').trim();
    const pubDate     = extractTag(chunk, 'pubDate').trim();
    const source      = decodeHTMLEntities(stripHTML(extractTag(chunk, 'source'))).trim();

    if (title) {
      items.push({ title, description, link, pubDate, source });
    }
  }

  return items;
}

// ─── HTTP ─────────────────────────────────────────────────────────────────────

async function fetchURL(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; KonguTimesBot/1.0)',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} fetching ${url}`);
  return response.text();
}

async function fetchRSS(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
  const xml = await fetchURL(url);
  return parseRSSXML(xml);
}

// ─── AI Provider ──────────────────────────────────────────────────────────────

function detectProvider() {
  const openaiKey = process.env.OPENAI_API_KEY || '';
  const geminiKey = process.env.GEMINI_API_KEY || '';

  if (openaiKey.startsWith('sk-')) return { provider: 'openai', apiKey: openaiKey };
  if (geminiKey.length > 0)        return { provider: 'gemini', apiKey: geminiKey };
  return { provider: null, apiKey: null };
}

async function callOpenAI(prompt, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 512,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI ${response.status}: ${err.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini ${response.status}: ${err.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

function buildFallbackArticle(item) {
  const summary = item.description
    ? item.description.slice(0, 220) + (item.description.length > 220 ? '...' : '')
    : item.title;
  return { title: item.title.slice(0, 100), title_ta: '', summary, summary_ta: '', category: 'News' };
}

const REWRITE_PROMPT = (title, description) =>
  `You are a news editor for The Kongu Times, a Tamil Nadu regional news portal.
Rewrite the following RSS news item into a unique, engaging article.

Title: ${title}
Description: ${description}

Return ONLY a JSON object with exactly these fields:
{
  "title": "Rewritten English headline (under 100 characters, factual)",
  "title_ta": "Tamil translation of the headline",
  "summary": "2-3 sentence English summary, informative and neutral",
  "summary_ta": "Tamil translation of the summary",
  "category": "One of: Education, Business, Politics, Governance, Weather, Crime, Health, Sports, Infrastructure, Development, Accident, Wildlife, Policy, Agriculture, News"
}`;

async function rewriteArticle(item, provider, apiKey) {
  if (!provider) return buildFallbackArticle(item);

  const prompt = REWRITE_PROMPT(item.title, item.description || item.title);
  let rawJson;

  try {
    rawJson = provider === 'openai'
      ? await callOpenAI(prompt, apiKey)
      : await callGemini(prompt, apiKey);

    const parsed = JSON.parse(rawJson);
    if (!parsed.title || !parsed.summary) throw new Error('Missing required fields');
    return parsed;
  } catch (err) {
    console.warn(`  AI rewrite failed (${err.message}), using fallback`);
    return buildFallbackArticle(item);
  }
}

// ─── Date Utilities ───────────────────────────────────────────────────────────

function formatDate(dateStr) {
  try {
    const d = dateStr ? new Date(dateStr) : new Date();
    if (isNaN(d.getTime())) return formatDate(null);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

function isWithinDays(dateStr, days) {
  try {
    const articleDate = new Date(dateStr);
    if (isNaN(articleDate.getTime())) return true;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return articleDate >= cutoff;
  } catch {
    return true;
  }
}

// ─── ID Generation ────────────────────────────────────────────────────────────

function generateId(slug, index, pubDate) {
  const d = pubDate ? new Date(pubDate) : new Date();
  const safe = isNaN(d.getTime()) ? new Date() : d;
  const mon = safe.toLocaleString('en-US', { month: 'short' }).toLowerCase();
  const day = safe.getDate();
  return `${slug.slice(0, 3)}-${mon}${day}-${String(index + 1).padStart(3, '0')}`;
}

// ─── JSON File Management ─────────────────────────────────────────────────────

function normalizeTitle(title) {
  return (title || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 50);
}

function mergeArticles(existing, incoming, maxCount) {
  const existingKeys = new Set(existing.map(a => normalizeTitle(a.title)));
  const fresh = incoming.filter(a => !existingKeys.has(normalizeTitle(a.title)));
  const kept = existing.filter(a => isWithinDays(a.date, KEEP_DAYS));
  const merged = [...fresh, ...kept].slice(0, maxCount);
  // Ensure exactly one featured article (the first)
  return merged.map((a, i) => ({ ...a, featured: i === 0 }));
}

function readNewsFile(slug) {
  const filePath = path.join(NEWS_DIR, `${slug}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function writeNewsFile(slug, articles) {
  const filePath = path.join(NEWS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2) + '\n', 'utf8');
}

// ─── Orchestration ────────────────────────────────────────────────────────────

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function processDistrict(district, providerInfo) {
  console.log(`\nProcessing ${district.name}...`);

  let rssItems;
  try {
    rssItems = await fetchRSS(district.query);
  } catch (err) {
    console.error(`  RSS fetch failed: ${err.message}`);
    return;
  }

  if (!rssItems.length) {
    console.log('  No RSS items — skipping');
    return;
  }

  const topItems = rssItems.slice(0, MAX_ARTICLES_PER_DISTRICT);
  const newArticles = [];

  for (let i = 0; i < topItems.length; i++) {
    const item = topItems[i];
    console.log(`  [${i + 1}/${topItems.length}] ${item.title.slice(0, 70)}`);

    const rewritten = await rewriteArticle(item, providerInfo.provider, providerInfo.apiKey);

    newArticles.push({
      id:         generateId(district.slug, i, item.pubDate),
      category:   rewritten.category || 'News',
      featured:   i === 0,
      title:      rewritten.title,
      title_ta:   rewritten.title_ta || '',
      summary:    rewritten.summary,
      summary_ta: rewritten.summary_ta || '',
      date:       formatDate(item.pubDate),
    });

    if (i < topItems.length - 1) await sleep(AI_CALL_DELAY_MS);
  }

  const existing = readNewsFile(district.slug);
  const merged   = mergeArticles(existing, newArticles, MAX_ARTICLES_PER_DISTRICT * 2);
  writeNewsFile(district.slug, merged);
  console.log(`  Saved ${merged.length} articles → ${district.slug}.json`);
}

async function processMainJSON(providerInfo) {
  console.log('\nProcessing main.json (trending)...');

  let rssItems;
  try {
    rssItems = await fetchRSS(KONGU_QUERY);
  } catch (err) {
    console.error(`  RSS fetch failed: ${err.message}`);
    return;
  }

  if (!rssItems.length) {
    console.log('  No RSS items — skipping');
    return;
  }

  const topItems = rssItems.slice(0, MAX_TRENDING);
  const trending = [];

  for (let i = 0; i < topItems.length; i++) {
    const item = topItems[i];
    console.log(`  [${i + 1}/${topItems.length}] ${item.title.slice(0, 70)}`);

    const rewritten = await rewriteArticle(item, providerInfo.provider, providerInfo.apiKey);

    trending.push({
      id:         `main-trd-${String(i + 1).padStart(3, '0')}`,
      title_en:   rewritten.title,
      title_ta:   rewritten.title_ta || '',
      summary_en: rewritten.summary,
      summary_ta: rewritten.summary_ta || '',
      district:   'Region',
      category:   rewritten.category || 'News',
      date:       formatDate(item.pubDate),
    });

    if (i < topItems.length - 1) await sleep(AI_CALL_DELAY_MS);
  }

  const mainPath = path.join(NEWS_DIR, 'main.json');
  let mainData = {};
  try {
    mainData = JSON.parse(fs.readFileSync(mainPath, 'utf8'));
  } catch { /* start fresh */ }

  mainData.trending = trending;
  mainData.updated  = new Date().toISOString().split('T')[0];

  fs.writeFileSync(mainPath, JSON.stringify(mainData, null, 2) + '\n', 'utf8');
  console.log(`  Saved ${trending.length} trending items → main.json`);
}

async function main() {
  console.log('=== Kongu Times — Automated News Fetcher ===');
  console.log(`Time: ${new Date().toISOString()}`);

  const providerInfo = detectProvider();
  console.log(`AI Provider: ${providerInfo.provider ?? 'none (raw RSS fallback)'}`);

  for (const district of DISTRICTS) {
    await processDistrict(district, providerInfo);
  }

  await processMainJSON(providerInfo);

  console.log('\n=== Done ===');
}

// ─── Exports (used by tests) ──────────────────────────────────────────────────

module.exports = {
  parseRSSXML,
  extractTag,
  stripHTML,
  decodeHTMLEntities,
  detectProvider,
  formatDate,
  generateId,
  isWithinDays,
  mergeArticles,
  normalizeTitle,
  buildFallbackArticle,
  rewriteArticle,
  callOpenAI,
  callGemini,
  KEEP_DAYS,
  DISTRICTS,
};

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}
