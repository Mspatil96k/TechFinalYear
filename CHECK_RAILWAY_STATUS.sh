#!/bin/bash

echo "🚂 Railway Deployment Status Checker"
echo "====================================="
echo ""

read -p "Enter your Railway URL (e.g., https://techfinalyear-production-xxxx.up.railway.app): " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo ""
echo "🔍 Checking deployment status..."
echo ""

# Test API endpoint
echo "1️⃣  Testing API endpoint: ${RAILWAY_URL}/api/projects"
echo "─────────────────────────────────────────────────────"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${RAILWAY_URL}/api/projects")
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "${RAILWAY_URL}/api/projects")

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Status: SUCCESS (HTTP $HTTP_CODE)"
    echo "✅ Response Time: ${RESPONSE_TIME}s"
    echo ""
    echo "📦 Testing API response..."
    curl -s "${RAILWAY_URL}/api/projects" | head -c 200
    echo "..."
    echo ""
    echo "🎉 Deployment is SUCCESSFUL!"
else
    echo "❌ Status: FAILED (HTTP $HTTP_CODE)"
    echo ""
    echo "Possible issues:"
    echo "  - Service might be down"
    echo "  - Build might have failed"
    echo "  - Check Railway dashboard logs"
    echo ""
    echo "Check Railway dashboard: https://railway.app/dashboard"
fi

echo ""
echo "2️⃣  Quick Status Check"
echo "─────────────────────────────────────────────────────"
echo "✅ Go to Railway Dashboard: https://railway.app/dashboard"
echo "✅ Check deployment status (should show green checkmark)"
echo "✅ Check service logs for any errors"
echo "✅ Verify environment variables are set"
echo ""

echo "📋 Full guide: See RAILWAY_DEPLOYMENT_STATUS.md"
