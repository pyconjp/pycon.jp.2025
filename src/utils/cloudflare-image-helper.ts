/**
 * Helper functions for Cloudflare Images
 */

/**
 * Convert a filename to a Cloudflare Image ID
 * @param fileName - Original filename (e.g., "John_DOE.jpg")
 * @param category - Category prefix (e.g., "members", "sponsors")
 * @returns Cloudflare Image ID (e.g., "members_john_doe")
 */
export function generateCloudflareImageId(fileName: string, category: string): string {
  const categorizedFileName = `${category}_${fileName}`;
  return categorizedFileName
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9-_]/g, '_') // Replace special chars with underscore
    .toLowerCase();
}

/**
 * Get the public URL for a Cloudflare Image
 * @param fileName - Original filename (e.g., "John_DOE.jpg")
 * @param category - Category prefix (e.g., "members", "sponsors")
 * @param variant - Image variant (default: "public")
 * @returns Cloudflare Image URL
 */
export function getCloudflareImageUrl(
  fileName: string,
  category: string,
  variant: string = 'public'
): string | undefined {
  // Check if a fileName is empty or invalid
  if (!fileName || fileName.trim() === '') {
    console.warn(`Empty fileName provided for category: ${category}`);
    return undefined;
  }

  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
  if (!accountHash) {
    console.warn('Cloudflare account hash not configured');
    return undefined;
  }

  const imageId = generateCloudflareImageId(fileName, category);
  return `https://imagedelivery.net/${accountHash}/${imageId}/${variant}`;
}