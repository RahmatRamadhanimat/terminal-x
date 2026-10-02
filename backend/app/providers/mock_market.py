import random
from datetime import datetime, timedelta
from typing import List
from app.providers.base import MarketDataProvider
from app.schemas.schemas import MarketData, CandleData


class MockMarketDataProvider(MarketDataProvider):
    def __init__(self):
        self.base_prices = {
            "XAUUSD": 2645.0,
            "XAGUSD": 31.50,
            "EURUSD": 1.1742,
            "GBPUSD": 1.3120,
            "USDJPY": 149.50,
            "AUDUSD": 0.6580,
            "USDCAD": 1.3650,
            "USDCHF": 0.8760,
            "BTCUSD": 67000.0,
            "ETHUSD": 3500.0,
            "US30": 42150.0,
            "SPX500": 5820.0,
            "NAS100": 20450.0,
            "USOIL": 78.50,
            "UKOIL": 82.30,
        }
        self.current_prices = {k: v for k, v in self.base_prices.items()}
        self.volatility = {
            "XAUUSD": 0.0004,
            "XAGUSD": 0.0008,
            "EURUSD": 0.0003,
            "GBPUSD": 0.0003,
            "USDJPY": 0.0003,
            "AUDUSD": 0.0003,
            "USDCAD": 0.0003,
            "USDCHF": 0.0003,
            "BTCUSD": 0.0015,
            "ETHUSD": 0.0020,
            "US30": 0.0004,
            "SPX500": 0.0003,
            "NAS100": 0.0005,
            "USOIL": 0.0008,
            "UKOIL": 0.0008,
        }
        self._session_highs: dict[str, float] = {}
        self._session_lows: dict[str, float] = {}
        self._session_opens: dict[str, float] = {}

        for symbol, price in self.current_prices.items():
            self._session_opens[symbol] = price
            self._session_highs[symbol] = price * (1 + random.uniform(0.001, 0.01))
            self._session_lows[symbol] = price * (1 - random.uniform(0.001, 0.01))

    def _get_decimals(self, symbol: str) -> int:
        if symbol in ("XAUUSD", "US30", "SPX500", "NAS100", "BTCUSD"):
            return 2
        elif symbol in ("XAGUSD", "USOIL", "UKOIL"):
            return 2
        elif symbol == "USDJPY":
            return 3
        elif symbol == "ETHUSD":
            return 2
        else:
            return 5

    def _update_price(self, symbol: str) -> float:
        vol = self.volatility.get(symbol, 0.0005)
        change_pct = random.gauss(0, vol)
        self.current_prices[symbol] *= (1 + change_pct)

        price = self.current_prices[symbol]
        if price > self._session_highs.get(symbol, price):
            self._session_highs[symbol] = price
        if price < self._session_lows.get(symbol, price):
            self._session_lows[symbol] = price

        return price

    async def get_market_data(self, symbol: str) -> MarketData:
        if symbol not in self.base_prices:
            raise ValueError(f"Symbol {symbol} not found")

        price = self._update_price(symbol)
        base = self.base_prices[symbol]
        change = price - base
        change_percent = (change / base) * 100
        decimals = self._get_decimals(symbol)

        return MarketData(
            symbol=symbol,
            price=round(price, decimals),
            change=round(change, decimals),
            change_percent=round(change_percent, 4),
            volume=round(random.uniform(1000, 50000), 0),
            timestamp=datetime.utcnow()
        )

    async def get_candles(
        self, symbol: str, timeframe: str = "1H"
    ) -> List[CandleData]:
        if symbol not in self.base_prices:
            raise ValueError(f"Symbol {symbol} not found")

        # Determine candle interval
        tf_minutes = {
            "1m": 1, "3m": 3, "5m": 5, "15m": 15, "30m": 30,
            "1h": 60, "1H": 60, "4h": 240, "4H": 240,
            "1d": 1440, "1D": 1440, "1w": 10080, "1W": 10080,
            "1M": 43200,
        }
        interval = tf_minutes.get(timeframe, 60)

        candles = []
        now = datetime.utcnow()
        vol = self.volatility.get(symbol, 0.0005)
        current_price = self.current_prices[symbol]
        num_candles = 300

        # Walk backwards from current price
        prices = [current_price]
        for _ in range(num_candles - 1):
            current_price *= (1 + random.gauss(0, vol * 2))
            prices.append(current_price)
        prices.reverse()

        for i in range(num_candles):
            candle_time = now - timedelta(minutes=interval * (num_candles - i))
            open_p = prices[i]
            # Add some wick variation
            close_p = open_p * (1 + random.gauss(0, vol))
            high_p = max(open_p, close_p) * (1 + abs(random.gauss(0, vol * 0.5)))
            low_p = min(open_p, close_p) * (1 - abs(random.gauss(0, vol * 0.5)))

            candles.append(CandleData(
                timestamp=candle_time,
                open=round(open_p, self._get_decimals(symbol)),
                high=round(high_p, self._get_decimals(symbol)),
                low=round(low_p, self._get_decimals(symbol)),
                close=round(close_p, self._get_decimals(symbol)),
                volume=round(random.uniform(100, 5000), 0)
            ))

        return candles

    async def get_symbols(self) -> list[str]:
        return list(self.base_prices.keys())
