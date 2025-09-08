import axios, {AxiosResponse} from 'axios';
import {OriginalTalk, Talk, Track, Level, PretalxApiResponse} from '@/types/pretalx';
import {Lang} from '@/types/lang';

const EVENT_ID = 'pycon-jp-2025';

// Submission Type定数
export const SUBMISSION_TYPES = {
  TALK: '5948' as const,
  SPECIAL: '6521' as const,
  POSTER: '5949' as const,
  COMMUNITY_POSTER: '5950' as const,
};

export const SUBMISSION_TYPE_IDS = {
  TALK: 5948,
  SPECIAL: 6521,
  POSTER: 5949,
  COMMUNITY_POSTER: 5950,
} as const;

export type SubmissionType = typeof SUBMISSION_TYPES[keyof typeof SUBMISSION_TYPES];

// ルーム表示を非表示にする特殊コード
export const CODES_WITHOUT_ROOM = ['NYCNJH', 'N7NJCH'] as const;

// ルーム表示判定ヘルパー関数
export const shouldShowRoom = (code: string): boolean => {
  return !CODES_WITHOUT_ROOM.includes(code as typeof CODES_WITHOUT_ROOM[number]);
};

const QUESTION_IDS = {
  talk_language: 5337,
  slide_language: 5338,
  level: 5336,
}

const LEVELS: { [key: string]: Level } = {
  Novice: 'novice',
  Beginner: 'beginner',
  Intermediate: 'intermediate',
  Advanced: 'advanced',
}

const LANG_LABEL: { [key: string]: Lang } = {
  'English': 'en',
  '日本語': 'ja',
  'Japanese': 'ja',
}

const TRACK_ID_MAP: { [key: number]: Track } = {
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

// ヘルパー関数: 質問IDに対応する回答を取得
const getAnswerByQuestionId = (originalTalk: OriginalTalk, questionId: number): string => {
  return originalTalk.answers.find(answer => answer.question.id === questionId)?.answer || '';
};

// ヘルパー関数: 言語ラベルを取得
const getLanguageLabel = (originalTalk: OriginalTalk, questionId: number): Lang => {
  const answer = getAnswerByQuestionId(originalTalk, questionId);
  return LANG_LABEL[answer] || 'en';
};

// ヘルパー関数: レベルを取得
const getLevel = (originalTalk: OriginalTalk): Level => {
  const answer = getAnswerByQuestionId(originalTalk, QUESTION_IDS.level);
  return LEVELS[answer] || 'beginner';
};

// OriginalTalkからTalkへの変換処理
const parseTalk = (originalTalk: OriginalTalk): Talk => ({
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
  talk_language: getLanguageLabel(originalTalk, QUESTION_IDS.talk_language),
  slide_language: getLanguageLabel(originalTalk, QUESTION_IDS.slide_language),
  level: getLevel(originalTalk),
  resource: originalTalk.resources.map(resource => ({
    resource: resource.resource,
    description: resource.description,
  })),
  slot: originalTalk.slots.length > 0 && originalTalk.slots[0].room && originalTalk.slots[0].start && originalTalk.slots[0].end ? {
    room: {
      id: originalTalk.slots[0].room.id,
      name: originalTalk.slots[0].room.name,
    },
    start: originalTalk.slots[0].start,
    end: originalTalk.slots[0].end,
  } : null,
  submission_type_id: originalTalk.submission_type.id,
});

// 統合されたセッション取得関数
// 単体のセッション取得関数
export const fetchSession = async (code: string): Promise<Talk | null> => {
  try {
    const res: AxiosResponse<OriginalTalk> = await axios.get<OriginalTalk>(
      `https://pretalx.com/api/events/${EVENT_ID}/submissions/${code}/`,
      {
        params: {
          expand: [
            'answers',
            'answers.question',
            'resources',
            'slots.room',
            'speakers.answers',
            'submission_type',
            'tags',
            'tracks',
          ].join(',')
        },
        headers: {
          Authorization: `Token ${process.env.PRETALX_API_KEY}`,
        },
      }
    );

    return parseTalk(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Failed to fetch session from Pretalx API:', error.message);
    }
    throw error;
  }
};

// 統合されたセッション取得関数
export const fetchSessions = async (submissionType: SubmissionType): Promise<Talk[]> => {
  // URLSearchParamsを使用して複数のstateパラメータを追加
  const searchParams = new URLSearchParams();
  searchParams.append('submission_type', submissionType);
  searchParams.append('expand', [
    'answers',
    'answers.question',
    'resources',
    'slots.room',
    'speakers.answers',
    'submission_type',
    'tags',
    'tracks',
  ].join(','));
  // stateは複数の値を個別のパラメータとして送信
  searchParams.append('state', 'confirmed');
  searchParams.append('state', 'accepted');

  const allTalks: OriginalTalk[] = [];
  let nextUrl: string | null = `https://pretalx.com/api/events/${EVENT_ID}/submissions/?${searchParams.toString()}`;

  while (nextUrl) {
    try {
      const res: AxiosResponse<PretalxApiResponse> = await axios.get<PretalxApiResponse>(
        nextUrl,
        {
          headers: {
            Authorization: `Token ${process.env.PRETALX_API_KEY}`,
          },
        }
      );

      allTalks.push(...res.data.results);
      nextUrl = res.data.next;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorDetails = {
          url: nextUrl,
          status: error.response?.status,
          statusText: error.response?.statusText,
          // Pretalx APIのエラーレスポンス形式に対応
          errorData: error.response?.data,
          // フィールド固有のエラー（例: {"amount": ["Please submit a valid integer."]})
          fieldErrors: error.response?.data && typeof error.response.data === 'object' && !error.response.data.detail 
            ? error.response.data 
            : null,
          // 一般的なエラー（例: {"detail": "Method 'DELETE' not allowed."}）
          generalError: error.response?.data?.detail || null,
          message: error.message,
        };
        
        console.error('Failed to fetch sessions from Pretalx API:', errorDetails);
        throw new Error(`Failed to fetch sessions from Pretalx API: ${error.message}`);
      }
      
      console.error('Unexpected error fetching sessions:', error);
      throw new Error(`Failed to fetch sessions from Pretalx API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return allTalks.map(parseTalk);
}