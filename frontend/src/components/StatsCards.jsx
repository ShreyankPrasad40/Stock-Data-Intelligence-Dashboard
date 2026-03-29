import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Info } from 'lucide-react';

const Card = ({ title, value, prefix = "", suffix = "", percentage, status }) => (
  <div className="glass-card flex-1 p-6 flex flex-col gap-2 min-w-[200px] border-white/5">
    <div className="flex justify-between items-start">
      <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <div className={`px-2 py-1 rounded-full text-[10px] font-bold ${status === 'up' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'} flex items-center gap-1`}>
         {status === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
         {percentage}%
      </div>
    </div>
    <p className="text-2xl font-bold tracking-tight">
        {prefix}{typeof value === 'number' ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}{suffix}
    </p>
  </div>
);

const StatsCards = ({ summary, latestData }) => {
  if (!summary || !latestData) return null;

  const change = latestData.daily_return * 100;

  return (
    <div className="flex gap-4 w-full flex-wrap">
      <Card 
        title="52-Week High" 
        value={summary.high_52w} 
        prefix="₹" 
        status="up" 
        percentage={((summary.high_52w / latestData.close - 1) * 100).toFixed(1)} 
      />
      <Card 
        title="52-Week Low" 
        value={summary.low_52w} 
        prefix="₹" 
        status="down" 
        percentage={((latestData.close / summary.low_52w - 1) * 100).toFixed(1)}
      />
      <Card 
        title="Average Close" 
        value={summary.avg_close} 
        prefix="₹" 
        status={latestData.close > summary.avg_close ? 'up' : 'down'}
        percentage={Math.abs((latestData.close/summary.avg_close - 1)*100).toFixed(1)}
      />
      <Card 
        title="Volatility (7d)" 
        value={latestData.volatility || 0} 
        status="up"
        percentage={(latestData.volatility * 100).toFixed(2)}
      />
    </div>
  );
};

export default StatsCards;
