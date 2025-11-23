# Fix "Forbidden - Access Denied" Error in Hostinger

## 🔒 Problem: 403 Forbidden Error

This error means the server doesn't have permission to read the files. It's a **file permissions** issue.

---

## ✅ Solution: Fix File Permissions in Hostinger

### Method 1: Using Hostinger File Manager (Easiest)

1. **Log in to Hostinger hPanel**
2. **Go to File Manager** → Navigate to `public_html`
3. **Select the `assets` folder**
4. **Right-click** → **"Change Permissions"** or **"File Permissions"**
5. **Set permissions to**: `755`
   - This means: Owner can read/write/execute, Group and Others can read/execute
6. **Click "Save"** or "Apply"

### For Files Inside Assets Folder:

1. **Open the `assets` folder**
2. **Select all files** (Ctrl+A or Cmd+A)
3. **Right-click** → **"Change Permissions"**
4. **Set permissions to**: `644`
   - This means: Owner can read/write, Group and Others can read
5. **Click "Save"**

### Method 2: Using Hostinger File Manager - Recursive (All at Once)

1. **Select the `assets` folder**
2. **Right-click** → **"Change Permissions"**
3. **Set to**: `755`
4. **Check "Apply to all subfolders and files"** or **"Recursive"**
5. **Click "Save"**

This will set:
- Folders: `755`
- Files: `644` (automatically)

---

## 📋 Correct Permissions

### For Folders (like `assets/`):
- **Permission**: `755` or `rwxr-xr-x`
- **Owner**: Read, Write, Execute
- **Group**: Read, Execute
- **Others**: Read, Execute

### For Files (like `.js`, `.css`, `.png`):
- **Permission**: `644` or `rw-r--r--`
- **Owner**: Read, Write
- **Group**: Read
- **Others**: Read

---

## 🔧 Step-by-Step Fix

### Step 1: Fix Assets Folder Permissions

1. **In File Manager**, go to `public_html`
2. **Find `assets` folder**
3. **Right-click** on `assets` folder
4. **Click "Change Permissions"** or "File Permissions"
5. **Enter**: `755`
6. **Check "Recursive"** or "Apply to all subfolders and files"
7. **Click "Save"**

### Step 2: Verify Permissions

After setting permissions, verify:

1. **Right-click `assets` folder** → **"Properties"** or **"Info"**
2. **Check permissions** - should show `755` or `rwxr-xr-x`
3. **Open `assets` folder**
4. **Check a file** (like `index-CqlhMjie.js`) - should show `644` or `rw-r--r--`

### Step 3: Test Your Website

1. **Visit**: `https://techfinalyear.com`
2. **Open DevTools** (F12) → **Console tab**
3. **Check for errors** - should be no more 403 errors
4. **Try accessing assets directly**:
   - `https://techfinalyear.com/assets/index-CqlhMjie.js`
   - Should load/download (not show 403)

---

## 🚨 If Permissions Still Don't Work

### Alternative: Re-upload with Correct Permissions

1. **Delete** the `assets` folder from Hostinger
2. **Re-upload** the `assets` folder from your local `dist/public/assets/`
3. **Set permissions immediately** after upload:
   - Folder: `755`
   - Files: `644`

### Or: Use .htaccess File (Advanced)

Create a `.htaccess` file in `public_html`:

```apache
# Allow access to assets
<Directory "assets">
    Options -Indexes
    AllowOverride None
    Require all granted
</Directory>

# Set default permissions
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    Require all granted
</FilesMatch>
```

---

## ✅ Quick Checklist

- [ ] ✅ `assets` folder permissions set to `755`
- [ ] ✅ Files inside `assets` set to `644`
- [ ] ✅ Permissions applied recursively (to all subfolders)
- [ ] ✅ Tested direct asset URL (no 403 error)
- [ ] ✅ Website loads correctly
- [ ] ✅ No console errors

---

## 🧪 Test After Fixing

### Test 1: Direct Asset URL
```
https://techfinalyear.com/assets/index-CqlhMjie.js
```
**Expected**: File downloads or displays (not 403)

### Test 2: Website Loads
```
https://techfinalyear.com
```
**Expected**: Website loads with all styles and scripts

### Test 3: Browser Console
- Open DevTools (F12)
- Check Console tab
- **No 403 errors** should appear

---

## 💡 Common Mistakes

### Mistake 1: Permissions Too Restrictive
- **Wrong**: `600` or `700` (only owner can access)
- **Correct**: `755` for folders, `644` for files

### Mistake 2: Not Applying Recursively
- **Wrong**: Only setting permissions on parent folder
- **Correct**: Apply recursively to all subfolders and files

### Mistake 3: Wrong Permissions on Files
- **Wrong**: `755` on files (unnecessary execute permission)
- **Correct**: `644` on files (read/write for owner, read for others)

---

## 📞 Still Having Issues?

If permissions are correct but still getting 403:

1. **Check Hostinger support** - Some hosting plans have restrictions
2. **Verify file ownership** - Files should be owned by your user
3. **Check .htaccess** - Make sure no .htaccess is blocking access
4. **Contact Hostinger support** - They can check server-level permissions

---

**Most likely fix**: Set `assets` folder to `755` with recursive option enabled. This should fix the 403 Forbidden error! ✅





