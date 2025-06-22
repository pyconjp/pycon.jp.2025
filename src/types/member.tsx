export type RawMember = {
  name_ja: string;
  name_en: string;
  github: string;
  twitter: string;
  facebook: string;
  image: string;
  other: string;
  profile_ja: string;
  profile_en: string;
  team: '座長チーム / Chair team'
    | 'プログラムチーム / Program team'
    | '会場チーム / Venue team'
    | '広報チーム / Public relations team'
    | 'スポンサーチーム / Sponsor team'
    | '参加者管理チーム / Attendee management team'
  path: string;
}

export type Member = {
  name_ja: string;
  name_en: string;
  github: string;
  twitter: string;
  facebook: string;
  image: string;
  other: string;
  profile_ja: string;
  profile_en: string;
  team: 'chair' | 'program' | 'venue' | 'pr' | 'sponsor' | 'attendee' | null;
  path: string;
}
