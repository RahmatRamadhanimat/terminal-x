import { useEffect, useRef } from 'react';
import { useMarketStore } from '../stores/marketStore';
import { useConnectionStore } from '../stores/connectionStore';
import { wsService } from '../services/websocket';
import { MarketData } from '../types';

const BASE_PRICES: Record<string, { price: number; decimals: number; vol: number }> = {
  XAUUSD: { price: 2645.20, decimals: 2, vol: 0.0004 },
  XAGUSD: { price: 31.50, decimals: 2, vol: 0.0008 },
  EURUSD: { price: 1.0850, decimals: 4, vol: 0.0003 },
  GBPUSD: { price: 1.2640, decimals: 4, vol: 0.0003 },
  USDJPY: { price: 151.20, decimals: 3, vol: 0.0003 },
  AUDUSD: { price: 0.6580, decimals: 4, vol: 0.0003 },
  USDCAD: { price: 1.3650, decimals: 4, vol: 0.0003 },
  USDCHF: { price: 0.8760, decimals: 4, vol: 0.0003 },
  BTCUSD: { price: 67250.00, decimals: 2, vol: 0.0015 },
  ETHUSD: { price: 3520.00, decimals: 2, vol: 0.0020 },
  US30: { price: 42150.00, decimals: 2, vol: 0.0004 },
  SPX500: { price: 5820.00, decimals: 2, vol: 0.0003 },
  NAS100: { price: 20450.00, decimals: 2, vol: 0.0005 },
  USOIL: { price: 78.50, decimals: 2, vol: 0.0008 },
  UKOIL: { price: 82.30, decimals: 2, vol: 0.0008 },
};

export const useWebSocket = () => {
  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const updateMarketData = useMarketStore(s => s.updateMarketData);
  const setStatus = useConnectionStore(s => s.setStatus);
  const setIsMock = useConnectionStore(s => s.setIsMock);
  const setLatency = useConnectionStore(s => s.setLatency);

  const currentPricesRef = useRef<Record<string, number>>({});

  // Initialize prices
  useEffect(() => {
    Object.entries(BASE_PRICES).forEach(([sym, info]) => {
      if (!currentPricesRef.current[sym]) {
        currentPricesRef.current[sym] = info.price;
        updateMarketData({
          symbol: sym,
          price: info.price,
          change: 0,
          changePercent: 0,
          high: Number((info.price * 1.005).toFixed(info.decimals)),
          low: Number((info.price * 0.995).toFixed(info.decimals)),
          open: info.price,
          volume: 10000,
          timestamp: Date.now(),
          bid: Number((info.price - 0.1).toFixed(info.decimals)),
          ask: Number((info.price + 0.1).toFixed(info.decimals)),
          spread: 0.2
        });
      }
    });
  }, [updateMarketData]);

  // Connect to backend WS and fallback to simulation
  useEffect(() => {
    setStatus('CONNECTING');

    // Try connecting to real WebSocket
    try {
      wsService.connect((payload) => {
        if (payload?.type === 'market_data' && Array.isArray(payload.data)) {
          setStatus('CONNECTED');
          setIsMock(false);
          setLatency(Math.floor(Math.random() * 15 + 8));
          payload.data.forEach((item: MarketData) => {
            updateMarketData(item);
          });
        }
      });
    } catch {
      console.warn('Real WS unavailable, running simulated engine');
    }

    // Subscribe to selectedSymbol
    wsService.subscribe(selectedSymbol);

    // Fallback simulation loop for interactive terminal experience
    const timer = setInterval(() => {
      setStatus('CONNECTED');
      setIsMock(true);
      setLatency(12);

      // Randomly update selectedSymbol and 2 other symbols
      const symbolsToUpdate = [
        selectedSymbol,
        'BTCUSD',
        'EURUSD',
        'US30'
      ];

      symbolsToUpdate.forEach(sym => {
        const info = BASE_PRICES[sym];
        if (!info) return;

        const current = currentPricesRef.current[sym] || info.price;
        const changePct = (Math.random() - 0.495) * info.vol;
        const nextPrice = Number((current * (1 + changePct)).toFixed(info.decimals));
        currentPricesRef.current[sym] = nextPrice;

        const base = info.price;
        const netChange = Number((nextPrice - base).toFixed(info.decimals));
        const netPercent = Number(((netChange / base) * 100).toFixed(2));

        updateMarketData({
          symbol: sym,
          price: nextPrice,
          change: netChange,
          changePercent: netPercent,
          high: Math.max(nextPrice, currentPricesRef.current[`${sym}_high`] || nextPrice),
          low: Math.min(nextPrice, currentPricesRef.current[`${sym}_low`] || nextPrice),
          open: base,
          volume: Math.floor(Math.random() * 25000 + 1000),
          timestamp: Date.now(),
          bid: Number((nextPrice - 0.1).toFixed(info.decimals)),
          ask: Number((nextPrice + 0.1).toFixed(info.decimals)),
          spread: Number((info.decimals === 4 ? 0.0002 : 0.2).toFixed(info.decimals))
        });
      });
    }, 1500);

    return () => {
      clearInterval(timer);
      wsService.unsubscribe(selectedSymbol);
    };
  }, [selectedSymbol, setStatus, setIsMock, setLatency, updateMarketData]);
};