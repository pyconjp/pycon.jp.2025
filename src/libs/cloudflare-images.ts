import { getCloudflareImageUrl as getImageUrl } from '@/utils/cloudflare-image-helper';

/**
 * Get Cloudflare image URL by category and filename
 * @param category - The category (e.g., 'members', 'sponsors')
 * @param fileName - The image filename
 * @returns The Cloudflare Images URL or undefined if not found
 */
export function getCloudflareImageUrl(category: string, fileName: string): string | undefined {
  try {
    return getImageUrl(fileName, category);
  } catch {
    console.warn(`Failed to generate Cloudflare image URL for ${category}/${fileName}`);
    return undefined;
  }
}