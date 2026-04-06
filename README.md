# 📈 Stock Data Intelligence Dashboard

A production-ready financial data platform and dashboard built with **FastAPI**, **React**, and **Pandas**. This project integrates automated data pipelines, statistical analysis, and machine learning to provide actionable stock market insights.

---

## ✨ Features

- **Automated Data Pipeline**: Seamlessly fetches 1 year of daily historical data for major NSE stocks (e.g., TCS, RELIANCE) using the `yfinance` API.
- **Advanced Data Engineering**: Cleans raw data (handling nulls, type conversions) and calculates key financial metrics like Moving Averages (MA7) and Volatility.
- **High-Performance API**: A robust RESTful backend powered by FastAPI with automated Pydantic validation and Swagger documentation.
- **Predictive Analytics**: Leverages a `Scikit-Learn` Linear Regression model to forecast future price trends (5-day predictions).
- **Premium UI/UX**: Modern, glassmorphic dashboard built with React, Vite, Tailwind CSS, and interactive charts via Recharts.

---

## 🏗️ How it Works

### ⚙️ Backend Architecture (Python/FastAPI)
The backend acts as the "Brain" of the operation:
1.  **Ingestion**: On the very first run (lifespan hook), the `Data Fetcher` service pings Yahoo Finance, downloads historical CSV-like data, and persists it into a local **SQLite** database via **SQLAlchemy**.
2.  **Processing**: The data is cleaned and structured into the `StockData` model.
3.  **Intelligence**: When you request a prediction, the backend retrieves all historical prices for that symbol, transforms them into a NumPy array, and fits a **Linear Regression** model to calculate a 5-day trendline.
4.  **Delivery**: Standardized JSON responses are served via Pydantic schemas over `/api` routes.

### 🎨 Frontend Architecture (React/Vite)
The frontend is the "Face" of the operation:
1.  **Reactive State**: The application tracks the `selectedSymbol` in the top-level `App` component.
2.  **Async Orchestration**: When a symbol changes, the `Dashboard` component triggers multiple parallel `Axios` calls to fetch historical data, summary stats, and predictions.
3.  **Visualization**: Raw JSON data is fed into `Recharts` components, which render responsive, theme-aware line charts and performance bars.
4.  **Styling**: Utilizes a customized Tailwind CSS configuration with backdrop-blurs and deep gradients to achieve a premium "glass" aesthetic.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Backend Framework** | FastAPI (Python) |
| **Data Analysis** | Pandas, NumPy |
| **Machine Learning** | Scikit-Learn |
| **ORM / Database** | SQLAlchemy / SQLite |
| **Frontend Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Charting** | Recharts |

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.9+**
- **Node.js 18+**

### 1. Start the Backend
```bash
cd backend
# Create and activate virtual environment (optional)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
```
*The API will be available at `http://localhost:8000`. Check `/docs` for the interactive API explorer.*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*The Dashboard will be live at `http://localhost:5173`.*

---

## 🔗 Key API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/companies` | Returns all available stock symbols |
| **GET** | `/api/data/{symbol}` | Fetches the last 30 days of price history |
| **GET** | `/api/summary/{symbol}` | 52-week summary stats (High, Low, Avg) |
| **GET** | `/api/predict/{symbol}` | Machine learning price trend prediction |

---

## 📊 Design Philosophy
- **Performance First**: Minimalist database queries and efficient React rendering.
- **Glassmorphism**: High-end visual style using semi-transparent layers and blurred backgrounds.
- **Actionable Data**: Focusing on clarity—making complex financial data easy to read through visualization.

---
