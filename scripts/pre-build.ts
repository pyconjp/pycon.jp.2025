#!/usr/bin/env tsx

/**
 * Pre-build script that runs before the Next.js build
 */

import {fetchAndSavePretalxData} from './fetch-pretalx-data';

async function preBuild() {
  console.log('🚀 Running pre-build script...');

  // Generate build metadata
  const buildInfo = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'production',
  };

  console.log('📋 Build info:', buildInfo);

  // Fetch and cache Pretalx session data
  if (process.env.PRETALX_API_KEY) {
    try {
      await fetchAndSavePretalxData();
    } catch (error) {
      console.error('⚠️  Failed to fetch Pretalx data:', error);
      console.log('   Continuing with build - will fetch data during build time');
    }
  } else {
    console.log('⚠️  Skipping Pretalx data fetch - PRETALX_API_KEY not set');
  }

  console.log('✅ Pre-build script completed successfully');
}

// Run the script
preBuild().catch((error) => {
  console.error('❌ Pre-build script failed:', error);
  process.exit(1);
});