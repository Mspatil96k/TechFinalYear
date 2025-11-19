# TechFinalYear Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from educational platforms (Coursera, Udemy) and service marketplaces (Fiverr, Upwork) to create a trustworthy, professional engineering project marketplace. Focus on clarity, student trust-building, and seamless project discovery.

## Typography System
- **Primary Font**: Inter or DM Sans (Google Fonts) - clean, modern, highly readable
- **Accent Font**: Space Grotesk for headings - technical, contemporary feel
- **Hierarchy**: 
  - Hero Headlines: 3xl to 5xl, bold weight
  - Section Titles: 2xl to 3xl, semibold
  - Project Titles: xl to 2xl, semibold
  - Body Text: base to lg, regular weight
  - UI Labels: sm to base, medium weight
  - Micro-copy/captions: sm, regular weight

## Layout System
**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16 and 20
- Component padding: p-4, p-6, p-8
- Section spacing: py-12 (mobile), py-16, py-20 (desktop)
- Card gaps: gap-6, gap-8
- Container max-width: max-w-7xl for full sections, max-w-4xl for content

## Page-Specific Layouts

### Homepage
**Hero Section** (80vh): Large background image showing engineering students working on projects, slightly darkened overlay. Center-aligned headline with tagline, three prominent CTA buttons (Browse Projects, Order Custom Project, WhatsApp Support) with blurred backgrounds.

**Trust Indicators Bar**: Immediately below hero - single row displaying key metrics (500+ Projects Delivered, 24/7 Support, 100% Success Rate, Money-Back Guarantee) with icons

**Features Grid**: 2x2 grid (4 features) with icons, bold titles, descriptions. Features: 100% Project Support, Ready-Made Projects, Custom Development, Complete Documentation

**Categories Section**: 3-column grid (desktop) showcasing 7 categories with representative icons and project count. Each card clickable with hover elevation

**How It Works**: 4-step horizontal timeline with icons showing: Browse/Choose → Order/Customize → Receive Materials → Get Support

**Testimonials**: 3-column carousel with student photos, quotes, college names, and star ratings. Include project category badges

**Stats Section**: Full-width with 4 metrics in single row - Projects Completed, Happy Students, Categories, Years Experience

**Final CTA Section**: Split layout - left side has compelling copy about custom projects, right side has quick inquiry form (Name, Branch, WhatsApp, Brief Requirement)

### Project Categories Page
**Page Header**: Breadcrumb navigation, page title, filter sidebar toggle

**Layout**: Left sidebar (25% width) with category filters, branch filters, price range, technology filters. Main content (75%) displays grid of project cards

**Project Cards**: 2-column grid, each card shows: thumbnail image, project title, branch badge, technology tags (max 3 visible), price, quick view button, "Order Now" CTA

**Category Headers**: Each category has collapsible section with category icon, description, project count

### Single Project Page
**Hero Section**: Project title (large), branch badge, price tag, dual CTAs (Order Now, Download Sample)

**Two-Column Layout**: 
- Left (65%): Detailed description, features list with checkmarks, technologies used with tech stack icons, project scope, learning outcomes
- Right (35%): Sticky order card with price breakdown, what's included checklist (Code, Documentation, PPT, Video Demo, Guidance), urgency indicator (X students ordered this month), Order Now button, WhatsApp inquiry button

**Deliverables Section**: Icon grid showing each deliverable with description

**Related Projects**: 4-column carousel at bottom

### Custom Project Request Page
**Hero**: Centered headline "Get Your Custom Project Built", subheading about personalized solutions

**Form Layout**: Single-column centered form (max-w-2xl) with clear labels, helper text. Fields: Name, Email, WhatsApp, Branch (dropdown), Project Title, Detailed Requirements (textarea), Technologies (multi-select tags), Deadline (date picker), Budget Range (slider), Additional Notes

**Side Elements**: Right column showing "What Happens Next" timeline, average response time, past custom project examples

### About Us Page
**Story Section**: Split layout - left has founder/team image, right has compelling narrative

**Experience Metrics**: 4-column stats display

**Process Visualization**: Vertical timeline showing support process from inquiry to delivery

**Trust Builders**: Certifications, partnerships, student testimonials grid

### Contact Page
**Three-Column Layout**: 
- WhatsApp (with QR code)
- Email/Phone with business hours
- FAQ accordion (5-7 common questions)

**Contact Form**: Below main section, simple 4-field form

## Component Library

**Navigation**: Horizontal nav with logo left, category mega-menu, CTA buttons right (WhatsApp, Order Custom Project). Sticky on scroll with shadow

**Cards**: Elevated cards with subtle shadow, rounded corners (rounded-lg), hover lift effect
- Project Cards: Image thumbnail top, content bottom, clear CTA
- Feature Cards: Icon, title, description, optional link
- Testimonial Cards: Quote marks, text, author details with image

**Buttons**: 
- Primary: Solid, medium size, semibold text
- Secondary: Outline style
- CTA on images: Backdrop blur, semi-transparent background

**Forms**: Single-column layouts, clear labels above inputs, helper text below, validation states (success/error borders), generous input padding (p-3 to p-4)

**Badges**: Rounded-full for categories/tags, small padding, uppercase text (text-xs)

**Footer**: 4-column layout - About, Quick Links, Categories, Contact. Newsletter signup at top. Social icons, payment badges, copyright at bottom

**Floating WhatsApp**: Fixed bottom-right, circular button with icon, pulse animation on page load

## Images Strategy
**Hero Images Required**: 
- Homepage: Engineering students collaborating on laptop/project (authentic, diverse group)
- Categories Page: Header image showing different engineering disciplines
- About Page: Team/workspace photo

**Project Thumbnails**: Use placeholder images representing project types (circuit boards for ECE, code screenshots for CS/IT, CAD models for Mechanical)

**Icons**: Use Heroicons throughout for consistency - search, filter, check marks, categories, features

## Animations
**Minimal Motion**: Hover scale on cards (scale-105), smooth transitions (transition-all duration-300), fade-in on scroll for sections