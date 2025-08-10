#!/usr/bin/env tsx

/**
 * Pre-build script that runs before Next.js build
 * - Downloads images from multiple Google Drive folders
 * - Uploads them to Cloudflare Images
 */

import {GoogleDriveDownloader} from './google-drive-downloader';
import {CloudflareImagesUploader} from './cloudflare-images-uploader';
import * as fs from 'fs';
import * as path from 'path';

interface FolderConfig {
  id: string;
  category: string;
}

interface ImageMappingData {
  [category: string]: {
    [fileName: string]: string;
  };
}

/**
 * Parse folder configuration from environment variables
 * Format: GOOGLE_DRIVE_FOLDERS="members:folder_id1,sponsors:folder_id2"
 */
function parseFolderConfiguration(): FolderConfig[] {
  const folders: FolderConfig[] = [];

  if (!process.env.GOOGLE_DRIVE_FOLDERS) {
    return folders;
  }

  const folderPairs = process.env.GOOGLE_DRIVE_FOLDERS.split(',');
  for (const pair of folderPairs) {
    const [category, id] = pair.trim().split(':');
    if (category && id) {
      folders.push({category: category.toLowerCase(), id: id.trim()});
    }
  }

  return folders;
}

async function syncImagesToCloudflare() {
  // Initialize empty mapping
  const imageMapping: ImageMappingData = {};
  const mappingPath = path.join(process.cwd(), 'src', 'data', 'cloudflare-images.json');

  // Parse folder configuration
  const folderConfigs = parseFolderConfiguration();

  if (folderConfigs.length === 0) {
    console.warn('⚠️  No Google Drive folders configured for image sync');
    console.log('   Set GOOGLE_DRIVE_FOLDERS environment variable:');
    console.log('   Example: GOOGLE_DRIVE_FOLDERS="members:folder_id1,sponsors:folder_id2"');
    // Write empty mapping file to prevent errors
    fs.mkdirSync(path.dirname(mappingPath), {recursive: true});
    fs.writeFileSync(mappingPath, JSON.stringify({members: {}, sponsors: {}}, null, 2));
    console.log('💾 Created empty image mapping file');
    return;
  }

  // Check for required authentication environment variables
  const authRequiredVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_API_TOKEN',
  ];

  const missingVars = authRequiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(`⚠️  Skipping image sync - Missing environment variables: ${missingVars.join(', ')}`);
    console.log('   To enable image sync, please set all required environment variables.');
    // Write empty mapping file to prevent errors
    fs.mkdirSync(path.dirname(mappingPath), {recursive: true});
    fs.writeFileSync(mappingPath, JSON.stringify({members: {}, sponsors: {}}, null, 2));
    console.log('💾 Created empty image mapping file');
    return;
  }

  console.log('🖼️  Starting Google Drive to Cloudflare Images sync...');
  console.log('🔐 Using service account authentication');
  console.log(`📁 Configured folders: ${folderConfigs.map(f => f.category).join(', ')}`);

  try {
    // Create service account credentials from environment variables
    const serviceAccountCredentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    };

    // Get Team Drive ID if configured
    const teamDriveId = process.env.GOOGLE_TEAM_DRIVE_ID;
    if (teamDriveId) {
      console.log(`🏢 Using Team Drive: ${teamDriveId}`);
    }

    const driveDownloader = new GoogleDriveDownloader(serviceAccountCredentials, teamDriveId);

    // Authorize the service account
    await driveDownloader.authorize();

    // Initialize Cloudflare Images uploader
    const cloudflareUploader = new CloudflareImagesUploader({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
    });

    // Process each folder
    let totalImagesProcessed = 0;

    for (const folderConfig of folderConfigs) {
      console.log(`\n📂 Processing ${folderConfig.category} folder (${folderConfig.id})...`);

      try {
        // Download images from this folder
        const images = await driveDownloader.downloadAllImagesFromFolder(folderConfig.id);

        if (images.size === 0) {
          console.log(`📭 No images found in ${folderConfig.category} folder`);
          continue;
        }

        console.log(`📦 Downloaded ${images.size} images from ${folderConfig.category} folder`);

        // Upload images to Cloudflare Images with category prefix
        console.log(`☁️  Uploading ${folderConfig.category} images to Cloudflare Images...`);
        const overwrite = process.env.CLOUDFLARE_IMAGES_OVERWRITE === 'true';

        // Add category prefix to image IDs for better organization
        const categorizedImages = new Map<string, Buffer>();
        for (const [fileName, buffer] of images) {
          const categorizedFileName = `${folderConfig.category}_${fileName}`;
          categorizedImages.set(categorizedFileName, buffer);
        }

        const results = await cloudflareUploader.uploadMultipleImages(categorizedImages, overwrite);

        // Generate mapping for this category
        imageMapping[folderConfig.category] = {};
        for (const [fileName, result] of results) {
          if (result.success && result.result) {
            // Remove the category prefix from the mapping key
            const originalFileName = fileName.replace(`${folderConfig.category}_`, '');
            imageMapping[folderConfig.category][originalFileName] = cloudflareUploader.getImageUrl(result.result.id);
          }
        }

        totalImagesProcessed += results.size;
        console.log(`✅ Processed ${results.size} images from ${folderConfig.category} folder`);
      } catch (error) {
        console.error(`❌ Failed to process ${folderConfig.category} folder:`, error);
        // Continue with other folders even if one fails
      }
    }

    // Save the mapping to a JSON file for use in the application
    fs.mkdirSync(path.dirname(mappingPath), {recursive: true});
    fs.writeFileSync(mappingPath, JSON.stringify(imageMapping, null, 2));

    console.log(`\n💾 Saved image mapping to ${mappingPath}`);
    console.log(`✅ Successfully synced ${totalImagesProcessed} images across ${folderConfigs.length} folders`);
  } catch (error) {
    console.error('❌ Image sync failed:', error);
    // Don't fail the build if image sync fails
    console.log('⚠️  Continuing with build despite image sync failure');
  }
}

async function preBuild() {
  console.log('🚀 Running pre-build script...');

  // Validate other environment variables
  const otherEnvVars = [
    'NEXT_PUBLIC_GA_ID',
  ];

  const missingOtherVars = otherEnvVars.filter(varName => !process.env[varName]);

  if (missingOtherVars.length > 0) {
    console.warn(`⚠️  Warning: Missing environment variables: ${missingOtherVars.join(', ')}`);
  }

  // Generate build metadata
  const buildInfo = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'production',
  };

  console.log('📋 Build info:', buildInfo);

  // Sync images from Google Drive to Cloudflare Images
  await syncImagesToCloudflare();

  console.log('✅ Pre-build script completed successfully');
}

// Run the script
preBuild().catch((error) => {
  console.error('❌ Pre-build script failed:', error);
  process.exit(1);
});