# TickR Content Hub 2.0

## Project Overview
TickR Content Hub 2.0 is a unified content management, employee advocacy, and partner management platform built for **mFilterIt**. It consolidates smart content library, employee advocacy, DRA/AP partner management, compliance gating, and analytics into a single branded SaaS dashboard.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix primitives)
- **Icons**: Lucide React
- **State Management**: React Context + Zustand (for complex state)
- **Charts**: Recharts
- **Fonts**: Poppins (headings) + Open Sans (body) — via Google Fonts / next/font

## Brand Identity (mFilterIt Guidelines)

### Colors
```
Primary:        #530093  (Medium Purple)
Secondary:      #A21094  (Reddish Magenta)
Accent Yellow:  #FFCC29  (Orange-Yellow)
Dark:           #201E1E  (Solid Black)
```

### Supporting Purple Palette (for gradients, tints, hover states)
```
Row 1: #4D0C83, #430FA5, #4400D1, #4400DC, #7649E5, #8F5FEA, #B592F1
Row 2: #4A00B6, #570EB8, #5700DF, #733DE5, #9260EB, #B281F1, #CEA2F7
Row 3: #5E10B6, #6513B2, #6E00D8, #7B00EB, #B163F3, #C67CF7, #D89BF9
Row 4: #751597, #8314BE, #9709D7, #B200F3, #CC5EF8, #D16DF9, #D67CF9
Row 5: #881699, #AB17C1, #C60FDA, #ED00FD, #EA2FFD, #E863FD, #F19CFD
```

### Typography
- **Primary Font**: Poppins — headings, titles, prominent text
- **Secondary Font**: Open Sans — body text, smaller elements

### Logo
- Full colour, negative (dark bg), and minimal (icon-only) variants
- Maintain clear space around logo in all uses

## Architecture Decisions
- **Monorepo**: Single Next.js app with route-based module separation
- **Route Structure**: `/dashboard`, `/library`, `/advocacy`, `/partners`, `/compliance`, `/analytics`
- **API Layer**: Next.js API routes (future: external microservices)
- **Auth**: NextAuth.js with role-based access (Admin, Manager, Employee, Partner)
- **Database**: PostgreSQL via Prisma ORM (future)
- **File Storage**: S3-compatible (future)

## Module Structure (5 Modules from Blueprint)

### Module A: Smart Content Library (`/library`)
Central DAM for uploading, organizing, searching, and managing brand creatives.

### Module B: Employee Advocacy Portal (`/advocacy`)
Social sharing platform for employees with gamification, leaderboards, and EEMV tracking.

### Module C: DRA/AP Management Engine (`/partners`)
Partner portal for referral code management, code-embedded creative generation, and performance tracking.

### Module D: Compliance Integration Layer (`/compliance`)
Upload-validate-route pipeline with pre-share compliance gates and audit trails.

### Module E: Analytics & Intelligence (`/analytics`)
Unified dashboards for content performance, advocacy metrics, partner analytics, and compliance health.

## MVP Scope (P0 Features Only)
The initial build focuses on **P0 (Must-Have)** features only. These are:

### Module A (P0): A1, A2, A3, A4, A5
- AI Auto-Tagging, Multi-Dimensional Search, Collections, Asset Expiry, Brand Hierarchy

### Module B (P0): B1, B2, B3, B5, B7, B8, B13, B15, B16, B20
- OAuth Social Linking, 1-Click Sharing, AI Captions, Scheduling, Gamification, Leaderboard, Activity Dashboard, Admin Approval, EEMV, Mobile Support

### Module C (P0): C1, C2, C3, C4, C5, C6, C7, C8, C12
- Partner Portal, Code Gen, Assignment Matrix, Creative Auto-Gen, QR Codes, Partner Dashboard, Admin Analytics, Real-Time Tracking, Compliance Monitoring

### Module D (P0): D1, D2, D3, D4, D7, D8
- Upload & Validate, Pre-Share Gate, Caption Scanning, Code Integrity, Approval Queue, Audit Trail

### Module E (P0): E1, E2, E3, E4
- Content Dashboard, Advocacy Dashboard, Partner Dashboard, Compliance Dashboard

## What NOT to Build (Out of Scope)
- **No backend API implementation** in initial phase — UI screens with mock data only
- **No actual AI/ML models** — mock AI auto-tagging, caption generation, visual search
- **No real OAuth integrations** — mock social account linking UI
- **No real file storage / CDN** — placeholder uploads
- **No real database** — static/mock data with TypeScript interfaces
- **No mobile native app** — responsive web only (B20 = responsive, not native)
- **No actual payment / rewards system** (B11, C13)
- **No CRM webhook integrations** (C15)
- **No external API endpoints** (C16)
- **P1 features**: Deferred to Phase 2 (Version Control, Calendar View, Bulk Ops, Badges, Optimal Time, etc.)
- **P2 features**: Deferred to Phase 3-4 (Template Editor, Visual Search, CDN Embed, Executive Module, etc.)
- **No Slack/Teams integrations** (B19)
- **No offline/branch tracking** (C18)

## What TO Build (In Scope for This Phase)
1. **Full UI screens** for all 5 modules with P0 feature layouts
2. **Dashboard home page** with summary cards across all modules
3. **Responsive sidebar navigation** with module routing
4. **Brand-compliant design system** following mFilterIt guidelines
5. **Mock data layer** with realistic sample data
6. **Interactive UI components** — search, filters, tables, charts, modals
7. **Role-based UI shells** (Admin vs Employee vs Partner views)

## Coding Standards
- Use `"use client"` only when component needs interactivity
- Prefer Server Components by default
- File naming: `kebab-case` for files, `PascalCase` for components
- Colocate components with their routes in `app/` directory
- Extract shared components to `components/ui/` (shadcn) or `components/shared/`
- Type all props and data models in `types/` directory
- Use CSS variables for brand colors in `globals.css`
- Mobile-first responsive design (min-width breakpoints)

## File Structure
```
content_hub/
├── app/
│   ├── layout.tsx              # Root layout with sidebar + fonts
│   ├── page.tsx                # Dashboard home
│   ├── globals.css             # Brand CSS variables + Tailwind
│   ├── dashboard/
│   ├── library/                # Module A
│   ├── advocacy/               # Module B
│   ├── partners/               # Module C
│   ├── compliance/             # Module D
│   └── analytics/              # Module E
├── components/
│   ├── ui/                     # shadcn components
│   ├── shared/                 # Cross-module components
│   ├── layout/                 # Sidebar, Header, Navigation
│   └── charts/                 # Chart components
├── lib/
│   ├── mock-data/              # Mock data files per module
│   └── utils.ts                # Utility functions
├── types/                      # TypeScript interfaces
├── public/
│   └── images/                 # Logo assets, placeholders
├── CLAUDE.md                   # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Key UI Patterns
- **Sidebar**: Collapsible, dark purple (#530093) background, white text, active state with accent
- **Cards**: White background, subtle shadow, rounded-lg, purple accent borders
- **Tables**: Striped rows, sortable headers, pagination
- **Charts**: Purple gradient palette matching brand colors
- **Buttons**: Primary = purple gradient (#530093 → #A21094), Secondary = outline
- **Status badges**: Green (active/compliant), Yellow (pending/warning), Red (expired/violation)
- **Search**: Full-width search bar with faceted filter chips

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Lint check
```
