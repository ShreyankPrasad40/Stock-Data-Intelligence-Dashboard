from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class StockBase(BaseModel):
    symbol: str
    date: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int
    daily_return: Optional[float]
    ma_7: Optional[float]
    volatility: Optional[float]

    class Config:
        orm_mode = True

class SummaryResponse(BaseModel):
    symbol: str
    high_52w: float
    low_52w: float
    avg_close: float

class ComparisonResponse(BaseModel):
    symbol1: str
    symbol1_return: float
    symbol2: str
    symbol2_return: float

class PredictionResponse(BaseModel):
    symbol: str
    predictions: List[float]
    last_date: datetime
