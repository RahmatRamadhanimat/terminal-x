from app.providers.mock_news import MockNewsProvider
from app.core.config import settings

class NewsService:
    def __init__(self):
        if settings.MOCK_MODE:
            self.provider = MockNewsProvider()
        else:
            self.provider = MockNewsProvider() # Default to mock for now

    async def get_news(self, category: str = None):
        return await self.provider.get_news(category)

news_service = NewsService()
