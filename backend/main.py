from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, symbols, market, candles, news, calendar, screener, portfolio, alerts
from app.websocket.market_ws import manager
from app.core.config import settings
import asyncio
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(manager.broadcast_market_data())
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass


app = FastAPI(
    title="TERMINAL-X API",
    description="Real-Time Market Intelligence Terminal API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS - restrict in production
origins = ["*"] if settings.MOCK_MODE else [settings.FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(symbols.router, prefix="/api", tags=["symbols"])
app.include_router(market.router, prefix="/api", tags=["market"])
app.include_router(candles.router, prefix="/api", tags=["candles"])
app.include_router(news.router, prefix="/api", tags=["news"])
app.include_router(calendar.router, prefix="/api", tags=["calendar"])
app.include_router(screener.router, prefix="/api", tags=["screener"])
app.include_router(portfolio.router, prefix="/api", tags=["portfolio"])
app.include_router(alerts.router, prefix="/api", tags=["alerts"])


@app.websocket("/ws/market")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            action = data.get("action")
            symbol = data.get("symbol")
            if action == "subscribe" and symbol:
                manager.subscribe(websocket, symbol)
            elif action == "unsubscribe" and symbol:
                manager.unsubscribe(websocket, symbol)
    except Exception:
        manager.disconnect(websocket)

