from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas.schemas import PortfolioSummary, PaperOrder
from app.services.portfolio_service import portfolio_service
from app.services.paper_trading_service import paper_trading_service
from typing import List

router = APIRouter()


@router.get("/portfolio", response_model=PortfolioSummary)
async def get_portfolio():
    return await portfolio_service.get_summary()


class OrderRequest(BaseModel):
    symbol: str
    side: str
    quantity: float
    order_type: str = "MARKET"
    price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None


@router.post("/portfolio/order", response_model=PaperOrder)
async def place_order(order: OrderRequest):
    return await paper_trading_service.place_order(
        order.symbol, order.side, order.quantity
    )


@router.get("/portfolio/orders", response_model=List[PaperOrder])
async def get_orders():
    return paper_trading_service.get_orders()
