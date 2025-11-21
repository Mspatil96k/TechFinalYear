# Admin Dashboard Access Guide

## 🔐 How to Access Admin Page When Website is Hosted Online

### Access URL

When your website is hosted online, access the admin dashboard at:

```
https://techfinalyear.com/admin
```

Or if using a different domain:
```
https://yourdomain.com/admin
```

---

## 🔑 Default Login Credentials

**Default Password:** `admin123`

⚠️ **IMPORTANT:** Change this password before deploying to production!

---

## 🔒 How to Change Admin Password

### Method 1: Using Environment Variable (Recommended)

1. **Create `.env` file** in project root:
   ```env
   VITE_ADMIN_PASSWORD=your_secure_password_here
   ```

2. **Rebuild the project:**
   ```bash
   npm run build
   ```

3. **Deploy the new build**

### Method 2: Edit Code Directly

1. **Open** `client/src/pages/Admin.tsx`

2. **Find this line** (around line 25):
   ```typescript
   const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || "admin123";
   ```

3. **Change the password:**
   ```typescript
   const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || "your_secure_password";
   ```

4. **Rebuild:**
   ```bash
   npm run build
   ```

5. **Deploy the new build**

---

## 📍 Access Steps

1. **Open your browser**
2. **Navigate to:** `https://techfinalyear.com/admin`
3. **Enter the admin password**
4. **Click "Login"**
5. **View all custom requests and inquiries**

---

## 🔍 What You'll See

Once logged in, the admin dashboard shows:

### Left Column: Custom Project Requests
- Customer name and contact details
- Project title and requirements
- Branch/Engineering field
- Deadline and budget
- Technologies requested
- Status (pending, in_progress, completed)
- Direct WhatsApp and Email contact buttons

### Right Column: Inquiries
- Customer name and WhatsApp
- Branch
- Requirement details
- Direct WhatsApp contact button

### Quick Actions
- Refresh all data
- Export requests as JSON
- Export inquiries as JSON
- Logout button

---

## 🔔 Server Console Logs

When customers submit requests, you'll also see detailed logs in your server console:

```
============================================================
📋 NEW CUSTOM PROJECT REQUEST RECEIVED
============================================================
Name: Customer Name
Branch: Computer Science
WhatsApp: 9226115423
Project Title: Project Name
Requirements: Project requirements...
Deadline: 2025-12-05
Budget: ₹5000
Status: pending
Request ID: abc123-def456-...
============================================================
```

---

## 🛡️ Security Recommendations

1. **Change Default Password**
   - Never use `admin123` in production
   - Use a strong password (12+ characters, mix of letters, numbers, symbols)

2. **Use Environment Variables**
   - Store password in `.env` file
   - Never commit `.env` to git
   - Add `.env` to `.gitignore`

3. **Additional Security (Optional)**
   - Add IP whitelisting
   - Use two-factor authentication
   - Implement session timeout
   - Add rate limiting

4. **HTTPS Only**
   - Always use HTTPS in production
   - Never access admin page over HTTP

---

## 📱 Alternative Access Methods

### Via API (For Developers)

You can also access data via API endpoints:

```bash
# Get all custom requests
curl https://techfinalyear.com/api/custom-requests

# Get all inquiries
curl https://techfinalyear.com/api/inquiries
```

---

## 🔄 Session Management

- **Login persists** until browser is closed (sessionStorage)
- **Logout** clears the session
- **Refresh page** requires re-login if session expired

---

## 🆘 Troubleshooting

### Can't Access Admin Page

1. **Check URL:** Make sure you're using `/admin` (not `/Admin` or `/ADMIN`)
2. **Check Server:** Ensure server is running
3. **Check Build:** Make sure you've built the project (`npm run build`)

### Password Not Working

1. **Check Environment Variable:** If using `.env`, make sure it's loaded
2. **Rebuild:** After changing password, rebuild the project
3. **Clear Cache:** Clear browser cache and try again

### No Data Showing

1. **Check API:** Visit `/api/custom-requests` directly to see if data exists
2. **Check Console:** Look for JavaScript errors in browser console
3. **Refresh:** Click the "Refresh" button on admin page

---

## 📞 Support

If you need help accessing the admin page:
- Check server logs for errors
- Verify the build was successful
- Ensure environment variables are set correctly

---

**Remember:** Always change the default password before deploying to production!

