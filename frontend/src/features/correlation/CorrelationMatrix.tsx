import React from 'react';
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
                   style={{ backgroundColor: v > 0 ? `rgba(34,197,94,${Math.abs(v)*0.5})` : `rgba(239,68,68,${Math.abs(v)*0.5})`, color: Math.abs(v) > 0.5 ? '#fff' : '#aaa' }}>
                {v.toFixed(2)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
};
export default CorrelationMatrix;