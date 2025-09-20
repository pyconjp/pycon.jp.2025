#!/bin/bash

# Optimized build script for Cloudflare Pages
# This script runs only one build by using vercel build directly

set -e  # Exit on error

echo "🚀 Starting optimized Cloudflare Pages build..."

# 1. Run pre-build script
echo "📡 Running pre-build tasks..."
npm run pre-build

# 2. Set environment variable if CF_PAGES_URL exists
if [ -n "$CF_PAGES_URL" ]; then
  echo "NEXT_PUBLIC_BASE_URL=$CF_PAGES_URL" > .env.production
  echo "✅ Environment variable set: NEXT_PUBLIC_BASE_URL=$CF_PAGES_URL"
fi

# 3. Run normal Next.js build first
echo "🔨 Building with Next.js..."
npx next build

# 4. Generate sitemap
echo "🗺️  Generating sitemap..."
npx next-sitemap

# 5. Run vercel build to create .vercel/output
echo "📦 Creating Vercel output format..."
npx vercel build --prod

# 6. Run next-on-pages with skip-build
echo "⚡ Converting to Cloudflare Pages format..."
npx next-on-pages --skip-build

echo "✅ Build completed successfully!"