import { Lang } from "./lang";

export type Talk = {
  code: string,
  title: string,
  speakers: Speaker[],
  track: Track,
  abstract: string,
  description: string,
  duration: number,
  talk_language: Lang,
  slide_language: Lang,
  level: Level,
  resource: Resource[],
  slot: Slot | null,
}

export type Speaker = {
  code: string,
  name: string,
  biography: string,
  avatar_url: string,
}

export type Level = 'novice' | 'beginner' | 'intermediate' | 'advanced';

export type Track = 'ai' | 'practice' | 'edu' | 'devops' | 'web' | 'libs' | 'core' | 'other' | 'media' | 'iot';

export type Resource = {
  resource: string,
  description: string,
}

export type Slot = {
  room: Room,
  start: string,
  end: string,
}

export type Room = {
  id: number
  name: MultiLanguageString,
};

export type OriginalTalk = {
  code: string,
  title: string,
  speakers: {
    code: string,
    name: string,
    biography: string,
    avatar_url: string,
  }[],
  submission_type: {
    id: number,
    name: MultiLanguageString,
    default_duration: number,
    deadline: null,
    requires_access_code: boolean,
  },
  track: number,
  tags: [],
  state: string,
  abstract: string,
  description: string,
  duration: number,
  content_locale: string,
  resources: {
    id: number,
    resource: string,
    description: string,
  }[],
  slots: {
    id: number,
    room: {
      id: number,
      name: MultiLanguageString,
      uuid: string,
      guid: null,
      capacity: number,
      position: null,
    } | null,
    start: string | null,
    end: string | null,
    description: null,
    duration: number,
  }[],
  answers: {
    id: number,
    question: {
      id: number,
      question: MultiLanguageString,
      default_answer: null,
      variant: string,
      target: string,
      deadline: null,
      freeze_after: null,
      question_required: string,
      position: number,
      min_length: null,
      max_length: null,
      min_number: null,
      max_number: null,
      min_date: null,
      max_date: null,
      min_datetime: null,
      max_datetime: null,
      icon: null,
    },
    answer: string,
    answer_file: null,
    submission: string,
    review: null,
    person: null,
    options: number[],
  }[],
  pending_state: null,
  is_featured: boolean,
  notes: string,
  internal_notes: null,
  invitation_token: string,
  access_code: null,
  review_code: string,
  anonymised_data: string,
  reviews: number[],
  assigned_reviewers: [],
  is_anonymised: boolean,
  median_score: number,
  mean_score: number,
}

type MultiLanguageString = {
  en: string,
  "ja-jp": string,
};