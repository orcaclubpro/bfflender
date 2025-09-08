# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Code Organization & Maintainability Principles

**CRITICAL**: Always prioritize code organization, maintainability, and following established patterns. This codebase follows strict architectural principles that must be maintained.

### Core Organizational Rules
1. **File Placement**: Always place new components in the correct location based on their purpose:
   - **Route-specific components**: Place within the route folder (e.g., `/app/(frontend)/about/components/`)
   - **Shared app components**: Place in `/app/_components/` (e.g., Hero, PLChallenge)
   - **Reusable UI components**: Place in `/components/ui/` (shadcn/ui primitives)
   - **Layout components**: Place in `/components/layout/` (Header, Footer, Navigation)
   - **Feature components**: Place in `/components/features/` for complex reusable logic

2. **Component Naming**: Use PascalCase for components and match the filename to the component name
3. **Import Organization**: Always use `@/` path aliases for internal imports
4. **Type Safety**: Import types from `@/types/` and define component-specific prop types

### Configuration File Standards
1. **TypeScript Configuration**: Use strict mode and proper path mappings as defined in `tsconfig.json`
2. **ESLint Rules**: Follow Next.js + TypeScript rules with custom overrides for unused vars with `_` prefix
3. **Environment Variables**: Store in `.env.local` and never commit sensitive data
4. **Package Management**: Use Bun for all installations and script execution

### Anti-Patterns to Avoid
1. **Avoid Deep Nesting**: Don't create folder structures more than 4-5 levels deep
2. **Avoid Monolithic Components**: Break complex components into smaller, focused pieces
3. **Avoid Inline Styles**: Use TailwindCSS classes and custom CSS classes from `globals.css`
4. **Avoid Direct File Creation**: Always consider if you can extend/modify existing files instead
5. **Avoid Generic Names**: Use descriptive, purpose-specific names for components and functions
6. **Avoid Nested src/ Directories**: Never create `src/src/` - keep a flat, single `src/` structure
7. **Avoid Module CSS in Components**: Use TailwindCSS classes instead of `.module.css` files when possible

### Code Quality Standards
1. **Component Structure**: Each component should have a single responsibility
2. **Props Interface**: Always define TypeScript interfaces for component props
3. **Error Handling**: Implement proper error boundaries and loading states
4. **Performance**: Use React.memo, useMemo, and useCallback when appropriate
5. **Accessibility**: Follow WCAG guidelines and semantic HTML patterns

### SEO & Performance Optimization Standards

**CRITICAL**: This codebase prioritizes SEO performance and Core Web Vitals. Always consider SEO impact when making changes.

#### Server Component Strategy
1. **Default to Server Components**: Use React Server Components by default for better performance and SEO
2. **Client Components Only When Needed**: Only use `'use client'` for components requiring interactivity
3. **Minimize Client-Side JavaScript**: Reduce bundle size by keeping business logic on the server
4. **Streaming & Suspense**: Implement proper loading states with Suspense boundaries

#### SSR & Rendering Optimization
1. **Choose Appropriate Rendering**: 
   - **SSG**: Static pages (marketing, about, benefits) - pre-built at build time
   - **SSR**: Dynamic content (user dashboards, personalized content) - rendered per request
   - **ISR**: Content that updates periodically (blog posts, property listings)
2. **Metadata Management**: Always include proper meta tags, Open Graph, and JSON-LD structured data
3. **Core Web Vitals**: Monitor and optimize for LCP, FID, and CLS metrics
4. **Image Optimization**: Always use Next.js Image component with proper alt text and responsive sizing

#### SEO Best Practices
1. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
2. **URL Structure**: Keep URLs clean, descriptive, and RESTful
3. **Internal Linking**: Create logical navigation and content relationships
4. **Schema Markup**: Implement structured data for mortgage/finance industry
5. **Mobile Optimization**: Ensure responsive design and mobile-first approach
6. **Page Speed**: Target < 2.5s LCP and minimize JavaScript execution time

## Development Commands

```bash
# Development (using Bun as package manager)
bun run dev           # Start development server on localhost:3000
bun run build         # Build for production
bun run start         # Start production server
bun run lint          # Run ESLint with Next.js rules
```

## Project Architecture

This is a Next.js 15 App Router application with TailwindCSS 4 and Payload CMS integration, built for BFFLender mortgage lending company.

### Core Technologies
- **Next.js 15.3.2** with App Router
- **React 19** with TypeScript
- **Payload CMS 3.53.0** for content management with MongoDB
- **TailwindCSS 4** with OKLCH color system
- **shadcn/ui** components with Radix UI primitives
- **Lucide React** for icons
- **Bun** as package manager and runtime

### Project Structure

```
src/                          # Source directory
├── app/                     # Next.js App Router
│   ├── (frontend)/          # Route group for marketing website
│   │   ├── about/           # About page route
│   │   ├── benefits/        # Benefits page route
│   │   ├── challenge/       # Challenge page route
│   │   ├── contact/         # Contact page route
│   │   ├── layout.tsx       # Frontend-specific layout
│   │   └── page.tsx         # Main homepage
│   ├── (payload)/           # Route group for Payload CMS admin
│   │   ├── admin/           # Payload admin interface
│   │   └── api/             # Payload API routes
│   ├── _components/         # Private shared components
│   └── layout.tsx           # Root layout with metadata and font
├── collections/             # Payload CMS collections
│   ├── Media.ts             # Media collection schema
│   └── Users.ts             # Users collection schema
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
├── styles/                  # Global styles
│   └── globals.css          # TailwindCSS with custom theme
├── payload.config.ts        # Payload CMS configuration
└── payload-types.ts         # Generated Payload types
.env.local                   # Environment variables
```

### Component Architecture

**App Router Pattern with Route Groups**:
- **Route Groups**: `(frontend)/` organizes marketing pages without affecting URLs
- **Private Components**: `_components/` folder contains shared app components
- **Feature Colocation**: Page-specific components stay within their route folders
- **Global Components**: Organized by purpose in `src/components/`

**Component Organization**:
- `src/app/_components/` - Private shared components (Hero, PLChallenge, etc.)
- `src/components/ui/` - shadcn/ui primitives (Button, Card, Modal)
- `src/components/layout/` - Layout components (BFFLogo, Header, Footer)
- `src/components/features/` - Complex reusable components
- Route-specific components stay within their route folders (e.g., `/about/components/`)

**Payload CMS Integration**:
- `src/collections/` - Payload collection schemas and configurations
- `src/payload.config.ts` - Main Payload configuration file
- `src/payload-types.ts` - Auto-generated TypeScript types from collections
- `src/app/(payload)/` - Route group containing admin interface and API routes

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

- **next.config.mjs**: Next.js configuration
- **tailwind.config.ts**: Minimal config (styles in globals.css)
- **components.json**: shadcn/ui configuration with aliases
- **tsconfig.json**: TypeScript config with `@/*` path mapping
- **eslint.config.mjs**: Next.js + TypeScript rules
- **.env.local**: Environment variables

### TypeScript Setup

- **Path aliases**: `@/*` maps to `src/*` with specific mappings:
  - `@/components/*` → `src/components/*`
  - `@/lib/*` → `src/lib/*`
  - `@/utils/*` → `src/utils/*`
  - `@/types/*` → `src/types/*`
- **Type organization**: Common types in `src/types/index.ts`, component types in `src/types/components.ts`
- **ESLint rules** allow unused vars with `_` prefix

### Development Patterns

1. **Page Structure**: Use App Router with route groups for organization
   - Frontend routes in `(frontend)/`
2. **Component Placement**: 
   - Global reusable → `src/components/`
   - App-wide shared → `src/app/_components/`
   - Page-specific → within route folders
3. **Import Strategy**: Use `@/` aliases for all internal imports
4. **Styling**: Combine Tailwind utilities with custom component classes
5. **Type Safety**: Import types from `@/types/` for consistency
6. **Utilities**: Use `@/utils/` for pure functions, `@/lib/` for business logic

### Package Management with Bun

- **Installation**: `bun add <package>` for dependencies
- **Development**: `bun run dev` for development server
- **Build**: `bun run build` for production builds
- **Scripts**: All npm scripts work with `bun run <script>`
- **Performance**: Significantly faster than npm/yarn for installs and builds

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

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.