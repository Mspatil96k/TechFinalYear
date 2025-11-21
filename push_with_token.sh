#!/bin/bash
echo "🔐 GitHub Push with Personal Access Token"
echo "=========================================="
echo ""
echo "⚠️  You need a Personal Access Token from:"
echo "   https://github.com/settings/tokens"
echo ""
read -p "Enter your Personal Access Token: " TOKEN
echo ""
echo "🔗 Updating remote URL..."
git remote set-url origin https://${TOKEN}@github.com/shindemeghraj57-lab/TechFinalYear.git
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main
echo ""
echo "✅ Done! Check: https://github.com/shindemeghraj57-lab/TechFinalYear"
