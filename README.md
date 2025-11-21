# TechFinalYear - Engineering & Diploma Final Year Projects Platform

A comprehensive full-stack web application for showcasing and managing engineering final year projects. Built with React, TypeScript, Express, and modern web technologies.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Common Errors & Solutions](#common-errors--solutions)
- [API Endpoints](#api-endpoints)
- [Project Configuration](#project-configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Project Overview

TechFinalYear is a platform that helps engineering and diploma students find, browse, and order final year projects. The platform offers:

- **50+ Ready-made Projects** across 7 engineering branches
- **Custom Project Development** services
- **Complete Documentation** and support
- **Project Categories**: IT, Computer Science, ECE, Electrical, Mechanical, Civil, and Diploma projects

### Key Statistics
- **50 Projects** available
- **7 Categories** of engineering projects
- **Full-stack** React + Node.js application
- **Responsive Design** for all devices

---

## ✨ Features

### For Students
- Browse projects by category and branch
- View detailed project information
- Request custom projects
- Contact support via WhatsApp
- View testimonials and project samples

### For Administrators
- Manage projects and categories
- Handle custom project requests
- View inquiries and testimonials
- Track project popularity

### Technical Features
- **Modern UI/UX** with Tailwind CSS and shadcn/ui components
- **Real-time Updates** with React Query
- **Type-safe** with TypeScript
- **Responsive Design** for mobile, tablet, and desktop
- **Fast Performance** with Vite build tool
- **Image Management** with category-based thumbnails

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type safety
- **Vite 5.4.20** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Styling
- **shadcn/ui** - Component library (Radix UI)
- **React Query (TanStack Query)** - Data fetching
- **Wouter** - Routing
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express 4.21.2** - Web framework
- **TypeScript** - Type safety
- **tsx** - TypeScript execution
- **Drizzle ORM** - Database ORM
- **Zod** - Schema validation

### Development Tools
- **ESBuild** - Fast bundler
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
TechFinalYear/
├── attached_assets/              # Static assets
│   └── generated_images/         # Project thumbnails and images
│       ├── IT_Computer_Science_project_thumbnail_f71a1bbf.png
│       ├── ECE_Electronics_project_thumbnail_c7385ad9.png
│       ├── Electrical_engineering_project_thumbnail_32fc478c.png
│       ├── Mechanical_engineering_project_thumbnail_43cbef9f.png
│       ├── Civil_engineering_project_thumbnail_d89a625e.png
│       └── Homepage_hero_engineering_students_7b530f3f.png
│
├── client/                       # Frontend React application
│   ├── public/                   # Static files
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── ui/              # shadcn/ui components (40+ components)
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── FloatingWhatsApp.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── TestimonialCard.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── AboutUs.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── CustomRequest.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── ProjectCategories.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── not-found.tsx
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/                  # Utility libraries
│   │   │   ├── queryClient.ts   # React Query setup
│   │   │   └── utils.ts         # Utility functions
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css            # Global styles
│   └── index.html                # HTML template
│
├── server/                       # Backend Express application
│   ├── index.ts                  # Server entry point
│   ├── routes.ts                 # API routes
│   ├── storage.ts                # Data storage (in-memory)
│   └── vite.ts                   # Vite integration
│
├── shared/                       # Shared code between client and server
│   └── schema.ts                 # Database schemas and types
│
├── dist/                         # Build output (generated)
│   └── public/                   # Built static files
│
├── node_modules/                 # Dependencies (generated)
│
├── .gitignore                    # Git ignore rules
├── components.json                # shadcn/ui configuration
├── drizzle.config.ts              # Drizzle ORM configuration
├── package.json                   # Project dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── design_guidelines.md           # Design system documentation
├── IMAGE_CHANGE_GUIDE.md         # Guide for changing project images
└── README.md                      # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Verify npm: `npm --version`

2. **npm** (comes with Node.js) or **yarn**

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### System Requirements

- **Operating System**: macOS, Windows, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space
- **Internet Connection**: Required for installing dependencies

---

## 🚀 Installation

### For macOS

1. **Open Terminal**
   - Press `Cmd + Space`, type "Terminal", and press Enter

2. **Navigate to project directory**
   ```bash
   cd ~/Desktop/TechFinalYear
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (may take 2-5 minutes)

4. **Verify installation**
   ```bash
   npm list --depth=0
   ```

### For Windows

1. **Open Command Prompt or PowerShell**
   - Press `Win + R`, type `cmd`, and press Enter
   - Or search for "PowerShell" in Start menu

2. **Navigate to project directory**
   ```cmd
   cd C:\Users\YourUsername\Desktop\TechFinalYear
   ```
   Or if using PowerShell:
   ```powershell
   cd ~\Desktop\TechFinalYear
   ```

3. **Install dependencies**
   ```cmd
   npm install
   ```
   This will install all required packages (may take 2-5 minutes)

4. **Verify installation**
   ```cmd
   npm list --depth=0
   ```

---

## ▶️ Running the Project

### Development Mode

#### macOS / Linux

```bash
# Set port (optional, defaults to 5000)
export PORT=3000

# Start development server
npm run dev
```

#### Windows (Command Prompt)

```cmd
# Set port (optional, defaults to 5000)
set PORT=3000

# Start development server
npm run dev
```

#### Windows (PowerShell)

```powershell
# Set port (optional, defaults to 5000)
$env:PORT=3000

# Start development server
npm run dev
```

### Access the Application

Once the server starts, you'll see:
```
serving on port 3000
```

Open your browser and navigate to:
- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP_ADDRESS:3000

### Available Scripts

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Database migrations (if using database)
npm run db:push
```

---

## ⚠️ Common Errors & Solutions

### 1. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution (macOS/Linux):**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)

# Or use a different port
PORT=3001 npm run dev
```

**Solution (Windows):**
```cmd
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
set PORT=3001
npm run dev
```

### 2. Module Not Found / Cannot Find Module

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # macOS/Linux
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstall dependencies
npm install
```

### 3. Permission Denied (macOS/Linux)

**Error:**
```
EACCES: permission denied
```

**Solution:**
```bash
# Fix npm permissions (don't use sudo)
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Or use nvm to manage Node.js versions
```

### 4. TypeScript Errors

**Error:**
```
Type error: Property 'x' does not exist on type 'y'
```

**Solution:**
```bash
# Check TypeScript version
npx tsc --version

# Run type checking
npm run check

# If errors persist, try:
rm -rf node_modules
npm install
```

### 5. Vite HMR (Hot Module Reload) Not Working

**Error:**
```
[Vite] Internal server error
```

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite  # macOS/Linux
rmdir /s node_modules\.vite  # Windows

# Restart dev server
npm run dev
```

### 6. Port 5000 Conflict (macOS - AirPlay)

**Error:**
```
HTTP ERROR 403
Access to localhost was denied
```

**Solution:**
```bash
# Use a different port
PORT=3000 npm run dev

# Or disable AirPlay Receiver:
# System Settings → General → AirDrop & Handoff → Turn off AirPlay Receiver
```

### 7. Node Version Mismatch

**Error:**
```
The engine "node" is incompatible with this module
```

**Solution:**
```bash
# Check Node version
node --version

# Update Node.js to v18 or higher
# macOS: Use Homebrew or download from nodejs.org
# Windows: Download installer from nodejs.org

# Or use nvm (Node Version Manager)
nvm install 18
nvm use 18
```

### 8. Missing Dependencies After Git Clone

**Error:**
```
Cannot find module '@radix-ui/react-dialog'
```

**Solution:**
```bash
# Install all dependencies
npm install

# If specific package is missing
npm install @radix-ui/react-dialog
```

### 9. Build Errors

**Error:**
```
Build failed with errors
```

**Solution:**
```bash
# Clean build directory
rm -rf dist  # macOS/Linux
rmdir /s dist  # Windows

# Rebuild
npm run build
```

### 10. Browser Cache Issues (Favicon/Images Not Updating)

**Solution:**
- **Hard Refresh**: 
  - macOS: `Cmd + Shift + R`
  - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
- **Clear Browser Cache**: Settings → Clear browsing data
- **Incognito Mode**: Test in private/incognito window

---

## 🔌 API Endpoints

### Projects

```
GET    /api/projects              # Get all projects
GET    /api/projects/:id          # Get project by ID
POST   /api/projects              # Create new project
```

### Categories

```
GET    /api/categories            # Get all categories
GET    /api/categories/:slug      # Get category by slug
POST   /api/categories            # Create new category
```

### Custom Requests

```
GET    /api/custom-requests       # Get all custom requests
POST   /api/custom-requests       # Submit custom project request
```

### Inquiries

```
GET    /api/inquiries             # Get all inquiries
POST   /api/inquiries             # Submit inquiry
```

### Testimonials

```
GET    /api/testimonials         # Get all testimonials
POST   /api/testimonials         # Create testimonial
```

### Static Assets

```
GET    /assets/*                  # Serve images from attached_assets
GET    /favicon.png               # Favicon
```

---

## ⚙️ Project Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (if using external database)
DATABASE_URL=postgresql://user:password@localhost:5432/techfinalyear
```

### Port Configuration

Default port is `5000`, but can be changed:

**macOS/Linux:**
```bash
PORT=3000 npm run dev
```

**Windows:**
```cmd
set PORT=3000
npm run dev
```

### Vite Configuration

Edit `vite.config.ts` to customize:
- Build output directory
- Server options
- Plugin configuration

### Tailwind Configuration

Edit `tailwind.config.ts` to customize:
- Theme colors
- Font families
- Spacing scale
- Custom utilities

---

## 🚢 Deployment

### Building for Production

```bash
# Build both client and server
npm run build

# This creates:
# - dist/public/ (client build)
# - dist/index.js (server bundle)
```

### Production Server

```bash
# Start production server
npm start

# Or with custom port
PORT=3000 npm start
```

### Admin Dashboard Access

**When hosted online, access the admin dashboard at:**
```
https://yourdomain.com/admin
```

**Default Password:** `admin123`

**⚠️ IMPORTANT - Change the password before deploying:**

1. **Option 1: Environment Variable (Recommended)**
   - Create `.env` file in project root:
     ```env
     VITE_ADMIN_PASSWORD=your_secure_password_here
     ```
   - Rebuild: `npm run build`
   - The password will be embedded in the build

2. **Option 2: Edit Admin.tsx directly**
   - Open `client/src/pages/Admin.tsx`
   - Find line: `const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || "admin123";`
   - Change `"admin123"` to your secure password
   - Rebuild: `npm run build`

**Security Notes:**
- The admin page is protected with a password
- Password is stored in sessionStorage (clears when browser closes)
- For production, use a strong password
- Consider adding IP whitelisting or additional security layers

### Deployment Options

1. **VPS/Cloud Server** (Recommended)
   - DigitalOcean, AWS EC2, Google Cloud
   - Requires Node.js installed
   - Use PM2 for process management
   - Set up Nginx reverse proxy

2. **Platform as a Service**
   - **Render**: https://render.com
   - **Railway**: https://railway.app
   - **Fly.io**: https://fly.io
   - **Heroku**: https://heroku.com

3. **Static Hosting** (Client only)
   - **Vercel**: https://vercel.com
   - **Netlify**: https://netlify.com
   - Deploy `dist/public` folder

### Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Update API URLs if needed
- [ ] Configure environment variables
- [ ] Set up database (if using external DB)
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Test production build locally

---

## 📊 Project Statistics

- **Total Projects**: 50
- **Categories**: 7
- **Technologies**: React, TypeScript, Express, Node.js
- **Components**: 40+ UI components
- **Pages**: 7 main pages
- **API Endpoints**: 15+

### Project Distribution by Category

- **IT / Computer Engineering**: 20 projects
- **Computer Science (AI/ML)**: 25 projects
- **Electronics & Telecommunication**: 1 project
- **Electrical Engineering**: 1 project
- **Mechanical Engineering**: 1 project
- **Civil Engineering**: 1 project
- **Diploma Projects**: 1 project

---

## 🛠 Development Tips

### Adding New Projects

1. Open `server/storage.ts`
2. Add project object to `projects` array
3. Use `getProjectThumbnail()` for images
4. Restart server

### Changing Project Images

See `IMAGE_CHANGE_GUIDE.md` for detailed instructions.

### Customizing Styles

- Edit `tailwind.config.ts` for theme changes
- Modify `client/src/index.css` for global styles
- Component-specific styles in component files

### Adding New Pages

1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation if needed

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues, questions, or contributions:

- **Email**: meghrajshinde57@gmail.com
- **WhatsApp**: +919226115423
- **Website**: https://techfinalyear.com

---

## 🙏 Acknowledgments

- **shadcn/ui** for the amazing component library
- **Radix UI** for accessible primitives
- **Vite** for the blazing-fast build tool
- **Tailwind CSS** for utility-first styling
- **React Query** for data fetching

---

## 📚 Additional Resources

- [Design Guidelines](./design_guidelines.md)
- [Image Change Guide](./IMAGE_CHANGE_GUIDE.md)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 🔄 Changelog

### Version 1.0.0
- Initial release
- 50 projects across 7 categories
- Full-stack React + Express application
- Responsive design
- Image management system
- Custom project request system

---

**Made with ❤️ for Engineering Students**

