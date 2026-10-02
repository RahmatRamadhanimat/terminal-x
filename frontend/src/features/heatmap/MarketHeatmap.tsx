import React from 'react';
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
               style={{ backgroundColor: item.chg >= 0 ? `rgba(34,197,94,${Math.min(item.chg, 1)})` : `rgba(239,68,68,${Math.min(Math.abs(item.chg), 1)})` }}>
            <span className="font-bold">{item.sym}</span>
            <span className="font-mono text-xs">{item.chg > 0 ? '+' : ''}{item.chg.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </Panel>
  );
};
export default MarketHeatmap;