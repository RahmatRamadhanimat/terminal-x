import React, { useEffect, useRef, useState } from 'react';
import { 
  createChart, 
  ColorType, 
  IChartApi, 
  ISeriesApi, 
  CandlestickData, 
  HistogramData,
  UTCTimestamp,
  CrosshairMode
} from 'lightweight-charts';
import Panel from '../../components/layout/Panel';
import { useMarketStore } from '../../stores/marketStore';
import { api } from '../../services/api';

const TIME_FRAMES = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W'];

const Chart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  const selectedSymbol = useMarketStore(s => s.selectedSymbol);
  const marketData = useMarketStore(s => s.marketData[selectedSymbol]);
  const [tf, setTf] = useState('15m');
  const [ohlc, setOhlc] = useState<{ open: number; high: number; low: number; close: number } | null>(null);

  // Initialize Lightweight Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    // Clear any leftover DOM nodes (especially in React 19 StrictMode)
    container.innerHTML = '';

    const width = Math.max(container.clientWidth || 400, 200);
    const height = Math.max(container.clientHeight || 300, 150);

    const chart = createChart(container, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#0a0a0f' },
        textColor: '#8888a0',
        fontFamily: 'JetBrains Mono, monospace',
      },
      grid: {
        vertLines: { color: 'rgba(42, 42, 58, 0.4)' },
        horzLines: { color: 'rgba(42, 42, 58, 0.4)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#2a2a3a',
        visible: true,
      },
      timeScale: {
        borderColor: '#2a2a3a',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00c853',
      downColor: '#ff1744',
      borderUpColor: '#00c853',
      borderDownColor: '#ff1744',
      wickUpColor: '#00c853',
      wickDownColor: '#ff1744',
    });

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Crosshair move handler for legend
    chart.subscribeCrosshairMove(param => {
      if (!param || !param.time || !param.seriesData) return;
      const candle = param.seriesData.get(candleSeries) as CandlestickData | undefined;
      if (candle && typeof candle.open === 'number') {
        setOhlc({
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        });
      }
    });

    // Debounced ResizeObserver using requestAnimationFrame to prevent feedback loops
    let animationFrameId: number;
    let lastWidth = width;
    let lastHeight = height;

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!container || !chartRef.current) return;
        const newWidth = Math.floor(container.clientWidth);
        const newHeight = Math.floor(container.clientHeight);
        if (newWidth > 50 && newHeight > 50 && (newWidth !== lastWidth || newHeight !== lastHeight)) {
          lastWidth = newWidth;
          lastHeight = newHeight;
          chartRef.current.applyOptions({ width: newWidth, height: newHeight });
        }
      });
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      try {
        chart.remove();
      } catch {
        // Safe ignore
      }
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, []);

  // Fetch and update data on symbol or timeframe change
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        const data = await api.getKlines(selectedSymbol, tf);
        if (isCancelled || !candleSeriesRef.current || !volumeSeriesRef.current || !chartRef.current) return;

        if (!Array.isArray(data) || data.length === 0) return;

        const candles: CandlestickData[] = [];
        const volumes: HistogramData[] = [];

        data.forEach(d => {
          if (!d) return;
          const rawTime = d.time;
          let parsedTime: UTCTimestamp;

          if (typeof rawTime === 'number') {
            parsedTime = (rawTime > 10000000000 ? Math.floor(rawTime / 1000) : rawTime) as UTCTimestamp;
          } else {
            parsedTime = Math.floor(Date.parse(String(rawTime)) / 1000) as UTCTimestamp;
          }

          if (isNaN(parsedTime)) return;

          const open = Number(d.open) || 100;
          const high = Math.max(Number(d.high) || open, open, Number(d.close) || open);
          const low = Math.min(Number(d.low) || open, open, Number(d.close) || open);
          const close = Number(d.close) || open;

          candles.push({
            time: parsedTime,
            open,
            high,
            low,
            close,
          });

          volumes.push({
            time: parsedTime,
            value: Number(d.volume) || 100,
            color: close >= open ? 'rgba(0, 200, 83, 0.3)' : 'rgba(255, 23, 68, 0.3)',
          });
        });

        // Ensure strictly sorted ascending by time without duplicates
        const uniqueCandles: CandlestickData[] = [];
        const uniqueVolumes: HistogramData[] = [];
        const seen = new Set<number>();

        candles.sort((a, b) => (Number(a.time) - Number(b.time)));
        candles.forEach((c, idx) => {
          const t = Number(c.time);
          if (!seen.has(t)) {
            seen.add(t);
            uniqueCandles.push(c);
            uniqueVolumes.push(volumes[idx]);
          }
        });

        if (uniqueCandles.length > 0) {
          candleSeriesRef.current.setData(uniqueCandles);
          volumeSeriesRef.current.setData(uniqueVolumes);

          const last = uniqueCandles[uniqueCandles.length - 1];
          setOhlc({ open: last.open, high: last.high, low: last.low, close: last.close });
          chartRef.current.timeScale().fitContent();
        }
      } catch (err) {
        console.error('[Chart] Error loading candle data:', err);
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [selectedSymbol, tf]);

  // Live tick updates to the current candle
  useEffect(() => {
    if (!marketData || !candleSeriesRef.current) return;

    const price = marketData.price;
    setOhlc(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        high: Math.max(prev.high, price),
        low: Math.min(prev.low, price),
        close: price,
      };
    });
  }, [marketData]);

  return (
    <Panel title={`CHART: ${selectedSymbol}`}>
      <div className="flex flex-col w-full h-full overflow-hidden" style={{ minHeight: 0 }}>
        {/* Toolbar */}
        <div className="chart-toolbar flex flex-row items-center justify-between gap-1 p-1 border-b select-none" style={{ borderColor: '#1f1f2e', minHeight: '30px' }}>
          <div className="btn-group flex flex-row gap-1">
            {TIME_FRAMES.map(t => (
              <button 
                key={t} 
                className="btn btn-sm px-2 py-0.5 rounded text-xs" 
                style={{ 
                  backgroundColor: tf === t ? 'var(--accent-blue)' : 'transparent', 
                  color: tf === t ? '#fff' : 'var(--text-muted)' 
                }} 
                onClick={() => setTf(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* OHLC Bar */}
          {ohlc && (
            <div className="flex flex-row items-center gap-3 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
              <span>O: <strong style={{ color: 'var(--text-primary)' }}>{ohlc.open.toFixed(2)}</strong></span>
              <span>H: <strong style={{ color: 'var(--accent-green)' }}>{ohlc.high.toFixed(2)}</strong></span>
              <span>L: <strong style={{ color: 'var(--accent-red)' }}>{ohlc.low.toFixed(2)}</strong></span>
              <span>C: <strong style={{ color: ohlc.close >= ohlc.open ? 'var(--accent-green)' : 'var(--accent-red)' }}>{ohlc.close.toFixed(2)}</strong></span>
            </div>
          )}
        </div>

        {/* Canvas Chart Container */}
        <div 
          className="chart-container flex-1 w-full" 
          ref={chartContainerRef}
          style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', minHeight: 0 }}
        ></div>
      </div>
    </Panel>
  );
};

export default Chart;