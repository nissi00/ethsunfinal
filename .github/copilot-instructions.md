# AI Copilot Instructions for ETHSUN Project

## Project Overview
ETHSUN Executive Education is a Next.js educational platform for online certification, corporate training, and franchise management. The codebase separates public-facing pages from a secured admin dashboard for managing submissions, content, and site settings.

## Architecture

### Core Stack
- **Framework**: Next.js 14.2.35 with App Router
- **Database**: Prisma ORM (SQLite)
- **Authentication**: NextAuth.js v4 with JWT strategy
- **UI Components**: Radix UI primitives with custom Tailwind styling
- **Form Handling**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS 4.1 + custom theme colors

### Key Color Scheme
- Primary: `#0A2A43` (dark blue)
- Secondary: `#153D63` (medium blue)
- Accent: `#C9A44A` (gold)
- Text: `#4A4A4A` (dark gray)
- Background: `#F5F6F7` (light gray)

### Directory Structure
- `app/` - Next.js pages and layouts (public pages + admin section)
- `app/api/` - API routes (form submissions, admin endpoints, public data endpoints)
- `components/` - Reusable React components (UI library + admin sidebar)
- `lib/` - Utility functions and configuration (auth, i18n, Prisma client)
- `prisma/` - Database schema and seed script
- `public/` - Static assets

## Authentication & Security

### Authentication Flow
1. **Login endpoint**: `/admin/login` (credential-based with email/password)
2. **Authorization**: NextAuth.js `withAuth` middleware in [middleware.ts](middleware.ts#L1)
3. **JWT strategy**: Tokens include `id`, `email`, and `role` fields
4. **Protected routes**: All `/admin/*` routes require valid JWT token (enforced via middleware)

### Admin User Model
```prisma
model User {
  id, email, password, name, role ("admin"), createdAt, updatedAt
}
```

## Form Submission Management

### Data Models
Three main submission types (Contact, Inscription, Franchise):
```prisma
model {ContactSubmission, InscriptionSubmission, FranchiseSubmission} {
  id, firstName, lastName, email, phone, organization/country/program, status ("new" | "in_progress" | "completed"), createdAt, updatedAt
}
```

### Submission API Patterns
- **POST** `/api/forms/{contact|inscription|franchise}` - Create submission
- **PATCH** `/api/forms/{type}/[id]` - Update status
- **DELETE** `/api/forms/{type}/[id]` - Delete submission

Example: [forms/contact/[id]/route.ts](app/api/forms/contact/[id]/route.ts#L1) uses NextRequest, Prisma client, and NextResponse for standardized error handling.

## Frontend Page Organization

### Public Pages
- `/` - Home with featured content
- `/certifications` - Certification directory
- `/events` - Event listings
- `/corporate-academies` - Enterprise solutions
- `/franchise` - Franchise opportunities
- `/contact` - Contact form
- `/inscription` - Program registration form
- `/about`, `/resources` - Static content pages

### Admin Pages
- `/admin` - Dashboard with submission statistics
- `/admin/submissions/{contact|inscription|franchise}` - Submission lists
- `/admin/content/stats`, `/admin/content/certifications` - Manage public data
- `/admin/theme` - Theme color editor
- `/admin/settings` - General settings
- `/admin/login` - Authentication

## Key Conventions

### Database Access
- Use Prisma client from `lib/prisma.ts`
- All data mutations in API routes use `try/catch` with `NextResponse` error handling
- Queries should use `Promise.all()` for parallel operations (see [admin/page.tsx](app/admin/page.tsx#L1))

### Form Handling Pattern
1. Create Zod schema for validation
2. Use React Hook Form with `@hookform/resolvers`
3. POST to `/api/forms/{type}` endpoint
4. Handle responses with `sonner` toast notifications

### UI Components
- Use Radix UI primitives from `components/ui/`
- Apply `cn()` utility (from `lib/utils.ts`) for conditional Tailwind merging
- Color values use CSS variables set in Tailwind config
- Reusable components live in `components/` (not page-specific)

### Internationalization
- Translations defined in [lib/i18n.ts](lib/i18n.ts#L1) with `en`, `fr`, `es` locales
- Default locale is `fr` (see [app/layout.tsx](app/layout.tsx#L33))
- Language switcher component handles client-side locale switching
- Use `useSiteSettings()` hook for dynamic content (colors, contact info)

### Server vs Client Components
- API routes and admin pages use server-side functions (e.g., `getServerSession`)
- Forms and interactive components use `"use client"`
- Fetch Prisma data in Server Components, pass to Client Components via props

## Development Commands

```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npx prisma migrate dev  # Run database migrations
npx prisma db seed     # Seed database from prisma/seed.ts
```

## Common Tasks

### Adding a New Admin Page
1. Create route in `app/admin/{feature}/page.tsx`
2. Add navigation entry in [components/admin/sidebar.tsx](components/admin/sidebar.tsx#L26) navigation array
3. Use `getServerSession` for auth check; redirect if unauthorized

### Creating API Endpoints
1. Define Prisma model in [prisma/schema.prisma](prisma/schema.prisma#L1)
2. Create route handler in `app/api/{endpoint}/route.ts`
3. Export HTTP method functions (GET, POST, PATCH, DELETE)
4. Wrap in try/catch, return `NextResponse.json()` with appropriate status codes

### Updating Translations
1. Add text keys to `lib/i18n.ts` translations object
2. Import `Locale` type for type safety
3. Export translations object for use in pages

### Managing Theme Colors
- Update defaults in [components/site-settings-provider.tsx](components/site-settings-provider.tsx#L15)
- Fetch via `/api/site/settings` (cached with `cache: "no-store"`)
- Admin theme editor saves changes to database via API
