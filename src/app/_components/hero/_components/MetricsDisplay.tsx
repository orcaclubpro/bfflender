'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Award, Users, Target } from 'lucide-react';

interface MetricsDisplayProps {
  trackInteraction: () => void;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ trackInteraction }) => {
  const [currentMetric, setCurrentMetric] = useState(0);

  const metrics = [
    { value: '$2.3B+', label: 'Capital Deployed', icon: DollarSign, detail: 'Institutional funding capacity' },
    { value: '30+', label: 'Years Leading', icon: Award, detail: 'Market leadership depth' },
    { value: '5,000+', label: 'Business Owners Empowered', icon: Users, detail: 'Success relationships built' },
    { value: '94.2%', label: 'P&L Challenges Won', icon: Target, detail: 'Vegas tickets still in our vault' }
  ];

  useEffect(() => {
    const metricInterval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 4000);

    return () => {
      clearInterval(metricInterval);
    };
  }, [metrics.length]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-white font-bold text-xl">Performance Metrics</h3>
          <p className="text-slate-400 text-sm">Real institutional data</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-xs font-medium">LIVE</span>
        </div>
      </div>

      {/* Rotating Metrics Display */}
      <div 
        className="text-center mb-8 transition-all duration-500 cursor-pointer group hover:scale-105"
        onClick={() => {
          setCurrentMetric((prev) => (prev + 1) % metrics.length);
          trackInteraction();
        }}
      >
        <div className="flex items-center justify-center mb-4 p-4 bg-slate-800/50 rounded-full w-20 h-20 mx-auto group-hover:bg-emerald-500/20 transition-colors duration-300">
          {React.createElement(metrics[currentMetric].icon, {
            className: "w-8 h-8 text-amber-400"
          })}
        </div>
        <div className="text-5xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
          {metrics[currentMetric].value}
        </div>
        <div className="text-slate-300 font-semibold text-lg mb-1">
          {metrics[currentMetric].label}
        </div>
        <div className="text-slate-400 text-sm">
          {metrics[currentMetric].detail}
        </div>
      </div>
    </>
  );
};

export default MetricsDisplay; 