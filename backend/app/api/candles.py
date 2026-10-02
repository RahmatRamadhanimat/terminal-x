from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.schemas import CandleData
from app.services.market_service import market_service

router = APIRouter()

@router.get("/candles/{symbol}", response_model=List[CandleData])
async def get_candles(symbol: str, timeframe: str = "1h"):
    try:
        return await market_service.get_candles(symbol, timeframe)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
