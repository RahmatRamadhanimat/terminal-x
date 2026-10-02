import React from 'react';
import { useMarketStore } from '../../stores/marketStore';
import { useConnectionStore } from '../../stores/connectionStore';

const InstrumentHeader: React.FC = () => {
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const marketData = useMarketStore(s => s.marketData[selectedSymbol]);
  const isMock = useConnectionStore(s => s.isMock);

  const price = marketData?.price ?? 2645.20;
  const change = marketData?.change ?? 0;
  const changePercent = marketData?.changePercent ?? 0;
  const isPositive = changePercent >= 0;

  const open = marketData?.open ?? price;
  const high = marketData?.high ?? price * 1.002;
  const low = marketData?.low ?? price * 0.998;

  const color = isPositive ? 'var(--accent-green)' : 'var(--accent-red)';

  return (
    <div className="instrument-header flex flex-row items-center justify-between p-2 border rounded" style={{ borderColor: '#1f1f2e', backgroundColor: '#181822' }}>
      <div className="flex flex-row items-center gap-4">
        <div className="instrument-symbol text-xl font-bold">{selectedSymbol}</div>
        <div className="instrument-price text-xl font-mono font-bold" style={{ color }}>
          {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
        </div>
        <div className="text-sm font-mono font-semibold" style={{ color }}>
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}% ({isPositive ? '+' : ''}{change.toFixed(2)})
        </div>
        <div 
          className="badge text-xs px-2 py-0.5 rounded font-bold" 
          style={{ 
            backgroundColor: isMock ? 'rgba(234,179,8,0.15)' : 'rgba(0,200,83,0.15)', 
            color: isMock ? 'var(--accent-yellow)' : 'var(--accent-green)' 
          }}
        >
          {isMock ? 'MOCK MODE' : 'LIVE'}
        </div>
      </div>
      <div className="flex flex-row gap-4 text-xs font-mono text-muted" style={{ color: 'var(--text-secondary)' }}>
        <div>O: <span style={{ color: 'var(--text-primary)' }}>{open.toFixed(2)}</span></div>
        <div>H: <span style={{ color: 'var(--accent-green)' }}>{high.toFixed(2)}</span></div>
        <div>L: <span style={{ color: 'var(--accent-red)' }}>{low.toFixed(2)}</span></div>
        <div>C: <span style={{ color }}>{price.toFixed(2)}</span></div>
      </div>
    </div>
  );
};

export default InstrumentHeader;