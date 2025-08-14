/**
 * Helper functions for Cloudflare Images (for scripts)
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