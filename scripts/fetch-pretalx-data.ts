/**
 * Fetch all sessions from Pretalx API and save to JSON file
 * This runs during pre-build to cache session data
 */

import { fetchSessions, SUBMISSION_TYPES } from '../src/libs/pretalx';
import { Talk } from '../src/types/pretalx';
import fs from 'fs/promises';
import path from 'path';

export async function fetchAndSavePretalxData() {
  console.log('📡 Fetching session data from Pretalx API...');

  try {
    // Fetch all session types in parallel
    const [talks, specials, posters, communityPosters] = await Promise.all([
      fetchSessions(SUBMISSION_TYPES.TALK),
      fetchSessions(SUBMISSION_TYPES.SPECIAL),
      fetchSessions(SUBMISSION_TYPES.POSTER),
      fetchSessions(SUBMISSION_TYPES.COMMUNITY_POSTER),
    ]);

    // Combine all sessions
    const allSessions = [...talks, ...specials, ...posters, ...communityPosters];

    // Create a map for easy lookup
    const sessionsMap: Record<string, Talk> = {};
    allSessions.forEach(session => {
      sessionsMap[session.code] = session;
    });

    // Save to JSON file in project root
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });

    const filePath = path.join(dataDir, 'pretalx-sessions.json');
    await fs.writeFile(filePath, JSON.stringify(sessionsMap, null, 2));

    console.log(`✅ Saved ${allSessions.length} sessions to ${filePath}`);

    return sessionsMap;
  } catch (error) {
    console.error('❌ Failed to fetch Pretalx data:', error);
    throw error;
  }
}