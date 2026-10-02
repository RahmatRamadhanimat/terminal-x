import React from 'react';
import { useMarketStore } from '../../stores/marketStore';
import { safeToFixed } from '../../utils/formatters';

const TICKER_SYMBOLS = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD', 'US30', 'SPX500', 'USOIL', 'XAGUSD'];

const BottomTicker: React.FC = () => {
  const marketDataMap = useMarketStore(s => s.marketData);
  const setSelectedSymbol = useMarketStore(s => s.setSelectedSymbol);

  const items = TICKER_SYMBOLS.map(sym => {
    const live = marketDataMap[sym];
    const decimals = sym.includes('JPY') ? 3 : sym === 'EURUSD' || sym === 'GBPUSD' ? 4 : 2;
    const price = live?.price !== undefined ? safeToFixed(live.price, decimals, '---') : '---';
    const chgPercent = live?.changePercent !== undefined ? live.changePercent : 0;
    const isPositive = chgPercent >= 0;
    return {
      symbol: sym,
      price,
      change: `${isPositive ? '+' : ''}${safeToFixed(chgPercent, 2)}%`,
      isPositive
    };
  });

  return (
    <div className="bottom-ticker flex flex-row items-center border-t overflow-hidden select-none" style={{ height: '24px', minHeight: '24px', borderColor: '#1f1f2e', backgroundColor: '#13131a' }}>
      <div className="ticker-track flex flex-row items-center whitespace-nowrap">
        {items.concat(items).map((t, i) => (
          <div 
            key={`${t.symbol}-${i}`} 
            className="ticker-item flex flex-row items-center gap-2 px-3 border-r cursor-pointer hover:bg-white/5 transition-colors" 
            style={{ borderColor: '#1f1f2e' }}
            onClick={() => setSelectedSymbol(t.symbol)}
          >
            <span className="ticker-symbol font-bold text-xs" style={{ color: 'var(--text-secondary)' }}>{t.symbol}</span>
            <span className="font-mono text-xs text-white">{t.price}</span>
            <span className="font-mono text-xs font-semibold" style={{ color: t.isPositive ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomTicker;