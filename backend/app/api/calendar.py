from fastapi import APIRouter
from typing import List
from app.schemas.schemas import CalendarEvent
from app.services.calendar_service import calendar_service

router = APIRouter()

@router.get("/calendar", response_model=List[CalendarEvent])
async def get_calendar():
    return await calendar_service.get_events()
