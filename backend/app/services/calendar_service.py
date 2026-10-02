from app.providers.mock_calendar import MockCalendarProvider
from app.core.config import settings

class CalendarService:
    def __init__(self):
        if settings.MOCK_MODE:
            self.provider = MockCalendarProvider()
        else:
            self.provider = MockCalendarProvider()

    async def get_events(self, limit: int = 50):
        return await self.provider.get_events(limit)

calendar_service = CalendarService()
