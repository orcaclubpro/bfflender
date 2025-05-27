import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* BFFLender Logo SVG adapted for favicon */}
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 32 32"
          style={{ color: '#059669' }}
        >
          {/* Base Foundation */}
          <rect x="4" y="24" width="24" height="4" rx="1.5" fill="#059669" opacity="0.9"/>
          
          {/* Growth Pillars */}
          <rect x="6" y="18" width="4" height="10" rx="1" fill="#059669" opacity="0.7"/>
          <rect x="12" y="14" width="4" height="14" rx="1" fill="#059669" opacity="0.8"/>
          <rect x="18" y="10" width="4" height="18" rx="1" fill="#059669" opacity="0.85"/>
          <rect x="24" y="6" width="4" height="22" rx="1" fill="#059669"/>
          
          {/* Connection Arc */}
          <path 
            d="M8 16 Q16 3 24 8" 
            stroke="#f59e0b" 
            strokeWidth="1.25" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.95"
          />
          
          {/* Premium Accent */}
          <circle cx="25" cy="8" r="1.5" fill="#f59e0b" opacity="0.9"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
} 