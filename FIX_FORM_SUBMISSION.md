# Fix Form Submission Issues - Troubleshooting Guide

## 🔍 Problem: Forms Not Submitting (Project Inquiry & Custom Request)

If forms are not sending requests to the backend, follow these steps:

---

## Step 1: Check Browser Console for Errors

1. **Visit your website**: `https://techfinalyear.com`
2. **Open DevTools** (F12 or Cmd+Option+I)
3. **Go to "Console" tab**
4. **Try submitting a form**
5. **Look for errors**:
   - CORS errors
   - Network errors
   - API URL errors
   - JavaScript errors

### Common Errors:

**Error**: `Failed to fetch` or `NetworkError`
- **Cause**: API URL incorrect or backend not reachable
- **Fix**: Check API URL configuration

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`
- **Cause**: CORS not configured in Railway
- **Fix**: Add domain to Railway `ALLOWED_ORIGINS`

**Error**: `404 Not Found`
- **Cause**: API endpoint doesn't exist or URL wrong
- **Fix**: Verify Railway backend is running

---

## Step 2: Check Network Tab

1. **Open DevTools** (F12) → **Network tab**
2. **Submit a form** (Contact or Custom Request)
3. **Look for the API request**:
   - Should see: `POST /api/inquiries` or `POST /api/custom-requests`
   - Check the **Request URL** - should be:
     - `https://api.techfinalyear.com/api/inquiries`
     - Or: `https://your-railway-url.up.railway.app/api/inquiries`

### What to Check:

- **Request URL**: Is it going to the correct Railway backend?
- **Status Code**: 
  - `200` or `201` = Success ✅
  - `404` = Endpoint not found
  - `500` = Server error
  - `CORS error` = CORS not configured
  - `Failed` = Network/connection issue

---

## Step 3: Verify API URL in Build

The API URL is embedded in the build. Check if it's correct:

### Method 1: Check Built JavaScript

1. **In browser**, visit: `https://techfinalyear.com`
2. **Open DevTools** → **Sources** tab
3. **Find** `assets/index-xxxxx.js`
4. **Search for**: `api.techfinalyear.com` or your Railway URL
5. **Verify** it matches your Railway backend URL

### Method 2: Rebuild with Correct URL

1. **Check `.env` file**:
   ```bash
   cat .env | grep VITE_API_BASE_URL
   ```
   Should show: `VITE_API_BASE_URL=https://api.techfinalyear.com`

2. **If wrong, update it**:
   ```bash
   # Edit .env file
   VITE_API_BASE_URL=https://your-railway-url.up.railway.app
   ```

3. **Rebuild**:
   ```bash
   npm run build
   ```

4. **Re-upload to Hostinger**

---

## Step 4: Verify Railway Backend is Running

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Check your service status** - should show "Running"
3. **Check logs** - should see recent activity
4. **Test API directly**:
   ```
   https://api.techfinalyear.com/api/projects
   ```
   Or:
   ```
   https://your-railway-url.up.railway.app/api/projects
   ```
   Should return JSON data (not error)

---

## Step 5: Check CORS Configuration

1. **Go to Railway Dashboard** → Your service → **Variables**
2. **Check `ALLOWED_ORIGINS`**:
   ```
   https://techfinalyear.com,https://www.techfinalyear.com
   ```
3. **If missing or wrong**, update it:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://techfinalyear.com,https://www.techfinalyear.com`
4. **Railway will auto-redeploy**

---

## Step 6: Test API Endpoints Directly

### Test 1: Test GET Endpoint (Should Work)

```bash
curl https://api.techfinalyear.com/api/projects
```

**Expected**: JSON data with projects
**If fails**: Backend is not running or URL wrong

### Test 2: Test POST Endpoint (Form Submission)

```bash
curl -X POST https://api.techfinalyear.com/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","whatsapp":"1234567890","branch":"IT","requirement":"Test"}'
```

**Expected**: JSON response with inquiry data
**If fails**: Check Railway logs for errors

---

## Step 7: Check Form Validation

Forms might be failing validation. Check:

1. **Fill out all required fields** (marked with *)
2. **Check field formats**:
   - WhatsApp: 10 digits
   - Email: Valid email format
   - All required fields filled

3. **Check browser console** for validation errors

---

## Step 8: Verify Error Handling

The forms use `onError` callbacks. Check if errors are being caught:

1. **Submit form with invalid data**
2. **Check if error toast appears**
3. **Check browser console** for error details

---

## Common Issues & Solutions

### Issue 1: API URL Not Set in Build

**Symptom**: Requests go to relative URL (same domain) instead of Railway

**Solution**:
1. Update `.env`: `VITE_API_BASE_URL=https://api.techfinalyear.com`
2. Rebuild: `npm run build`
3. Re-upload to Hostinger

### Issue 2: CORS Error

**Symptom**: Browser console shows CORS policy error

**Solution**:
1. Add domain to Railway `ALLOWED_ORIGINS`
2. Verify domain matches exactly (including `https://`)
3. Wait for Railway to redeploy

### Issue 3: Backend Not Running

**Symptom**: All API requests fail with connection error

**Solution**:
1. Check Railway dashboard - service should be "Running"
2. Check Railway logs for errors
3. Restart service if needed

### Issue 4: Form Validation Failing Silently

**Symptom**: Form doesn't submit, no error shown

**Solution**:
1. Check all required fields are filled
2. Check field formats (WhatsApp number, email)
3. Check browser console for validation errors

---

## Quick Debugging Steps

1. ✅ **Open browser console** (F12) → Check for errors
2. ✅ **Open Network tab** → Submit form → Check request
3. ✅ **Verify API URL** in Network tab matches Railway URL
4. ✅ **Check Railway logs** for incoming requests
5. ✅ **Test API directly** with curl or browser
6. ✅ **Verify CORS** configuration in Railway

---

## Test Checklist

- [ ] ✅ Browser console shows no errors
- [ ] ✅ Network tab shows POST request to Railway API
- [ ] ✅ Request URL is correct (Railway backend)
- [ ] ✅ Status code is 200 or 201 (success)
- [ ] ✅ Railway logs show the request received
- [ ] ✅ Success toast appears after submission
- [ ] ✅ Form resets after successful submission

---

## Still Not Working?

1. **Check Railway logs** - Do you see any incoming requests?
2. **Check browser Network tab** - What URL is the request going to?
3. **Check browser Console** - What errors are shown?
4. **Test API directly** - Does `curl` work?
5. **Verify build** - Was it built with correct API URL?

---

**Most likely issues:**
1. API URL not set correctly in build
2. CORS not configured in Railway
3. Backend not running

Fix these and forms should work! ✅

