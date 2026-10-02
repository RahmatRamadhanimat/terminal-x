from fastapi import APIRouter, HTTPException
from app.schemas.schemas import MarketData
from app.services.market_service import market_service

router = APIRouter()

@router.get("/market/{symbol}", response_model=MarketData)
async def get_market_data(symbol: str):
    try:
        return await market_service.get_market_data(symbol)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
