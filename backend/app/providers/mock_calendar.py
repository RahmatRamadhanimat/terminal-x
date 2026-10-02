from typing import List
from datetime import datetime, timedelta
import random
from app.providers.base import CalendarProvider
from app.schemas.schemas import CalendarEvent
import uuid

class MockCalendarProvider(CalendarProvider):
    def __init__(self):
        self.events = [
            {"event": "Non-Farm Payrolls", "currency": "USD", "impact": "HIGH"},
            {"event": "CPI m/m", "currency": "USD", "impact": "HIGH"},
            {"event": "FOMC Statement", "currency": "USD", "impact": "HIGH"},
            {"event": "ECB Press Conference", "currency": "EUR", "impact": "HIGH"},
            {"event": "BoE Interest Rate Decision", "currency": "GBP", "impact": "HIGH"},
            {"event": "BoJ Press Conference", "currency": "JPY", "impact": "HIGH"},
            {"event": "Retail Sales m/m", "currency": "USD", "impact": "MEDIUM"},
            {"event": "Unemployment Rate", "currency": "EUR", "impact": "MEDIUM"},
            {"event": "Manufacturing PMI", "currency": "GBP", "impact": "MEDIUM"},
            {"event": "Core CPI y/y", "currency": "JPY", "impact": "MEDIUM"}
        ]

    async def get_events(self, limit: int = 50) -> List[CalendarEvent]:
        events = []
        current_time = datetime.utcnow()
        for i in range(min(limit, 20)):
            template = random.choice(self.events)
            events.append(CalendarEvent(
                id=str(uuid.uuid4()),
                event=template["event"],
                currency=template["currency"],
                impact=template["impact"],
                time=current_time + timedelta(hours=random.randint(-48, 48)),
                actual=f"{random.uniform(0.1, 5.0):.1f}%" if random.random() > 0.5 else None,
                forecast=f"{random.uniform(0.1, 5.0):.1f}%",
                previous=f"{random.uniform(0.1, 5.0):.1f}%"
            ))
        return sorted(events, key=lambda x: x.time)
