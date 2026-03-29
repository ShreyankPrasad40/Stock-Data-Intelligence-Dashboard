import React, { useEffect, useState } from 'react';
import { getCompanies } from '../api/client';
import { LayoutDashboard, TrendingUp, BarChart, ChevronRight, Activity } from 'lucide-react';

const Sidebar = ({ selectedSymbol, onSelect }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies()
      .then(res => {
        setCompanies(res.data);
        if (res.data.length > 0 && !selectedSymbol) {
          onSelect(res.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching companies", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-72 h-screen border-r border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col gap-8 transition-all duration-300">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
          <Activity className="text-primary" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white/90">StockAI</h1>
          <p className="text-xs text-white/40">Market Intelligence Dashboard</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-2 px-4">Markets</p>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 w-full bg-slate-800/20 rounded-xl animate-pulse" />
          ))
        ) : (
          companies.map((symbol) => (
            <div
              key={symbol}
              onClick={() => onSelect(symbol)}
              className={`sidebar-item flex items-center justify-between group ${selectedSymbol === symbol ? 'sidebar-item-active' : ''}`}
            >
              <div className="flex items-center gap-3">
                <BarChart size={18} className={selectedSymbol === symbol ? 'text-primary' : 'text-white/40 group-hover:text-primary'} />
                <span className="font-semibold">{symbol.split('.')[0]}</span>
              </div>
              <ChevronRight size={14} className={`transition-all duration-200 ${selectedSymbol === symbol ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </div>
          ))
        )}
      </nav>

      <div className="mt-auto p-4 bg-primary/5 border border-primary/10 rounded-2xl">
        <h4 className="text-xs font-bold text-primary mb-1">PRO INSIGHTS</h4>
        <p className="text-[11px] text-white/40 leading-relaxed">Linear Regression indicators are enabled across all NSE tickers.</p>
      </div>
    </div>
  );
};

export default Sidebar;
