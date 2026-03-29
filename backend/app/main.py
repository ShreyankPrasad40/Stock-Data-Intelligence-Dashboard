from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from .db.database import SessionLocal, engine, Base
from .routes import stocks
from .services.data_fetcher import fetch_and_store_stocks
from .models.stock import StockData

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    try:
        count = db.query(StockData).count()
        if count == 0:
            print("DB empty. Fetching initial stock data...")
            fetch_and_store_stocks(db)
        else:
            print(f"DB already contains {count} records.")
    finally:
        db.close()
    yield

app = FastAPI(
    title="Stock Data Intelligence Dashboard",
    description="API for fetching, analyzing, and predicting stock performance.",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stocks.router, prefix="/api", tags=["Stocks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Stock Data Intelligence Dashboard API!"}
