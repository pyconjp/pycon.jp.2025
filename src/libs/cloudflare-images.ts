import mappingData from '@/data/cloudflare-images.json';

export interface CloudflareImageMapping {
  [category: string]: {
    [fileName: string]: string;
  };
}

/**
 * Get Cloudflare image URL by category and filename
 * @param category - The category (e.g., 'members', 'sponsors')
 * @param fileName - The image filename
 * @returns The Cloudflare Images URL or undefined if not found
 */
export function getCloudflareImageUrl(category: string, fileName: string): string | undefined {
  try {
    const mapping = mappingData as CloudflareImageMapping;
    return mapping[category]?.[fileName];
  } catch {
    console.warn(`Cloudflare image mapping not found for ${category}/${fileName}`);
    return undefined;
  }
}

/**
 * Get all images for a specific category
 * @param category - The category (e.g., 'members', 'sponsors')
 * @returns Object with filename to URL mapping or empty object if category not found
 */
export function getCloudflareImagesByCategory(category: string): Record<string, string> {
  try {
    const mapping = mappingData as CloudflareImageMapping;
    return mapping[category] || {};
  } catch {
    console.warn(`Cloudflare image mapping not found for category ${category}`);
    return {};
  }
}

/**
 * Get all available categories
 * @returns Array of category names
 */
export function getCloudflareImageCategories(): string[] {
  try {
    const mapping = mappingData as CloudflareImageMapping;
    return Object.keys(mapping);
  } catch {
    console.warn('Cloudflare image mapping file not found');
    return [];
  }
}