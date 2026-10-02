import React, { useMemo } from 'react';
import Panel from '../../components/layout/Panel';
import { useMarketStore } from '../../stores/marketStore';
import { safeToFixed } from '../../utils/formatters';

const OrderBook: React.FC = () => {
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const marketData = useMarketStore(s => s.marketData[selectedSymbol]);

  const currentPrice = marketData?.price ?? (selectedSymbol === 'BTCUSD' ? 67250 : selectedSymbol === 'ETHUSD' ? 3520 : 2645.20);
  const decimals = selectedSymbol === 'EURUSD' || selectedSymbol === 'GBPUSD' ? 4 : selectedSymbol === 'USDJPY' ? 3 : 2;
  const tickStep = selectedSymbol === 'EURUSD' || selectedSymbol === 'GBPUSD' ? 0.0001 : selectedSymbol === 'BTCUSD' ? 5 : 0.2;

  // Generate 8 asks and 8 bids around current price
  const { asks, bids, spread } = useMemo(() => {
    const askList = [];
    const bidList = [];

    for (let i = 1; i <= 8; i++) {
      const askPrice = currentPrice + (i * tickStep);
      const bidPrice = currentPrice - (i * tickStep);
      askList.push({
        price: askPrice,
        size: Number((Math.random() * 4 + 0.5).toFixed(2))
      });
      bidList.push({
        price: bidPrice,
        size: Number((Math.random() * 4 + 0.5).toFixed(2))
      });
    }

    const calculatedSpread = safeToFixed(askList[0].price - bidList[0].price, decimals);
    // Return asks in descending order (highest ask on top) without mutating state
    return {
      asks: [...askList].reverse(),
      bids: bidList,
      spread: calculatedSpread
    };
  }, [currentPrice, tickStep, decimals]);

  return (
    <Panel title={`ORDER BOOK: ${selectedSymbol}`}>
      <div className="flex flex-col w-full h-full text-xs font-mono relative">
        <div className="text-center text-muted mb-1 text-[10px]" style={{ color: 'var(--text-muted)' }}>
          SIMULATED LEVEL 2 DEPTH
        </div>
        <div className="flex flex-row justify-between text-muted border-b mb-1 pb-1" style={{ borderColor: '#1f1f2e', color: 'var(--text-muted)' }}>
          <span>Price</span>
          <span>Size</span>
        </div>

        {/* Asks (Red) */}
        <div className="flex-1 overflow-hidden flex flex-col justify-end">
          {asks.map((a, i) => (
            <div key={`ask-${i}`} className="orderbook-row flex flex-row justify-between relative my-[1px]" style={{ color: 'var(--accent-red)' }}>
              <div 
                className="depth-bar absolute right-0 top-0 h-full" 
                style={{ backgroundColor: 'rgba(255, 23, 68, 0.15)', width: `${Math.min((a.size / 5) * 100, 100)}%` }}
              ></div>
              <span className="z-10">{safeToFixed(a.price, decimals)}</span>
              <span className="z-10">{safeToFixed(a.size, 2)}</span>
            </div>
          ))}
        </div>

        {/* Spread */}
        <div className="orderbook-spread flex flex-row justify-between items-center py-1 my-1 border-y text-sm font-bold" style={{ borderColor: '#1f1f2e' }}>
          <span style={{ color: 'var(--accent-green)' }}>{safeToFixed(currentPrice - tickStep, decimals)}</span>
          <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>Spread: {spread}</span>
          <span style={{ color: 'var(--accent-red)' }}>{safeToFixed(currentPrice + tickStep, decimals)}</span>
        </div>

        {/* Bids (Green) */}
        <div className="flex-1 overflow-hidden flex flex-col justify-start">
          {bids.map((b, i) => (
            <div key={`bid-${i}`} className="orderbook-row flex flex-row justify-between relative my-[1px]" style={{ color: 'var(--accent-green)' }}>
              <div 
                className="depth-bar absolute right-0 top-0 h-full" 
                style={{ backgroundColor: 'rgba(0, 200, 83, 0.15)', width: `${Math.min(((b.size || 0) / 5) * 100, 100)}%` }}
              ></div>
              <span className="z-10">{safeToFixed(b.price, decimals)}</span>
              <span className="z-10">{safeToFixed(b.size, 2)}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
};

export default OrderBook;