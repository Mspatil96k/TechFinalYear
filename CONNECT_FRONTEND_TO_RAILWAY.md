# Connect Frontend to Railway API - Step by Step Guide

## ✅ Step 5: Connect Frontend to Railway API

This step ensures your frontend (on Hostinger) can communicate with your backend (on Railway).

---

## Prerequisites

- ✅ Backend deployed on Railway and running
- ✅ Frontend deployed on Hostinger
- ✅ Railway backend URL (e.g., `https://techfinalyear-production-xxxx.up.railway.app` or `https://api.techfinalyear.com`)

---

## Step 1: Get Your Railway Backend URL

### Option A: Railway Generated URL

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Click on your project** (TechFinalYear)
3. **Click on your service**
4. **Go to "Settings" tab** → **"Networking"** section
5. **Copy your Railway URL** (e.g., `https://techfinalyear-production-xxxx.up.railway.app`)

### Option B: Custom Domain (If Set Up)

If you configured a custom domain:
- Use: `https://api.techfinalyear.com`

---

## Step 2: Update Frontend Build with Railway API URL

### On Your Local Machine:

1. **Open `.env` file** in your project root:
   ```bash
   cd /Users/meghrajshinde/Desktop/TechFinalYear
   ```

2. **Update `VITE_API_BASE_URL`**:
   ```env
   VITE_API_BASE_URL=https://your-railway-url.up.railway.app
   ```
   
   Or if using custom domain:
   ```env
   VITE_API_BASE_URL=https://api.techfinalyear.com
   ```

3. **Save the `.env` file**

4. **Rebuild the frontend**:
   ```bash
   npm run build
   ```

5. **Verify the build**:
   ```bash
   ls -la dist/public
   ```
   You should see: `index.html`, `assets/` folder, `favicon.ico`

---

## Step 3: Create New ZIP File

After rebuilding with the correct API URL:

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
cd dist/public
zip -r ../../techfinalyear-frontend.zip .
cd ../..
```

This creates a new ZIP with the Railway API URL embedded.

---

## Step 4: Upload New Build to Hostinger

1. **Log in to Hostinger hPanel**
2. **Go to File Manager** → `public_html`
3. **Delete old files** (or backup first)
4. **Upload** the new `techfinalyear-frontend.zip`
5. **Extract** in `public_html`
6. **Set permissions**: `assets` folder to `755` (recursive)

---

## Step 5: Verify API Connection

### Test 1: Check Browser Console

1. **Visit**: `https://techfinalyear.com`
2. **Open DevTools** (F12) → **Network tab**
3. **Look for API requests** - they should go to:
   - `https://your-railway-url.up.railway.app/api/...`
   - Or: `https://api.techfinalyear.com/api/...`

### Test 2: Test API Endpoints Directly

Try these in your browser:

1. **Projects API**:
   ```
   https://techfinalyear.com
   ```
   Then check Network tab - should see request to Railway API

2. **Direct API Test**:
   ```
   https://your-railway-url.up.railway.app/api/projects
   ```
   Should return JSON data

### Test 3: Submit a Form

1. **Go to Contact page**: `https://techfinalyear.com/contact`
2. **Fill out and submit** the contact form
3. **Check Network tab** - should see POST request to Railway API
4. **Check Railway logs** - should see the request logged

---

## Step 6: Verify CORS Configuration

Make sure Railway allows requests from your frontend domain:

1. **Go to Railway Dashboard** → Your service → **Variables**
2. **Check `ALLOWED_ORIGINS`** includes:
   ```
   https://techfinalyear.com,https://www.techfinalyear.com
   ```
3. **If missing**, add it:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://techfinalyear.com,https://www.techfinalyear.com`
4. **Railway will auto-redeploy** with new CORS settings

---

## Troubleshooting

### Problem: API Calls Fail with CORS Error

**Symptom**: Browser console shows "CORS policy" error

**Solution**:
1. Check Railway `ALLOWED_ORIGINS` includes your domain
2. Verify domain matches exactly (including `https://`)
3. Check Railway logs for CORS rejection messages

### Problem: API Calls Go to Wrong URL

**Symptom**: Network tab shows requests to `localhost` or wrong URL

**Solution**:
1. Verify `VITE_API_BASE_URL` in `.env` is correct
2. Rebuild: `npm run build`
3. Re-upload to Hostinger
4. Clear browser cache

### Problem: 404 Errors for API Endpoints

**Symptom**: API requests return 404

**Solution**:
1. Verify Railway backend is running (check Railway dashboard)
2. Test Railway URL directly: `https://your-railway-url.up.railway.app/api/projects`
3. Check Railway logs for errors

### Problem: Network Timeout

**Symptom**: Requests timeout or fail to connect

**Solution**:
1. Verify Railway service is running (not stopped/crashed)
2. Check Railway URL is correct
3. Test Railway URL directly in browser

---

## Quick Verification Checklist

- [ ] ✅ Railway backend URL copied
- [ ] ✅ `.env` updated with `VITE_API_BASE_URL`
- [ ] ✅ Frontend rebuilt (`npm run build`)
- [ ] ✅ New ZIP created and uploaded to Hostinger
- [ ] ✅ Website loads at `https://techfinalyear.com`
- [ ] ✅ Browser Network tab shows API requests to Railway
- [ ] ✅ Forms submit successfully
- [ ] ✅ No CORS errors in console
- [ ] ✅ Railway logs show incoming requests

---

## How to Verify It's Working

### Method 1: Browser DevTools

1. **Open**: `https://techfinalyear.com`
2. **Press F12** → **Network tab**
3. **Filter by "Fetch/XHR"**
4. **Load a page** (like Projects page)
5. **You should see**:
   - Requests to: `https://your-railway-url.up.railway.app/api/projects`
   - Status: `200 OK`
   - Response: JSON data

### Method 2: Test Forms

1. **Go to Contact page**
2. **Fill out form** and submit
3. **Check Network tab** - should see POST to Railway API
4. **Check Railway logs** - should see the request

### Method 3: Check Railway Logs

1. **Go to Railway Dashboard** → Your service → **Logs**
2. **You should see**:
   ```
   GET /api/projects 200 in 15ms
   POST /api/inquiries 201 in 20ms
   ```
   This confirms frontend is connecting to Railway!

---

## Current Configuration

Your frontend is configured to use:
- **API Base URL**: Set in `.env` as `VITE_API_BASE_URL`
- **Build Time**: The URL is embedded during `npm run build`
- **Runtime**: Frontend uses this URL for all API calls

---

## Important Notes

1. **API URL is embedded at build time** - You must rebuild after changing `.env`
2. **Upload new build to Hostinger** after changing API URL
3. **CORS must be configured** in Railway to allow your domain
4. **Test in browser** to verify connection works

---

## Next Steps After Connection

1. ✅ Test all pages load correctly
2. ✅ Test forms submit successfully
3. ✅ Test admin page: `https://techfinalyear.com/admin`
4. ✅ Monitor Railway logs for API requests
5. ✅ Set up monitoring/alerts (optional)

---

**Your frontend should now be connected to your Railway backend!** 🎉

Test it by visiting your website and checking the browser Network tab to see API requests going to Railway.

