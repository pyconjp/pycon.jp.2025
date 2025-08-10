import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { Readable } from 'stream';

export interface GoogleDriveImage {
  fileId: string;
  fileName: string;
  mimeType?: string;
}

export interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

export class GoogleDriveDownloader {
  private drive;
  private readonly auth: JWT;
  private teamDriveId?: string;

  constructor(credentials: ServiceAccountCredentials, teamDriveId?: string) {
    // Create a JWT client for service account authentication
    this.auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    this.drive = google.drive({ version: 'v3', auth: this.auth });
    this.teamDriveId = teamDriveId;
  }

  /**
   * Initialize and authorize the service account
   */
  async authorize(): Promise<void> {
    try {
      await this.auth.authorize();
      console.log('✅ Service account authorized successfully');
    } catch (error) {
      console.error('❌ Failed to authorize service account:', error);
      throw error;
    }
  }

  /**
   * Download a file from Google Drive
   */
  async downloadFile(fileId: string, fileName: string): Promise<Buffer> {
    try {
      const params: any = {
        fileId: fileId,
        alt: 'media',
      };

      // Add Team Drive support
      if (this.teamDriveId) {
        params.supportsAllDrives = true;
      }

      const response = await this.drive.files.get(
        params,
        {
          responseType: 'stream',
        }
      );

      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        const stream = response.data as Readable;

        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });
    } catch (error) {
      console.error(`Failed to download file ${fileName} (${fileId}):`, error);
      throw error;
    }
  }

  /**
   * Get file metadata from Google Drive
   */
  async getFileMetadata(fileId: string) {
    try {
      const params: any = {
        fileId: fileId,
        fields: 'id, name, mimeType, size',
      };

      // Add Team Drive support
      if (this.teamDriveId) {
        params.supportsAllDrives = true;
      }

      const response = await this.drive.files.get(params);
      return response.data;
    } catch (error) {
      console.error(`Failed to get metadata for file ${fileId}:`, error);
      throw error;
    }
  }

  /**
   * List files in a Google Drive folder
   */
  async listFilesInFolder(folderId: string): Promise<GoogleDriveImage[]> {
    try {
      const params: any = {
        q: `'${folderId}' in parents and mimeType contains 'image/'`,
        fields: 'files(id, name, mimeType)',
        pageSize: 1000,
      };

      // Add Team Drive support
      if (this.teamDriveId) {
        params.supportsAllDrives = true;
        params.includeItemsFromAllDrives = true;
        params.corpora = 'drive';
        params.driveId = this.teamDriveId;
      }

      const response = await this.drive.files.list(params);

      return (response.data.files || []).map(file => ({
        fileId: file.id as string,
        fileName: file.name as string,
        mimeType: file.mimeType as string | undefined,
      }));
    } catch (error) {
      console.error(`Failed to list files in folder ${folderId}:`, error);
      throw error;
    }
  }

  /**
   * Download multiple files from Google Drive
   */
  async downloadMultipleFiles(files: GoogleDriveImage[]): Promise<Map<string, Buffer>> {
    const downloads = new Map<string, Buffer>();

    for (const file of files) {
      try {
        console.log(`📥 Downloading ${file.fileName}...`);
        const buffer = await this.downloadFile(file.fileId, file.fileName);
        downloads.set(file.fileName, buffer);
        console.log(`✅ Downloaded ${file.fileName} (${buffer.length} bytes)`);
      } catch (error) {
        console.error(`❌ Failed to download ${file.fileName}:`, error);
      }
    }

    return downloads;
  }

  /**
   * Download all images from a Google Drive folder
   */
  async downloadAllImagesFromFolder(folderId: string): Promise<Map<string, Buffer>> {
    console.log(`🔍 Fetching image list from folder ${folderId}...`);
    const files = await this.listFilesInFolder(folderId);
    console.log(`📋 Found ${files.length} images`);
    
    return this.downloadMultipleFiles(files);
  }
}