# Quick Fix: Forms Not Submitting

## 🔍 Immediate Steps to Debug

### Step 1: Check Browser Console (2 minutes)

1. **Visit**: `https://techfinalyear.com`
2. **Open DevTools** (F12)
3. **Go to Console tab**
4. **Submit a form** (Contact or Custom Request)
5. **Look for**:
   - `[API Request] POST ...` - Shows the URL being called
   - `[API Error]` - Shows what went wrong
   - CORS errors
   - Network errors

### Step 2: Check Network Tab (2 minutes)

1. **Open DevTools** (F12) → **Network tab**
2. **Submit a form**
3. **Look for**:
   - Request to `/api/inquiries` or `/api/custom-requests`
   - **Request URL** - Where is it going?
   - **Status Code** - What's the response?

---

## 🚨 Most Common Issues

### Issue 1: API URL Not Set in Build

**Check**: In Network tab, what URL is the request going to?

**If going to**: `https://techfinalyear.com/api/...` (wrong - same domain)
**Fix**: Rebuild with correct API URL

**If going to**: `https://api.techfinalyear.com/api/...` or Railway URL (correct ✅)

### Issue 2: CORS Error

**Symptom**: Console shows "CORS policy" error

**Fix**:
1. Railway Dashboard → Variables
2. Check `ALLOWED_ORIGINS` = `https://techfinalyear.com,https://www.techfinalyear.com`
3. Save (Railway auto-redeploys)

### Issue 3: Backend Not Running

**Check**: Visit `https://api.techfinalyear.com/api/projects` directly
- **If works**: Backend is running ✅
- **If fails**: Backend is down ❌

---

## ✅ Quick Fix Commands

### Rebuild with Correct API URL:

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# Check current API URL
cat .env | grep VITE_API_BASE_URL

# If wrong, update it (use your actual Railway URL)
# Then rebuild
npm run build

# Create new ZIP
cd dist/public
zip -r ../../techfinalyear-frontend.zip .
cd ../..

# Upload new ZIP to Hostinger
```

---

## 🧪 Test Form Submission

1. **Fill out Contact form**:
   - Name: Test
   - WhatsApp: 7028945423
   - Branch: IT
   - Requirement: Test message

2. **Submit**

3. **Check**:
   - Browser console for `[API Request]` log
   - Network tab for POST request
   - Success toast should appear
   - Railway logs should show the request

---

## 📋 What to Check

- [ ] Browser console shows `[API Request]` log
- [ ] Network tab shows POST request
- [ ] Request URL goes to Railway backend (not same domain)
- [ ] Status code is 200 or 201
- [ ] No CORS errors in console
- [ ] Railway logs show incoming request
- [ ] Success toast appears

---

**Check browser console first - it will tell you exactly what's wrong!** 🔍





