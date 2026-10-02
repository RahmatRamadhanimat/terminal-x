from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from app.core.database import Base

class Alert(Base):
    __tablename__ = 'alerts'
    id = Column(String, primary_key=True, index=True)
    symbol = Column(String, index=True)
    price = Column(Float)
    condition = Column(String)
    active = Column(Boolean, default=True)

class PaperOrder(Base):
    __tablename__ = 'paper_orders'
    id = Column(String, primary_key=True, index=True)
    symbol = Column(String, index=True)
    side = Column(String)
    quantity = Column(Float)
    price = Column(Float)
    status = Column(String)
    timestamp = Column(DateTime)

class PaperPosition(Base):
    __tablename__ = 'paper_positions'
    id = Column(String, primary_key=True, index=True)
    symbol = Column(String, index=True)
    quantity = Column(Float)
    average_price = Column(Float)

class Workspace(Base):
    __tablename__ = 'workspaces'
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    layout = Column(String)
