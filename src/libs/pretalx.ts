import axios from 'axios';
import { OriginalTalk, Talk } from '../types/pretalx';

const EVENT_ID = 'pycon-jp-2025';

const QUESTION_IDS = {
  talk_language: 5337,
  slide_language: 5338,
  level: 5336,
}

const LEVELS = {
  Novice: 'novice',
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
}

const LANG_LABEL = {
  'English': 'en',
  '日本語': 'ja',
  'Japanese': 'ja',
}

export const fetchTalks = async (): Promise<Talk[]> => {
  const params = {
    // state: 'confirmed',
    expand: [
      'answers',
      'answers.question',
      'resources',
      'slots',
      'slots.room',
      'speakers',
      'speakers.answers',
      'submission_type',
      'tags',
      'track',
    ].join(','),
  };
  return axios.get(
    `https://pretalx.com/api/events/${EVENT_ID}/submissions/`,
    {
      headers: {
        Authorization: `Token ${process.env.PRETALX_API_KEY}`,
      },
      params,
    }
  ).then(res => {
    const originalTalks = res.data.results;
    const talks = originalTalks.map((originalTalk: OriginalTalk) => ({
      code: originalTalk.code,
      title: originalTalk.title,
      speakers: originalTalk.speakers.map(speaker => ({
        code: speaker.code,
        name: speaker.name,
        biography: speaker.biography,
        avatar_url: speaker.avatar_url,
      })),
      track: originalTalk.track,
      abstract: originalTalk.abstract,
      description: originalTalk.description,
      duration: originalTalk.duration,
      talk_language: LANG_LABEL[originalTalk.answers.find(answer => answer.question.id === QUESTION_IDS.talk_language)?.answer as keyof typeof LANG_LABEL],
      slide_language: LANG_LABEL[originalTalk.answers.find(answer => answer.question.id === QUESTION_IDS.slide_language)?.answer as keyof typeof LANG_LABEL],
      level: LEVELS[originalTalk.answers.find(answer => answer.question.id === QUESTION_IDS.level)?.answer as keyof typeof LEVELS],
      resource: originalTalk.resources.map(resource => ({
        resource: resource.resource,
        description: resource.description,
      })),
      slot: originalTalk.slots.length > 0 ? {
        room: originalTalk.slots[0].room,
        start: originalTalk.slots[0].start,
        end: originalTalk.slots[0].end,
      } : null,
    }));
    return talks;
  });
}
