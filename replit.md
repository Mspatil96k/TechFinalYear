# TechFinalYear - Engineering Project Marketplace

## Overview

TechFinalYear is a full-stack web application that serves as a marketplace for engineering and diploma final year projects. The platform connects students with ready-made and custom project solutions, providing complete documentation, code, presentations, and support. The application follows a modern educational platform design approach inspired by services like Coursera and Udemy, combined with marketplace patterns from Fiverr and Upwork.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation

**Design System:**
- Custom color scheme using CSS variables for theming
- Typography system using Inter/DM Sans and Space Grotesk fonts
- Standardized spacing primitives (3, 4, 6, 8, 12, 16, 20 Tailwind units)
- Consistent elevation and shadow patterns through custom CSS classes (hover-elevate, active-elevate)
- Component-based architecture with reusable UI components

**Key Pages:**
- Home: Hero section, features grid, categories showcase, testimonials, stats, and inquiry form
- Project Categories: Filterable project listing with sidebar filters
- Project Detail: Individual project information with related projects
- Custom Request: Form for requesting custom project development
- About Us: Company information and mission
- Contact: Contact form and FAQ section

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon serverless)
- **Validation**: Zod schemas shared between client and server

**Storage Pattern:**
- Abstraction layer (IStorage interface) allows for multiple storage implementations
- MemStorage class provides in-memory storage for development/testing
- Database schema defines persistent storage structure

**API Design:**
- RESTful API endpoints under `/api` prefix
- Consistent error handling and response formatting
- Request/response logging middleware
- CRUD operations for: projects, categories, custom requests, inquiries, testimonials

**Data Models:**
- Projects: Core offerings with title, description, category, branch, features, technologies, price, deliverables
- Categories: Project categorization with slugs, descriptions, icons, and project counts
- Custom Requests: Student submissions for custom project development with detailed requirements
- Inquiries: Quick contact form submissions
- Testimonials: Student reviews with ratings and project categories

### Build and Development

**Build System:**
- Vite for frontend bundling and development server
- esbuild for backend compilation
- Hot Module Replacement (HMR) in development
- Separate build outputs for client (dist/public) and server (dist)

**Development Tools:**
- Replit-specific plugins for error overlay and development banner
- TypeScript strict mode for type safety
- Path aliases for clean imports (@/, @shared/, @assets/)

### External Dependencies

**UI Component Library:**
- Radix UI primitives for accessible, unstyled components (30+ component primitives)
- shadcn/ui configuration for styled component variants
- Lucide React for iconography

**Database:**
- Neon serverless PostgreSQL via @neondatabase/serverless
- Drizzle ORM for type-safe database operations
- Connection pooling through Neon's serverless driver

**Form Management:**
- React Hook Form for performant form handling
- @hookform/resolvers for Zod schema integration
- drizzle-zod for generating Zod schemas from database schema

**Utilities:**
- clsx and tailwind-merge (via cn utility) for conditional className composition
- date-fns for date formatting and manipulation
- class-variance-authority for component variant management

**Development Dependencies:**
- tsx for TypeScript execution in development
- Vite plugins for Replit integration
- PostCSS with Tailwind CSS and Autoprefixer