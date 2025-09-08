'use client';

import React from 'react';

interface BackgroundEffectsProps {
  mousePosition: { x: number; y: number };
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ mousePosition }) => {
  return (
    <>
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
    </>
  );
};

export default BackgroundEffects; 