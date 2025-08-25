'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, useTransition, useDeferredValue, Suspense, lazy } from 'react';
import { ArrowRight, TrendingUp, CheckCircle, Clock, Shield, Target, X } from 'lucide-react';
import { useChatbot } from './ChatbotProvider';

// Lazy load heavy components
const MetricsDisplay = lazy(() => import('./hero/_components/MetricsDisplay'));
const PerformanceStats = lazy(() => import('./hero/_components/PerformanceStats'));
const BackgroundEffects = lazy(() => import('./hero/_components/BackgroundEffects'));
const PerformanceMonitor = lazy(() => import('./hero/_components/PerformanceMonitor'));

// Custom hooks for optimization
const useDebounce = (value: unknown, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Enhanced mouse position hook with useDeferredValue for better concurrent rendering
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const deferredMousePosition = useDeferredValue(mousePosition);
  
  const updateMousePosition = useCallback((e: MouseEvent, rect: DOMRect) => {
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1
    });
  }, []);

  return { mousePosition: deferredMousePosition, updateMousePosition };
};



// Memoized components for better performance
const UrgencyBanner = React.memo(({ 
  showUrgency, 
  urgencyDismissed, 
  onUrgencyClick, 
  onUrgencyDismiss 
}: {
  showUrgency: boolean;
  urgencyDismissed: boolean;
  onUrgencyClick: () => void;
  onUrgencyDismiss: (e: React.MouseEvent) => void;
}) => {
  if (!showUrgency || urgencyDismissed) return null;

  return (
    <div 
      className="fixed top-28 right-4 bg-gradient-to-r from-amber-600/95 to-amber-700/95 backdrop-blur-lg rounded-xl px-6 py-3 text-white shadow-2xl animate-slideDown z-40 border border-amber-400/30 cursor-pointer hover:from-amber-500/95 hover:to-amber-600/95 transition-all duration-300 hover:scale-105"
      onClick={onUrgencyClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">47 of 50 quarterly P&L challenges claimed</span>
          <span className="text-xs text-amber-100">3 remaining spots for Q2 Vegas guarantee</span>
        </div>
        <button
          onClick={onUrgencyDismiss}
          className="ml-2 p-1 hover:bg-amber-800/50 rounded-full transition-colors duration-200"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

UrgencyBanner.displayName = 'UrgencyBanner';

const BrandSection = React.memo(() => (
  <div className="text-center mb-16">
    <div className="relative mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
        <div className="relative flex-shrink-0">
          <svg 
            width="72" 
            height="72" 
            viewBox="0 0 64 64" 
            className="text-emerald-400 w-16 h-16 sm:w-18 sm:h-18"
          >
            <rect x="8" y="48" width="48" height="8" rx="3" fill="currentColor" opacity="0.9"/>
            <rect x="12" y="36" width="8" height="20" rx="2" fill="currentColor" opacity="0.7"/>
            <rect x="24" y="28" width="8" height="28" rx="2" fill="currentColor" opacity="0.8"/>
            <rect x="36" y="20" width="8" height="36" rx="2" fill="currentColor" opacity="0.85"/>
            <rect x="48" y="12" width="8" height="44" rx="2" fill="currentColor"/>
            <path 
              d="M16 32 Q32 6 48 16" 
              stroke="#f59e0b" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round"
              opacity="0.95"
            />
            <circle cx="50" cy="16" r="3" fill="#f59e0b" opacity="0.9"/>
          </svg>
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2">
            BFFLender
          </h1>
          <p className="text-emerald-400 text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Your Best Foot Forward
          </p>
        </div>
      </div>
      
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
));

BrandSection.displayName = 'BrandSection';

const PLChallenge = React.memo(({ onPLChallenge }: { onPLChallenge: () => void }) => (
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
        onClick={onPLChallenge}
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
));

PLChallenge.displayName = 'PLChallenge';

const WhyOwnersSwitch = React.memo(({ isVisible, trackInteraction }: { 
  isVisible: boolean; 
  trackInteraction: () => void; 
}) => {
  const switchReasons = useMemo(() => [
    { title: '200+ Loan Products', subtitle: 'vs. 15-20 at typical shops' },
    { title: 'Radical Transparency', subtitle: 'See every margin upfront' },
    { title: 'Flat Organization', subtitle: 'Direct access to decision makers' },
    { title: 'Your Brand First', subtitle: 'We build you, not us' }
  ], []);

  return (
    <div className="mb-10">
      <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-emerald-400" />
        Why Top Owners Switch
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {switchReasons.map((item, index) => (
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
  );
});

WhyOwnersSwitch.displayName = 'WhyOwnersSwitch';

const TrustIndicators = React.memo(() => (
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
));

TrustIndicators.displayName = 'TrustIndicators';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userInteraction, setUserInteraction] = useState(0);
  const [showUrgency, setShowUrgency] = useState(false);
  const [urgencyDismissed, setUrgencyDismissed] = useState(false);
  const [, startTransition] = useTransition();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { openChatbot } = useChatbot();
  const { mousePosition, updateMousePosition } = useMousePosition();
  
  // Debounce mouse position for better performance
  const debouncedMousePosition = useDebounce(mousePosition, 16) as { x: number; y: number }; // ~60fps

  // Memoized handlers
  const trackInteraction = useCallback(() => {
    startTransition(() => {
      setUserInteraction(prev => prev + 1);
    });
  }, []);

  const handlePLChallenge = useCallback(() => {
    openChatbot();
    trackInteraction();
  }, [openChatbot, trackInteraction]);

  const handleScheduleSession = useCallback(() => {
    window.location.href = '/contact';
    trackInteraction();
  }, [trackInteraction]);

  const handleUrgencyClick = useCallback(() => {
    openChatbot();
    trackInteraction();
  }, [openChatbot, trackInteraction]);

  const handleUrgencyDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setUrgencyDismissed(true);
  }, []);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      updateMousePosition(e, rect);
    }
  }, [updateMousePosition]);

  // Effects with cleanup and optimization
  useEffect(() => {
    setIsVisible(true);
    
    const urgencyTimer = setTimeout(() => {
      setShowUrgency(true);
    }, 6000);
    
    return () => {
      clearTimeout(urgencyTimer);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 relative overflow-hidden"
    >
      {/* Lazy loaded background effects */}
      <Suspense fallback={null}>
        <BackgroundEffects mousePosition={debouncedMousePosition} />
      </Suspense>

      {/* Urgency Banner */}
      <UrgencyBanner
        showUrgency={showUrgency}
        urgencyDismissed={urgencyDismissed}
        onUrgencyClick={handleUrgencyClick}
        onUrgencyDismiss={handleUrgencyDismiss}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col justify-center py-20">
          
          {/* Brand Section */}
          <div className={`transform transition-all duration-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <BrandSection />
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              
              {/* P&L Challenge CTA */}
              <PLChallenge onPLChallenge={handlePLChallenge} />

              {/* Why Owners Switch */}
              <WhyOwnersSwitch isVisible={isVisible} trackInteraction={trackInteraction} />

              {/* Secondary CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="group border-2 border-emerald-600 hover:border-amber-400 text-emerald-300 hover:text-amber-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-amber-500/10 hover:scale-105 backdrop-blur-sm relative overflow-hidden"
                  onClick={handleScheduleSession}
                >
                  Schedule Strategy Session
                  <div className="absolute inset-0 bg-amber-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                </button>
              </div>
            </div>

            {/* Right Dashboard - Lazy loaded */}
            <div className={`relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Suspense fallback={
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                  <div className="animate-pulse">
                    <div className="h-6 bg-slate-700 rounded mb-4"></div>
                    <div className="h-20 bg-slate-700 rounded mb-6"></div>
                    <div className="space-y-4">
                      <div className="h-16 bg-slate-700 rounded"></div>
                      <div className="h-16 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              }>
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
                  <MetricsDisplay trackInteraction={trackInteraction} />
                  <PerformanceStats userInteraction={userInteraction} />
                </div>
              </Suspense>

              {/* Floating Enhancement */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl transition-all duration-500"
                style={{
                  transform: `translate(${debouncedMousePosition.x * 4}px, ${debouncedMousePosition.y * 4}px)`
                }}
              />
            </div>
          </div>

          {/* Trust Indicators */}
          <TrustIndicators />
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

      {/* Performance Monitor (Development Only) */}
      <Suspense fallback={null}>
        <PerformanceMonitor componentName="Hero" />
      </Suspense>
    </div>
  );
};

export default Hero; 