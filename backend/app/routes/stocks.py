from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List
import numpy as np
from sklearn.linear_model import LinearRegression

from ..db.database import get_db
from ..models.stock import StockData
from ..schemas.stock import StockBase, SummaryResponse, ComparisonResponse, PredictionResponse

router = APIRouter()

@router.get("/companies", response_model=List[str])
def get_companies(db: Session = Depends(get_db)):
    companies = db.query(StockData.symbol).distinct().all()
    return [c[0] for c in companies]

@router.get("/data/{symbol}", response_model=List[StockBase])
def get_stock_data(symbol: str, db: Session = Depends(get_db)):
    data = db.query(StockData).filter(StockData.symbol == symbol).order_by(StockData.date.desc()).limit(30).all()
    if not data:
        raise HTTPException(status_code=404, detail="Symbol not found or no data available.")
    return data[::-1]

@router.get("/summary/{symbol}", response_model=SummaryResponse)
def get_summary(symbol: str, db: Session = Depends(get_db)):
    stats = db.query(
        func.max(StockData.high),
        func.min(StockData.low),
        func.avg(StockData.close)
    ).filter(StockData.symbol == symbol).first()
    
    if not stats or stats[0] is None:
        raise HTTPException(status_code=404, detail="Symbol not or no data available.")
        
    return SummaryResponse(
        symbol=symbol,
        high_52w=stats[0],
        low_52w=stats[1],
        avg_close=stats[2]
    )

@router.get("/compare", response_model=ComparisonResponse)
def compare_stocks(symbol1: str, symbol2: str, db: Session = Depends(get_db)):
    def get_return_pct(symbol):
        latest = db.query(StockData).filter(StockData.symbol == symbol).order_by(StockData.date.desc()).first()
        old_data = db.query(StockData).filter(StockData.symbol == symbol).order_by(StockData.date.desc()).offset(29).limit(1).first()
        
        if not latest or not old_data:
            return 0.0
            
        return (latest.close - old_data.close) / old_data.close * 100

    return ComparisonResponse(
        symbol1=symbol1,
        symbol1_return=get_return_pct(symbol1),
        symbol2=symbol2,
        symbol2_return=get_return_pct(symbol2)
    )

@router.get("/predict/{symbol}", response_model=PredictionResponse)
def predict_stock(symbol: str, db: Session = Depends(get_db)):
    historical_data = db.query(StockData).filter(StockData.symbol == symbol).order_by(StockData.date.asc()).all()
    
    if not historical_data:
        raise HTTPException(status_code=404, detail="Symbol not found.")

    prices = [h.close for h in historical_data]
    X = np.array(range(len(prices))).reshape(-1, 1)
    y = np.array(prices)
    
    model = LinearRegression()
    model.fit(X, y)
    
    next_X = np.array(range(len(prices), len(prices) + 5)).reshape(-1, 1)
    predictions = model.predict(next_X).tolist()
    
    return PredictionResponse(
        symbol=symbol,
        predictions=predictions,
        last_date=historical_data[-1].date
    )
