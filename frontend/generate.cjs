const fs = require('fs');
const path = require('path');

const files = {
  'src/components/layout/TerminalLayout.tsx': `import React, { useState } from 'react';
import TopBar from './TopBar';
import BottomTicker from './BottomTicker';
import Watchlist from '../../features/watchlist/Watchlist';
import MarketAnalysis from '../../features/market-analysis/MarketAnalysis';
import InstrumentHeader from '../../features/instrument-header/InstrumentHeader';
import Chart from '../../features/chart/Chart';
import PaperTrading from '../../features/paper-trading/PaperTrading';
import OrderBook from '../../features/orderbook/OrderBook';
import News from '../../features/news/News';
import Screener from '../../features/screener/Screener';
import CommandPalette from '../../features/command-palette/CommandPalette';
import DebugPanel from '../../features/debug-panel/DebugPanel';
import Settings from '../../features/settings/Settings';

const TerminalLayout: React.FC = () => {
  return (
    <div className="terminal-layout w-full h-full flex flex-col overflow-hidden relative" style={{ backgroundColor: '#0f0f12', color: '#fff' }}>
      <TopBar />
      <div className="terminal-main flex-1 flex flex-row p-1 gap-1 overflow-hidden">
        <div className="terminal-column flex flex-col flex-1 gap-1 overflow-hidden">
          <div className="h-1/2 overflow-hidden"><Watchlist /></div>
          <div className="h-1/2 overflow-hidden"><MarketAnalysis /></div>
        </div>
        <div className="terminal-column flex flex-col flex-[2] gap-1 overflow-hidden">
          <InstrumentHeader />
          <div className="flex-1 overflow-hidden"><Chart /></div>
          <div className="h-1/3 overflow-hidden"><PaperTrading /></div>
        </div>
        <div className="terminal-column flex flex-col flex-1 gap-1 overflow-hidden">
          <div className="h-1/3 overflow-hidden"><OrderBook /></div>
          <div className="h-1/3 overflow-hidden"><News /></div>
          <div className="h-1/3 overflow-hidden"><Screener /></div>
        </div>
      </div>
      <BottomTicker />
      <CommandPalette />
      <DebugPanel />
      <Settings />
    </div>
  );
};
export default TerminalLayout;`,

  'src/components/layout/TopBar.tsx': `import React, { useState, useEffect } from 'react';

const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-bar flex flex-row items-center justify-between p-2 border-b" style={{ borderColor: '#1f1f2e', backgroundColor: '#13131a' }}>
      <div className="top-bar-logo font-bold text-lg text-primary tracking-wide" style={{ color: '#3b82f6' }}>TERMINAL-X</div>
      <div className="top-bar-section flex flex-row items-center gap-4">
        <button className="btn btn-sm" style={{ border: '1px solid #1f1f2e', padding: '4px 8px', borderRadius: '4px' }}>⌘ K Palette</button>
        <div className="flex flex-row items-center gap-1 text-sm">
          <span className="status-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
          <span className="text-green" style={{ color: '#22c55e' }}>CONNECTED</span>
        </div>
        <div className="font-mono text-sm">{time.toISOString().split('T')[1].split('.')[0]} UTC</div>
        <button className="btn btn-sm" style={{ padding: '4px 8px', border: '1px solid #1f1f2e', borderRadius: '4px' }}>⚙ Settings</button>
      </div>
    </div>
  );
};
export default TopBar;`,

  'src/components/layout/BottomTicker.tsx': `import React from 'react';

const MOCK_TICKERS = [
  { symbol: 'XAUUSD', price: '2024.50', change: '+0.15%' },
  { symbol: 'EURUSD', price: '1.0850', change: '-0.05%' },
  { symbol: 'BTCUSD', price: '64200.00', change: '+1.20%' },
  { symbol: 'US30', price: '39100.50', change: '+0.45%' },
  { symbol: 'USOIL', price: '82.30', change: '-0.80%' },
];

const BottomTicker: React.FC = () => {
  return (
    <div className="bottom-ticker flex flex-row items-center border-t overflow-hidden" style={{ height: '30px', borderColor: '#1f1f2e', backgroundColor: '#13131a' }}>
      <div className="ticker-track flex flex-row items-center whitespace-nowrap animate-pulse">
        {MOCK_TICKERS.concat(MOCK_TICKERS).map((t, i) => (
          <div key={i} className="ticker-item flex flex-row items-center gap-2 px-4 border-r" style={{ borderColor: '#1f1f2e' }}>
            <span className="ticker-symbol font-bold text-sm">{t.symbol}</span>
            <span className="font-mono text-sm">{t.price}</span>
            <span className={\`font-mono text-sm \${t.change.startsWith('+') ? 'text-green' : 'text-red'}\`} style={{ color: t.change.startsWith('+') ? '#22c55e' : '#ef4444' }}>{t.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BottomTicker;`,

  'src/components/layout/Panel.tsx': `import React, { useState } from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const Panel: React.FC<PanelProps> = ({ title, children, defaultCollapsed = false }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="panel flex flex-col w-full h-full border" style={{ borderColor: '#1f1f2e', backgroundColor: '#181822', borderRadius: '4px' }}>
      <div className="panel-header flex flex-row items-center justify-between p-2 border-b select-none cursor-pointer" style={{ borderColor: '#1f1f2e', backgroundColor: '#1e1e2d' }} onClick={() => setCollapsed(!collapsed)}>
        <span className="font-bold text-sm uppercase tracking-wide text-secondary" style={{ color: '#9ca3af' }}>{title}</span>
        <div className="panel-header-controls flex flex-row gap-2">
          <button className="text-muted hover:text-primary" style={{ color: '#6b7280' }}>{collapsed ? '+' : '-'}</button>
          <button className="text-muted hover:text-primary" style={{ color: '#6b7280' }}>□</button>
        </div>
      </div>
      {!collapsed && (
        <div className="panel-content flex-1 overflow-auto p-2">
          {children}
        </div>
      )}
    </div>
  );
};
export default Panel;`,

  'src/components/common/States.tsx': `import React from 'react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="state-container flex w-full h-full items-center justify-center text-muted font-mono animate-pulse" style={{ color: '#6b7280' }}>
    {message}
  </div>
);

export const ErrorState: React.FC<{ error: string }> = ({ error }) => (
  <div className="state-container flex w-full h-full items-center justify-center text-red font-mono" style={{ color: '#ef4444' }}>
    Error: {error}
  </div>
);

export const EmptyState: React.FC<{ message?: string }> = ({ message = 'No data available' }) => (
  <div className="state-container flex w-full h-full items-center justify-center text-muted font-mono" style={{ color: '#6b7280' }}>
    {message}
  </div>
);`,

  'src/features/watchlist/Watchlist.tsx': `import React, { useState, useEffect } from 'react';
import Panel from '../../components/layout/Panel';

const INITIAL_DATA = [
  { symbol: 'XAUUSD', last: 2024.50, chg: 3.2, chgp: 0.15, vol: '12K' },
  { symbol: 'EURUSD', last: 1.0850, chg: -0.001, chgp: -0.05, vol: '45K' },
  { symbol: 'GBPUSD', last: 1.2640, chg: 0.002, chgp: 0.12, vol: '32K' },
  { symbol: 'USDJPY', last: 151.20, chg: 0.45, chgp: 0.30, vol: '28K' },
  { symbol: 'BTCUSD', last: 64200.00, chg: 800, chgp: 1.20, vol: '8K' },
  { symbol: 'ETHUSD', last: 3450.00, chg: 45, chgp: 1.32, vol: '15K' },
  { symbol: 'US30', last: 39100.50, chg: 150, chgp: 0.45, vol: '22K' },
  { symbol: 'SPX500', last: 5120.25, chg: 22, chgp: 0.43, vol: '18K' },
  { symbol: 'USOIL', last: 82.30, chg: -0.6, chgp: -0.80, vol: '41K' },
  { symbol: 'XAGUSD', last: 24.50, chg: 0.12, chgp: 0.50, vol: '9K' }
];

const Watchlist: React.FC = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('XAUUSD');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['XAUUSD', 'BTCUSD']));

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        last: item.last + (Math.random() - 0.5) * (item.last * 0.001),
      })));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const toggleFav = (sym: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  };

  const filtered = data.filter(d => d.symbol.toLowerCase().includes(search.toLowerCase()));

  return (
    <Panel title="WATCHLIST">
      <div className="flex flex-col h-full gap-2">
        <input 
          className="input w-full p-1 text-sm bg-transparent border rounded" 
          style={{ borderColor: '#2a2a3a', outline: 'none', backgroundColor: '#13131a', color: '#fff' }} 
          placeholder="Search symbol..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />
        <div className="data-table w-full overflow-auto flex-1">
          <table className="w-full text-left text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-muted border-b" style={{ borderColor: '#2a2a3a', color: '#6b7280' }}>
              <tr>
                <th className="p-1">Sym</th>
                <th className="p-1 text-right">Last</th>
                <th className="p-1 text-right">Chg%</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr 
                  key={row.symbol} 
                  className={\`cursor-pointer border-b\`} 
                  style={{ borderColor: '#1f1f2e', backgroundColor: selected === row.symbol ? '#222230' : 'transparent' }}
                  onClick={() => setSelected(row.symbol)}
                >
                  <td className="p-1 font-bold">
                    <span onClick={(e) => toggleFav(row.symbol, e)} className="mr-1 text-yellow cursor-pointer" style={{ color: '#eab308' }}>
                      {favorites.has(row.symbol) ? '★' : '☆'}
                    </span>
                    {row.symbol}
                  </td>
                  <td className="p-1 text-right font-mono">{row.last.toFixed(2)}</td>
                  <td className="p-1 text-right font-mono" style={{ color: row.chgp >= 0 ? '#22c55e' : '#ef4444' }}>
                    {row.chgp > 0 ? '+' : ''}{row.chgp.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};
export default Watchlist;`,

  'src/features/instrument-header/InstrumentHeader.tsx': `import React from 'react';

const InstrumentHeader: React.FC = () => {
  return (
    <div className="instrument-header flex flex-row items-center justify-between p-2 border rounded" style={{ borderColor: '#1f1f2e', backgroundColor: '#181822' }}>
      <div className="flex flex-row items-center gap-4">
        <div className="instrument-symbol text-xl font-bold">XAUUSD</div>
        <div className="instrument-price text-xl font-mono text-green" style={{ color: '#22c55e' }}>2024.50</div>
        <div className="text-sm font-mono text-green" style={{ color: '#22c55e' }}>+0.15% (+3.20)</div>
        <div className="badge badge-mock text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(234,179,8,0.2)', color: '#eab308' }}>MOCK MODE</div>
      </div>
      <div className="flex flex-row gap-4 text-xs font-mono text-muted" style={{ color: '#6b7280' }}>
        <div>O: 2021.30</div>
        <div>H: 2025.10</div>
        <div>L: 2018.50</div>
        <div>C: 2024.50</div>
      </div>
    </div>
  );
};
export default InstrumentHeader;`,

  'src/features/chart/Chart.tsx': `import React, { useEffect, useRef, useState } from 'react';
import Panel from '../../components/layout/Panel';

const Chart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [tf, setTf] = useState('15m');
  const tfs = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W'];

  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    const el = chartContainerRef.current;
    el.innerHTML = '<div style="display:flex;width:100%;height:100%;align-items:center;justify-content:center;color:#666;font-family:monospace;">[Chart Placeholder: XAUUSD ' + tf + ']</div>';

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        // resize 
      });
      observer.observe(el);
    }
    
    return () => {
      observer?.disconnect();
    };
  }, [tf]);

  return (
    <Panel title="CHART">
      <div className="flex flex-col w-full h-full">
        <div className="chart-toolbar flex flex-row gap-1 mb-2 border-b pb-2" style={{ borderColor: '#1f1f2e' }}>
          <div className="btn-group flex flex-row gap-1">
            {tfs.map(t => (
              <button key={t} className="btn btn-sm px-2 py-1 rounded" style={{ backgroundColor: tf === t ? '#3b82f6' : 'transparent', color: tf === t ? '#fff' : '#6b7280' }} onClick={() => setTf(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-container flex-1" style={{ backgroundColor: '#000' }} ref={chartContainerRef}></div>
      </div>
    </Panel>
  );
};
export default Chart;`,

  'src/features/orderbook/OrderBook.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const OrderBook: React.FC = () => {
  const asks = Array.from({ length: 10 }).map((_, i) => ({ price: 2025.50 + i * 0.1, size: Math.random() * 5 + 1 }));
  const bids = Array.from({ length: 10 }).map((_, i) => ({ price: 2024.50 - i * 0.1, size: Math.random() * 5 + 1 }));

  return (
    <Panel title="ORDER BOOK">
      <div className="flex flex-col w-full h-full text-xs font-mono relative">
        <div className="text-center text-muted mb-1 text-[10px]" style={{ color: '#6b7280' }}>SIMULATED ORDER BOOK</div>
        <div className="flex flex-row justify-between text-muted border-b mb-1 pb-1" style={{ borderColor: '#1f1f2e', color: '#6b7280' }}>
          <span>Price</span>
          <span>Size</span>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col justify-end">
          {asks.reverse().map((a, i) => (
            <div key={i} className="orderbook-row flex flex-row justify-between relative my-[1px]" style={{ color: '#ef4444' }}>
              <div className="depth-bar absolute right-0 top-0 h-full" style={{ backgroundColor: 'rgba(239,68,68,0.2)', width: \`\${(a.size / 6) * 100}%\` }}></div>
              <span className="z-10">{a.price.toFixed(2)}</span>
              <span className="z-10">{a.size.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="orderbook-spread flex flex-row justify-between items-center py-1 my-1 border-y text-sm" style={{ borderColor: '#1f1f2e' }}>
          <span className="text-green" style={{ color: '#22c55e' }}>2024.50</span>
          <span className="text-muted text-xs" style={{ color: '#6b7280' }}>Spread: 1.0</span>
          <span className="text-red" style={{ color: '#ef4444' }}>2025.50</span>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col justify-start">
          {bids.map((b, i) => (
            <div key={i} className="orderbook-row flex flex-row justify-between relative my-[1px]" style={{ color: '#22c55e' }}>
              <div className="depth-bar absolute right-0 top-0 h-full" style={{ backgroundColor: 'rgba(34,197,94,0.2)', width: \`\${(b.size / 6) * 100}%\` }}></div>
              <span className="z-10">{b.price.toFixed(2)}</span>
              <span className="z-10">{b.size.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
export default OrderBook;`,

  'src/features/news/News.tsx': `import React, { useState } from 'react';
import Panel from '../../components/layout/Panel';

const MOCK_NEWS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  title: \`Central Bank announces unexpected policy shift \${i}\`,
  time: \`\${Math.floor(Math.random() * 59) + 1}m ago\`,
  cat: ['FOREX', 'GOLD', 'CRYPTO', 'MACRO'][Math.floor(Math.random() * 4)]
}));

const News: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const cats = ['ALL', 'FOREX', 'GOLD', 'CRYPTO', 'MACRO'];
  
  const filtered = filter === 'ALL' ? MOCK_NEWS : MOCK_NEWS.filter(n => n.cat === filter);

  return (
    <Panel title="NEWS">
      <div className="flex flex-col w-full h-full gap-2">
        <div className="flex flex-row gap-1 overflow-x-auto pb-1">
          {cats.map(c => (
            <button key={c} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: filter === c ? '#3b82f6' : '#2a2a3a', color: filter === c ? '#fff' : '#6b7280' }} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(n => (
            <div key={n.id} className="news-item flex flex-col py-2 border-b cursor-pointer" style={{ borderColor: '#1f1f2e' }}>
              <div className="news-headline text-sm mb-1">{n.title}</div>
              <div className="news-meta flex flex-row items-center gap-2 text-xs text-muted" style={{ color: '#6b7280' }}>
                <span>{n.time}</span>
                <span className="badge px-1 rounded" style={{ backgroundColor: '#2a2a3a' }}>{n.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
export default News;`,

  'src/features/screener/Screener.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const Screener: React.FC = () => {
  const data = [
    { sym: 'XAUUSD', last: 2024.50, chg: 0.15, vol: '12K', rsi: 65, atr: 14.5, trend: 'BULLISH' },
    { sym: 'EURUSD', last: 1.0850, chg: -0.05, vol: '45K', rsi: 42, atr: 0.005, trend: 'BEARISH' },
    { sym: 'BTCUSD', last: 64200, chg: 1.20, vol: '8K', rsi: 55, atr: 1200, trend: 'NEUTRAL' }
  ];

  return (
    <Panel title="SCREENER">
      <div className="flex flex-col w-full h-full">
        <div className="filter-bar flex flex-row gap-2 mb-2 text-xs">
          <button className="px-2 py-1 rounded" style={{ backgroundColor: '#2a2a3a' }}>Strong Uptrend</button>
          <button className="px-2 py-1 rounded" style={{ backgroundColor: '#2a2a3a' }}>Oversold</button>
          <button className="px-2 py-1 rounded" style={{ backgroundColor: '#2a2a3a' }}>High Vol</button>
        </div>
        <div className="data-table flex-1 overflow-auto">
          <table className="w-full text-left text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-muted border-b" style={{ borderColor: '#2a2a3a', color: '#6b7280' }}>
              <tr>
                <th className="p-1">Sym</th>
                <th className="p-1">Last</th>
                <th className="p-1">RSI</th>
                <th className="p-1">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.sym} className="border-b" style={{ borderColor: '#1f1f2e' }}>
                  <td className="p-1 font-bold">{d.sym}</td>
                  <td className="p-1 font-mono">{d.last}</td>
                  <td className="p-1 font-mono">{d.rsi}</td>
                  <td className="p-1">
                    <span className="badge text-xs px-1 rounded" style={{ backgroundColor: d.trend === 'BULLISH' ? 'rgba(34,197,94,0.2)' : d.trend === 'BEARISH' ? 'rgba(239,68,68,0.2)' : 'rgba(75,85,99,0.2)', color: d.trend === 'BULLISH' ? '#22c55e' : d.trend === 'BEARISH' ? '#ef4444' : '#9ca3af' }}>
                      {d.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};
export default Screener;`,

  'src/features/paper-trading/PaperTrading.tsx': `import React, { useState } from 'react';
import Panel from '../../components/layout/Panel';

const PaperTrading: React.FC = () => {
  const [balance, setBalance] = useState(100000);
  const [symbol, setSymbol] = useState('XAUUSD');
  const [qty, setQty] = useState(1);
  const [positions, setPositions] = useState<any[]>([{ sym: 'EURUSD', side: 'BUY', qty: 2, open: 1.0800, current: 1.0850, pnl: 1000 }]);

  const handleOrder = (side: string) => {
    const pnl = Math.random() * 200 - 100;
    setPositions([...positions, { sym: symbol, side, qty, open: 2024.50, current: 2024.50, pnl }]);
  };

  return (
    <Panel title="PAPER TRADING">
      <div className="flex flex-col w-full h-full gap-4">
        <div className="paper-trading-banner p-2 rounded text-center text-sm" style={{ backgroundColor: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}>
          Available Balance: <span className="font-mono font-bold">\${balance.toLocaleString()}</span>
        </div>
        <div className="order-form flex flex-row gap-2 items-end">
          <div className="flex-1">
            <label className="text-xs text-muted block mb-1" style={{ color: '#6b7280' }}>Symbol</label>
            <input className="w-full border p-1 text-sm rounded" style={{ borderColor: '#2a2a3a', outline: 'none', backgroundColor: '#181822', color: '#fff' }} value={symbol} onChange={e => setSymbol(e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted block mb-1" style={{ color: '#6b7280' }}>Qty</label>
            <input type="number" className="w-full border p-1 text-sm rounded" style={{ borderColor: '#2a2a3a', outline: 'none', backgroundColor: '#181822', color: '#fff' }} value={qty} onChange={e => setQty(Number(e.target.value))} />
          </div>
          <button className="btn btn-green px-4 py-1 rounded font-bold" onClick={() => handleOrder('BUY')} style={{ backgroundColor: '#16a34a', color: '#fff' }}>BUY</button>
          <button className="btn btn-red px-4 py-1 rounded font-bold" onClick={() => handleOrder('SELL')} style={{ backgroundColor: '#dc2626', color: '#fff' }}>SELL</button>
        </div>
        <div className="data-table flex-1 overflow-auto mt-2">
          <div className="text-xs text-muted mb-1" style={{ color: '#6b7280' }}>OPEN POSITIONS</div>
          <table className="w-full text-left text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-muted border-b" style={{ borderColor: '#2a2a3a', color: '#6b7280' }}>
              <tr>
                <th className="p-1">Sym</th>
                <th className="p-1">Side</th>
                <th className="p-1">Qty</th>
                <th className="p-1 text-right">P/L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => (
                <tr key={i} className="border-b" style={{ borderColor: '#1f1f2e' }}>
                  <td className="p-1 font-bold">{p.sym}</td>
                  <td className="p-1" style={{ color: p.side === 'BUY' ? '#22c55e' : '#ef4444' }}>{p.side}</td>
                  <td className="p-1 font-mono">{p.qty}</td>
                  <td className="p-1 text-right font-mono" style={{ color: p.pnl >= 0 ? '#22c55e' : '#ef4444' }}>\${p.pnl.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};
export default PaperTrading;`,

  'src/features/alerts/Alerts.tsx': `import React, { useState } from 'react';
import Panel from '../../components/layout/Panel';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState([{ id: 1, sym: 'XAUUSD', cond: 'Crosses Up', price: 2050, active: true }]);

  return (
    <Panel title="ALERTS">
      <div className="flex flex-col w-full h-full gap-2">
        <button className="btn btn-sm p-1 rounded" style={{ backgroundColor: '#3b82f6', color: '#fff' }}>+ New Alert</button>
        <div className="flex-1 overflow-auto">
          {alerts.map(a => (
            <div key={a.id} className="alert-item flex flex-row justify-between items-center p-2 border-b" style={{ borderColor: '#1f1f2e' }}>
              <div>
                <div className="font-bold text-sm">{a.sym}</div>
                <div className="text-xs text-muted" style={{ color: '#6b7280' }}>{a.cond} {a.price}</div>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" checked={a.active} onChange={() => {}} />
                <button className="text-red hover:text-red-400 text-xs" style={{ color: '#ef4444' }}>Del</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};
export default Alerts;`,

  'src/features/portfolio/Portfolio.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const Portfolio: React.FC = () => {
  return (
    <Panel title="PORTFOLIO">
      <div className="flex flex-col w-full h-full gap-4">
        <div className="portfolio-stats grid grid-cols-3 gap-2">
          <div className="portfolio-stat p-2 rounded flex flex-col" style={{ backgroundColor: '#2a2a3a' }}>
            <span className="text-xs text-muted" style={{ color: '#6b7280' }}>Balance</span>
            <span className="font-mono font-bold">$100,000.00</span>
          </div>
          <div className="portfolio-stat p-2 rounded flex flex-col" style={{ backgroundColor: '#2a2a3a' }}>
            <span className="text-xs text-muted" style={{ color: '#6b7280' }}>Equity</span>
            <span className="font-mono font-bold">$101,250.00</span>
          </div>
          <div className="portfolio-stat p-2 rounded flex flex-col" style={{ backgroundColor: '#2a2a3a' }}>
            <span className="text-xs text-muted" style={{ color: '#6b7280' }}>Unrealized P/L</span>
            <span className="font-mono font-bold text-green" style={{ color: '#22c55e' }}>+$1,250.00</span>
          </div>
        </div>
        <div className="data-table flex-1 overflow-auto">
           <div className="text-center text-muted text-sm mt-4" style={{ color: '#6b7280' }}>No closed positions today.</div>
        </div>
      </div>
    </Panel>
  );
};
export default Portfolio;`,

  'src/features/calendar/EconomicCalendar.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const EconomicCalendar: React.FC = () => {
  const events = [
    { time: '14:30', cur: 'USD', event: 'Non-Farm Employment Change', impact: 'HIGH', prev: '275K', fcst: '200K', act: '303K' },
    { time: '14:30', cur: 'USD', event: 'Unemployment Rate', impact: 'HIGH', prev: '3.9%', fcst: '3.9%', act: '3.8%' },
  ];

  return (
    <Panel title="CALENDAR">
      <div className="flex flex-col w-full h-full">
        <div className="calendar-filters flex flex-row gap-2 mb-2">
          <select className="text-sm border p-1 rounded" style={{ borderColor: '#2a2a3a', outline: 'none', backgroundColor: '#181822', color: '#fff' }}><option>All Currencies</option><option>USD</option></select>
          <select className="text-sm border p-1 rounded" style={{ borderColor: '#2a2a3a', outline: 'none', backgroundColor: '#181822', color: '#fff' }}><option>High Impact</option></select>
        </div>
        <div className="data-table flex-1 overflow-auto">
          <table className="w-full text-left text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-muted border-b" style={{ borderColor: '#2a2a3a', color: '#6b7280' }}>
              <tr>
                <th className="p-1">Time</th><th className="p-1">Cur</th><th className="p-1">Event</th><th className="p-1 text-right">Act</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={i} className="border-b" style={{ borderColor: '#1f1f2e' }}>
                  <td className="p-1 font-mono text-xs">{e.time}</td>
                  <td className="p-1">{e.cur}</td>
                  <td className="p-1 text-xs">{e.event} <span className="badge badge-high text-[10px] ml-1" style={{ color: '#ef4444' }}>HIGH</span></td>
                  <td className="p-1 text-right font-mono font-bold text-green" style={{ color: '#22c55e' }}>{e.act}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};
export default EconomicCalendar;`,

  'src/features/heatmap/MarketHeatmap.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const MarketHeatmap: React.FC = () => {
  const items = [
    { sym: 'XAU', chg: 0.15 }, { sym: 'EUR', chg: -0.05 }, { sym: 'GBP', chg: 0.12 },
    { sym: 'JPY', chg: -0.30 }, { sym: 'BTC', chg: 1.20 }, { sym: 'OIL', chg: -0.80 }
  ];

  return (
    <Panel title="HEATMAP">
      <div className="heatmap-grid grid gap-1 w-full h-full" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {items.map(item => (
          <div key={item.sym} className="heatmap-cell flex flex-col items-center justify-center rounded p-2" 
               style={{ backgroundColor: item.chg >= 0 ? \`rgba(34,197,94,\${Math.min(item.chg, 1)})\` : \`rgba(239,68,68,\${Math.min(Math.abs(item.chg), 1)})\` }}>
            <span className="font-bold">{item.sym}</span>
            <span className="font-mono text-xs">{item.chg > 0 ? '+' : ''}{item.chg.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </Panel>
  );
};
export default MarketHeatmap;`,

  'src/features/correlation/CorrelationMatrix.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const CorrelationMatrix: React.FC = () => {
  const syms = ['XAU', 'EUR', 'GBP', 'JPY'];
  const data = [
    [1.0, 0.45, 0.30, -0.60],
    [0.45, 1.0, 0.85, -0.20],
    [0.30, 0.85, 1.0, -0.15],
    [-0.60, -0.20, -0.15, 1.0]
  ];

  return (
    <Panel title="CORRELATION">
      <div className="correlation-grid flex flex-col w-full h-full text-xs font-mono">
        <div className="flex flex-row">
          <div className="w-10"></div>
          {syms.map(s => <div key={s} className="flex-1 text-center text-muted" style={{ color: '#6b7280' }}>{s}</div>)}
        </div>
        {data.map((row, i) => (
          <div key={syms[i]} className="flex flex-row mt-1">
            <div className="w-10 font-bold text-muted" style={{ color: '#6b7280' }}>{syms[i]}</div>
            {row.map((v, j) => (
              <div key={j} className="correlation-cell flex-1 text-center p-1 rounded mx-[1px]" 
                   style={{ backgroundColor: v > 0 ? \`rgba(34,197,94,\${Math.abs(v)*0.5})\` : \`rgba(239,68,68,\${Math.abs(v)*0.5})\`, color: Math.abs(v) > 0.5 ? '#fff' : '#aaa' }}>
                {v.toFixed(2)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
};
export default CorrelationMatrix;`,

  'src/features/command-palette/CommandPalette.tsx': `import React, { useState, useEffect } from 'react';

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!open) return null;

  return (
    <div className="overlay absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal w-[500px] border rounded shadow-lg flex flex-col" style={{ borderColor: '#2a2a3a', backgroundColor: '#13131a' }}>
        <input 
          autoFocus 
          className="command-palette-input w-full p-4 bg-transparent border-b text-lg outline-none" 
          style={{ borderColor: '#2a2a3a', color: '#fff' }} 
          placeholder="Search commands or symbols..." 
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="command-palette-results max-h-[300px] overflow-auto p-2">
          <div className="p-2 text-sm text-muted" style={{ color: '#6b7280' }}>Symbols</div>
          <div className="p-2 cursor-pointer rounded flex justify-between" style={{ backgroundColor: 'transparent' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a2a3a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span>XAUUSD</span><span className="text-xs text-muted" style={{ color: '#6b7280' }}>Gold / US Dollar</span>
          </div>
          <div className="p-2 text-sm text-muted mt-2" style={{ color: '#6b7280' }}>Actions</div>
          <div className="p-2 cursor-pointer rounded flex justify-between" style={{ backgroundColor: 'transparent' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a2a3a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span>Open Settings</span><span className="text-xs text-muted" style={{ color: '#6b7280' }}>⌘ ,</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommandPalette;`,

  'src/features/debug-panel/DebugPanel.tsx': `import React, { useState, useEffect } from 'react';

const DebugPanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); setOpen(prev => !prev); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!open) return null;

  return (
    <div className="debug-panel absolute bottom-10 right-4 w-[300px] border rounded p-4 shadow-lg z-50 opacity-90 font-mono text-xs" style={{ borderColor: '#2a2a3a', backgroundColor: '#13131a', color: '#fff' }}>
      <div className="font-bold text-sm mb-2 border-b pb-1" style={{ borderColor: '#2a2a3a' }}>TERMINAL-X DEBUG</div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Provider:</span><span className="debug-value text-yellow" style={{ color: '#eab308' }}>MOCK</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>WS Status:</span><span className="debug-value text-green" style={{ color: '#22c55e' }}>CONNECTED</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Latency:</span><span className="debug-value">12ms</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Msg Rate:</span><span className="debug-value">45/s</span></div>
      <div className="debug-row flex justify-between mb-1"><span className="debug-label text-muted" style={{ color: '#6b7280' }}>Active Syms:</span><span className="debug-value">12</span></div>
      <div className="mt-2 text-center text-muted cursor-pointer" style={{ color: '#6b7280' }} onClick={() => setOpen(false)}>Close (Ctrl+Shift+D)</div>
    </div>
  );
};
export default DebugPanel;`,

  'src/features/settings/Settings.tsx': `import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false);
  // Implementation usually toggled by top bar or command palette, exporting as hidden for now
  if (!open) return null;
  return (
    <div className="overlay absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal w-[400px] border rounded shadow-lg flex flex-col p-4" style={{ borderColor: '#2a2a3a', backgroundColor: '#13131a' }}>
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <div className="settings-group flex flex-col gap-2">
          <div className="settings-row flex justify-between items-center">
            <span>Theme</span>
            <select className="border p-1 rounded" style={{ borderColor: '#2a2a3a', backgroundColor: '#181822', color: '#fff' }}><option>Dark</option></select>
          </div>
          <div className="settings-row flex justify-between items-center">
            <span>Mock Mode</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
        <button className="btn mt-4 p-2 rounded" style={{ backgroundColor: '#3b82f6', color: '#fff' }} onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
};
export default Settings;`,

  'src/features/market-analysis/MarketAnalysis.tsx': `import React from 'react';
import Panel from '../../components/layout/Panel';

const MarketAnalysis: React.FC = () => {
  return (
    <Panel title="ANALYSIS: XAUUSD">
      <div className="flex flex-col w-full h-full gap-2 text-sm">
        <div className="analysis-grid grid grid-cols-2 gap-2">
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: '#6b7280' }}>Trend</div>
            <div className="analysis-value font-bold text-green" style={{ color: '#22c55e' }}>BULLISH</div>
          </div>
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: '#6b7280' }}>Structure</div>
            <div className="analysis-value font-bold">HH / HL</div>
          </div>
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: '#6b7280' }}>RSI (14)</div>
            <div className="analysis-value font-mono">65.4</div>
          </div>
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: '#6b7280' }}>ATR</div>
            <div className="analysis-value font-mono">14.50</div>
          </div>
        </div>
        <div className="mt-2 border-t pt-2" style={{ borderColor: '#1f1f2e' }}>
          <div className="text-xs text-muted mb-1" style={{ color: '#6b7280' }}>Key Levels</div>
          <div className="flex justify-between font-mono text-xs"><span className="text-red" style={{ color: '#ef4444' }}>R1</span><span>2035.50</span></div>
          <div className="flex justify-between font-mono text-xs"><span style={{ color: '#60a5fa' }}>PP</span><span>2020.00</span></div>
          <div className="flex justify-between font-mono text-xs"><span className="text-green" style={{ color: '#22c55e' }}>S1</span><span>2010.25</span></div>
        </div>
        <div className="mt-auto text-[10px] text-muted text-center italic" style={{ color: '#6b7280' }}>For informational purposes only</div>
      </div>
    </Panel>
  );
};
export default MarketAnalysis;`,

  'src/hooks/useWebSocket.ts': `import { useEffect, useState } from 'react';

export const useWebSocket = () => {
  const [status, setStatus] = useState('CONNECTING');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setStatus('CONNECTED');
    const timer = setInterval(() => {
      setData({ type: 'TICK', timestamp: Date.now() });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return { status, data };
};`,

  'src/hooks/useKeyboardShortcuts.ts': `import { useEffect } from 'react';

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); console.log('Palette'); }
      if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); console.log('Debug'); }
      if (e.key === 'Escape') { console.log('Escape'); }
      if (e.ctrlKey && e.key === 'b') { e.preventDefault(); console.log('Toggle Sidebar'); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
};`,

  'src/stores/connectionStore.ts': `export const connectionStore = {
  status: 'DISCONNECTED',
  latency: 0,
  setStatus(s: string) { this.status = s; },
  setLatency(l: number) { this.latency = l; }
};`,

  'src/services/api.ts': `export const api = {
  getSymbols: async () => [{ symbol: 'XAUUSD' }],
  getKlines: async () => [],
  getNews: async () => []
};`,

  'src/services/websocket.ts': `export class WebSocketService {
  private ws: WebSocket | null = null;
  connect() { console.log('WS Connecting...'); }
  disconnect() { console.log('WS Disconnecting...'); }
  subscribe(channel: string) { console.log('Sub:', channel); }
  unsubscribe(channel: string) { console.log('Unsub:', channel); }
}`
};

const baseDir = 'c:/Users/siswa-L4-01/Music/rahmat/web xau/terminal-x/frontend';

Object.keys(files).forEach(filePath => {
  const fullPath = path.join(baseDir, filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, files[filePath], 'utf8');
});

console.log('All files written successfully.');
