from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SymbolInfo(BaseModel):
    symbol: str
    description: str
    type: str

class MarketData(BaseModel):
    symbol: str
    price: float
    change: float
    change_percent: float
    volume: float
    timestamp: datetime

class CandleData(BaseModel):
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float

class NewsItem(BaseModel):
    id: str
    headline: str
    category: str
    timestamp: datetime
    url: Optional[str] = None
    summary: Optional[str] = None

class CalendarEvent(BaseModel):
    id: str
    event: str
    currency: str
    impact: str
    time: datetime
    actual: Optional[str] = None
    forecast: Optional[str] = None
    previous: Optional[str] = None

class ScreenerItem(BaseModel):
    symbol: str
    price: float
    change_percent: float
    rsi: float
    atr: float
    trend: str

class AlertBase(BaseModel):
    symbol: str
    price: float
    condition: str

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    active: bool

class Alert(AlertBase):
    id: str
    active: bool

class PaperOrder(BaseModel):
    id: str
    symbol: str
    side: str
    quantity: float
    price: float
    status: str
    timestamp: datetime

class PaperPosition(BaseModel):
    symbol: str
    quantity: float
    average_price: float
    current_price: float
    pnl: float
    pnl_percent: float

class PortfolioSummary(BaseModel):
    balance: float
    equity: float
    unrealized_pnl: float
    positions: List[PaperPosition]

class OrderBookEntry(BaseModel):
    price: float
    size: float

class OrderBook(BaseModel):
    symbol: str
    bids: List[OrderBookEntry]
    asks: List[OrderBookEntry]

class HealthResponse(BaseModel):
    status: str

class WebSocketMessage(BaseModel):
    type: str
    data: dict
