import axios from 'axios';
import {OriginalTalk, Talk} from '@/types/pretalx';

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

const TRACK_ID_MAP: { [key: number]: string } = {
  5833: 'practice',  // Pythonを用いた開発のプラクティス
  5834: 'web',       // Webアプリケーション
  5835: 'ai',        // データサイエンス、AI
  5836: 'libs',      // ライブラリやサービスを作ってみた
  5837: 'devops',    // DevOps、テスト、ドキュメンテーション、パッケージ
  5838: 'core',      // Python自体の機能、開発
  5839: 'iot',       // IoT、ハードウェア、ネットワーク
  5840: 'media',     // 映像、音楽、ゲーム、イラスト
  5841: 'edu',       // コミュニティ、教育
  5842: 'other',     // その他
}

export const fetchTalks = async (): Promise<Talk[]> => {
  const params = {
    state: 'confirmed',
    submission_type: 5948, // トーク
    expand: [
      'answers',
      'answers.question',
      'resources',
      'slots.room',
      'speakers.answers',
      'submission_type',
      'tags',
      'tracks',
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
    return originalTalks.map((originalTalk: OriginalTalk) => ({
      code: originalTalk.code,
      title: originalTalk.title,
      speakers: originalTalk.speakers.map(speaker => ({
        code: speaker.code,
        name: speaker.name,
        biography: speaker.biography,
        avatar_url: speaker.avatar_url,
      })),
      track: TRACK_ID_MAP[originalTalk.track] || 'other',
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
  });
}
