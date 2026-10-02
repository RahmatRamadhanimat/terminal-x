import React from 'react';
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
export default Portfolio;