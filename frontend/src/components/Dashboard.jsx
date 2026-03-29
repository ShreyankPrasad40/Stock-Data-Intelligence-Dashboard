import React, { useEffect, useState } from 'react';
import { getStockData, getSummary, getPrediction } from '../api/client';
import StockChart from './StockChart';
import StatsCards from './StatsCards';
import { RefreshCw, Zap, TrendingUp, Info } from 'lucide-react';

const Dashboard = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      setPrediction(null);
      Promise.all([
        getStockData(symbol),
        getSummary(symbol)
      ]).then(([dataRes, summaryRes]) => {
        setData(dataRes.data);
        setSummary(summaryRes.data);
        setLoading(false);
      }).catch(err => {
        console.error("Fetch error", err);
        setLoading(false);
      });
    }
  }, [symbol]);

  const handlePredict = () => {
      setPredicting(true);
      getPrediction(symbol)
          .then(res => {
              setPrediction(res.data);
              setPredicting(false);
          })
          .catch(err => {
              console.error("Prediction error", err);
              setPredicting(false);
          });
  };

  if (!symbol) return (
      <div className="flex-1 flex items-center justify-center">
          <p className="text-white/20 font-medium">Select a stock to view detailed analytics</p>
      </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-10 animate-fade-in custom-scroll">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">{symbol.split('.')[0]}</h2>
          <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
             <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold">NSE</span>
             <span>Last updated: {data.length > 0 ? new Date(data[data.length-1].date).toLocaleDateString() : 'Loading...'}</span>
          </div>
        </div>
        <button 
          onClick={handlePredict}
          disabled={predicting}
          className="flex items-center gap-2 px-6 py-3 bg-accent/20 hover:bg-accent/30 text-accent font-bold rounded-2xl border border-accent/20 transition-all active:scale-95 disabled:opacity-50"
        >
          {predicting ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
          {predicting ? 'Computing...' : 'Generate 5d ML Prediction'}
        </button>
      </header>

      {loading ? (
          <div className="flex flex-col gap-6">
              <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-[400px] bg-white/5 rounded-2xl animate-pulse" />
          </div>
      ) : (
          <div className="flex flex-col gap-6">
              <StatsCards summary={summary} latestData={data[data.length - 1]} />
              <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-primary" />
                        <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest">Price History (30 Days)</h4>
                      </div>
                      <div className="flex gap-2 text-[10px] font-bold text-white/20">
                          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> HISTORIC</span>
                          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent" /> ML PREDICTION</span>
                      </div>
                  </div>
                  <StockChart data={data} predictionData={prediction} />
              </div>

              {prediction && (
                <div className="glass-card p-6 border-accent/20 bg-accent/5">
                   <div className="flex items-center gap-3 mb-4">
                      <Zap className="text-accent" />
                      <h4 className="text-lg font-bold text-white/90">ML Forecast Insights</h4>
                   </div>
                   <div className="grid grid-cols-5 gap-4">
                      {prediction.predictions.map((p, i) => (
                        <div key={i} className="p-4 bg-black/20 rounded-xl border border-white/5">
                           <p className="text-[10px] text-white/40 font-bold mb-1">Day {i+1}</p>
                           <p className="text-lg font-bold">₹{p.toFixed(2)}</p>
                        </div>
                      ))}
                   </div>
                   <p className="text-[10px] text-white/20 mt-4 italic flex items-center gap-1">
                      <Info size={10} /> Prediction based on Linear Regression over 1-year historical closing prices. Not financial advice.
                   </p>
                </div>
              )}
          </div>
      )}
    </div>
  );
};

export default Dashboard;
