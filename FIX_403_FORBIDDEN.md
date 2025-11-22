# Fix 403 Forbidden Error on Hostinger

## 🚨 Problem: 403 Forbidden Error

This error means the server is denying access to files, usually due to incorrect file permissions.

---

## ✅ Quick Fix: Set Correct File Permissions

### Step 1: Fix Folder Permissions

**In Hostinger File Manager:**

1. **Go to** `public_html` folder
2. **Right-click on `public_html` folder**
3. **Click "Change Permissions"** or "File Permissions"
4. **Set permissions to**: `755`
5. **Check "Apply to all subfolders and files"** (if available)
6. **Click "Save"**

---

### Step 2: Fix File Permissions

**For individual files:**

1. **Right-click on `index.html`**
2. **Click "Change Permissions"**
3. **Set to**: `644`
4. **Repeat for**:
   - `favicon.ico` → `644`
   - All files in `assets/` folder → `644`

**OR set permissions for entire assets folder:**

1. **Right-click on `assets` folder**
2. **Click "Change Permissions"**
3. **Set to**: `755` (for folder)
4. **Then set files inside to**: `644`

---

### Step 3: Fix Assets Folder Permissions

**Important - Assets folder needs correct permissions:**

1. **Right-click `assets` folder** in `public_html`
2. **Click "Change Permissions"**
3. **Set to**: `755`
4. **Check "Apply recursively"** or "Apply to all subfolders"
5. **Save**

**Then for files inside assets:**

1. **Open `assets` folder**
2. **Select all files** (Ctrl+A or Cmd+A)
3. **Right-click → "Change Permissions"**
4. **Set to**: `644`
5. **Save**

---

## 📋 Correct Permissions Summary

| Type | Permission | What It Means |
|------|-----------|---------------|
| **Folders** | `755` | Owner: read/write/execute, Others: read/execute |
| **Files** | `644` | Owner: read/write, Others: read only |
| **HTML files** | `644` | Readable by web server |
| **JS/CSS files** | `644` | Readable by web server |
| **Image files** | `644` | Readable by web server |

---

## 🔧 Step-by-Step Fix in Hostinger

### Method 1: Using File Manager (Easiest)

1. **Log in to Hostinger hPanel**
2. **Go to "Files" → "File Manager"**
3. **Navigate to** `domains/techfinalyear.com/public_html`
4. **Select `public_html` folder**
5. **Click "Permissions"** or "Change Permissions" button
6. **Set to**: `755`
7. **Check "Recursive"** (apply to all subfolders)
8. **Click "Change" or "Save"**

**Then for files:**

1. **Select all files** in `public_html` (not folders)
2. **Click "Permissions"**
3. **Set to**: `644`
4. **Save**

---

### Method 2: Using Terminal/SSH (If Available)

If you have SSH access:

```bash
cd public_html
chmod 755 .
chmod 644 *.html *.ico
chmod 755 assets
chmod 644 assets/*
```

---

## 🧪 Test After Fixing Permissions

1. **Visit**: `https://techfinalyear.com`
2. **Check if website loads** (should work now!)
3. **Open DevTools** (F12) → **Network tab**
4. **Reload page**
5. **Check all requests** - should be 200 OK (not 403)

---

## 🔍 Verify Permissions Are Correct

**In Hostinger File Manager, check:**

1. **`public_html` folder** → Should show `755`
2. **`index.html`** → Should show `644`
3. **`assets` folder** → Should show `755`
4. **Files in `assets/`** → Should show `644`

---

## ❌ Common Mistakes

### Mistake 1: Permissions Too Restrictive
- **Wrong**: `600` or `700` (only owner can read)
- **Correct**: `644` for files, `755` for folders

### Mistake 2: Not Applying Recursively
- **Problem**: Only parent folder has correct permissions
- **Solution**: Check "Apply recursively" when setting permissions

### Mistake 3: Wrong Owner
- **Problem**: Files owned by wrong user
- **Solution**: Contact Hostinger support if you can't change owner

---

## 🚨 Still Getting 403?

### Check These:

1. **`.htaccess` file**:
   - Check if there's a `.htaccess` file blocking access
   - Temporarily rename it to `.htaccess.bak` to test

2. **File ownership**:
   - Files should be owned by your hosting account user
   - Contact Hostinger support if ownership is wrong

3. **Directory index**:
   - Make sure `index.html` exists and has correct name
   - Not `Index.html` or `INDEX.HTML` (case-sensitive on some servers)

4. **Server configuration**:
   - Some servers block certain file types
   - Contact Hostinger support if issue persists

---

## 📞 Contact Hostinger Support

If permissions are correct but still getting 403:

1. **Go to Hostinger Support**
2. **Explain**: "Getting 403 Forbidden on techfinalyear.com"
3. **Ask them to**:
   - Check file permissions
   - Verify file ownership
   - Check server configuration

---

## ✅ Quick Checklist

After fixing permissions:

- [ ] `public_html` folder: `755`
- [ ] `index.html`: `644`
- [ ] `favicon.ico`: `644`
- [ ] `assets` folder: `755`
- [ ] All files in `assets/`: `644`
- [ ] Website loads without 403 error
- [ ] All assets load correctly (check Network tab)

---

## 💡 Pro Tip

**Most common cause**: Assets folder or files inside assets have wrong permissions.

**Quick fix**: Set `assets` folder to `755`, then all files inside to `644`.

---

**The 403 error is almost always a permissions issue. Set folders to 755 and files to 644, and it should work!** ✅

