#!/usr/bin/env tsx

/**
 * Pre-build script that runs before Next.js build
 * - Downloads images from multiple Google Drive folders
 * - Uploads them to Cloudflare Images
 */

import {GoogleDriveDownloader} from './google-drive-downloader';
import {CloudflareImagesUploader, CloudflareImageUploadResponse} from './cloudflare-images-uploader';
import {generateCloudflareImageId} from './cloudflare-image-helper';

interface FolderConfig {
  id: string;
  category: string;
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
  // Parse folder configuration
  const folderConfigs = parseFolderConfiguration();

  if (folderConfigs.length === 0) {
    console.warn('⚠️  No Google Drive folders configured for image sync');
    console.log('   Set GOOGLE_DRIVE_FOLDERS environment variable:');
    console.log('   Example: GOOGLE_DRIVE_FOLDERS="members:folder_id1,sponsors:folder_id2"');
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
      accountHash: process.env.CLOUDFLARE_ACCOUNT_HASH,
      apiToken: process.env.CLOUDFLARE_API_TOKEN!,
    });

    // Process each folder
    let totalImagesProcessed = 0;

    for (const folderConfig of folderConfigs) {
      console.log(`\n📂 Processing ${folderConfig.category} folder (${folderConfig.id})...`);

      try {
        // First, list all images in the folder without downloading
        console.log(`🔍 Fetching image list from ${folderConfig.category} folder...`);
        const fileList = await driveDownloader.listFilesInFolder(folderConfig.id);

        if (fileList.length === 0) {
          console.log(`📭 No images found in ${folderConfig.category} folder`);
          continue;
        }

        console.log(`📋 Found ${fileList.length} images in ${folderConfig.category} folder`);

        // Check which images need to be uploaded
        const overwrite = process.env.CLOUDFLARE_IMAGES_OVERWRITE === 'true';
        const imagesToDownload: typeof fileList = [];
        const existingImages: Map<string, string> = new Map();

        for (const file of fileList) {
          const customId = generateCloudflareImageId(file.fileName, folderConfig.category);

          if (!overwrite && await cloudflareUploader.imageExists(customId)) {
            console.log(`⏭️  Skipping ${file.fileName} (already exists in Cloudflare)`);
            existingImages.set(file.fileName, cloudflareUploader.getImageUrl(customId));
          } else {
            imagesToDownload.push(file);
          }
        }

        console.log(`📥 Need to download ${imagesToDownload.length} new/updated images`);

        // Download only the necessary images
        const downloadedImages = new Map<string, Buffer>();
        if (imagesToDownload.length > 0) {
          const downloads = await driveDownloader.downloadMultipleFiles(imagesToDownload);

          // Add category prefix to downloaded images
          for (const [fileName, buffer] of downloads) {
            const categorizedFileName = `${folderConfig.category}_${fileName}`;
            downloadedImages.set(categorizedFileName, buffer);
          }
        }

        // Upload the downloaded images to Cloudflare
        let uploadResults = new Map<string, CloudflareImageUploadResponse>();
        if (downloadedImages.size > 0) {
          console.log(`☁️  Uploading ${downloadedImages.size} images to Cloudflare Images...`);
          uploadResults = await cloudflareUploader.uploadMultipleImages(downloadedImages, overwrite);
        }

        const totalProcessed = existingImages.size + uploadResults.size;
        totalImagesProcessed += totalProcessed;
        console.log(`✅ Processed ${totalProcessed} images from ${folderConfig.category} folder (${existingImages.size} existing, ${uploadResults.size} new/updated)`);
      } catch (error) {
        console.error(`❌ Failed to process ${folderConfig.category} folder:`, error);
        // Continue with other folders even if one fails
      }
    }

    console.log(`✅ Successfully synced ${totalImagesProcessed} images across ${folderConfigs.length} folders`);
  } catch (error) {
    console.error('❌ Image sync failed:', error);
    // Don't fail the build if image sync fails
    console.log('⚠️  Continuing with build despite image sync failure');
  }
}

async function preBuild() {
  console.log('🚀 Running pre-build script...');

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