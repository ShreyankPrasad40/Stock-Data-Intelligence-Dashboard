import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { format } from 'date-fns';

const StockChart = ({ data, predictionData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map(item => ({
          ...item,
          formattedDate: format(new Date(item.date), 'MMM dd')
      }));

      if (predictionData && predictionData.predictions) {
          const lastDate = new Date(predictionData.last_date);
          const predictions = predictionData.predictions.map((p, index) => {
              const predDate = new Date(lastDate);
              predDate.setDate(lastDate.getDate() + index + 1);
              return {
                  formattedDate: format(predDate, 'MMM dd'),
                  close: p,
                  isPrediction: true,
                  predictedClose: p
              };
          });
          setChartData([...formattedData, ...predictions]);
      } else {
          setChartData(formattedData);
      }
    }
  }, [data, predictionData]);

  if (!chartData || chartData.length === 0) return <div className="h-[400px] flex items-center justify-center text-white/20">Select a company to visualize...</div>;

  return (
    <div className="h-[400px] w-full bg-slate-800/20 rounded-2xl p-4 border border-white/5 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 11}}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 11}}
            width={70}
          />
          <Tooltip 
            contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff'}}
            itemStyle={{color: '#3b82f6'}}
            labelStyle={{color: 'rgba(255,255,255,0.5)', marginBottom: '8px'}}
          />
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorClose)" 
            connectNulls={true}
            animationDuration={1500}
            name="Historic Price"
          />
          <Area 
             type="monotone" 
             dataKey="predictedClose" 
             stroke="#8b5cf6" 
             strokeWidth={3}
             strokeDasharray="5 5"
             fillOpacity={1} 
             fill="url(#colorPred)" 
             connectNulls={true}
             animationDuration={1500}
             name="Prediction (ML)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
