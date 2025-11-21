# GitHub Repository Setup Guide for Railway Deployment

This guide will help you create a GitHub repository and connect it to Railway.

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com
2. **Sign in** to your GitHub account (or create one if you don't have it)
3. **Click the "+" icon** (top right) → **"New repository"**
4. **Fill in repository details**:
   - **Repository name**: `TechFinalYear` (or `techfinalyear`)
   - **Description**: `Engineering & Diploma Final Year Projects Platform - Full-stack React + Node.js application`
   - **Visibility**: 
     - ✅ **Public** (recommended for free Railway deployment)
     - OR **Private** (if you want to keep it private - requires Railway Pro)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore or license (we already have them)
5. **Click "Create repository"**

6. **Copy the repository URL** that GitHub shows you:
   - It will look like: `https://github.com/YOUR_USERNAME/TechFinalYear.git`
   - Or SSH: `git@github.com:YOUR_USERNAME/TechFinalYear.git`

---

## Step 2: Connect Local Project to GitHub

### If you already have a git repository (which you do):

Run these commands in your terminal:

```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# 1. Stage all changes
git add .

# 2. Commit all changes
git commit -m "Prepare project for deployment: Add CORS, API base URL, env config, and deployment guides"

# 3. Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/TechFinalYear.git

# If you already have an 'origin' remote, remove it first:
# git remote remove origin
# Then add the new one:
# git remote add origin https://github.com/YOUR_USERNAME/TechFinalYear.git

# 4. Push to GitHub
git push -u origin main
```

**Note**: If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

---

## Step 3: Verify GitHub Connection

1. **Go to your GitHub repository**: `https://github.com/YOUR_USERNAME/TechFinalYear`
2. **Check that all files are there**:
   - You should see: `package.json`, `README.md`, `client/`, `server/`, etc.
   - Make sure `.env` is **NOT** visible (it's in `.gitignore`)

---

## Step 4: Connect to Railway

1. **Go to Railway**: https://railway.app/
2. **Sign in** with GitHub (if not already)
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository**: `TechFinalYear`
5. **Railway will automatically deploy** your project!

---

## Troubleshooting

### Problem: "Repository not found" when pushing
- **Solution**: Make sure the repository name matches exactly
- Check that you have access to the repository
- Verify the URL is correct

### Problem: Authentication failed
- **Solution**: GitHub no longer accepts passwords
- Use a **Personal Access Token**:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` permissions
  3. Use token as password when pushing

### Problem: "Remote origin already exists"
- **Solution**: 
  ```bash
  git remote remove origin
  git remote add origin https://github.com/YOUR_USERNAME/TechFinalYear.git
  ```

### Problem: Files not showing on GitHub
- **Solution**: Make sure you committed and pushed:
  ```bash
  git add .
  git commit -m "Your message"
  git push -u origin main
  ```

---

## Quick Command Reference

```bash
# Check current remotes
git remote -v

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/TechFinalYear.git

# Remove existing remote (if needed)
git remote remove origin

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push -u origin main

# Check status
git status
```

---

## Next Steps After GitHub Setup

1. ✅ Repository created on GitHub
2. ✅ Code pushed to GitHub
3. ✅ Connect to Railway (follow HOSTINGER_RAILWAY_DEPLOYMENT.md Step 2)
4. ✅ Deploy backend to Railway
5. ✅ Deploy frontend to Hostinger

---

## Important Notes

- **Never commit `.env` file** - it contains sensitive data
- **`.env` is already in `.gitignore`** - so it won't be committed
- **For production**, set environment variables in Railway dashboard
- **Keep your repository public** if using Railway free tier (or upgrade to Pro for private repos)

