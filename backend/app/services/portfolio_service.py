from app.schemas.schemas import PortfolioSummary, PaperPosition
from app.services.market_service import market_service
from typing import List

class PortfolioService:
    def __init__(self):
        self.balance = 100000.0
        self.positions: List[PaperPosition] = []

    async def get_summary(self) -> PortfolioSummary:
        unrealized_pnl = 0.0
        for pos in self.positions:
            market_data = await market_service.get_market_data(pos.symbol)
            pos.current_price = market_data.price
            pos.pnl = (pos.current_price - pos.average_price) * pos.quantity
            pos.pnl_percent = (pos.pnl / (pos.average_price * pos.quantity)) * 100 if pos.average_price > 0 else 0
            unrealized_pnl += pos.pnl

        equity = self.balance + unrealized_pnl

        return PortfolioSummary(
            balance=self.balance,
            equity=equity,
            unrealized_pnl=unrealized_pnl,
            positions=self.positions
        )

portfolio_service = PortfolioService()
