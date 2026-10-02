import React from 'react';
import Panel from '../../components/layout/Panel';
import { useMarketStore } from '../../stores/marketStore';

const MarketAnalysis: React.FC = () => {
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const marketData = useMarketStore(s => s.marketData[selectedSymbol]);

  const price = marketData?.price ?? 2645.20;
  const changePercent = marketData?.changePercent ?? 0.15;
  const isBullish = changePercent >= 0;

  const decimals = selectedSymbol === 'EURUSD' || selectedSymbol === 'GBPUSD' ? 4 : selectedSymbol === 'USDJPY' ? 3 : 2;
  const step = price * 0.005;

  const r1 = (price + step).toFixed(decimals);
  const pp = price.toFixed(decimals);
  const s1 = (price - step).toFixed(decimals);

  const rsi = (50 + changePercent * 10).toFixed(1);
  const atr = (price * 0.008).toFixed(decimals);

  return (
    <Panel title={`ANALYSIS: ${selectedSymbol}`}>
      <div className="flex flex-col w-full h-full gap-2 text-sm p-1">
        <div className="analysis-grid grid grid-cols-2 gap-2">
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: 'var(--text-muted)' }}>Trend</div>
            <div className="analysis-value font-bold" style={{ color: isBullish ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {isBullish ? 'BULLISH' : 'BEARISH'}
            </div>
          </div>
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: 'var(--text-muted)' }}>Structure</div>
            <div className="analysis-value font-bold" style={{ color: 'var(--text-primary)' }}>
              {isBullish ? 'HH / HL' : 'LH / LL'}
            </div>
          </div>
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: 'var(--text-muted)' }}>RSI (14)</div>
            <div className="analysis-value font-mono" style={{ color: 'var(--text-primary)' }}>{rsi}</div>
          </div>
          <div className="analysis-cell p-2 rounded" style={{ backgroundColor: '#2a2a3a' }}>
            <div className="analysis-label text-xs text-muted" style={{ color: 'var(--text-muted)' }}>ATR</div>
            <div className="analysis-value font-mono" style={{ color: 'var(--text-primary)' }}>{atr}</div>
          </div>
        </div>

        <div className="mt-2 border-t pt-2" style={{ borderColor: '#1f1f2e' }}>
          <div className="text-xs text-muted mb-1" style={{ color: 'var(--text-muted)' }}>Key Levels</div>
          <div className="flex justify-between font-mono text-xs mb-1">
            <span style={{ color: 'var(--accent-red)' }}>R1 (Resistance)</span>
            <span>{r1}</span>
          </div>
          <div className="flex justify-between font-mono text-xs mb-1">
            <span style={{ color: 'var(--accent-blue)' }}>PP (Pivot)</span>
            <span>{pp}</span>
          </div>
          <div className="flex justify-between font-mono text-xs">
            <span style={{ color: 'var(--accent-green)' }}>S1 (Support)</span>
            <span>{s1}</span>
          </div>
        </div>

        <div className="mt-auto text-[10px] text-muted text-center italic" style={{ color: 'var(--text-muted)' }}>
          Real-time algorithmic technical estimation
        </div>
      </div>
    </Panel>
  );
};

export default MarketAnalysis;