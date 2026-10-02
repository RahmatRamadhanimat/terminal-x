from app.providers.mock_market import MockMarketDataProvider
from app.providers.real_market import RealMarketDataProvider
from app.core.config import settings

class MarketService:
    def __init__(self):
        if settings.MOCK_MODE:
            self.provider = MockMarketDataProvider()
        else:
            self.provider = RealMarketDataProvider()

    async def get_market_data(self, symbol: str):
        return await self.provider.get_market_data(symbol)

    async def get_candles(self, symbol: str, timeframe: str):
        return await self.provider.get_candles(symbol, timeframe)

market_service = MarketService()
