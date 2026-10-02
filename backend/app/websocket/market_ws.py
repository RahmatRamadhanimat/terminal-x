from fastapi import WebSocket, WebSocketDisconnect
from typing import List, Dict, Set
from app.services.market_service import market_service
import asyncio
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.subscriptions: Dict[WebSocket, Set[str]] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.subscriptions[websocket] = set()

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.subscriptions:
            del self.subscriptions[websocket]

    def subscribe(self, websocket: WebSocket, symbol: str):
        if websocket in self.subscriptions:
            self.subscriptions[websocket].add(symbol)

    def unsubscribe(self, websocket: WebSocket, symbol: str):
        if websocket in self.subscriptions:
            self.subscriptions[websocket].discard(symbol)

    async def broadcast_market_data(self):
        while True:
            for ws, subs in self.subscriptions.items():
                if not subs:
                    continue
                try:
                    updates = []
                    for symbol in subs:
                        try:
                            data = await market_service.get_market_data(symbol)
                            updates.append(data.model_dump() if hasattr(data, 'model_dump') else data.dict())
                        except:
                            pass
                    if updates:
                        await ws.send_text(json.dumps({"type": "market_data", "data": updates}, default=str))
                except Exception:
                    self.disconnect(ws)
            await asyncio.sleep(2.0)

manager = ConnectionManager()
