# 🚀 Quick GitHub Setup (5 Minutes)

## Step 1: Create GitHub Repository (2 min)

1. Go to: https://github.com/new
2. Repository name: `TechFinalYear`
3. Description: `Engineering Final Year Projects Platform`
4. Visibility: ✅ **Public** (for Railway free tier)
5. **DO NOT** check any boxes (README, .gitignore, license)
6. Click **"Create repository"**
7. **Copy the repository URL** (e.g., `https://github.com/YOUR_USERNAME/TechFinalYear.git`)

---

## Step 2: Connect & Push (3 min)

### Option A: Use the Script (Easiest)
```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
./PUSH_TO_GITHUB.sh
```
Follow the prompts!

### Option B: Manual Commands
```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/TechFinalYear.git

# Push to GitHub
git push -u origin main
```

**If you get "remote origin already exists":**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/TechFinalYear.git
git push -u origin main
```

---

## Step 3: Verify ✅

1. Go to: `https://github.com/YOUR_USERNAME/TechFinalYear`
2. Check that all files are there
3. Make sure `.env` is **NOT** visible (it's ignored)

---

## Step 4: Connect to Railway 🚂

1. Go to: https://railway.app/
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **TechFinalYear**
5. Railway will auto-deploy! 🎉

---

## Troubleshooting

**Authentication Error?**
- GitHub requires Personal Access Token (not password)
- Create token: GitHub → Settings → Developer settings → Personal access tokens
- Use token as password when pushing

**Repository not found?**
- Check the URL is correct
- Make sure repository is created on GitHub first

---

**That's it! Your project is now on GitHub and ready for Railway! 🎊**
