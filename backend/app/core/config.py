from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    MOCK_MODE: bool = True
    MARKET_DATA_API_KEY: str = ""
    NEWS_API_KEY: str = ""
    CALENDAR_API_KEY: str = ""
    DATABASE_URL: str = "sqlite+aiosqlite:///./terminal_x.db"
    SECRET_KEY: str = "change-me-in-production"
    FRONTEND_URL: str = "http://localhost:5173"
    API_BASE_URL: str = "http://localhost:8000"

    class Config:
        env_file = ".env"

settings = Settings()
