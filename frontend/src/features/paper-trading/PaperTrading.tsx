import { useState, useCallback, useEffect } from 'react';
import { useMarketStore } from '../../stores/marketStore';
import Panel from '../../components/layout/Panel';

interface Position {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
}

const PaperTrading = () => {
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const marketDataMap = useMarketStore(s => s.marketData);

  const [balance, setBalance] = useState(100000);
  const [symbol, setSymbol] = useState(selectedSymbol);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  const [positions, setPositions] = useState<Position[]>([]);

  // Keep symbol in sync with terminal selection
  useEffect(() => {
    setSymbol(selectedSymbol);
  }, [selectedSymbol]);

  // Dynamically update positions' current price and pnl as live market ticks arrive
  useEffect(() => {
    setPositions(prev => prev.map(p => {
      const live = marketDataMap[p.symbol];
      if (!live) return p;
      const currentPrice = live.price;
      const pnl = (currentPrice - p.entryPrice) * p.quantity * (p.side === 'BUY' ? 1 : -1);
      return {
        ...p,
        currentPrice,
        pnl
      };
    }));
  }, [marketDataMap]);

  const getCurrentPrice = (sym: string) => {
    return marketDataMap[sym]?.price ?? (sym === 'BTCUSD' ? 67250 : 2645.20);
  };

  const handleOrder = useCallback((side: 'BUY' | 'SELL') => {
    const price = getCurrentPrice(symbol);
    const cost = price * quantity;
    
    if (side === 'BUY' && cost > balance) {
      alert('Insufficient funds for this trade');
      return;
    }

    const newPosition: Position = {
      id: String(Date.now()),
      symbol,
      side,
      quantity,
      entryPrice: price,
      currentPrice: price,
      pnl: 0,
    };

    setPositions(prev => [...prev, newPosition]);
    if (side === 'BUY') {
      setBalance(prev => prev - cost);
    }
  }, [symbol, quantity, balance, marketDataMap]);

  const closePosition = useCallback((id: string) => {
    setPositions(prev => {
      const pos = prev.find(p => p.id === id);
      if (pos) {
        setBalance(b => b + pos.entryPrice * pos.quantity + pos.pnl);
      }
      return prev.filter(p => p.id !== id);
    });
  }, []);

  const totalPnl = positions.reduce((sum, p) => sum + p.pnl, 0);
  const equity = balance + positions.reduce((sum, p) => sum + p.entryPrice * p.quantity + p.pnl, 0);

  return (
    <Panel title="PAPER TRADING">
      <div className="flex flex-col h-full w-full">
        {/* Banner */}
        <div className="paper-trading-banner">
          ⚠ SIMULATION ONLY — PAPER ACCOUNT
        </div>

        {/* Stats */}
        <div className="portfolio-stats" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="portfolio-stat">
            <div className="portfolio-stat-label">Balance</div>
            <div className="portfolio-stat-value">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="portfolio-stat">
            <div className="portfolio-stat-label">Equity</div>
            <div className="portfolio-stat-value">${equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="portfolio-stat">
            <div className="portfolio-stat-label">Unrealized P/L</div>
            <div className="portfolio-stat-value" style={{ color: totalPnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)}
            </div>
          </div>
          <div className="portfolio-stat">
            <div className="portfolio-stat-label">Positions</div>
            <div className="portfolio-stat-value">{positions.length}</div>
          </div>
        </div>

        {/* Order Form */}
        <div className="order-form">
          <div className="field">
            <label>Symbol</label>
            <input className="input" value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())} />
          </div>
          <div className="field">
            <label>Type</label>
            <select className="input" value={orderType} onChange={e => setOrderType(e.target.value as 'MARKET' | 'LIMIT' | 'STOP')}>
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
              <option value="STOP">Stop</option>
            </select>
          </div>
          <div className="field">
            <label>Quantity</label>
            <input className="input" type="number" min="0.01" step="0.01" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
          </div>
          <div className="field" style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'flex-end' }}>
            <button className="btn btn-green" style={{ flex: 1 }} onClick={() => handleOrder('BUY')}>BUY</button>
            <button className="btn btn-red" style={{ flex: 1 }} onClick={() => handleOrder('SELL')}>SELL</button>
          </div>
        </div>

        {/* Positions Table */}
        <div className="flex-1 overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Side</th>
                <th>Qty</th>
                <th>Entry</th>
                <th>Current</th>
                <th>P/L</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {positions.map(p => (
                <tr key={p.id}>
                  <td style={{ textAlign: 'left', fontWeight: 600 }}>{p.symbol}</td>
                  <td style={{ color: p.side === 'BUY' ? 'var(--accent-green)' : 'var(--accent-red)' }}>{p.side}</td>
                  <td>{p.quantity}</td>
                  <td>{p.entryPrice.toFixed(2)}</td>
                  <td>{p.currentPrice.toFixed(2)}</td>
                  <td style={{ color: p.pnl >= 0 ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>
                    {p.pnl >= 0 ? '+' : ''}{p.pnl.toFixed(2)}
                  </td>
                  <td>
                    <button className="btn btn-sm" onClick={() => closePosition(p.id)}>Close</button>
                  </td>
                </tr>
              ))}
              {positions.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)' }}>
                    No open positions
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};

export default PaperTrading;