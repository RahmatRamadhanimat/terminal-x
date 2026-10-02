from app.schemas.schemas import PaperOrder, PaperPosition
from app.services.portfolio_service import portfolio_service
from app.services.market_service import market_service
from datetime import datetime
import uuid

class PaperTradingService:
    def __init__(self):
        self.orders: list[PaperOrder] = []

    async def place_order(self, symbol: str, side: str, quantity: float) -> PaperOrder:
        market_data = await market_service.get_market_data(symbol)
        price = market_data.price

        order = PaperOrder(
            id=str(uuid.uuid4()),
            symbol=symbol,
            side=side,
            quantity=quantity,
            price=price,
            status="FILLED",
            timestamp=datetime.utcnow()
        )
        self.orders.append(order)

        cost = quantity * price
        existing_idx = next(
            (i for i, p in enumerate(portfolio_service.positions) if p.symbol == symbol),
            None
        )

        if existing_idx is not None:
            existing = portfolio_service.positions[existing_idx]
            if side == "BUY":
                total_cost = (existing.quantity * existing.average_price) + cost
                new_qty = existing.quantity + quantity
                portfolio_service.positions[existing_idx] = PaperPosition(
                    symbol=symbol,
                    quantity=new_qty,
                    average_price=total_cost / new_qty,
                    current_price=price,
                    pnl=0.0,
                    pnl_percent=0.0
                )
            else:
                new_qty = existing.quantity - quantity
                if new_qty <= 0:
                    realized = (price - existing.average_price) * existing.quantity
                    portfolio_service.balance += realized
                    portfolio_service.positions.pop(existing_idx)
                else:
                    realized = (price - existing.average_price) * quantity
                    portfolio_service.balance += realized
                    portfolio_service.positions[existing_idx] = PaperPosition(
                        symbol=symbol,
                        quantity=new_qty,
                        average_price=existing.average_price,
                        current_price=price,
                        pnl=0.0,
                        pnl_percent=0.0
                    )
        else:
            if side == "BUY":
                portfolio_service.balance -= cost
                pos = PaperPosition(
                    symbol=symbol,
                    quantity=quantity,
                    average_price=price,
                    current_price=price,
                    pnl=0.0,
                    pnl_percent=0.0
                )
                portfolio_service.positions.append(pos)

        return order

    def get_orders(self) -> list[PaperOrder]:
        return self.orders

paper_trading_service = PaperTradingService()
