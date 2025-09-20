/**
 * Read cached Pretalx session data from JSON file
 * Falls back to API calls if cache doesn't exist
 */

import { Talk } from '@/types/pretalx';
import { fetchSession as fetchSessionFromAPI, fetchSessions, SUBMISSION_TYPES } from './pretalx';
import fs from 'fs';
import path from 'path';

let cachedSessions: Record<string, Talk> | null = null;
let isCacheGenerating = false;
let cacheGenerationPromise: Promise<Record<string, Talk> | null> | null = null;

/**
 * Fetch all sessions from API
 */
async function fetchAllSessionsFromAPI(): Promise<Talk[]> {
  const [talks, specials, posters, communityPosters] = await Promise.all([
    fetchSessions(SUBMISSION_TYPES.TALK),
    fetchSessions(SUBMISSION_TYPES.SPECIAL),
    fetchSessions(SUBMISSION_TYPES.POSTER),
    fetchSessions(SUBMISSION_TYPES.COMMUNITY_POSTER),
  ]);
  return [...talks, ...specials, ...posters, ...communityPosters];
}

/**
 * Generate a cache file if it doesn't exist
 */
async function generateCacheFile(): Promise<Record<string, Talk> | null> {
  if (!process.env.PRETALX_API_KEY) {
    console.log('⚠️  Cannot generate cache - PRETALX_API_KEY not set');
    return null;
  }

  console.log('🔨 Generating Pretalx session cache...');

  try {
    // Fetch all session types in parallel
    const allSessions = await fetchAllSessionsFromAPI();

    // Create a map for an easy lookup
    const sessionsMap: Record<string, Talk> = {};
    allSessions.forEach(session => {
      sessionsMap[session.code] = session;
    });

    // Save to JSON file
    const dataDir = path.join(process.cwd(), 'data');
    fs.mkdirSync(dataDir, { recursive: true });

    const filePath = path.join(dataDir, 'pretalx-sessions.json');
    fs.writeFileSync(filePath, JSON.stringify(sessionsMap, null, 2));

    console.log(`✅ Generated cache with ${allSessions.length} sessions at ${filePath}`);

    return sessionsMap;
  } catch (error) {
    console.error('❌ Failed to generate cache:', error);
    return null;
  }
}

/**
 * Load cached sessions from a JSON file or generate it
 */
async function loadCachedSessions(): Promise<Record<string, Talk> | null> {
  if (cachedSessions) {
    return cachedSessions;
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'pretalx-sessions.json');
    console.log(`🔍 Looking for cache at: ${filePath}`);

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      cachedSessions = JSON.parse(data);
      console.log(`📚 Loaded ${Object.keys(cachedSessions!).length} sessions from cache`);
      return cachedSessions;
    } else {
      console.log(`❌ Cache file not found at: ${filePath}`);

      // Generate cache if not exists (only once)
      if (!isCacheGenerating) {
        isCacheGenerating = true;
        cacheGenerationPromise = generateCacheFile();
      }

      // Wait for cache generation to complete
      if (cacheGenerationPromise) {
        cachedSessions = await cacheGenerationPromise;
        return cachedSessions;
      }
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
  // Try to load from the cache first
  const cache = await loadCachedSessions();
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
  // Try to load from the cache first
  const cache = await loadCachedSessions();
  if (cache) {
    return Object.values(cache);
  }

  // Fall back to API calls
  console.log('📡 Cache not found, fetching all sessions from API...');
  return fetchAllSessionsFromAPI();
}

/**
 * Get sessions by submission type from cache or API
 */
export async function getSessionsByType(submissionType: typeof SUBMISSION_TYPES[keyof typeof SUBMISSION_TYPES]): Promise<Talk[]> {
  // Try to load from the cache first
  const cache = await loadCachedSessions();
  if (cache) {
    const allSessions = Object.values(cache);
    return allSessions.filter(session => session.submission_type_id === submissionType);
  }

  // Fall back to API call
  console.log(`📡 Cache not found, fetching sessions of type ${submissionType} from API...`);
  return fetchSessions(submissionType);
}