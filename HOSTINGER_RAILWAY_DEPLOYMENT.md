# Hostinger (Frontend) + Railway (Backend) Deployment Guide

This guide walks you through deploying **TechFinalYear** with the static frontend on **Hostinger Premium shared hosting** and the Node/Express backend on **Railway’s free tier**.

---

## 0. Prerequisites

- Active Hostinger Premium plan with the domain `techfinalyear.com` attached.
- Railway account (free tier is enough for this project).
- GitHub repository containing the latest TechFinalYear code (Railway deploys directly from GitHub).
- Local dev setup with Node 18+, npm, and git.

---

## 1. Prepare the Project Locally

1. Clone and install:
   ```bash
   git clone <your-repo-url> techfinalyear
   cd techfinalyear
   npm install
   ```
2. Create `.env` in the repo root:
   ```env
   VITE_ADMIN_PASSWORD=<strong-admin-password>
   VITE_API_BASE_URL=https://api.techfinalyear.com
   ```
3. Update the frontend to use the API base URL:
   - Open `client/src/lib/queryClient.ts`.
   - Add at the top (after imports):
     ```ts
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
     ```
   - Wherever `fetch` is called, prefix URLs:
     ```ts
     const targetUrl =
       url.startsWith("http") || url.startsWith("https")
         ? url
         : `${API_BASE_URL}${url}`;
     const res = await fetch(targetUrl, { ... });
     ```
     Do the same inside `getQueryFn` for all query keys. Rebuild after editing.
4. Enable CORS on the backend so the Hostinger domain can call the Railway API:
   - Install the dependency:
     ```bash
     npm install cors
     ```
   - In `server/index.ts`:
     ```ts
     import cors from "cors";
     const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [
       "https://techfinalyear.com",
       "https://www.techfinalyear.com",
     ];
     app.use(
       cors({
         origin: allowedOrigins,
         credentials: true,
       }),
     );
     ```
   - Add the env var for flexibility later:
     ```env
     ALLOWED_ORIGINS=https://techfinalyear.com,https://www.techfinalyear.com
     ```
5. Build once locally to ensure everything compiles:
   ```bash
   npm run build
   ```

Commit and push all changes to GitHub so Railway deploys the same code.

---

## 2. Deploy the Backend on Railway

### Step 2.1: Sign Up / Sign In to Railway

1. **Go to Railway**: Open https://railway.app/ in your browser
2. **Click "Start a New Project"** or **"Login"** (top right corner)
3. **Choose Sign-In Method**:
   - Railway will show options: **GitHub**, **Google**, or **Email**
   - **Recommended: Click "GitHub"** (this makes deployment easier)
4. **Authorize Railway**:
   - If using GitHub, you'll be redirected to GitHub
   - Click **"Authorize Railway"** to grant access
   - Railway needs access to read your repositories for deployment

### Step 2.2: Create a New Project

1. **After signing in**, you'll see the Railway dashboard
2. **Click the big "+ New" button** (usually top right or center of the page)
3. **Select "New Project"** from the dropdown menu

### Step 2.3: Deploy from GitHub Repository

1. **Choose Deployment Source**:
   - Railway will show options: **"Deploy from GitHub repo"**, **"Deploy from template"**, or **"Empty Project"**
   - **Click "Deploy from GitHub repo"**

2. **Select Your Repository**:
   - Railway will show a list of your GitHub repositories
   - **Search for "TechFinalYear"** or scroll to find it
   - **Click on your TechFinalYear repository**
   - If you don't see it:
     - Make sure the repo is **public**, OR
     - Click **"Configure GitHub App"** and grant access to private repos

3. **Railway will start deploying automatically** (this may take 1-2 minutes)

### Step 2.4: Configure Build Settings

Railway will auto-detect Node.js projects, but verify these settings:

1. **Click on your service** (the deployed app) in the Railway dashboard
2. **Go to the "Settings" tab** (top navigation)
3. **Scroll to "Build & Deploy"** section
4. **Verify/Set these values**:
   - **Root Directory**: `/` (leave as default - project root)
   - **Build Command**: `npm run build` (or leave empty if auto-detected)
   - **Start Command**: `npm start` (or leave empty if auto-detected)
   - **Install Command**: `npm install` (usually auto-detected)

**Note**: Railway usually auto-detects these for Node.js projects, so you might not need to change anything.
### Step 2.5: Add Environment Variables

1. **In your Railway service dashboard**, click on the **"Variables" tab** (top navigation)
2. **Click "New Variable"** or **"Raw Editor"** button
3. **Add these three environment variables** (one at a time, or use Raw Editor for all):

   **Option A: Add One by One** (Click "New Variable" for each):
   - **Key**: `NODE_ENV` → **Value**: `production`
   - **Key**: `PORT` → **Value**: `8080`
   - **Key**: `ALLOWED_ORIGINS` → **Value**: `https://techfinalyear.com,https://www.techfinalyear.com`

   **Option B: Use Raw Editor** (Easier):
   - Click **"Raw Editor"** button
   - Paste this:
     ```
     NODE_ENV=production
     PORT=8080
     ALLOWED_ORIGINS=https://techfinalyear.com,https://www.techfinalyear.com
     ```
   - Click **"Save"**

4. **Railway will automatically redeploy** when you save environment variables

### Step 2.6: Check Deployment Status

1. **Go to the "Deployments" tab** (or stay on "Overview")
2. **Watch the build logs** - you'll see:
   - Installing dependencies (`npm install`)
   - Building the project (`npm run build`)
   - Starting the server (`npm start`)
3. **Wait for success** - Look for:
   - ✅ Green checkmark or "Deploy Successful"
   - Log message: `serving on port 8080`
4. **If deployment fails**:
   - Check the logs for error messages
   - Common issues: missing dependencies, build errors, or port conflicts
### Step 2.7: Get Your Railway Public URL

1. **In the Railway dashboard**, look at the top of your service page
2. **Find the "Settings" tab** → Click on it
3. **Scroll to "Networking"** section
4. **You'll see "Generate Domain"** button - Click it
5. **Railway will generate a URL** like: `https://techfinalyear-production-xxxx.up.railway.app`
6. **Copy this URL** - this is your backend API URL

**Alternative**: The URL might also be visible in the "Overview" tab under "Domains"

### Step 2.8: Test Your Backend API

1. **Open a new browser tab** and visit:
   ```
   https://your-railway-url.up.railway.app/api/projects
   ```
   (Replace `your-railway-url` with your actual Railway domain)

2. **You should see JSON data** with all your projects - this means your backend is working! ✅

3. **If you see an error**:
   - Check Railway logs (Deployments tab → Click on latest deployment → View logs)
   - Make sure the deployment completed successfully
   - Verify environment variables are set correctly
### Step 2.9: Add Custom Domain (Optional but Recommended)

**Why?** Instead of `techfinalyear-production.up.railway.app`, use `api.techfinalyear.com`

1. **In Railway Dashboard**:
   - Go to your service → **"Settings" tab**
   - Scroll to **"Domains"** section
   - Click **"Custom Domain"** or **"Add Domain"** button

2. **Enter Your Domain**:
   - Type: `api.techfinalyear.com`
   - Click **"Add"** or **"Save"**

3. **Railway will show DNS instructions**:
   - Railway will display a **CNAME target** (something like `cname.railway.app` or `cname.vercel-dns.com`)
   - **Copy this CNAME value** - you'll need it in Hostinger

4. **Configure DNS in Hostinger**:
   - Log in to **Hostinger hPanel**
   - Go to **"Domains"** → **"DNS / Zone Editor"**
   - Click **"Add Record"** or **"Add CNAME"**
   - Fill in:
     - **Type**: CNAME
     - **Host**: `api` (or `api.techfinalyear.com`)
     - **Points to**: Paste the Railway CNAME value you copied
     - **TTL**: `300` (or leave default)
   - Click **"Add Record"** or **"Save"**

5. **Wait for DNS Propagation** (5-30 minutes):
   - Railway will automatically detect when DNS is configured
   - Go back to Railway → **"Settings"** → **"Domains"**
   - You'll see a status indicator (usually a green checkmark when ready)
   - Railway will automatically enable HTTPS/SSL

6. **Test Your Custom Domain**:
   - Visit: `https://api.techfinalyear.com/api/projects`
   - You should see the same JSON data as before ✅

**Your backend is now live at `https://api.techfinalyear.com`!** 🎉

### Troubleshooting Railway Deployment

**Problem: Can't see my GitHub repository**
- **Solution**: Make sure your repo is public, OR authorize Railway to access private repos in GitHub settings

**Problem: Deployment fails with "npm install" error**
- **Solution**: Check that `package.json` exists in your repo root and all dependencies are listed

**Problem: Deployment succeeds but API returns 404**
- **Solution**: 
  - Check that `npm start` command works locally
  - Verify the PORT environment variable is set
  - Check Railway logs for any runtime errors

**Problem: CORS errors when frontend tries to connect**
- **Solution**: 
  - Verify `ALLOWED_ORIGINS` includes your frontend domain
  - Make sure you've added CORS middleware to `server/index.ts` (see Step 1.4)

**Problem: Custom domain not working**
- **Solution**:
  - Wait 10-30 minutes for DNS propagation
  - Verify CNAME record in Hostinger matches Railway's instructions exactly
  - Check Railway domain status shows "Active" or "Verified"

**Problem: "Out of memory" or build timeout**
- **Solution**: 
  - Railway free tier has limits
  - Try optimizing your build (remove unnecessary dependencies)
  - Consider upgrading to Railway Pro if needed

---

## 3. Build the Frontend for Production

1. On your local machine (after all env edits):
   ```bash
   npm run build
   ```
2. The static site is generated under `dist/public`.
3. Zip the contents of `dist/public` (not the folder itself):
   ```bash
   cd dist/public
   zip -r ../../techfinalyear-frontend.zip .
   ```

---

## 4. Deploy the Frontend on Hostinger Shared Hosting

1. Log in to Hostinger hPanel → `Websites` → select your Premium plan → `Manage`.
2. Open **File Manager** → go to `domains/techfinalyear.com/public_html`.
3. Clean the directory (delete default `index.php` or sample files).
4. Upload `techfinalyear-frontend.zip` to `public_html` and extract.
5. Ensure the extracted files (including `index.html` and the `assets` folder) sit directly inside `public_html`.
6. Set correct file permissions (Hostinger usually does this automatically).
7. Enable SSL:
   - hPanel → `Security` → `SSL` → activate the free SSL for `techfinalyear.com`.
   - Force HTTPS via `Hosting → Manage → SSL` (toggle “Force HTTPS”).
8. (Optional) Redirect `www` to root: `Domains → Redirects → Add redirect from www.techfinalyear.com to techfinalyear.com`.

At this point, hitting `https://techfinalyear.com` should load the static build.

---

## 5. Connect Frontend to Railway API

1. Confirm the frontend build used the correct base URL (`VITE_API_BASE_URL=https://api.techfinalyear.com`). If you change it, re-run `npm run build` and re-upload the `dist/public` contents.
2. Verify HTTPS traffic:
   - Open browser dev tools → Network tab → load `https://techfinalyear.com`.
   - Submit a form (e.g., Project Inquiry) and confirm requests go to `https://api.techfinalyear.com/api/...` with 200 responses.

---

## 6. Final Checklist

- [ ] Admin password stored in `.env` and rebuilt.
- [ ] `ALLOWED_ORIGINS` matches every domain/subdomain that serves the frontend.
- [ ] Railway app is healthy; `/api/projects` responds.
- [ ] Hostinger `public_html` contains the latest `dist/public` build.
- [ ] DNS records:
  - `@` and `www` → Hostinger shared IP.
  - `api` CNAME → Railway custom domain host.
- [ ] SSL enabled on both Hostinger and Railway.
- [ ] `/admin` page accessible and protected by the new password.
- [ ] Contact forms and custom request forms successfully POST to the API.

---

## 7. Maintenance Tips

- Re-deploy workflow:
  1. Update code locally.
  2. `npm run build`.
  3. Commit & push.
  4. Railway auto-redeploys the backend.
  5. Upload the new `dist/public` bundle to Hostinger.
- Backups:
  - Hostinger: enable weekly backups in hPanel.
  - Railway: export data if you later switch from in-memory storage to a database.
- Monitoring:
  - Use Railway logs for API monitoring.
  - Enable Hostinger access logs for static site.

Following these steps keeps your frontend fast on Hostinger while the backend runs on a free Node-friendly platform. Let me know if you’d like this automated via GitHub Actions or need help adding a persistent database.

