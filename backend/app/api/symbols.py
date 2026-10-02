from fastapi import APIRouter
from typing import List
from app.schemas.schemas import SymbolInfo

router = APIRouter()

SYMBOLS = [
    SymbolInfo(symbol="XAUUSD", description="Gold / US Dollar", type="commodity"),
    SymbolInfo(symbol="XAGUSD", description="Silver / US Dollar", type="commodity"),
    SymbolInfo(symbol="EURUSD", description="Euro / US Dollar", type="forex"),
    SymbolInfo(symbol="GBPUSD", description="British Pound / US Dollar", type="forex"),
    SymbolInfo(symbol="USDJPY", description="US Dollar / Japanese Yen", type="forex"),
    SymbolInfo(symbol="AUDUSD", description="Australian Dollar / US Dollar", type="forex"),
    SymbolInfo(symbol="USDCAD", description="US Dollar / Canadian Dollar", type="forex"),
    SymbolInfo(symbol="USDCHF", description="US Dollar / Swiss Franc", type="forex"),
    SymbolInfo(symbol="BTCUSD", description="Bitcoin / US Dollar", type="crypto"),
    SymbolInfo(symbol="ETHUSD", description="Ethereum / US Dollar", type="crypto"),
    SymbolInfo(symbol="US30", description="Dow Jones Industrial Average", type="index"),
    SymbolInfo(symbol="SPX500", description="S&P 500 Index", type="index"),
    SymbolInfo(symbol="NAS100", description="NASDAQ 100 Index", type="index"),
    SymbolInfo(symbol="USOIL", description="WTI Crude Oil", type="commodity"),
    SymbolInfo(symbol="UKOIL", description="Brent Crude Oil", type="commodity"),
]


@router.get("/symbols", response_model=List[SymbolInfo])
async def get_symbols():
    return SYMBOLS
