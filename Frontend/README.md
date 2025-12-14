# Credit Funding Software - Frontend

A complete Next.js frontend application for a multi-tenant credit analysis and lending platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form (ready for integration)
- **Date Formatting**: date-fns

## Project Structure

```
Credit Software/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── dashboard/            # Main dashboard
│   │   ├── clients/              # Client management
│   │   ├── credit/               # Credit reports
│   │   ├── offers/               # Lending marketplace
│   │   ├── transactions/         # Transaction management
│   │   ├── referrals/            # Credit repair referrals
│   │   ├── events/               # Events management
│   │   ├── training/             # Training content
│   │   └── admin/                # Admin dashboard
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page (redirects to login)
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components (Sidebar, Header)
│   ├── clients/                  # Client components
│   ├── credit/                   # Credit components
│   ├── offers/                   # Offer components
│   ├── transactions/             # Transaction components
│   ├── referrals/               # Referral components
│   ├── events/                   # Event components
│   ├── training/                 # Training components
│   └── admin/                    # Admin components
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── api.ts                    # API client (placeholder)
│   └── auth.ts                   # Auth utilities (placeholder)
└── types/                        # TypeScript type definitions
```

## Features

### Authentication
- Login page with email/password
- Registration page
- JWT token management (placeholder)
- Protected routes

### Dashboard
- Main dashboard with key metrics
- Left sidebar navigation
- Header with user info
- Responsive layout

### Client Management
- Client list with filtering and search
- Create new client form
- Client detail page with tabs:
  - Overview
  - Credit
  - Offers
  - Referrals

### Credit Module
- Soft pull authorization form (SSN, DOB)
- PDF upload with drag-and-drop
- Credit report display
- Credit status card with readiness score
- Readiness checklist with pass/fail indicators
- Credit report details (scores, utilization, accounts, inquiries)

### Offers/Lending Marketplace
- Hotwire-style opaque offers
- Offer cards with amount ranges, APR, terms
- Offer generation
- Offer selection interface
- Funding result recording

### Transactions
- Transaction list with filtering
- Transaction detail view
- Status indicators
- Fee breakdown display

### Referrals
- Referral list
- Create credit repair referral
- Referral status tracking

### Events
- Event list (FREE/PAID)
- Create/edit event form
- Event cards with registration links
- Event type badges

### Training
- Training content list
- Training cards with CTAs
- Premium program promotion
- Basic and premium content distinction

### Admin Dashboard
- Platform statistics
- Total clients, fundable clients
- Total funded amount
- Platform fees and partner shares
- Revenue breakdown
- Client metrics

## Design System

### Colors
- **Primary**: `#8faa76` (green)
- **Success**: High-visibility green (`#22c55e`)
- **Warning**: High-visibility yellow (`#eab308`)
- **Error**: High-visibility red (`#ef4444`)
- **Background**: Light colors (white, gray-50)

### Typography
- Large typography for key metrics
- Clean, readable fonts (Inter)

### Components
- Card-based layouts
- Fixed left sidebar navigation
- High-visibility status indicators
- Form inputs with validation states
- Color-coded buttons and badges

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## API Integration

The frontend uses placeholder API calls in `lib/api.ts`. To integrate with a backend:

1. Update `lib/api.ts` with actual API endpoints
2. Configure `NEXT_PUBLIC_API_URL` in environment variables
3. Update authentication flow in `lib/auth.ts`
4. Replace mock data with real API responses

## Authentication

Currently uses placeholder JWT token management. To implement real authentication:

1. Update `lib/auth.ts` with actual token handling
2. Implement protected route middleware
3. Add token refresh logic
4. Handle authentication errors

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Notes

- All API calls are placeholders returning empty/mock data
- Forms have client-side validation ready
- File uploads have UI but no actual upload logic
- All components are fully functional on the frontend
- Ready for backend integration via API client

## License

Private - All rights reserved

