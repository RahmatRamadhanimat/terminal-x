import React, { useState, useEffect } from 'react';
import Panel from '../../components/layout/Panel';
import { api } from '../../services/api';
import { ScreenerItem } from '../../types';
import { useMarketStore } from '../../stores/marketStore';

type FilterPreset = 'ALL' | 'UPTREND' | 'OVERSOLD' | 'HIGH_VOL';

const Screener: React.FC = () => {
  const [data, setData] = useState<ScreenerItem[]>([]);
  const [filter, setFilter] = useState<FilterPreset>('ALL');
  const setSelectedSymbol = useMarketStore(s => s.setSelectedSymbol);
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);

  useEffect(() => {
    api.getScreener().then(items => setData(items));
  }, []);

  const filtered = data.filter(d => {
    if (filter === 'UPTREND') return d.trend === 'BULLISH';
    if (filter === 'OVERSOLD') return d.rsi < 45;
    if (filter === 'HIGH_VOL') return d.volatility === 'HIGH';
    return true;
  });

  return (
    <Panel title="SCREENER">
      <div className="flex flex-col w-full h-full">
        {/* Filter bar */}
        <div className="filter-bar flex flex-row gap-1 mb-2 text-xs">
          <button 
            className="px-2 py-1 rounded transition-colors" 
            style={{ 
              backgroundColor: filter === 'ALL' ? 'var(--accent-blue)' : '#2a2a3a', 
              color: filter === 'ALL' ? '#fff' : 'var(--text-muted)' 
            }}
            onClick={() => setFilter('ALL')}
          >
            All
          </button>
          <button 
            className="px-2 py-1 rounded transition-colors" 
            style={{ 
              backgroundColor: filter === 'UPTREND' ? 'var(--accent-blue)' : '#2a2a3a', 
              color: filter === 'UPTREND' ? '#fff' : 'var(--text-muted)' 
            }}
            onClick={() => setFilter('UPTREND')}
          >
            Strong Uptrend
          </button>
          <button 
            className="px-2 py-1 rounded transition-colors" 
            style={{ 
              backgroundColor: filter === 'OVERSOLD' ? 'var(--accent-blue)' : '#2a2a3a', 
              color: filter === 'OVERSOLD' ? '#fff' : 'var(--text-muted)' 
            }}
            onClick={() => setFilter('OVERSOLD')}
          >
            Oversold (RSI)
          </button>
          <button 
            className="px-2 py-1 rounded transition-colors" 
            style={{ 
              backgroundColor: filter === 'HIGH_VOL' ? 'var(--accent-blue)' : '#2a2a3a', 
              color: filter === 'HIGH_VOL' ? '#fff' : 'var(--text-muted)' 
            }}
            onClick={() => setFilter('HIGH_VOL')}
          >
            High Vol
          </button>
        </div>

        {/* Data Table */}
        <div className="data-table flex-1 overflow-auto">
          <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
            <thead className="text-muted border-b" style={{ borderColor: '#2a2a3a', color: 'var(--text-muted)' }}>
              <tr>
                <th className="p-1">Sym</th>
                <th className="p-1 text-right">Last</th>
                <th className="p-1 text-right">RSI</th>
                <th className="p-1 text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => {
                const isSelected = selectedSymbol === d.symbol;
                return (
                  <tr 
                    key={d.symbol} 
                    className="border-b cursor-pointer hover:bg-white/5 transition-colors" 
                    style={{ 
                      borderColor: '#1f1f2e',
                      backgroundColor: isSelected ? 'rgba(41, 121, 255, 0.15)' : 'transparent'
                    }}
                    onClick={() => setSelectedSymbol(d.symbol)}
                  >
                    <td className="p-1 font-bold">{d.symbol}</td>
                    <td className="p-1 text-right font-mono">{d.price.toFixed(d.symbol.includes('JPY') ? 3 : d.symbol === 'EURUSD' || d.symbol === 'GBPUSD' ? 4 : 2)}</td>
                    <td className="p-1 text-right font-mono" style={{ color: d.rsi > 60 ? 'var(--accent-green)' : d.rsi < 40 ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                      {d.rsi}
                    </td>
                    <td className="p-1 text-center">
                      <span 
                        className="badge text-[9px] px-1 py-0.5 rounded font-bold" 
                        style={{ 
                          backgroundColor: d.trend === 'BULLISH' ? 'rgba(0,200,83,0.15)' : d.trend === 'BEARISH' ? 'rgba(255,23,68,0.15)' : 'rgba(107,114,128,0.15)', 
                          color: d.trend === 'BULLISH' ? 'var(--accent-green)' : d.trend === 'BEARISH' ? 'var(--accent-red)' : 'var(--text-muted)' 
                        }}
                      >
                        {d.trend}
                      </span>
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

export default Screener;