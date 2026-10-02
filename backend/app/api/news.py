from fastapi import APIRouter
from typing import List, Optional
from app.schemas.schemas import NewsItem
from app.services.news_service import news_service

router = APIRouter()

@router.get("/news", response_model=List[NewsItem])
async def get_news(category: Optional[str] = None):
    return await news_service.get_news(category)
