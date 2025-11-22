#!/bin/bash

echo "🚀 Preparing Frontend for Hostinger Deployment"
echo "=============================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    exit 1
fi

# Get Railway URL
echo "📋 Current API Base URL:"
grep "VITE_API_BASE_URL" .env || echo "VITE_API_BASE_URL not set"

echo ""
read -p "Enter your Railway backend URL (e.g., https://techfinalyear-production-xxxx.up.railway.app or https://api.techfinalyear.com): " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

# Update .env
echo ""
echo "🔧 Updating .env file..."
sed -i.bak "s|VITE_API_BASE_URL=.*|VITE_API_BASE_URL=$RAILWAY_URL|" .env

echo "✅ Updated VITE_API_BASE_URL to: $RAILWAY_URL"

# Build frontend
echo ""
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Create ZIP file
echo ""
echo "📁 Creating ZIP file..."
cd dist/public
zip -r ../../techfinalyear-frontend.zip . > /dev/null
cd ../..

if [ -f "techfinalyear-frontend.zip" ]; then
    ZIP_SIZE=$(du -h techfinalyear-frontend.zip | cut -f1)
    echo "✅ Created: techfinalyear-frontend.zip ($ZIP_SIZE)"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Log in to Hostinger hPanel"
    echo "2. Go to File Manager → public_html"
    echo "3. Delete old files"
    echo "4. Upload techfinalyear-frontend.zip"
    echo "5. Extract it in public_html"
    echo "6. Enable SSL"
    echo ""
    echo "📖 Full guide: See HOSTINGER_FRONTEND_DEPLOYMENT.md"
else
    echo "❌ Failed to create ZIP file"
    exit 1
fi

