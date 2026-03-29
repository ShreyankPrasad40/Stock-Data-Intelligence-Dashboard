# 📈 Stock Data Intelligence Dashboard

A production-ready financial data platform and dashboard built with **FastAPI**, **React**, and **Pandas**. Features automated data collection, cleaning, statistical analysis, and ML-based price forecasting.

---

## ✨ Features

- **Automated Data Pipeline**: Fetches 1 year of daily historical data for top NSE stocks (TCS, RELIANCE, etc.) using `yfinance`.
- **Data Engineering**: Cleans data handling nulls, type conversions, and calculates advanced metrics (MA7, Volatility, Daily Returns).
- **RESTful API**: Fast and robust backend using FastAPI with automated Swagger documentation.
- **Interactive Dashboard**: Modern, glassmorphic UI built with React + Vite + Tailwind CSS + Recharts.
- **ML Insights**: Integrates a Linear Regression model for 5-day future price predictions.
- **Rich Analytics**: Visualizes 52-week highs/lows, volatility trends, and price history in real-time.

---

## 🛠 Tech Stack

### Backend
- **Core**: Python 3.9+
- **Framework**: FastAPI
- **Data Library**: Pandas & NumPy
- **Database**: SQLite with SQLAlchemy ORM
- **ML Engine**: Scikit-Learn
- **API Models**: Pydantic

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charting**: Recharts
- **API Client**: Axios

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.9+ (`py` or `python` command)
- Node.js & npm

### Backend Setup
1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   py -m pip install -r requirements.txt
   ```
3. **Run the server**:
   ```bash
   py -m uvicorn app.main:app --reload
   ```
   *Note: On first run, it will automatically fetch 1 year of stock data (~30-60s).*

### Frontend Setup
1. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 🔗 API Documentation

Access the auto-generated Swagger docs at: `http://localhost:8000/docs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies` | List available stock symbols |
| GET | `/api/data/{symbol}` | Last 30 days of processed daily data |
| GET | `/api/summary/{symbol}` | 52-week high, low, and avg. closing price |
| GET | `/api/compare` | Performance comparison between two stocks |
| GET | `/api/predict/{symbol}` | 5-day price forecast using Linear Regression |

---

## 📊 Sample Response (Stock Summary)
```json
{
  "symbol": "TCS.NS",
  "high_52w": 4567.45,
  "low_52w": 3120.20,
  "avg_close": 3850.15
}
```

---

## 🦾 Architecture Decisions
- **Modularity**: Services separated into `Data Fetcher` and `Data Processor` for scalability.
- **Performance**: Bulk database insertions and optimized SQLAlchemy queries.
- **User Experience**: Glassmorphism UI with framer-motion like transitions (standard CSS animations) and real-time charting.

---


