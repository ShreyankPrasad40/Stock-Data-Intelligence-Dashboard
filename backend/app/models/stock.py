from sqlalchemy import Column, Integer, Float, String, DateTime
from ..db.database import Base

class StockData(Base):
    __tablename__ = "stock_historical_data"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    date = Column(DateTime)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Integer)
    daily_return = Column(Float, nullable=True)
    ma_7 = Column(Float, nullable=True)
    volatility = Column(Float, nullable=True)
