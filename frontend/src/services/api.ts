import { 
  SymbolInfo, 
  MarketData, 
  CandleData, 
  NewsItem, 
  CalendarEvent, 
  ScreenerItem, 
  PortfolioSummary, 
  Alert 
} from '../types';

const API_BASE = '/api';

// Realistic base prices matching backend mock_market.py
const BASE_PRICES: Record<string, { price: number; type: 'COMMODITY' | 'FX' | 'CRYPTO' | 'INDEX'; name: string; decimals: number }> = {
  XAUUSD: { price: 2645.20, type: 'COMMODITY', name: 'Gold / US Dollar', decimals: 2 },
  XAGUSD: { price: 31.50, type: 'COMMODITY', name: 'Silver / US Dollar', decimals: 2 },
  EURUSD: { price: 1.0850, type: 'FX', name: 'Euro / US Dollar', decimals: 4 },
  GBPUSD: { price: 1.2640, type: 'FX', name: 'British Pound / US Dollar', decimals: 4 },
  USDJPY: { price: 151.20, type: 'FX', name: 'US Dollar / Japanese Yen', decimals: 3 },
  AUDUSD: { price: 0.6580, type: 'FX', name: 'Australian Dollar / US Dollar', decimals: 4 },
  USDCAD: { price: 1.3650, type: 'FX', name: 'US Dollar / Canadian Dollar', decimals: 4 },
  USDCHF: { price: 0.8760, type: 'FX', name: 'US Dollar / Swiss Franc', decimals: 4 },
  BTCUSD: { price: 67250.00, type: 'CRYPTO', name: 'Bitcoin / US Dollar', decimals: 2 },
  ETHUSD: { price: 3520.00, type: 'CRYPTO', name: 'Ethereum / US Dollar', decimals: 2 },
  US30: { price: 42150.00, type: 'INDEX', name: 'Dow Jones Industrial Average', decimals: 2 },
  SPX500: { price: 5820.00, type: 'INDEX', name: 'S&P 500 Index', decimals: 2 },
  NAS100: { price: 20450.00, type: 'INDEX', name: 'Nasdaq 100 Index', decimals: 2 },
  USOIL: { price: 78.50, type: 'COMMODITY', name: 'WTI Crude Oil', decimals: 2 },
  UKOIL: { price: 82.30, type: 'COMMODITY', name: 'Brent Crude Oil', decimals: 2 },
};

// Generates synthetic historical candles walking backwards
function generateMockCandles(symbol: string, timeframe: string = '15m', count: number = 200): CandleData[] {
  const base = BASE_PRICES[symbol] || { price: 100, decimals: 2 };
  const tfMinutesMap: Record<string, number> = {
    '1m': 1, '5m': 5, '15m': 15, '30m': 30, '1H': 60, '4H': 240, '1D': 1440, '1W': 10080
  };
  const intervalMinutes = tfMinutesMap[timeframe] || 15;
  const now = Math.floor(Date.now() / 1000);
  const candles: CandleData[] = [];

  let currentPrice = base.price;
  const volatility = symbol.includes('BTC') || symbol.includes('ETH') ? 0.003 : 0.0008;

  // Generate backwards then reverse
  const prices: number[] = [currentPrice];
  for (let i = 0; i < count - 1; i++) {
    const change = (Math.random() - 0.495) * (currentPrice * volatility);
    currentPrice = Math.max(currentPrice - change, 1);
    prices.push(currentPrice);
  }
  prices.reverse();

  const startTime = now - (count * intervalMinutes * 60);
  for (let i = 0; i < count; i++) {
    const candleTime = startTime + (i * intervalMinutes * 60);
    const open = prices[i];
    const variation = open * volatility * 0.8;
    const close = i < count - 1 ? prices[i + 1] : base.price;
    const high = Math.max(open, close) + Math.random() * variation;
    const low = Math.min(open, close) - Math.random() * variation;
    const volume = Math.floor(Math.random() * 5000 + 500);

    candles.push({
      time: candleTime,
      open: Number(open.toFixed(base.decimals)),
      high: Number(high.toFixed(base.decimals)),
      low: Number(low.toFixed(base.decimals)),
      close: Number(close.toFixed(base.decimals)),
      volume
    });
  }

  return candles;
}

// Generate mock news
function generateMockNews(): NewsItem[] {
  const headlines = [
    { title: 'Fed Officials Signal Caution on Rate Cuts Amid Sticky Inflation', cat: 'MACRO', impact: 'HIGH' as const },
    { title: 'Gold Consolidates Near Highs as Geopolitical Safe-Haven Demand Persists', cat: 'GOLD', impact: 'HIGH' as const },
    { title: 'Bitcoin Rebounds Above $67,000 as Institutional Inflows Surge', cat: 'CRYPTO', impact: 'MEDIUM' as const },
    { title: 'ECB Maintains Restrictive Stance as Wage Growth Stays Elevated', cat: 'FOREX', impact: 'MEDIUM' as const },
    { title: 'Crude Oil Steady as Market Weighs Supply Risks in Middle East', cat: 'COMMODITIES', impact: 'MEDIUM' as const },
    { title: 'US Treasury Yields Edge Higher Following Solid Labor Market Prints', cat: 'MACRO', impact: 'MEDIUM' as const },
    { title: 'Dollar Index Holds Gains Ahead of Key Non-Farm Payrolls Report', cat: 'FOREX', impact: 'HIGH' as const },
    { title: 'Silver Outperforms Gold as Industrial Demand Bolsters Outlook', cat: 'GOLD', impact: 'LOW' as const },
    { title: 'Tech Equities Rally on Robust Cloud and AI Infrastructure Capex', cat: 'STOCKS', impact: 'MEDIUM' as const },
    { title: 'Japan Intervenes in FX Market to Support Yen Stability', cat: 'FOREX', impact: 'HIGH' as const },
  ];

  return headlines.map((h, i) => ({
    id: `news-${i + 1}`,
    headline: h.title,
    source: i % 2 === 0 ? 'Bloomberg' : 'Reuters',
    timestamp: Date.now() - (i * 12 * 60000 + Math.floor(Math.random() * 30000)),
    url: '#',
    symbols: ['XAUUSD', 'EURUSD', 'BTCUSD'],
    impact: h.impact,
    category: h.cat
  }));
}

// Generate mock calendar
function generateMockCalendar(): CalendarEvent[] {
  const events = [
    { cur: 'USD', event: 'Non-Farm Employment Change', impact: 'HIGH' as const, act: '272K', fcst: '185K', prev: '165K' },
    { cur: 'USD', event: 'Unemployment Rate', impact: 'HIGH' as const, act: '4.0%', fcst: '3.9%', prev: '3.9%' },
    { cur: 'USD', event: 'Average Hourly Earnings m/m', impact: 'HIGH' as const, act: '0.4%', fcst: '0.3%', prev: '0.2%' },
    { cur: 'EUR', event: 'ECB Main Refinancing Rate', impact: 'HIGH' as const, act: '4.25%', fcst: '4.25%', prev: '4.50%' },
    { cur: 'GBP', event: 'CPI Inflation Rate y/y', impact: 'HIGH' as const, act: '2.0%', fcst: '2.0%', prev: '2.3%' },
    { cur: 'USD', event: 'FOMC Meeting Minutes', impact: 'HIGH' as const, act: undefined, fcst: undefined, prev: undefined },
    { cur: 'USD', event: 'ISM Manufacturing PMI', impact: 'MEDIUM' as const, act: '48.7', fcst: '49.6', prev: '49.2' },
    { cur: 'JPY', event: 'BoJ Monetary Policy Statement', impact: 'HIGH' as const, act: '<0.1%', fcst: '<0.1%', prev: '<0.1%' },
  ];

  return events.map((e, i) => ({
    id: `cal-${i + 1}`,
    time: Date.now() + (i * 3600000) - 7200000,
    currency: e.cur,
    event: e.event,
    impact: e.impact,
    actual: e.act,
    forecast: e.fcst,
    previous: e.prev
  }));
}

// Generate screener items
function generateMockScreener(): ScreenerItem[] {
  return Object.entries(BASE_PRICES).map(([sym, info]) => {
    const chgPercent = Number(((Math.random() - 0.48) * 2.5).toFixed(2));
    const chg = Number((info.price * (chgPercent / 100)).toFixed(info.decimals));
    const rsi = Math.floor(Math.random() * 45 + 30);
    const trend = chgPercent > 0.3 ? 'BULLISH' : chgPercent < -0.3 ? 'BEARISH' : 'NEUTRAL';
    const volatility = Math.abs(chgPercent) > 1.2 ? 'HIGH' : Math.abs(chgPercent) > 0.5 ? 'MEDIUM' : 'LOW';

    return {
      symbol: sym,
      price: Number((info.price + chg).toFixed(info.decimals)),
      change: chg,
      changePercent: chgPercent,
      high: Number((info.price * 1.008).toFixed(info.decimals)),
      low: Number((info.price * 0.992).toFixed(info.decimals)),
      open: info.price,
      volume: Math.floor(Math.random() * 50000 + 5000),
      timestamp: Date.now(),
      bid: Number((info.price - 0.1).toFixed(info.decimals)),
      ask: Number((info.price + 0.1).toFixed(info.decimals)),
      spread: Number((info.decimals === 4 ? 0.0002 : 0.2).toFixed(info.decimals)),
      rsi,
      atr: Number((info.price * 0.008).toFixed(info.decimals)),
      trend,
      volatility
    };
  });
}

// Safe fetch wrapper with timeout
async function safeFetch<T>(endpoint: string, fallback: () => T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${API_BASE}${endpoint}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch {
    // Return realistic fallback on any error / offline backend
    return fallback();
  }
}

export const api = {
  getSymbols: async (): Promise<SymbolInfo[]> => {
    return safeFetch('/symbols', () => {
      return Object.entries(BASE_PRICES).map(([sym, info]) => ({
        symbol: sym,
        name: info.name,
        type: info.type,
        exchange: info.type === 'CRYPTO' ? 'Binance' : info.type === 'FX' ? 'OANDA' : 'CME',
        currency: 'USD',
        session: '24/5',
        marketStatus: 'OPEN'
      }));
    });
  },

  getMarketData: async (symbol: string): Promise<MarketData> => {
    return safeFetch(`/market/${symbol}`, () => {
      const info = BASE_PRICES[symbol] || { price: 100, decimals: 2, type: 'FX' as const, name: symbol };
      const chgPercent = Number(((Math.random() - 0.48) * 1.5).toFixed(2));
      const chg = Number((info.price * (chgPercent / 100)).toFixed(info.decimals));
      const price = Number((info.price + chg).toFixed(info.decimals));
      return {
        symbol,
        price,
        change: chg,
        changePercent: chgPercent,
        high: Number((price * 1.004).toFixed(info.decimals)),
        low: Number((price * 0.996).toFixed(info.decimals)),
        open: info.price,
        volume: Math.floor(Math.random() * 20000 + 1000),
        timestamp: Date.now(),
        bid: Number((price - 0.15).toFixed(info.decimals)),
        ask: Number((price + 0.15).toFixed(info.decimals)),
        spread: 0.30
      };
    });
  },

  getKlines: async (symbol: string, timeframe: string = '15m'): Promise<CandleData[]> => {
    return safeFetch(`/candles/${symbol}?timeframe=${timeframe}`, () => {
      return generateMockCandles(symbol, timeframe, 150);
    });
  },

  getNews: async (category?: string): Promise<NewsItem[]> => {
    return safeFetch(`/news${category && category !== 'ALL' ? `?category=${category}` : ''}`, () => {
      const allNews = generateMockNews();
      return category && category !== 'ALL' ? allNews.filter(n => n.category === category) : allNews;
    });
  },

  getCalendar: async (): Promise<CalendarEvent[]> => {
    return safeFetch('/calendar', () => generateMockCalendar());
  },

  getScreener: async (): Promise<ScreenerItem[]> => {
    return safeFetch('/screener', () => generateMockScreener());
  },

  getPortfolio: async (): Promise<PortfolioSummary> => {
    return safeFetch('/portfolio', () => ({
      balance: 100000.0,
      equity: 101250.0,
      unrealizedPl: 1250.0,
      marginUsed: 4500.0,
      marginAvailable: 95500.0
    }));
  },

  getAlerts: async (): Promise<Alert[]> => {
    return safeFetch('/alerts', () => [
      { id: '1', symbol: 'XAUUSD', condition: 'ABOVE', value: 2660, status: 'ACTIVE', createdAt: Date.now() - 3600000 },
      { id: '2', symbol: 'EURUSD', condition: 'BELOW', value: 1.0800, status: 'ACTIVE', createdAt: Date.now() - 7200000 },
      { id: '3', symbol: 'BTCUSD', condition: 'ABOVE', value: 70000, status: 'DISABLED', createdAt: Date.now() - 86400000 }
    ]);
  }
};