from typing import List
from datetime import datetime, timedelta
import random
from app.providers.base import NewsProvider
from app.schemas.schemas import NewsItem
import uuid

class MockNewsProvider(NewsProvider):
    def __init__(self):
        self.categories = ["GLOBAL", "FOREX", "GOLD", "CRYPTO", "STOCKS", "COMMODITIES", "MACRO"]
        self.headlines = [
            "Fed Signals Potential Rate Cut in Upcoming Meeting",
            "Gold Prices Hit New All-Time High Amid Inflation Concerns",
            "Bitcoin Rallies Past Key Resistance Level",
            "Tech Stocks Surge on Better-Than-Expected Earnings",
            "Oil Prices Stabilize After Middle East Tensions",
            "European Central Bank Maintains Current Interest Rates",
            "U.S. Dollar Weakens Against Major Peers",
            "Corporate Earnings Season Starts with a Bang",
            "Commodity Markets See Increased Volatility",
            "Macro Economic Indicators Point to Gradual Recovery",
            "Retail Sales Data Exceeds Market Expectations",
            "Geopolitical Tensions Drive Safe-Haven Demand",
            "Crypto Markets Experience Flash Crash",
            "Major Merger Announced in the Tech Sector",
            "Employment Figures Show Unexpected Job Growth",
            "Inflation Remains Sticky in the Service Sector",
            "Asian Markets Close Mixed Amid Trade Concerns",
            "Bond Yields Retreat from Recent Highs",
            "Housing Market Shows Signs of Cooling",
            "Consumer Confidence Rises for Third Straight Month"
        ]

    async def get_news(self, category: str = None) -> List[NewsItem]:
        news = []
        for i in range(20):
            cat = random.choice(self.categories) if not category else category
            headline = random.choice(self.headlines)
            news.append(NewsItem(
                id=str(uuid.uuid4()),
                headline=headline,
                category=cat,
                timestamp=datetime.utcnow() - timedelta(minutes=random.randint(1, 1440)),
                url=f"https://example.com/news/{i}",
                summary=f"Summary for {headline}"
            ))
        return sorted(news, key=lambda x: x.timestamp, reverse=True)
