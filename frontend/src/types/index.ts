export type SymbolInfo = {
  symbol: string;
  name: string;
  type: 'FX' | 'CRYPTO' | 'STOCK' | 'INDEX' | 'COMMODITY';
  exchange: string;
  currency: string;
  session: string;
  marketStatus: 'OPEN' | 'CLOSED' | 'PRE_MARKET' | 'POST_MARKET';
};

export type MarketData = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  timestamp: number;
  bid: number;
  ask: number;
  spread: number;
};

export type CandleData = {
  time: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type NewsItem = {
  id: string;
  headline: string;
  source: string;
  timestamp: number;
  url: string;
  symbols: string[];
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
};

export type CalendarEvent = {
  id: string;
  time: number;
  currency: string;
  event: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  actual?: string;
  forecast?: string;
  previous?: string;
};

export type ScreenerItem = MarketData & {
  rsi: number;
  atr: number;
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  volatility: 'HIGH' | 'MEDIUM' | 'LOW';
};

export type Alert = {
  id: string;
  symbol: string;
  condition: 'ABOVE' | 'BELOW' | 'CROSSES' | 'CROSSES_UP' | 'CROSSES_DOWN';
  value: number;
  status: 'ACTIVE' | 'TRIGGERED' | 'DISABLED';
  createdAt: number;
};

export type PaperOrder = {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT' | 'STOP';
  quantity: number;
  price?: number;
  status: 'PENDING' | 'FILLED' | 'CANCELLED' | 'REJECTED';
  timestamp: number;
};

export type PaperPosition = {
  symbol: string;
  side: 'LONG' | 'SHORT';
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  unrealizedPl: number;
  unrealizedPlPercent: number;
};

export type PortfolioSummary = {
  balance: number;
  equity: number;
  unrealizedPl: number;
  marginUsed: number;
  marginAvailable: number;
};

export type OrderBookEntry = {
  price: number;
  size: number;
  total: number;
};

export type WorkspaceConfig = {
  id: string;
  name: string;
  layout: any; // Simplified for now
};

export type ConnectionStatus = 'CONNECTED' | 'CONNECTING' | 'DISCONNECTED' | 'ERROR';
