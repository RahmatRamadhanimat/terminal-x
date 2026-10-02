from fastapi import APIRouter, Query
from typing import List, Optional
from app.schemas.schemas import ScreenerItem
from app.services.market_service import market_service
import random

router = APIRouter()

ALL_SYMBOLS = [
    "XAUUSD", "EURUSD", "GBPUSD", "USDJPY", "BTCUSD",
    "ETHUSD", "US30", "SPX500", "USOIL", "XAGUSD"
]


@router.get("/screener", response_model=List[ScreenerItem])
async def get_screener(
    trend: Optional[str] = Query(None),
    min_rsi: Optional[float] = Query(None),
    max_rsi: Optional[float] = Query(None),
    preset: Optional[str] = Query(None),
):
    items = []
    for sym in ALL_SYMBOLS:
        try:
            data = await market_service.get_market_data(sym)
            rsi = 30 + random.random() * 50  # Simulated RSI 30-80
            atr = abs(data.price * random.uniform(0.001, 0.02))
            
            if data.change_percent > 0.3:
                trend_val = "Bullish"
            elif data.change_percent < -0.3:
                trend_val = "Bearish"
            else:
                trend_val = "Neutral"

            item = ScreenerItem(
                symbol=sym,
                price=data.price,
                change_percent=data.change_percent,
                rsi=round(rsi, 1),
                atr=round(atr, 2),
                trend=trend_val
            )
            items.append(item)
        except Exception:
            continue

    # Apply filters
    if trend:
        items = [i for i in items if i.trend.lower() == trend.lower()]
    if min_rsi is not None:
        items = [i for i in items if i.rsi >= min_rsi]
    if max_rsi is not None:
        items = [i for i in items if i.rsi <= max_rsi]

    # Apply presets
    if preset == "oversold":
        items = [i for i in items if i.rsi < 35]
    elif preset == "overbought":
        items = [i for i in items if i.rsi > 65]
    elif preset == "high_momentum":
        items = [i for i in items if abs(i.change_percent) > 0.5]
    elif preset == "bullish":
        items = [i for i in items if i.trend == "Bullish"]
    elif preset == "bearish":
        items = [i for i in items if i.trend == "Bearish"]

    return items
