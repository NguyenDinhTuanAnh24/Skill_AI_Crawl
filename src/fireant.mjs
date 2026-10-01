const BASE_URL = "https://api.fireant.vn";
const SITE_URL = "https://fireant.vn";
const USER_AGENT = "FireAnt-Stock-Report/1.0 (research; low-rate public data client)";

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function request(url, { token, json = true } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const response = await fetch(url, {
      headers: {
        Accept: json ? "application/json" : "text/html",
        "User-Agent": USER_AGENT,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} tại ${url}`);
    return json ? response.json() : response.text();
  } finally {
    clearTimeout(timer);
  }
}

async function getGuestToken(symbol) {
  if (process.env.FIREANT_TOKEN) return process.env.FIREANT_TOKEN.trim();
  const html = await request(`${SITE_URL}/ma-chung-khoan/${encodeURIComponent(symbol)}`, { json: false });
  const match = html.match(/"accessToken":"([^"]+)"/);
  if (!match) throw new Error("Không tìm thấy token khách công khai trên trang FireAnt. Có thể đặt FIREANT_TOKEN rồi chạy lại.");
  return match[1];
}

function dateOnly(date) {
  return date.toISOString().slice(0, 10);
}

async function paged(pathFactory, token, maximum, pageSize) {
  const rows = [];
  for (let offset = 0; offset < maximum; offset += pageSize) {
    const page = await request(`${BASE_URL}${pathFactory(offset, Math.min(pageSize, maximum - offset))}`, { token });
    if (!Array.isArray(page)) throw new Error("FireAnt trả về định dạng phân trang không hợp lệ.");
    rows.push(...page);
    if (page.length < Math.min(pageSize, maximum - offset)) break;
    await sleep(140);
  }
  return rows.slice(0, maximum);
}

export async function crawlFireAnt({ symbol, years, news: newsLimit }) {
  const token = await getGuestToken(symbol);
  const end = new Date();
  const start = new Date(end);
  start.setUTCFullYear(start.getUTCFullYear() - years);
  const startDate = dateOnly(start);
  const endDate = dateOnly(end);
  const encoded = encodeURIComponent(symbol);

  const [company, profile, financials] = await Promise.all([
    request(`${BASE_URL}/symbols/${encoded}`, { token }),
    request(`${BASE_URL}/symbols/${encoded}/profile`, { token }),
    request(`${BASE_URL}/symbols/${encoded}/financial-data?type=Y&count=${Math.max(5, years)}`, { token })
  ]);

  const quotes = await paged(
    (offset, limit) => `/symbols/${encoded}/historical-quotes?startDate=${startDate}&endDate=${endDate}&offset=${offset}&limit=${limit}`,
    token,
    years * 280,
    500
  );
  const news = await paged(
    (offset, limit) => `/search/exact?keywords=${encoded}&type=news&offset=${offset}&limit=${limit}`,
    token,
    newsLimit,
    50
  );

  if (!quotes.length) throw new Error(`Không có dữ liệu giá cho ${symbol}.`);
  return {
    source: {
      name: "FireAnt",
      website: `${SITE_URL}/ma-chung-khoan/${encoded}`,
      api: BASE_URL,
      retrievedAt: new Date().toISOString(),
      range: { startDate, endDate }
    },
    company,
    profile: {
      companyName: profile.companyName,
      shortName: profile.shortName,
      overview: profile.overview,
      webAddress: profile.webAddress,
      headQuarters: profile.headQuarters
    },
    quotes,
    financials,
    news: news.map((item) => ({
      postID: item.postID,
      title: item.title,
      description: item.description,
      date: item.date,
      sourceName: item.postSource?.name || "FireAnt",
      sourceUrl: item.postSourceUrl || item.link || item.postSource?.url || `${SITE_URL}/bai-viet/`,
      fireantUrl: `${SITE_URL}/bai-viet/${item.postID}`,
      taggedSymbols: (item.taggedSymbols || []).map((tag) => tag.symbol),
      engagement: (item.totalLikes || 0) + (item.totalReplies || 0) + (item.totalShares || 0)
    }))
  };
}
