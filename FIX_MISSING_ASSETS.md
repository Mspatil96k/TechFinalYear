# Fix Missing Assets in Hostinger - Troubleshooting Guide

## 🔍 Problem: Assets Not Showing After Extraction

If your website loads but CSS, JavaScript, or images are missing, follow these steps:

---

## Step 1: Verify File Structure in Hostinger

### Check in Hostinger File Manager:

1. **Go to** `public_html` folder
2. **Verify you see**:
   ```
   public_html/
   ├── index.html          ✅
   ├── favicon.ico         ✅
   └── assets/             ✅ (This folder MUST exist!)
       ├── index-CqlhMjie.js
       ├── index-sLm4TnIl.css
       ├── Homepage_hero_engineering_students_7b530f3f-1a6OriIv.png
       └── About_page_workspace_photo_beabd40b-CCJOeVj_.png
   ```

### If assets folder is missing:

**Problem**: The `assets/` folder wasn't extracted properly.

**Solution**:
1. Re-upload the ZIP file
2. Make sure to extract ALL files (not just index.html)
3. Verify the `assets/` folder appears after extraction

---

## Step 2: Check File Permissions

### In Hostinger File Manager:

1. **Right-click on `assets` folder**
2. **Click "Change Permissions"** or "File Permissions"
3. **Set permissions to**: `755` (for folders) or `644` (for files)
   - **Folders**: `755` (rwxr-xr-x)
   - **Files**: `644` (rw-r--r--)

**OR use these commands** (if you have SSH access):
```bash
chmod 755 assets/
chmod 644 assets/*
```

---

## Step 3: Verify Assets Folder Location

### Common Mistake: Assets in Wrong Location

**Wrong Structure:**
```
public_html/
├── index.html
└── public_html/          ← Wrong! Nested folder
    └── assets/
```

**Correct Structure:**
```
public_html/
├── index.html
└── assets/               ← Correct! Directly in public_html
```

**Fix**: If assets are in a subfolder, move them to `public_html/assets/`

---

## Step 4: Check Browser Console for Errors

1. **Open your website**: `https://techfinalyear.com`
2. **Press F12** (or Cmd+Option+I on Mac) to open DevTools
3. **Go to "Console" tab**
4. **Look for errors** like:
   - `404 Not Found` for assets
   - `Failed to load resource`
   - `CORS error`

### Common Errors:

**Error**: `404 - /assets/index-xxxxx.js not found`
- **Cause**: Assets folder missing or wrong location
- **Fix**: Verify assets folder is in `public_html/assets/`

**Error**: `403 Forbidden`
- **Cause**: File permissions issue
- **Fix**: Set folder permissions to 755, file permissions to 644

---

## Step 5: Re-upload Assets Manually (If Needed)

If assets still don't work:

### Method 1: Re-upload ZIP and Extract Again

1. **Delete** everything in `public_html` (except keep a backup)
2. **Re-upload** `techfinalyear-frontend.zip`
3. **Extract** again, making sure ALL files extract
4. **Verify** `assets/` folder appears

### Method 2: Upload Assets Folder Separately

1. **In Hostinger File Manager**, go to `public_html`
2. **Click "Upload"**
3. **Select the entire `assets` folder** from your local `dist/public/assets/`
4. **Upload** it to `public_html`
5. **Verify** the structure is: `public_html/assets/`

---

## Step 6: Verify Asset Paths in index.html

The `index.html` should reference assets like this:

```html
<script type="module" crossorigin src="/assets/index-CqlhMjie.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-sLm4TnIl.css">
```

**Note**: The paths start with `/assets/` (absolute path from root)

**If paths are wrong** (like `./assets/` or `assets/`), the build might be incorrect.

---

## Step 7: Clear Browser Cache

Sometimes old cached files cause issues:

1. **Hard refresh**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Or clear cache**: Browser Settings → Clear browsing data → Cached images and files

---

## Step 8: Test Asset URLs Directly

Try accessing assets directly in browser:

1. **JavaScript**: `https://techfinalyear.com/assets/index-CqlhMjie.js`
2. **CSS**: `https://techfinalyear.com/assets/index-sL4TnIl.css`
3. **Image**: `https://techfinalyear.com/assets/Homepage_hero_engineering_students_7b530f3f-1a6OriIv.png`

**Expected**: Files should load/download
**If 404**: Assets folder is missing or in wrong location
**If 403**: File permissions issue

---

## Quick Fix Checklist

- [ ] ✅ `assets/` folder exists in `public_html/`
- [ ] ✅ `assets/` folder contains: `.js`, `.css`, and image files
- [ ] ✅ File permissions: folders `755`, files `644`
- [ ] ✅ No nested folders (assets directly in public_html)
- [ ] ✅ Browser console shows no 404 errors
- [ ] ✅ Direct asset URLs work (test in browser)
- [ ] ✅ Browser cache cleared

---

## Most Common Issues & Solutions

### Issue 1: Assets Folder Not Extracted
**Symptom**: Only `index.html` and `favicon.ico` visible
**Solution**: Re-extract ZIP, make sure to extract ALL files

### Issue 2: Assets in Subfolder
**Symptom**: Assets at `public_html/public/assets/` instead of `public_html/assets/`
**Solution**: Move assets folder to `public_html/assets/`

### Issue 3: File Permissions
**Symptom**: 403 Forbidden errors
**Solution**: Set permissions: folders `755`, files `644`

### Issue 4: Missing Files in ZIP
**Symptom**: Some assets missing
**Solution**: Rebuild and recreate ZIP: `npm run build` then create new ZIP

---

## Rebuild and Recreate ZIP (If Needed)

If assets are still missing, rebuild:

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
npm run build
cd dist/public
zip -r ../../techfinalyear-frontend.zip .
```

Then re-upload to Hostinger.

---

## Still Not Working?

1. **Check Hostinger File Manager** - Take a screenshot of `public_html` folder structure
2. **Check Browser Console** - Copy any error messages
3. **Test Direct URLs** - Try accessing assets directly
4. **Verify ZIP Contents** - Make sure ZIP has all assets before uploading

---

**Most likely issue**: Assets folder wasn't extracted properly. Re-extract the ZIP file and verify the `assets/` folder appears in `public_html/`.

