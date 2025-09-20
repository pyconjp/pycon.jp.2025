/**
 * Read cached Pretalx session data from JSON file
 * Falls back to API calls if cache doesn't exist
 */

import { Talk } from '@/types/pretalx';
import { fetchSession as fetchSessionFromAPI, fetchSessions, SUBMISSION_TYPES } from './pretalx';
import fs from 'fs';
import path from 'path';

let cachedSessions: Record<string, Talk> | null = null;

/**
 * Load cached sessions from JSON file
 */
function loadCachedSessions(): Record<string, Talk> | null {
  if (cachedSessions) {
    return cachedSessions;
  }

  try {
    const filePath = path.join(process.cwd(), '.next', 'cache', 'pretalx-sessions.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      cachedSessions = JSON.parse(data);
      console.log(`📚 Loaded ${Object.keys(cachedSessions!).length} sessions from cache`);
      return cachedSessions;
    }
  } catch (error) {
    console.warn('⚠️  Failed to load cached sessions:', error);
  }

  return null;
}

/**
 * Get a single session from cache or API
 */
export async function fetchSession(code: string): Promise<Talk | null> {
  // Try to load from cache first
  const cache = loadCachedSessions();
  if (cache && cache[code]) {
    return cache[code];
  }

  // Fall back to API call
  console.log(`📡 Fetching session ${code} from API (not in cache)`);
  return fetchSessionFromAPI(code);
}

/**
 * Get all sessions from cache or API
 */
export async function getAllSessions(): Promise<Talk[]> {
  // Try to load from cache first
  const cache = loadCachedSessions();
  if (cache) {
    return Object.values(cache);
  }

  // Fall back to API calls
  console.log('📡 Cache not found, fetching all sessions from API...');
  const [talks, specials, posters, communityPosters] = await Promise.all([
    fetchSessions(SUBMISSION_TYPES.TALK),
    fetchSessions(SUBMISSION_TYPES.SPECIAL),
    fetchSessions(SUBMISSION_TYPES.POSTER),
    fetchSessions(SUBMISSION_TYPES.COMMUNITY_POSTER),
  ]);

  return [...talks, ...specials, ...posters, ...communityPosters];
}