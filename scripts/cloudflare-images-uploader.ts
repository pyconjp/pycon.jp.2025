import FormData from 'form-data';
import fetch from 'node-fetch';

export interface CloudflareImagesConfig {
  accountId: string;
  accountHash?: string;
  apiToken: string;
}

export interface CloudflareError {
  code: number;
  message: string;
}

export interface CloudflareMessage {
  code: number;
  message: string;
}

export interface CloudflareImageUploadResponse {
  success: boolean;
  errors: CloudflareError[];
  messages: CloudflareMessage[];
  result?: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  };
}

export interface CloudflareListImagesResponse {
  success: boolean;
  errors: CloudflareError[];
  messages: CloudflareMessage[];
  result?: {
    images: Array<{
      id: string;
      filename: string;
      uploaded: string;
      requireSignedURLs: boolean;
      variants: string[];
    }>;
  };
}

export class CloudflareImagesUploader {
  private accountId: string;
  private accountHash: string;
  private apiToken: string;
  private baseUrl: string;

  constructor(config: CloudflareImagesConfig) {
    this.accountId = config.accountId;
    this.accountHash = config.accountHash || config.accountId; // Fallback to accountId if hash not provided
    this.apiToken = config.apiToken;
    this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1`;
  }

  /**
   * Upload an image to Cloudflare Images
   */
  async uploadImage(
    imageBuffer: Buffer,
    fileName: string,
    customId?: string
  ): Promise<CloudflareImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', imageBuffer, fileName);
    
    if (customId) {
      formData.append('id', customId);
    }

    // Optional: Add metadata
    formData.append('metadata', JSON.stringify({
      source: 'google-drive',
      uploadedAt: new Date().toISOString(),
    }));

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          ...formData.getHeaders(),
        },
        body: formData,
      });

      const result = await response.json() as CloudflareImageUploadResponse;

      if (!result.success) {
        console.error(`❌ Failed to upload ${fileName}:`, result.errors);
      }

      return result;
    } catch (error) {
      console.error(`❌ Error uploading ${fileName}:`, error);
      throw error;
    }
  }

  /**
   * Check if an image exists in Cloudflare Images
   */
  async imageExists(imageId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${imageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      });

      const result = await response.json() as CloudflareImageUploadResponse;
      return result.success;
    } catch {
      return false;
    }
  }

  /**
   * Delete an image from Cloudflare Images
   */
  async deleteImage(imageId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      });

      const result = await response.json() as CloudflareImageUploadResponse;
      return result.success;
    } catch (error) {
      console.error(`❌ Error deleting image ${imageId}:`, error);
      return false;
    }
  }

  /**
   * List all images in Cloudflare Images
   */
  async listImages(page: number = 1, perPage: number = 100): Promise<CloudflareListImagesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      });

      return await response.json() as CloudflareListImagesResponse;
    } catch (error) {
      console.error('❌ Error listing images:', error);
      throw error;
    }
  }

  /**
   * Upload multiple images to Cloudflare Images
   */
  async uploadMultipleImages(
    images: Map<string, Buffer>,
    overwrite: boolean = false
  ): Promise<Map<string, CloudflareImageUploadResponse>> {
    const results = new Map<string, CloudflareImageUploadResponse>();

    for (const [fileName, buffer] of images) {
      // Generate a clean ID from the filename (remove extension, replace spaces)
      const customId = fileName
        .replace(/\.[^/.]+$/, '') // Remove extension
        .replace(/[^a-zA-Z0-9-_]/g, '_') // Replace special chars with underscore
        .toLowerCase();

      try {
        // Check if image exists
        if (!overwrite && await this.imageExists(customId)) {
          console.log(`⏭️  Skipping ${fileName} (already exists)`);
          // Add existing image to results with a mock successful response
          results.set(fileName, {
            success: true,
            errors: [],
            messages: [],
            result: {
              id: customId,
              filename: fileName,
              uploaded: 'existing',
              requireSignedURLs: false,
              variants: ['public']
            }
          });
          continue;
        }

        // If overwriting, delete existing image first
        if (overwrite && await this.imageExists(customId)) {
          console.log(`🗑️  Deleting existing image ${customId}...`);
          await this.deleteImage(customId);
        }

        console.log(`📤 Uploading ${fileName} to Cloudflare Images...`);
        const result = await this.uploadImage(buffer, fileName, customId);
        
        if (result.success) {
          console.log(`✅ Uploaded ${fileName} with ID: ${result.result?.id}`);
        }
        
        results.set(fileName, result);
      } catch (error) {
        console.error(`❌ Failed to upload ${fileName}:`, error);
      }
    }

    return results;
  }

  /**
   * Get the public URL for an image
   */
  getImageUrl(imageId: string, variant: string = 'public'): string {
    return `https://imagedelivery.net/${this.accountHash}/${imageId}/${variant}`;
  }
}