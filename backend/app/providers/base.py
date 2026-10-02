from abc import ABC, abstractmethod
from typing import List, Dict, Any
from app.schemas.schemas import MarketData, CandleData, NewsItem, CalendarEvent

class MarketDataProvider(ABC):
    @abstractmethod
    async def get_market_data(self, symbol: str) -> MarketData:
        pass
    
    @abstractmethod
    async def get_candles(self, symbol: str, timeframe: str) -> List[CandleData]:
        pass

class NewsProvider(ABC):
    @abstractmethod
    async def get_news(self, category: str = None) -> List[NewsItem]:
        pass

class CalendarProvider(ABC):
    @abstractmethod
    async def get_events(self, limit: int = 50) -> List[CalendarEvent]:
        pass
