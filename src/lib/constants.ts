// Application constants

export const APP_CONFIG = {
  name: 'BFFLender',
  tagline: 'Your BFF in Home Financing',
  description: 'Mortgage lending solutions with transparency and relationship focus',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const CONTACT_INFO = {
  phone: '',
  email: '',
  address: '',
} as const;

export const SOCIAL_LINKS = {
  facebook: '',
  twitter: '',
  linkedin: '',
  instagram: '',
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BENEFITS: '/benefits',
  CHALLENGE: '/challenge',
  CONTACT: '/contact',
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;