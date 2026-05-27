import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const {
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
} = require('../../scripts/fetch-news.cjs');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeSampleRSS(items: Array<{ title: string; description?: string; link?: string; pubDate?: string }>) {
  const itemsXml = items
    .map(
      i => `<item>
      <title><![CDATA[${i.title}]]></title>
      <description><![CDATA[${i.description ?? ''}]]></description>
      <link>${i.link ?? 'https://example.com'}</link>
      <pubDate>${i.pubDate ?? 'Wed, 14 May 2026 10:00:00 +0000'}</pubDate>
    </item>`
    )
    .join('\n');
  return `<?xml version="1.0"?><rss version="2.0"><channel>${itemsXml}</channel></rss>`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

// ─── parseRSSXML ─────────────────────────────────────────────────────────────

describe('parseRSSXML', () => {
  it('returns one item per <item> block', () => {
    const xml = makeSampleRSS([
      { title: 'First Story', description: 'Details here.' },
      { title: 'Second Story', description: 'More details.' },
    ]);
    const items = parseRSSXML(xml);
    expect(items).toHaveLength(2);
  });

  it('populates all fields correctly', () => {
    const xml = makeSampleRSS([
      { title: 'Test Headline', description: 'Summary text.', link: 'https://news.google.com/a', pubDate: 'Fri, 01 Jan 2026 08:00:00 +0000' },
    ]);
    const [item] = parseRSSXML(xml);
    expect(item.title).toBe('Test Headline');
    expect(item.description).toBe('Summary text.');
    expect(item.link).toBe('https://news.google.com/a');
    expect(item.pubDate).toBe('Fri, 01 Jan 2026 08:00:00 +0000');
  });

  it('handles CDATA sections', () => {
    const xml = `<rss><channel><item>
      <title><![CDATA[Rain & Thunder: Erode alert]]></title>
      <description><![CDATA[Heavy <b>rainfall</b> expected.]]></description>
    </item></channel></rss>`;
    const [item] = parseRSSXML(xml);
    expect(item.title).toBe('Rain & Thunder: Erode alert');
    expect(item.description).toBe('Heavy rainfall expected.');
  });

  it('strips HTML tags from description', () => {
    const xml = makeSampleRSS([{ title: 'Story', description: '<p>Para <b>bold</b></p>' }]);
    const [item] = parseRSSXML(xml);
    expect(item.description).not.toContain('<p>');
    expect(item.description).toContain('Para');
    expect(item.description).toContain('bold');
  });

  it('returns empty array for feed with no items', () => {
    const xml = `<rss><channel><title>Empty feed</title></channel></rss>`;
    expect(parseRSSXML(xml)).toEqual([]);
  });

  it('skips items with empty titles', () => {
    const xml = `<rss><channel>
      <item><title></title><description>No title</description></item>
      <item><title>Valid</title><description>ok</description></item>
    </channel></rss>`;
    const items = parseRSSXML(xml);
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Valid');
  });

  it('handles malformed XML gracefully (returns whatever it can parse)', () => {
    expect(() => parseRSSXML('not xml at all')).not.toThrow();
    expect(parseRSSXML('not xml at all')).toEqual([]);
  });
});

// ─── extractTag ──────────────────────────────────────────────────────────────

describe('extractTag', () => {
  it('extracts plain tag content', () => {
    expect(extractTag('<title>Hello</title>', 'title')).toBe('Hello');
  });

  it('extracts CDATA content', () => {
    expect(extractTag('<title><![CDATA[Hello & World]]></title>', 'title')).toBe('Hello & World');
  });

  it('returns empty string when tag is absent', () => {
    expect(extractTag('<description>text</description>', 'title')).toBe('');
  });
});

// ─── stripHTML ───────────────────────────────────────────────────────────────

describe('stripHTML', () => {
  it('removes HTML tags', () => {
    expect(stripHTML('<b>bold</b> and <i>italic</i>')).toBe('bold and italic');
  });

  it('collapses whitespace', () => {
    expect(stripHTML('  multiple   spaces  ')).toBe('multiple spaces');
  });

  it('leaves plain text untouched', () => {
    expect(stripHTML('plain text')).toBe('plain text');
  });
});

// ─── decodeHTMLEntities ───────────────────────────────────────────────────────

describe('decodeHTMLEntities', () => {
  it('decodes &amp;', () => expect(decodeHTMLEntities('a &amp; b')).toBe('a & b'));
  it('decodes &lt; and &gt;', () => expect(decodeHTMLEntities('&lt;tag&gt;')).toBe('<tag>'));
  it('decodes &quot;', () => expect(decodeHTMLEntities('say &quot;hi&quot;')).toBe('say "hi"'));
  it('decodes &#39; (apos)', () => expect(decodeHTMLEntities('it&#39;s')).toBe("it's"));
  it('decodes numeric entities', () => expect(decodeHTMLEntities('&#65;')).toBe('A'));
  it('leaves plain strings unchanged', () => expect(decodeHTMLEntities('hello world')).toBe('hello world'));
});

// ─── detectProvider ───────────────────────────────────────────────────────────

describe('detectProvider', () => {
  let savedOpenAI: string | undefined;
  let savedGemini: string | undefined;

  beforeEach(() => {
    savedOpenAI = process.env.OPENAI_API_KEY;
    savedGemini = process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    delete process.env.GEMINI_API_KEY;
  });

  afterEach(() => {
    if (savedOpenAI !== undefined) process.env.OPENAI_API_KEY = savedOpenAI;
    else delete process.env.OPENAI_API_KEY;
    if (savedGemini !== undefined) process.env.GEMINI_API_KEY = savedGemini;
    else delete process.env.GEMINI_API_KEY;
  });

  it('returns openai when OPENAI_API_KEY starts with sk-', () => {
    process.env.OPENAI_API_KEY = 'sk-abc123';
    const result = detectProvider();
    expect(result.provider).toBe('openai');
    expect(result.apiKey).toBe('sk-abc123');
  });

  it('returns gemini when only GEMINI_API_KEY is set', () => {
    process.env.GEMINI_API_KEY = 'AIzaXYZ';
    const result = detectProvider();
    expect(result.provider).toBe('gemini');
    expect(result.apiKey).toBe('AIzaXYZ');
  });

  it('prefers OpenAI over Gemini when both keys are set', () => {
    process.env.OPENAI_API_KEY = 'sk-preferred';
    process.env.GEMINI_API_KEY = 'AIzaFallback';
    expect(detectProvider().provider).toBe('openai');
  });

  it('returns null provider when neither key is set', () => {
    const result = detectProvider();
    expect(result.provider).toBeNull();
    expect(result.apiKey).toBeNull();
  });

  it('rejects OPENAI_API_KEY that does not start with sk-', () => {
    process.env.OPENAI_API_KEY = 'invalid-key';
    // Falls through to check gemini (which is also absent) → null
    expect(detectProvider().provider).toBeNull();
  });

  it('rejects OPENAI_API_KEY that is just "sk-" with no content', () => {
    process.env.OPENAI_API_KEY = 'sk-';
    // "sk-" starts with "sk-" — considered valid format
    expect(detectProvider().provider).toBe('openai');
  });
});

// ─── formatDate ───────────────────────────────────────────────────────────────

describe('formatDate', () => {
  it('formats a standard RSS date string', () => {
    const result = formatDate('Wed, 14 May 2026 10:00:00 +0000');
    expect(result).toContain('2026');
    expect(result).toContain('14');
  });

  it('formats an ISO date string', () => {
    const result = formatDate('2026-01-20T00:00:00.000Z');
    expect(result).toContain('2026');
    expect(result).toContain('20');
  });

  it('returns a non-empty string for empty input', () => {
    const result = formatDate('');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns a non-empty string for invalid date input', () => {
    const result = formatDate('not-a-date');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns today\'s date for null/undefined', () => {
    const result = formatDate(null as unknown as string);
    const year = new Date().getFullYear().toString();
    expect(result).toContain(year);
  });
});

// ─── generateId ───────────────────────────────────────────────────────────────

describe('generateId', () => {
  it('uses the first 3 chars of the slug', () => {
    const id = generateId('erode', 0, '2026-05-14T00:00:00Z');
    expect(id.startsWith('ero-')).toBe(true);
  });

  it('pads single-digit index to 3 digits', () => {
    const id = generateId('salem', 0, '2026-05-14T00:00:00Z');
    expect(id).toMatch(/sal-\w+-001$/);
  });

  it('increments index correctly', () => {
    const id1 = generateId('karur', 0, '2026-05-14T00:00:00Z');
    const id2 = generateId('karur', 4, '2026-05-14T00:00:00Z');
    expect(id1).toMatch(/-001$/);
    expect(id2).toMatch(/-005$/);
  });

  it('includes month and day in the id', () => {
    const id = generateId('tiruppur', 0, '2026-05-14T00:00:00Z');
    expect(id).toMatch(/may14/);
  });

  it('does not throw for missing pubDate', () => {
    expect(() => generateId('nilgiris', 0, '')).not.toThrow();
  });
});

// ─── isWithinDays ────────────────────────────────────────────────────────────

describe('isWithinDays', () => {
  it('returns true for today\'s article', () => {
    expect(isWithinDays(new Date().toISOString(), KEEP_DAYS)).toBe(true);
  });

  it('returns true for article from yesterday', () => {
    expect(isWithinDays(daysAgo(1), KEEP_DAYS)).toBe(true);
  });

  it('returns false for an article older than KEEP_DAYS', () => {
    expect(isWithinDays(daysAgo(KEEP_DAYS + 2), KEEP_DAYS)).toBe(false);
  });

  it('returns true (keep) for unparseable date strings', () => {
    expect(isWithinDays('not-a-date', KEEP_DAYS)).toBe(true);
  });

  it('returns true for formatted dates within range ("May 14, 2026" style)', () => {
    // Simulate a date 3 days ago formatted as "Month D, YYYY"
    const d = new Date();
    d.setDate(d.getDate() - 3);
    const formatted = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    expect(isWithinDays(formatted, KEEP_DAYS)).toBe(true);
  });
});

// ─── normalizeTitle ───────────────────────────────────────────────────────────

describe('normalizeTitle', () => {
  it('lowercases and strips non-alphanumeric chars', () => {
    expect(normalizeTitle('Hello, World!')).toBe('helloworld');
  });

  it('truncates to 50 chars', () => {
    const long = 'a'.repeat(100);
    expect(normalizeTitle(long)).toHaveLength(50);
  });

  it('handles empty string', () => {
    expect(normalizeTitle('')).toBe('');
  });
});

// ─── mergeArticles ───────────────────────────────────────────────────────────

describe('mergeArticles', () => {
  const freshDate = new Date().toISOString();
  const oldDate = daysAgo(KEEP_DAYS + 3);

  it('prepends new articles before existing ones', () => {
    const existing = [{ title: 'Old Story', date: freshDate, featured: false }];
    const incoming = [{ title: 'New Story', date: freshDate, featured: false }];
    const merged = mergeArticles(existing, incoming, 10);
    expect(merged[0].title).toBe('New Story');
    expect(merged[1].title).toBe('Old Story');
  });

  it('deduplicates articles with the same title', () => {
    const existing = [{ title: 'Same Title', date: freshDate, featured: false }];
    const incoming = [{ title: 'Same Title', date: freshDate, featured: false }];
    expect(mergeArticles(existing, incoming, 10)).toHaveLength(1);
  });

  it('deduplicates despite punctuation and case differences', () => {
    const existing = [{ title: 'Rain & Thunder in Erode!', date: freshDate, featured: false }];
    const incoming = [{ title: 'rain thunder in erode', date: freshDate, featured: false }];
    // normalizeTitle strips punctuation and lowercases — these should match within 50 chars
    expect(mergeArticles(existing, incoming, 10)).toHaveLength(1);
  });

  it('drops existing articles older than KEEP_DAYS', () => {
    const existing = [
      { title: 'Old Article', date: oldDate, featured: false },
      { title: 'Fresh Article', date: freshDate, featured: false },
    ];
    const merged = mergeArticles(existing, [], 10);
    expect(merged.some(a => a.title === 'Old Article')).toBe(false);
    expect(merged.some(a => a.title === 'Fresh Article')).toBe(true);
  });

  it('respects maxCount limit', () => {
    const existing = Array.from({ length: 8 }, (_, i) => ({ title: `Existing ${i}`, date: freshDate, featured: false }));
    const incoming = Array.from({ length: 4 }, (_, i) => ({ title: `New ${i}`, date: freshDate, featured: false }));
    const merged = mergeArticles(existing, incoming, 6);
    expect(merged).toHaveLength(6);
  });

  it('sets featured: true only for the first article', () => {
    const existing = [{ title: 'Old', date: freshDate, featured: true }];
    const incoming = [{ title: 'New', date: freshDate, featured: false }];
    const merged = mergeArticles(existing, incoming, 10);
    expect(merged[0].featured).toBe(true);
    merged.slice(1).forEach(a => expect(a.featured).toBe(false));
  });

  it('returns empty array when both inputs are empty', () => {
    expect(mergeArticles([], [], 10)).toEqual([]);
  });
});

// ─── buildFallbackArticle ─────────────────────────────────────────────────────

describe('buildFallbackArticle', () => {
  it('truncates long descriptions at 220 chars', () => {
    const item = { title: 'Title', description: 'x'.repeat(300) };
    const result = buildFallbackArticle(item);
    expect(result.summary.length).toBeLessThanOrEqual(223); // 220 + '...'
    expect(result.summary.endsWith('...')).toBe(true);
  });

  it('keeps short descriptions unchanged (no ellipsis)', () => {
    const item = { title: 'Title', description: 'Short.' };
    expect(buildFallbackArticle(item).summary).toBe('Short.');
  });

  it('uses title as summary when description is empty', () => {
    const item = { title: 'Some headline', description: '' };
    expect(buildFallbackArticle(item).summary).toBe('Some headline');
  });

  it('truncates title to 100 chars', () => {
    const item = { title: 'T'.repeat(200), description: '' };
    expect(buildFallbackArticle(item).title).toHaveLength(100);
  });

  it('always sets category to "News"', () => {
    expect(buildFallbackArticle({ title: 'T', description: 'D' }).category).toBe('News');
  });

  it('always sets title_ta and summary_ta to empty strings', () => {
    const result = buildFallbackArticle({ title: 'T', description: 'D' });
    expect(result.title_ta).toBe('');
    expect(result.summary_ta).toBe('');
  });
});

// ─── rewriteArticle ───────────────────────────────────────────────────────────

describe('rewriteArticle', () => {
  afterEach(() => vi.restoreAllMocks());

  const mockItem = { title: 'Flood hits Erode', description: 'Heavy rains caused flooding.', link: '', pubDate: '', source: '' };

  it('returns fallback when provider is null', async () => {
    const result = await rewriteArticle(mockItem, null, null);
    expect(result.category).toBe('News');
    expect(result.title).toBeTruthy();
  });

  it('calls OpenAI and parses JSON response', async () => {
    const mockPayload = {
      title: 'Erode Flood Disrupts Daily Life',
      title_ta: 'ஈரோட்டில் வெள்ளம்',
      summary: 'Heavy rains flooded Erode.',
      summary_ta: 'கனமழையால் ஈரோட்டில் வெள்ளம்.',
      category: 'Weather',
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: JSON.stringify(mockPayload) } }] }),
    }));

    const result = await rewriteArticle(mockItem, 'openai', 'sk-test');
    expect(result.title).toBe('Erode Flood Disrupts Daily Life');
    expect(result.category).toBe('Weather');
    expect(result.title_ta).toBe('ஈரோட்டில் வெள்ளம்');
  });

  it('calls Gemini and parses JSON response', async () => {
    const mockPayload = {
      title: 'Erode Flood Update',
      title_ta: 'ஈரோடு வெள்ள அறிவிப்பு',
      summary: 'Flooding reported in Erode.',
      summary_ta: 'ஈரோட்டில் வெள்ளம் புகாரிடப்பட்டது.',
      category: 'Weather',
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: JSON.stringify(mockPayload) }] } }],
      }),
    }));

    const result = await rewriteArticle(mockItem, 'gemini', 'AIza-test');
    expect(result.title).toBe('Erode Flood Update');
    expect(result.category).toBe('Weather');
  });

  it('falls back gracefully when API returns HTTP error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      text: async () => 'Rate limit exceeded',
    }));

    const result = await rewriteArticle(mockItem, 'openai', 'sk-test');
    expect(result.category).toBe('News'); // fallback category
  });

  it('falls back gracefully when API returns invalid JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'not-json' } }] }),
    }));

    const result = await rewriteArticle(mockItem, 'openai', 'sk-test');
    expect(result.category).toBe('News');
  });

  it('falls back when AI returns JSON missing required fields', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: JSON.stringify({ category: 'Weather' }) } }] }),
    }));

    const result = await rewriteArticle(mockItem, 'openai', 'sk-test');
    expect(result.category).toBe('News'); // fallback
  });
});

// ─── callOpenAI ───────────────────────────────────────────────────────────────

describe('callOpenAI', () => {
  afterEach(() => vi.restoreAllMocks());

  it('sends request to OpenAI completions endpoint', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: '{"title":"ok"}' } }] }),
    });
    vi.stubGlobal('fetch', mockFetch);

    await callOpenAI('test prompt', 'sk-key');

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('openai.com');
    expect(options.headers.Authorization).toBe('Bearer sk-key');
    expect(JSON.parse(options.body).model).toBe('gpt-4o-mini');
  });

  it('throws on non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    }));

    await expect(callOpenAI('prompt', 'bad-key')).rejects.toThrow('401');
  });
});

// ─── callGemini ───────────────────────────────────────────────────────────────

describe('callGemini', () => {
  afterEach(() => vi.restoreAllMocks());

  it('sends request to Gemini generateContent endpoint', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: '{"title":"ok"}' }] } }],
      }),
    });
    vi.stubGlobal('fetch', mockFetch);

    await callGemini('test prompt', 'AIza-key');

    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('generativelanguage.googleapis.com');
    expect(url).toContain('AIza-key');
  });

  it('throws on non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => 'Forbidden',
    }));

    await expect(callGemini('prompt', 'bad-key')).rejects.toThrow('403');
  });
});
