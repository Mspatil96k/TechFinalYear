#!/bin/bash

# GitHub Repository Setup Script
# Run this after creating your GitHub repository

echo "🚀 GitHub Repository Setup for Railway Deployment"
echo "=================================================="
echo ""

# Get GitHub username and repo name
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter repository name (default: TechFinalYear): " REPO_NAME
REPO_NAME=${REPO_NAME:-TechFinalYear}

GITHUB_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "📋 Repository URL: ${GITHUB_URL}"
echo ""

# Check if origin already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists"
    read -p "Do you want to replace it? (y/n): " REPLACE
    if [ "$REPLACE" = "y" ]; then
        git remote remove origin
        echo "✅ Removed existing origin"
    else
        echo "❌ Cancelled. Please manually update remote."
        exit 1
    fi
fi

# Add GitHub remote
echo "🔗 Adding GitHub remote..."
git remote add origin "${GITHUB_URL}"

# Verify remote
echo ""
echo "📡 Current remotes:"
git remote -v

echo ""
read -p "Ready to push to GitHub? (y/n): " PUSH
if [ "$PUSH" = "y" ]; then
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    echo ""
    echo "✅ Success! Your code is now on GitHub!"
    echo "🌐 View it at: ${GITHUB_URL}"
    echo ""
    echo "Next step: Go to Railway and deploy from this repository!"
else
    echo "⏸️  Skipped push. Run 'git push -u origin main' when ready."
fi

