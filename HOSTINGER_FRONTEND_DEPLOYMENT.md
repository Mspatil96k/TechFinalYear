# Deploy Frontend to Hostinger - Step by Step Guide

## ✅ Prerequisites

- ✅ Backend deployed on Railway (you've done this!)
- ✅ Railway backend URL (e.g., `https://techfinalyear-production-xxxx.up.railway.app`)
- ✅ Hostinger Premium plan with domain `techfinalyear.com`
- ✅ Frontend built locally (`dist/public` folder exists)

---

## Step 1: Get Your Railway Backend URL

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Click on your project** (TechFinalYear)
3. **Click on your service**
4. **Go to "Settings" tab** → **"Networking"** section
5. **Copy your Railway URL** (e.g., `https://techfinalyear-production-xxxx.up.railway.app`)

**OR if you set up custom domain:**
- Use: `https://api.techfinalyear.com`

---

## Step 2: Update Frontend Build with Railway API URL

### Option A: Update .env and Rebuild (Recommended)

1. **Open `.env` file** in your project root
2. **Update `VITE_API_BASE_URL`**:
   ```env
   VITE_API_BASE_URL=https://your-railway-url.up.railway.app
   ```
   Or if using custom domain:
   ```env
   VITE_API_BASE_URL=https://api.techfinalyear.com
   ```

3. **Rebuild the frontend**:
   ```bash
   cd /Users/meghrajshinde/Desktop/TechFinalYear
   npm run build
   ```

4. **Verify the build**:
   ```bash
   ls -la dist/public
   ```
   You should see: `index.html`, `assets/` folder, `favicon.ico`

### Option B: Build with Environment Variable (One-time)

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
VITE_API_BASE_URL=https://your-railway-url.up.railway.app npm run build
```

---

## Step 3: Prepare Files for Upload

### Create a ZIP file of the frontend build:

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
cd dist/public
zip -r ../../techfinalyear-frontend.zip .
cd ../..
```

**This creates**: `techfinalyear-frontend.zip` in your project root

**OR manually select all files** in `dist/public` folder to upload.

---

## Step 4: Access Hostinger hPanel

1. **Go to Hostinger**: https://www.hostinger.com/
2. **Click "Login"** (top right)
3. **Enter your credentials** and log in
4. **Click "hPanel"** or go to: https://hpanel.hostinger.com/

---

## Step 5: Navigate to File Manager

1. **In hPanel**, find **"Files"** section
2. **Click "File Manager"**
3. **Navigate to**: `domains` → `techfinalyear.com` → `public_html`

**OR**

1. **Click "Websites"** in hPanel
2. **Find your domain** `techfinalyear.com`
3. **Click "Manage"**
4. **Click "File Manager"**
5. **Go to `public_html` folder**

---

## Step 6: Clean public_html Directory

1. **In File Manager**, make sure you're in `public_html` folder
2. **Select all files** (or delete default files like `index.php`, `default.html`, etc.)
3. **Delete them** (keep the folder structure, just remove files)

**Important**: Make sure you're in the correct folder: `public_html` (not `public_html/public`)

---

## Step 7: Upload Frontend Files

### Method A: Upload ZIP and Extract (Easiest)

1. **Click "Upload"** button in File Manager
2. **Select** `techfinalyear-frontend.zip` from your computer
3. **Wait for upload** to complete
4. **Right-click** on `techfinalyear-frontend.zip`
5. **Click "Extract"** or "Extract Here"
6. **Select extraction location**: `public_html`
7. **Click "Extract"**
8. **Delete the ZIP file** after extraction

### Method B: Upload Files Individually

1. **Click "Upload"** button
2. **Select all files** from `dist/public` folder:
   - `index.html`
   - `favicon.ico`
   - `assets/` folder (upload entire folder)
3. **Wait for upload** to complete

---

## Step 8: Verify File Structure

After upload, your `public_html` should contain:

```
public_html/
├── index.html
├── favicon.ico
└── assets/
    ├── index-xxxxx.js
    ├── index-xxxxx.css
    └── (other asset files)
```

**Important**: 
- `index.html` should be directly in `public_html` (not in a subfolder)
- All files should be accessible

---

## Step 9: Enable SSL (HTTPS)

1. **In hPanel**, go to **"Security"** section
2. **Click "SSL"**
3. **Find your domain** `techfinalyear.com`
4. **Click "Activate"** or **"Install SSL"**
5. **Select "Let's Encrypt"** (free SSL)
6. **Click "Install"**
7. **Wait 2-5 minutes** for SSL to activate

**OR**

1. **Go to "Websites"** → **"Manage"** → **"SSL"**
2. **Enable SSL** for `techfinalyear.com`

---

## Step 10: Force HTTPS (Optional but Recommended)

1. **In hPanel**, go to **"Websites"** → **"Manage"**
2. **Click "SSL"** tab
3. **Toggle "Force HTTPS"** to ON
4. **Save changes**

This redirects all HTTP traffic to HTTPS.

---

## Step 11: Test Your Website

1. **Open browser** and visit: `https://techfinalyear.com`
2. **Check if website loads** correctly
3. **Open browser DevTools** (F12) → **Network tab**
4. **Try to load a project** or submit a form
5. **Check Network requests** - they should go to your Railway backend URL

### Expected Results:

✅ Website loads at `https://techfinalyear.com`
✅ No console errors
✅ API calls go to Railway backend (check Network tab)
✅ Forms work correctly
✅ Images load properly

---

## Step 12: Verify API Connection

1. **Open browser DevTools** (F12)
2. **Go to "Network" tab**
3. **Visit**: `https://techfinalyear.com`
4. **Look for API requests** - they should be:
   - Going to: `https://your-railway-url.up.railway.app/api/...`
   - Status: 200 OK
   - Returning JSON data

**If you see CORS errors:**
- Check Railway `ALLOWED_ORIGINS` includes `https://techfinalyear.com`
- Verify Railway backend is running

---

## Troubleshooting

### Problem: Website shows blank page
**Solution:**
- Check `index.html` is in `public_html` (not in subfolder)
- Check browser console for errors
- Verify file permissions (should be 644 for files, 755 for folders)

### Problem: 404 errors for assets
**Solution:**
- Verify `assets/` folder is uploaded correctly
- Check file paths in `index.html` match actual file names
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: API calls failing
**Solution:**
- Verify `VITE_API_BASE_URL` was set before building
- Check Railway backend is running
- Check CORS settings in Railway
- Verify `ALLOWED_ORIGINS` includes your domain

### Problem: SSL not working
**Solution:**
- Wait 5-10 minutes for SSL to propagate
- Clear browser cache
- Try accessing `https://techfinalyear.com` directly
- Check SSL status in hPanel

### Problem: Files not uploading
**Solution:**
- Check file size limits (Hostinger allows up to 512MB)
- Try uploading smaller batches
- Use ZIP upload method
- Check internet connection

---

## Quick Checklist

- [ ] ✅ Railway backend URL copied
- [ ] ✅ `.env` updated with `VITE_API_BASE_URL`
- [ ] ✅ Frontend rebuilt (`npm run build`)
- [ ] ✅ ZIP file created (or files ready)
- [ ] ✅ Logged into Hostinger hPanel
- [ ] ✅ Navigated to `public_html` folder
- [ ] ✅ Cleaned old files
- [ ] ✅ Uploaded frontend files
- [ ] ✅ Verified file structure
- [ ] ✅ SSL enabled
- [ ] ✅ HTTPS forced
- [ ] ✅ Website tested
- [ ] ✅ API connection verified

---

## Next Steps After Deployment

1. **Test all pages**: Home, Categories, Project Detail, Contact, etc.
2. **Test forms**: Contact form, Custom Request form
3. **Test admin page**: `https://techfinalyear.com/admin`
4. **Monitor Railway logs** for API requests
5. **Set up backups** in Hostinger (optional)

---

## Updating Your Website

When you make changes:

1. **Update code locally**
2. **Rebuild**: `npm run build`
3. **Upload new files** to Hostinger (replace old files)
4. **Clear browser cache** to see changes

---

**Your website should now be live at `https://techfinalyear.com`! 🎉**

