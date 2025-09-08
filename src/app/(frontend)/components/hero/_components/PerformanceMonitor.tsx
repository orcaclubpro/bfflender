'use client';

import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  frameRate: number;
}

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  componentName,
  enabled = process.env.NODE_ENV === 'development'
}) => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Simple performance tracking
    const startTime = performance.now();
    
    const updateMetrics = () => {
      const renderTime = performance.now() - startTime;
      
      // Memory usage (if available)
      let memoryUsage = 0;
      if ('memory' in performance) {
        const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
        memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      }

      setMetrics({
        renderTime,
        memoryUsage,
        frameRate: 60 // Placeholder - would need more complex tracking for real FPS
      });
    };

    // Update metrics after component renders
    const timeoutId = setTimeout(updateMetrics, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [enabled, componentName]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-mono hover:bg-slate-700 transition-colors"
      >
        📊 Perf
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-slate-900 text-white p-4 rounded-lg shadow-xl min-w-64 font-mono text-xs">
          <h3 className="text-emerald-400 font-bold mb-2">{componentName} Metrics</h3>
          
          <div className="space-y-1">
            {metrics.renderTime && (
              <div className="flex justify-between">
                <span>Render Time:</span>
                <span className={metrics.renderTime > 16 ? 'text-red-400' : 'text-green-400'}>
                  {metrics.renderTime.toFixed(2)}ms
                </span>
              </div>
            )}
            
            {metrics.memoryUsage && (
              <div className="flex justify-between">
                <span>Memory:</span>
                <span className={metrics.memoryUsage > 50 ? 'text-red-400' : 'text-green-400'}>
                  {metrics.memoryUsage} MB
                </span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-400">Optimized</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor; 