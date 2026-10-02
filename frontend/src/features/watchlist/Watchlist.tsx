import React, { useState } from 'react';
import Panel from '../../components/layout/Panel';
import { useMarketStore } from '../../stores/marketStore';
import { safeToFixed } from '../../utils/formatters';

interface WatchlistItem {
  symbol: string;
  name?: string;
  defaultPrice: number;
  vol: string;
}

const DEFAULT_SYMBOLS: WatchlistItem[] = [
  { symbol: 'XAUUSD', name: 'Gold', defaultPrice: 2645.20, vol: '12K' },
  { symbol: 'XAGUSD', name: 'Silver', defaultPrice: 31.50, vol: '9K' },
  { symbol: 'EURUSD', name: 'Euro', defaultPrice: 1.0850, vol: '45K' },
  { symbol: 'GBPUSD', name: 'Pound', defaultPrice: 1.2640, vol: '32K' },
  { symbol: 'USDJPY', name: 'Yen', defaultPrice: 151.20, vol: '28K' },
  { symbol: 'BTCUSD', name: 'Bitcoin', defaultPrice: 67250.00, vol: '8K' },
  { symbol: 'ETHUSD', name: 'Ethereum', defaultPrice: 3520.00, vol: '15K' },
  { symbol: 'US30', name: 'Dow Jones', defaultPrice: 42150.00, vol: '22K' },
  { symbol: 'SPX500', name: 'S&P 500', defaultPrice: 5820.00, vol: '18K' },
  { symbol: 'USOIL', name: 'Crude Oil', defaultPrice: 78.50, vol: '41K' }
];

const Watchlist: React.FC = () => {
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const setSelectedSymbol = useMarketStore(s => s.setSelectedSymbol);
  const marketDataMap = useMarketStore(s => s.marketData);

  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['XAUUSD', 'BTCUSD']));

  const toggleFav = (sym: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  };

  const filtered = DEFAULT_SYMBOLS.filter(d => 
    d.symbol.toLowerCase().includes(search.toLowerCase()) || 
    (d.name && d.name.toLowerCase().includes(search.toLowerCase()))
  );

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
              {filtered.map(row => {
                const live = marketDataMap[row.symbol];
                const price = live?.price ?? row.defaultPrice;
                const changePercent = live?.changePercent ?? 0;
                const isSelected = selectedSymbol === row.symbol;
                const isPositive = changePercent >= 0;

                const decimals = row.symbol === 'EURUSD' || row.symbol === 'GBPUSD' ? 4 : row.symbol === 'USDJPY' ? 3 : 2;

                return (
                  <tr 
                    key={row.symbol} 
                    className="cursor-pointer border-b" 
                    style={{ 
                      borderColor: '#1f1f2e', 
                      backgroundColor: isSelected ? 'rgba(41, 121, 255, 0.15)' : 'transparent',
                      borderLeft: isSelected ? '2px solid var(--accent-blue)' : '2px solid transparent'
                    }}
                    onClick={() => setSelectedSymbol(row.symbol)}
                  >
                    <td className="p-1 font-bold">
                      <span 
                        onClick={(e) => toggleFav(row.symbol, e)} 
                        className="mr-1 cursor-pointer select-none" 
                        style={{ color: favorites.has(row.symbol) ? '#ffd600' : '#4b5563' }}
                      >
                        {favorites.has(row.symbol) ? '★' : '☆'}
                      </span>
                      {row.symbol}
                    </td>
                    <td className="p-1 text-right font-mono">
                      {safeToFixed(price, decimals)}
                    </td>
                    <td className="p-1 text-right font-mono font-semibold" style={{ color: isPositive ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {isPositive ? '+' : ''}{safeToFixed(changePercent, 2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};

export default Watchlist;