# Fix: API Calls Going to Wrong URL

## 🔍 Problem

API calls are going to: `https://techfinalyear.com/api/inquiries` (Hostinger - wrong ❌)

Should go to: `https://techfinalyear-production.up.railway.app/api/inquiries` (Railway - correct ✅)

---

## ✅ Solution: Rebuild with Correct API URL

### Step 1: Verify Railway Backend URL

Get your Railway backend URL:
1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Click on your project** → **Your service**
3. **Go to "Settings"** → **"Networking"**
4. **Copy your Railway URL** (e.g., `https://techfinalyear-production-xxxx.up.railway.app`)

**OR if you set up custom domain:**
- Use: `https://api.techfinalyear.com`

### Step 2: Update .env File

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# Edit .env file
# Set VITE_API_BASE_URL to your Railway URL
VITE_API_BASE_URL=https://techfinalyear-production.up.railway.app
```

**Or if using custom domain:**
```env
VITE_API_BASE_URL=https://api.techfinalyear.com
```

### Step 3: Rebuild Frontend

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# Rebuild with correct API URL
npm run build
```

### Step 4: Create New ZIP

```bash
cd dist/public
zip -r ../../techfinalyear-frontend.zip .
cd ../..
```

### Step 5: Upload to Hostinger

1. **Log in to Hostinger hPanel**
2. **File Manager** → `public_html`
3. **Delete old files**
4. **Upload** new `techfinalyear-frontend.zip`
5. **Extract** in `public_html`
6. **Set permissions**: `assets` folder to `755` (recursive)

### Step 6: Test

1. **Visit**: `https://techfinalyear.com`
2. **Open DevTools** (F12) → **Network tab**
3. **Submit a form**
4. **Check request URL** - should now go to Railway:
   - ✅ `https://techfinalyear-production.up.railway.app/api/inquiries`
   - ❌ NOT `https://techfinalyear.com/api/inquiries`

---

## 🔍 How to Verify API URL in Build

### Method 1: Check Built JavaScript

1. **Visit**: `https://techfinalyear.com`
2. **Open DevTools** (F12) → **Sources** tab
3. **Find**: `assets/index-xxxxx.js`
4. **Search for**: `techfinalyear-production` or `api.techfinalyear.com`
5. **If found**: API URL is embedded ✅
6. **If not found**: Build didn't include API URL ❌

### Method 2: Check Browser Console

After rebuilding with logging, submit a form and check console:
- Should see: `[API Request] POST https://techfinalyear-production.up.railway.app/api/inquiries`
- If you see: `[API Request] POST /api/inquiries` (relative URL) = API URL not set

---

## 🚨 Why This Happens

The API URL is embedded **at build time**. If you:
1. Build without setting `VITE_API_BASE_URL` → Uses relative URLs
2. Build with wrong URL → Uses wrong URL
3. Don't rebuild after changing `.env` → Still uses old URL

**Solution**: Always rebuild after changing `.env`!

---

## ✅ Quick Fix Script

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# 1. Update .env (edit manually or use sed)
# VITE_API_BASE_URL=https://techfinalyear-production.up.railway.app

# 2. Rebuild
npm run build

# 3. Create ZIP
cd dist/public && zip -r ../../techfinalyear-frontend.zip . && cd ../..

# 4. Upload to Hostinger
```

---

## 📋 Verification Checklist

After rebuilding and uploading:

- [ ] ✅ `.env` has correct `VITE_API_BASE_URL`
- [ ] ✅ Frontend rebuilt (`npm run build`)
- [ ] ✅ New ZIP created
- [ ] ✅ Uploaded to Hostinger
- [ ] ✅ Browser Network tab shows requests to Railway URL
- [ ] ✅ Forms submit successfully
- [ ] ✅ No CORS errors

---

## 🧪 Test After Fix

1. **Visit**: `https://techfinalyear.com`
2. **Open DevTools** (F12) → **Network tab**
3. **Submit Contact form**
4. **Check request**:
   - **URL**: Should be `https://techfinalyear-production.up.railway.app/api/inquiries`
   - **Status**: Should be `200` or `201`
   - **Response**: Should be JSON data

---

**The issue is that your build doesn't have the Railway API URL embedded. Rebuild with the correct `VITE_API_BASE_URL` and re-upload to Hostinger!** ✅

