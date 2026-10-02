from app.providers.base import MarketDataProvider
from app.schemas.schemas import MarketData, CandleData
from typing import List

class RealMarketDataProvider(MarketDataProvider):
    async def get_market_data(self, symbol: str) -> MarketData:
        raise NotImplementedError

    async def get_candles(self, symbol: str, timeframe: str) -> List[CandleData]:
        raise NotImplementedError
