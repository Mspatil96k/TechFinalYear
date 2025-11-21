# Fix GitHub Authentication Error

## Problem
```
remote: Permission to shindemeghraj57-lab/TechFinalYear.git denied to Mspatil96k.
fatal: unable to access 'https://github.com/shindemeghraj57-lab/TechFinalYear.git/': The requested URL returned error: 403
```

This means git is trying to use the wrong GitHub account (`Mspatil96k`) to push to `shindemeghraj57-lab` repository.

---

## Solution: Use Personal Access Token

GitHub no longer accepts passwords. You need a **Personal Access Token**.

### Step 1: Create Personal Access Token

1. **Go to GitHub**: https://github.com/settings/tokens
2. **Click "Generate new token"** → **"Generate new token (classic)"**
3. **Fill in**:
   - **Note**: `TechFinalYear Deployment`
   - **Expiration**: Choose duration (90 days or custom)
   - **Scopes**: Check ✅ **`repo`** (full control of private repositories)
4. **Click "Generate token"**
5. **Copy the token immediately** (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Use Token to Push

**Option A: Use token in URL (One-time)**
```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# Replace YOUR_TOKEN with your actual token
git remote set-url origin https://YOUR_TOKEN@github.com/shindemeghraj57-lab/TechFinalYear.git

# Now push
git push -u origin main
```

**Option B: Use token when prompted (Recommended)**
```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear

# Push (it will ask for credentials)
git push -u origin main

# When prompted:
# Username: shindemeghraj57-lab
# Password: YOUR_TOKEN (paste the token, not your password!)
```

**Option C: Use GitHub CLI (Best for long-term)**
```bash
# Install GitHub CLI (if not installed)
brew install gh

# Authenticate
gh auth login

# Then push normally
git push -u origin main
```

---

## Alternative: Use SSH Instead of HTTPS

### Step 1: Generate SSH Key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Press Enter for no passphrase (or set one)
```

### Step 2: Add SSH Key to GitHub
```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub
# Copy the output
```

1. Go to: https://github.com/settings/keys
2. Click **"New SSH key"**
3. **Title**: `MacBook Air` (or any name)
4. **Key**: Paste the copied key
5. Click **"Add SSH key"**

### Step 3: Change Remote to SSH
```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
git remote set-url origin git@github.com:shindemeghraj57-lab/TechFinalYear.git
git push -u origin main
```

---

## Quick Fix (Fastest)

1. **Get Personal Access Token** from: https://github.com/settings/tokens
2. **Run this command** (replace YOUR_TOKEN):
```bash
cd /Users/meghrajshinde/Desktop/TechFinalYear
git remote set-url origin https://YOUR_TOKEN@github.com/shindemeghraj57-lab/TechFinalYear.git
git push -u origin main
```

---

## Verify After Push

1. Go to: https://github.com/shindemeghraj57-lab/TechFinalYear
2. Check that all your files are there
3. Make sure `.env` is **NOT** visible (it's in `.gitignore`)

---

## Next Step: Connect to Railway

Once your code is on GitHub:
1. Go to: https://railway.app/
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select **TechFinalYear**
5. Railway will auto-deploy! 🎉


