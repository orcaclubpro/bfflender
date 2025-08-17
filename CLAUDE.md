# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development (using Bun as package manager)
bun run dev           # Start development server on localhost:3000
bun run build         # Build for production
bun run start         # Start production server
bun run lint          # Run ESLint with Next.js rules

# Payload CMS Commands
bun payload migrate:create    # Create database migration
bun payload migrate          # Run database migrations
bun payload generate:types   # Generate TypeScript types from schema
```

## Project Architecture

This is a Next.js 15 App Router application with Payload CMS integration, TailwindCSS 4, built for BFFLender mortgage lending company.

### Core Technologies
- **Next.js 15.3.2** with App Router
- **Payload CMS 3.52.0** with MongoDB
- **React 19** with TypeScript
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
│   ├── (payload)/           # Route group for Payload CMS
│   │   ├── admin/           # CMS admin interface
│   │   │   └── [[...segments]]/
│   │   │       ├── page.tsx # Admin dashboard
│   │   │       └── not-found.tsx
│   │   ├── api/             # CMS API routes
│   │   │   └── [...slug]/   
│   │   │       └── route.ts # REST API endpoints
│   │   └── layout.tsx       # Payload-specific layout
│   ├── _components/         # Private shared components
│   └── layout.tsx           # Root layout with metadata and font
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
payload.config.ts            # Payload CMS configuration
payload-types.ts             # Auto-generated Payload types
.env.local                   # Environment variables
```

### Component Architecture

**App Router Pattern with Route Groups**:
- **Route Groups**: `(frontend)/` organizes marketing pages without affecting URLs
- **CMS Route Group**: `(payload)/` contains all Payload CMS routes (admin, API)
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
- `@payload-config` for Payload configuration

### Payload CMS Integration

**CMS Collections**:
- `users` - Authentication and user management
- `pages` - Dynamic page content with rich text
- `media` - File uploads and media management

**CMS Routes**:
- `/admin` - Payload admin interface (when fully configured)
- `/api/*` - REST API endpoints for content management
- GraphQL endpoint can be added at `/graphql` if needed

**Database**:
- **MongoDB** with Mongoose adapter
- Connection configured via `DATABASE_URI` environment variable
- Auto-generated TypeScript types in `payload-types.ts`

**Environment Variables**:
```bash
DATABASE_URI=mongodb://localhost:27017/bfflender
PAYLOAD_SECRET=your-secret-here
PREVIEW_SECRET=your-preview-secret-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

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

- **next.config.mjs**: Wrapped with `withPayload()` for CMS integration
- **payload.config.ts**: Payload CMS configuration with collections and database
- **tailwind.config.ts**: Minimal config (styles in globals.css)
- **components.json**: shadcn/ui configuration with aliases
- **tsconfig.json**: TypeScript config with `@/*` and `@payload-config` path mapping
- **eslint.config.mjs**: Next.js + TypeScript rules
- **.env.local**: Environment variables for database and secrets

### TypeScript Setup

- **Path aliases**: `@/*` maps to `src/*` with specific mappings:
  - `@/components/*` → `src/components/*`
  - `@/lib/*` → `src/lib/*`
  - `@/utils/*` → `src/utils/*`
  - `@/types/*` → `src/types/*`
  - `@payload-config` → `./payload.config.ts`
- **Auto-generated types**: `payload-types.ts` contains CMS collection types
- **Strict TypeScript configuration** with proper React 19 types
- **Type organization**: Common types in `src/types/index.ts`, component types in `src/types/components.ts`
- **ESLint rules** allow unused vars with `_` prefix

### Development Patterns

1. **Page Structure**: Use App Router with route groups for organization
   - Frontend routes in `(frontend)/`
   - CMS routes in `(payload)/`
2. **Component Placement**: 
   - Global reusable → `src/components/`
   - App-wide shared → `src/app/_components/`
   - Page-specific → within route folders
3. **Import Strategy**: Use `@/` aliases for all internal imports
4. **Styling**: Combine Tailwind utilities with custom component classes
5. **Type Safety**: Import types from `@/types/` for consistency
6. **Utilities**: Use `@/utils/` for pure functions, `@/lib/` for business logic
7. **CMS Development**: 
   - Use Payload Local API for server-side data operations
   - Generate types after schema changes with `bun payload generate:types`
   - Run migrations for database schema updates

### Package Management with Bun

- **Installation**: `bun add <package>` for dependencies
- **Development**: `bun run dev` for development server
- **Build**: `bun run build` for production builds
- **Scripts**: All npm scripts work with `bun run <script>`
- **Performance**: Significantly faster than npm/yarn for installs and builds

### CMS Development Workflow

1. **Schema Changes**: Modify `payload.config.ts` collections
2. **Generate Types**: Run `bun payload generate:types`
3. **Database Migrations**: Use `bun payload migrate:create` and `bun payload migrate`
4. **Local API Usage**: Import and use Payload Local API in server components
5. **Admin Interface**: Access at `/admin` (requires MongoDB connection)

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

## Current Setup Status

### ✅ Completed Integration
- **Payload CMS packages** installed and configured
- **Route groups** implemented: `(frontend)` and `(payload)`
- **Next.js configuration** wrapped with `withPayload()`
- **TypeScript configuration** updated with path aliases
- **Basic CMS routes** created (admin interface placeholder)
- **Environment variables** template created
- **Build process** working correctly
- **Development server** running successfully

### 🔄 Next Steps for Full CMS Functionality

1. **Database Setup**:
   ```bash
   # Update .env.local with your MongoDB connection string
   DATABASE_URI=mongodb://localhost:27017/bfflender
   # Or use a cloud MongoDB instance like MongoDB Atlas
   ```

2. **Initialize Database**:
   ```bash
   bun payload migrate:create
   bun payload migrate
   ```

3. **Generate Types**:
   ```bash
   bun payload generate:types
   ```

4. **Create Admin User**:
   - The admin interface will be fully functional once database is connected
   - First user can be created through the admin interface at `/admin`

5. **Enhance CMS Routes** (optional):
   - Replace simplified admin routes with full Payload UI components
   - Add GraphQL endpoint if needed
   - Configure additional collections as needed

### 🎯 Current Access Points

- **Frontend**: All existing routes work normally (`/`, `/about`, `/benefits`, etc.)
- **Admin Interface**: `/admin` (placeholder ready for database connection)
- **API Endpoints**: `/api/*` (basic setup, will be fully functional with database)
- **Development Server**: `bun run dev` on `http://localhost:3000`

### 📋 Important Notes

- **Frontend routes** are completely isolated in `(frontend)/` route group
- **CMS routes** are isolated in `(payload)/` route group  
- **No breaking changes** to existing frontend functionality
- **Database connection required** for full CMS functionality
- **MongoDB** is the configured database adapter
- **Bun** is the package manager - always use `bun` commands, not `npm`