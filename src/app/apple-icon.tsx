import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '22px',
        }}
      >
        {/* BFFLender Logo SVG scaled for Apple icon */}
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 64 64"
          style={{ color: '#059669' }}
        >
          {/* Base Foundation */}
          <rect x="8" y="48" width="48" height="8" rx="3" fill="#059669" opacity="0.9"/>
          
          {/* Growth Pillars */}
          <rect x="12" y="36" width="8" height="20" rx="2" fill="#059669" opacity="0.7"/>
          <rect x="24" y="28" width="8" height="28" rx="2" fill="#059669" opacity="0.8"/>
          <rect x="36" y="20" width="8" height="36" rx="2" fill="#059669" opacity="0.85"/>
          <rect x="48" y="12" width="8" height="44" rx="2" fill="#059669"/>
          
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
    ),
    {
      ...size,
    }
  )
} 