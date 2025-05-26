'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp, CheckCircle, Award, Clock, DollarSign, Zap, Users, Shield, Target } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userInteraction, setUserInteraction] = useState(0);
  const [showUrgency, setShowUrgency] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const metrics = [
    { value: '$2.3B+', label: 'Capital Deployed', icon: DollarSign, detail: 'Institutional funding capacity' },
    { value: '30+', label: 'Years Leading', icon: Award, detail: 'Market leadership depth' },
    { value: '5,000+', label: 'Brokers Empowered', icon: Users, detail: 'Success relationships built' },
    { value: '94.2%', label: 'P&L Challenges Won', icon: Target, detail: 'Vegas tickets still in our vault' }
  ];

  const urgencyMessages = [
    "47 of 50 quarterly P&L challenges claimed",
    "3 remaining spots for Q2 Vegas guarantee",
    "Limited: Institutional-grade partnership slots"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const metricInterval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 4000);

    const urgencyTimer = setTimeout(() => {
      setShowUrgency(true);
    }, 6000);
    
    return () => {
      clearInterval(metricInterval);
      clearTimeout(urgencyTimer);
    };
  }, [metrics.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const trackInteraction = () => {
    setUserInteraction(prev => prev + 1);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 relative overflow-hidden"
    >
      {/* Sophisticated Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-emerald-800/10 via-transparent to-transparent transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-amber-900/12 via-transparent to-transparent transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -6}px, ${mousePosition.y * -6}px)`
          }}
        />
        <div className="absolute top-1/4 left-1/6 w-96 h-96 border border-emerald-600/6 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-amber-500/8 rotate-45 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(5,150,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px] transition-all duration-700"
        style={{
          backgroundPosition: `${mousePosition.x * 3}px ${mousePosition.y * 3}px`
        }}
      />

      {/* Urgency Banner */}
      {showUrgency && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-amber-600/95 to-amber-700/95 backdrop-blur-lg rounded-xl px-6 py-3 text-white shadow-2xl animate-slideDown z-50 border border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">{urgencyMessages[0]}</span>
              <span className="text-xs text-amber-100">{urgencyMessages[1]}</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col justify-center py-20">
          
          {/* Premium Brand Section */}
          <div className={`text-center mb-16 transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative mb-12">
              {/* Logo & Brand */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <div className="relative flex-shrink-0">
                  <svg 
                    width="72" 
                    height="72" 
                    viewBox="0 0 64 64" 
                    className="text-emerald-400 w-16 h-16 sm:w-18 sm:h-18"
                  >
                    {/* Base Foundation */}
                    <rect x="8" y="48" width="48" height="8" rx="3" fill="currentColor" opacity="0.9"/>
                    
                    {/* Growth Pillars */}
                    <rect x="12" y="36" width="8" height="20" rx="2" fill="currentColor" opacity="0.7"/>
                    <rect x="24" y="28" width="8" height="28" rx="2" fill="currentColor" opacity="0.8"/>
                    <rect x="36" y="20" width="8" height="36" rx="2" fill="currentColor" opacity="0.85"/>
                    <rect x="48" y="12" width="8" height="44" rx="2" fill="currentColor"/>
                    
                    {/* Connection Arc */}
                    <path 
                      d="M16 32 Q32 6 48 16" 
                      stroke="#f59e0b" 
                      strokeWidth="2.5" 
                      fill="none" 
                      strokeLinecap="round"
                      opacity="0.95"
                    />
                    
                    {/* Premium Accent */}
                    <circle cx="50" cy="16" r="3" fill="#f59e0b" opacity="0.9"/>
                  </svg>
                </div>
                
                <div className="text-center sm:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2">
                    BFFLender
                  </h1>
                  <p className="text-emerald-400 text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                    Institutional Mortgage Capital
                  </p>
                </div>
              </div>
              
              {/* Brand Promise with Psychological Trigger */}
              <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                  We&apos;ll Prove Our Performance
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">
                    Or Send You to Vegas
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
                  30+ years building institutional-grade mortgage partnerships. Put your P&L where your mouth is — 
                  if we can&apos;t beat your current performance, Vegas is on us.
                </p>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Content - Main Value Proposition */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              
              {/* P&L Challenge CTA - Primary Focus */}
              <div className="bg-gradient-to-br from-slate-900/60 to-emerald-900/40 backdrop-blur-lg border border-emerald-500/30 rounded-2xl p-8 mb-10 hover:border-amber-400/50 transition-all duration-500 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-2">The P&L Challenge</h3>
                    <p className="text-emerald-300 text-sm">Risk-free performance guarantee</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-amber-400" />
                    <span className="text-amber-400 text-xs font-bold">94.2% WIN RATE</span>
                  </div>
                </div>
                
                <p className="text-slate-200 mb-6 leading-relaxed">
                  Submit your current P&L. We&apos;ll analyze your performance and show you exactly how our 
                  institutional model will improve your numbers. If we&apos;re wrong, we&apos;ll send you to Vegas.
                </p>
                
                <div className="space-y-4">
                  <button 
                    className="group w-full relative bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-amber-500/30 hover:scale-105 overflow-hidden"
                    onClick={trackInteraction}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">Take The P&L Challenge</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>100% Confidential</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>48hr Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Vegas Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Brokers Switch - Core Differentiators */}
              <div className="mb-10">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  Why Top Brokers Switch
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: '200+ Loan Products', subtitle: 'vs. 15-20 at typical shops' },
                    { title: 'Radical Transparency', subtitle: 'See every margin upfront' },
                    { title: 'Flat Organization', subtitle: 'Direct access to decision makers' },
                    { title: 'Your Brand First', subtitle: 'We build you, not us' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`group p-4 rounded-lg border border-slate-700/30 hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all duration-300 cursor-pointer transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                      onClick={trackInteraction}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-slate-200 font-semibold group-hover:text-white transition-colors duration-300">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm group-hover:text-emerald-300 transition-colors duration-300">
                        {item.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="group border-2 border-emerald-600 hover:border-amber-400 text-emerald-300 hover:text-amber-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-amber-500/10 hover:scale-105 backdrop-blur-sm relative overflow-hidden"
                  onClick={trackInteraction}
                >
                  Schedule Strategy Session
                  <div className="absolute inset-0 bg-amber-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                </button>
              </div>
            </div>

            {/* Right Dashboard - Live Metrics & Social Proof */}
            <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-white font-bold text-xl">Performance Metrics</h3>
                    <p className="text-slate-400 text-sm">Real institutional data</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <Zap className="w-5 h-5 text-amber-400" />
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
              </div>

              {/* Floating Enhancement */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl transition-all duration-500"
                style={{
                  transform: `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`
                }}
              />
            </div>
          </div>

          {/* Trust Indicators Footer */}
          <div className="border-t border-slate-800/50 mt-20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>NMLS Licensed • Equal Housing Lender • BBB A+ Rated</span>
              </div>
              <div className="flex items-center gap-6">
                <span>30+ Years Established</span>
                <span>•</span>
                <span className="text-emerald-400">$2.3B+ Capital Deployed</span>
                <span>•</span>
                <span className="text-amber-400">Client for Life™</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Hero; 