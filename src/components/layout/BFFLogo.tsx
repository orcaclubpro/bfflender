import React from 'react';

interface BFFLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

export default function BFFLogo({ 
  size = 'md', 
  variant = 'dark', 
  showText = true,
  className = '' 
}: BFFLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  const logoColor = variant === 'light' ? 'text-white' : 'text-emerald-600';
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const subtextColor = variant === 'light' ? 'text-emerald-200' : 'text-emerald-600';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* BFFLender Logo SVG */}
      <div className="relative flex-shrink-0">
        <svg 
          width="64" 
          height="64" 
          viewBox="0 0 64 64" 
          className={`${sizeClasses[size]} ${logoColor}`}
        >
          {/* Base Foundation - Solid foundation representing trust and stability */}
          <rect x="8" y="48" width="48" height="8" rx="3" fill="currentColor" opacity="0.9"/>
          
          {/* Growth Pillars - Five ascending bars representing 30+ year progression */}
          <rect x="12" y="36" width="8" height="20" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="24" y="28" width="8" height="28" rx="2" fill="currentColor" opacity="0.8"/>
          <rect x="36" y="20" width="8" height="36" rx="2" fill="currentColor" opacity="0.85"/>
          <rect x="48" y="12" width="8" height="44" rx="2" fill="currentColor"/>
          
          {/* Connection Arc - Golden curved line symbolizing lifetime relationships */}
          <path 
            d="M16 32 Q32 6 48 16" 
            stroke="#f59e0b" 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.95"
          />
          
          {/* Premium Accent - Amber dot symbolizing excellence and premium service */}
          <circle cx="50" cy="16" r="3" fill="#f59e0b" opacity="0.9"/>
        </svg>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-black tracking-tight ${textColor} leading-none`}>
            BFFLender
          </h1>
          <p className={`text-xs font-bold tracking-[0.2em] uppercase ${subtextColor} leading-none mt-1`}>
            Your Best Foot Forward
          </p>
        </div>
      )}
    </div>
  );
} 