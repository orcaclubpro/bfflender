'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PerformanceStatsProps {
  userInteraction: number;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ userInteraction }) => {
  return (
    <>
      {/* Social Proof Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-emerald-500/50 transition-all duration-300 group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300 text-sm font-semibold">Broker Satisfaction</span>
            <span className="text-emerald-400 font-bold text-lg">97.3%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-1000 relative group-hover:from-emerald-400 group-hover:to-emerald-300"
              style={{ width: '97.3%' }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-amber-500/50 transition-all duration-300 group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300 text-sm font-semibold">Avg. Profit Increase</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-bold text-lg">+31%</span>
            </div>
          </div>
          <div className="text-slate-400 text-xs">
            First-year broker performance improvement
          </div>
        </div>
      </div>

      {/* Engagement Tracker */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-300 text-sm font-semibold">Engagement Score</span>
          <span className="text-amber-400 font-bold">{Math.min(userInteraction, 10)}/10</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(userInteraction * 10, 100)}%` }}
          ></div>
        </div>
        <div className="text-slate-400 text-xs">
          {userInteraction >= 8 ? '🎯 High-intent prospect detected!' : 'Explore to unlock insider insights'}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Updated real-time</span>
          </div>
          <span>P&L challenges remaining: 3</span>
        </div>
      </div>
    </>
  );
};

export default PerformanceStats; 