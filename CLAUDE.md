# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev           # Start development server on localhost:3000
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint with Next.js rules
```

## Project Architecture

This is a Next.js 15 App Router application with TailwindCSS 4, built for BFFLender mortgage lending company.

### Core Technologies
- **Next.js 15.3.2** with App Router
- **React 19** with TypeScript
- **TailwindCSS 4** with OKLCH color system
- **shadcn/ui** components with Radix UI primitives
- **Lucide React** for icons

### Project Structure

```
src/                          # Source directory
├── app/                     # Next.js App Router
│   ├── (marketing)/         # Route group for marketing pages
│   │   ├── about/           # About page route
│   │   ├── benefits/        # Benefits page route
│   │   └── challenge/       # Challenge page route
│   ├── _components/         # Private shared components
│   ├── contact/             # Contact page route
│   ├── layout.tsx           # Root layout with metadata and font
│   └── page.tsx             # Main homepage
├── components/              # Global UI components
│   ├── ui/                  # shadcn/ui primitives
│   ├── layout/              # Layout components (Header, Footer, Logo)
│   └── features/            # Complex reusable components
├── lib/                     # Business logic & configurations
│   ├── utils.ts             # cn() utility for Tailwind classes
│   └── constants.ts         # Application constants
├── types/                   # TypeScript definitions
│   ├── index.ts             # Common types
│   └── components.ts        # Component prop types
├── utils/                   # Pure utility functions
│   ├── formatters.ts        # Data formatting utilities
│   └── helpers.ts           # General helper functions
└── styles/                  # Global styles
    └── globals.css          # TailwindCSS with custom theme
```

### Component Architecture

**App Router Pattern with Route Groups**:
- **Route Groups**: `(marketing)/` organizes related pages without affecting URLs
- **Private Components**: `_components/` folder contains shared app components
- **Feature Colocation**: Page-specific components stay within their route folders
- **Global Components**: Organized by purpose in `src/components/`

**Component Organization**:
- `src/app/_components/` - Private shared components (Hero, PLChallenge, etc.)
- `src/components/ui/` - shadcn/ui primitives (Button, Card, Modal)
- `src/components/layout/` - Layout components (BFFLogo, Header, Footer)
- `src/components/features/` - Complex reusable components
- Route-specific components stay within their route folders

**Import Patterns**:
- Use `@/` path aliases for cleaner imports
- `@/components/ui/button` for UI primitives
- `@/lib/utils` for utilities
- `@/types/` for TypeScript definitions

### Styling System

**TailwindCSS 4** with professional color system:
- OKLCH color format for better perceptual uniformity
- Custom navy, blue, amber, emerald color scales
- Professional typography utilities (`.text-display-*`, `.text-body-*`)
- Custom component classes (`.btn-primary`, `.card-elevated`, `.glass-card`)
- Comprehensive animation system with custom keyframes

**Component Styling Patterns**:
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Custom CSS classes defined in `src/styles/globals.css` under `@layer components`
- Consistent spacing with `.section-padding`, `.container-padding`
- Professional focus states with `.focus-ring`

### Configuration Files

- **next.config.mjs**: Basic config with image domains
- **tailwind.config.ts**: Minimal config (styles in globals.css)
- **components.json**: shadcn/ui configuration with aliases
- **tsconfig.json**: TypeScript config with `@/*` path mapping
- **eslint.config.mjs**: Next.js + TypeScript rules

### TypeScript Setup

- **Path aliases**: `@/*` maps to `src/*` with specific mappings:
  - `@/components/*` → `src/components/*`
  - `@/lib/*` → `src/lib/*`
  - `@/utils/*` → `src/utils/*`
  - `@/types/*` → `src/types/*`
- **Strict TypeScript configuration** with proper React 19 types
- **Type organization**: Common types in `src/types/index.ts`, component types in `src/types/components.ts`
- **ESLint rules** allow unused vars with `_` prefix

### Development Patterns

1. **Page Structure**: Use App Router with route groups for organization
2. **Component Placement**: 
   - Global reusable → `src/components/`
   - App-wide shared → `src/app/_components/`
   - Page-specific → within route folders
3. **Import Strategy**: Use `@/` aliases for all internal imports
4. **Styling**: Combine Tailwind utilities with custom component classes
5. **Type Safety**: Import types from `@/types/` for consistency
6. **Utilities**: Use `@/utils/` for pure functions, `@/lib/` for business logic

### Performance Optimizations

- Next.js App Router for optimal bundling
- Custom animations with `will-change` properties
- Professional scrollbar styling
- Reduced motion support for accessibility
- High contrast mode support

### Design System

The project uses a professional design system with:
- Consistent color scales (navy, blue, amber, emerald)
- Typography hierarchy with display and body text utilities
- Button variants (primary, secondary, outline)
- Card variants (elevated, feature, glass)
- Animation classes for smooth interactions