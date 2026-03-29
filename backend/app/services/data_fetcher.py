import yfinance as yf
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import pandas as pd

from ..models.stock import StockData
from .data_processor import process_raw_data

DEFAULT_SYMBOLS = ["TCS.NS", "INFY.NS", "RELIANCE.NS", "HDFCBANK.NS", "ICICIBANK.NS"]

def fetch_and_store_stocks(db: Session, symbols: list = DEFAULT_SYMBOLS):
    db.query(StockData).delete()
    db.commit()

    all_records = []
    
    for symbol in symbols:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period="1y")
        
        if df.empty:
            print(f"No data found for {symbol}")
            continue
            
        processed_df = process_raw_data(df)
        
        for index, row in processed_df.iterrows():
            record = StockData(
                symbol=symbol,
                date=index,
                open=row['Open'],
                high=row['High'],
                low=row['Low'],
                close=row['Close'],
                volume=int(row['Volume']),
                daily_return=row['Daily_Return'],
                ma_7=row['MA_7'] if not pd.isna(row['MA_7']) else None,
                volatility=row['Volatility'] if not pd.isna(row['Volatility']) else None
            )
            all_records.append(record)
    
    db.add_all(all_records)
    db.commit()
    print(f"Stored {len(all_records)} records across {len(symbols)} symbols.")
