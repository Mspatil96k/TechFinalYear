# API Base URL Configuration Guide

## 📍 Where to See/Check Vite API Base URL

### 1. **In `.env` File** (Configuration)
Location: `/Users/meghrajshinde/Desktop/TechFinalYear/.env`

```bash
# View current value
cat .env | grep VITE_API_BASE_URL

# Or open the file
open .env
```

**Current Value:**
- **Local Development**: Empty (`VITE_API_BASE_URL=`) - uses relative URLs
- **Production**: Should be `VITE_API_BASE_URL=https://api.techfinalyear.com`

---

### 2. **In Code** (Where It's Used)
Location: `client/src/lib/queryClient.ts` (Line 4)

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
```

This reads from Vite's environment variables.

---

### 3. **In Browser Console** (Runtime Check)

When you run the app in development mode, the API base URL is automatically logged:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12 or Cmd+Option+I)

3. **Look for:**
   ```
   🔗 API Base URL: (using relative URLs - local development)
   📦 Full Vite env: { ... }
   ```

4. **Or manually check in console:**
   ```javascript
   // In browser console, type:
   console.log(import.meta.env.VITE_API_BASE_URL)
   ```

---

### 4. **In Network Tab** (See Actual API Calls)

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Make an API call (e.g., load projects page)
4. Check the **Request URL** column:
   - **Local**: `http://localhost:3000/api/projects` (relative)
   - **Production**: `https://api.techfinalyear.com/api/projects` (absolute)

---

### 5. **In Built Files** (After Build)

After running `npm run build`, check the built JavaScript:

```bash
# Search for API_BASE_URL in built files
grep -r "api.techfinalyear.com" dist/public/assets/
```

The value is embedded in the built JavaScript bundle.

---

## 🔧 How to Change API Base URL

### For Local Development:
```bash
# Edit .env file
VITE_API_BASE_URL=
# (Leave empty to use relative URLs)
```

### For Production Build:
```bash
# Edit .env file
VITE_API_BASE_URL=https://api.techfinalyear.com

# Rebuild
npm run build
```

### For Railway Deployment:
Set in Railway dashboard → Variables:
```
VITE_API_BASE_URL=https://api.techfinalyear.com
```

---

## ✅ How It Works

1. **Local Development** (`VITE_API_BASE_URL` is empty):
   - API calls use relative URLs: `/api/projects`
   - Works because frontend and backend are on same server

2. **Production** (`VITE_API_BASE_URL=https://api.techfinalyear.com`):
   - API calls use absolute URLs: `https://api.techfinalyear.com/api/projects`
   - Frontend (Hostinger) calls backend (Railway)

---

## 🐛 Troubleshooting

**Problem: API calls failing in production**
- Check if `VITE_API_BASE_URL` is set correctly in `.env`
- Rebuild after changing `.env`: `npm run build`
- Check browser console for actual API URLs being called

**Problem: Want to see current value**
- Check browser console logs (added automatically in dev mode)
- Or type in console: `import.meta.env.VITE_API_BASE_URL`

**Problem: API base URL not updating**
- Vite only reads `.env` at build time
- After changing `.env`, you must:
  1. Stop dev server (Ctrl+C)
  2. Restart: `npm run dev`
  3. Or rebuild: `npm run build`

---

## 📝 Quick Reference

| Location | How to Check |
|----------|-------------|
| `.env` file | `cat .env \| grep VITE_API_BASE_URL` |
| Code | `client/src/lib/queryClient.ts` line 4 |
| Browser Console | Check logs on page load, or type `import.meta.env.VITE_API_BASE_URL` |
| Network Tab | See actual request URLs in DevTools |
| Built Files | Search in `dist/public/assets/*.js` |

