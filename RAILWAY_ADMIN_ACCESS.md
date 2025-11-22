# How to Access Admin Panel on Railway Domain

## 🚀 Quick Access Guide

### Step 1: Get Your Railway URL

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Click on your project** (TechFinalYear)
3. **Click on your service**
4. **Go to "Settings" tab**
5. **Scroll to "Networking" section**
6. **Copy your Railway domain** (e.g., `https://techfinalyear-production-xxxx.up.railway.app`)

### Step 2: Access Admin Panel

**Add `/admin` to your Railway URL:**

```
https://your-railway-url.up.railway.app/admin
```

**Example:**
```
https://techfinalyear-production-xxxx.up.railway.app/admin
```

---

## 🔑 Login Credentials

### Default Password
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change this password before going to production!

---

## 🔒 How to Change Admin Password

### Option 1: Using Environment Variable (Recommended for Railway)

1. **Go to Railway Dashboard** → Your Service → **"Variables" tab**
2. **Click "New Variable"** or **"Raw Editor"**
3. **Add this variable:**
   - **Key**: `VITE_ADMIN_PASSWORD`
   - **Value**: `your_secure_password_here`
4. **Click "Save"**
5. **Railway will automatically redeploy** with the new password

**Note**: After setting the environment variable, you need to rebuild the frontend. The password is embedded in the build, so you need to:
- Update `.env` locally with the new password
- Rebuild: `npm run build`
- Push to GitHub
- Railway will redeploy

### Option 2: Edit Code and Redeploy

1. **Edit** `client/src/pages/Admin.tsx`
2. **Find line 30:**
   ```typescript
   const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
   ```
3. **Change the default password:**
   ```typescript
   const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "your_secure_password";
   ```
4. **Commit and push to GitHub**
5. **Railway will auto-redeploy**

---

## 📍 Access URLs

### Railway Domain (Backend Only)
```
https://your-railway-url.up.railway.app/admin
```

### Custom Domain (If Configured)
```
https://api.techfinalyear.com/admin
```

### Production Domain (After Frontend Deployment)
```
https://techfinalyear.com/admin
```

---

## 🎯 Step-by-Step Access

1. **Get Railway URL** from Railway dashboard
2. **Open browser** and go to: `https://your-railway-url.up.railway.app/admin`
3. **Enter password**: `admin123` (or your custom password)
4. **Click "Login"**
5. **View admin dashboard** with:
   - Custom project requests
   - Inquiries
   - Export options

---

## ⚠️ Important Notes

### For Railway Deployment (Backend Only)

Since Railway is hosting your **backend API**, the admin panel will work, but:

1. **The admin panel is a React component** that needs to be served
2. **Railway serves both frontend and backend** from the same server
3. **The `/admin` route is handled by your React app**
4. **Make sure your build includes the admin page**

### If Admin Panel Doesn't Load

1. **Check Railway logs** for errors
2. **Verify the build** includes the admin page
3. **Check the route** is correct: `/admin` (not `/Admin` or `/ADMIN`)
4. **Verify the frontend build** is being served correctly

---

## 🔍 Troubleshooting

### Problem: Admin page shows 404
**Solution**: 
- Make sure you're using `/admin` (lowercase)
- Check Railway logs to see if the route is being served
- Verify the build includes the admin page

### Problem: Password not working
**Solution**:
- Check if `VITE_ADMIN_PASSWORD` environment variable is set in Railway
- If using environment variable, rebuild and redeploy
- Try the default password: `admin123`

### Problem: Can't access from Railway URL
**Solution**:
- Make sure Railway deployment is successful
- Check Railway logs for errors
- Verify the service is running
- Try accessing other routes first (e.g., `/api/projects`)

---

## 🎯 Quick Reference

| Item | Value |
|------|-------|
| **URL Pattern** | `https://your-railway-url.up.railway.app/admin` |
| **Default Password** | `admin123` |
| **Route** | `/admin` |
| **Environment Variable** | `VITE_ADMIN_PASSWORD` |

---

## 📝 Example Access Flow

1. **Railway URL**: `https://techfinalyear-production-abc123.up.railway.app`
2. **Admin URL**: `https://techfinalyear-production-abc123.up.railway.app/admin`
3. **Password**: `admin123`
4. **Result**: Admin dashboard with all requests and inquiries

---

## 🔐 Security Recommendations

1. **Change default password** immediately
2. **Use strong password** (12+ characters, mix of letters, numbers, symbols)
3. **Set environment variable** in Railway for password
4. **Don't share admin URL** publicly
5. **Consider IP whitelisting** for additional security (future enhancement)

---

**Remember**: The admin panel is accessible at `/admin` on your Railway domain. Make sure to change the default password before production use!

