import {Sponsor} from "@/types/sponsor";
import {google} from "googleapis";
import {Member, RawMember} from "@/types/member";

const cache = new Map<string, unknown>();

const auth = new google.auth.JWT(
  {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

const fetchSheet: <T extends object>(spreadSheetId: string, range: string, keys: (keyof T)[]) => Promise<T[]>
  = async <T extends object>(spreadSheetId: string, range: string, keys: (keyof T)[]): Promise<T[]> => {
  const sheets = google.sheets({version: 'v4', auth});
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadSheetId,
    range,
  });

  return (response.data.values || [])
    .map((row: string[]) => {
      // rowの長さがkeysの長さに満たない場合、空文字列で埋める
      while (row.length < keys.length) {
        row.push('');
      }

      // 初期値を空のオブジェクトとして型推論を利用
      return keys.reduce((acc, key, i) => {
        acc[key] = row[i] as T[keyof T];
        return acc;
      }, {} as T);
    });
}

export async function getSponsors(): Promise<Sponsor[]> {
  if (!process.env.SPONSOR_SPREADSHEET_ID) {
    return [];
  }
  if (cache.has('sponsors')) {
    console.log('Using cached sponsors');
    return cache.get('sponsors') as Sponsor[];
  }

  const sponsors = await fetchSheet<Sponsor>(
    process.env.SPONSOR_SPREADSHEET_ID || '',
    'Webサイト掲載用!A2:I100',
    [
      'name_ja',
      'name_en',
      'url_ja',
      'url_en',
      'pr_ja',
      'pr_en',
      'logo_image',
      'plan',
      'path'
    ]
  );

  cache.set('sponsors', sponsors);

  console.log('Sponsors loaded');
  return sponsors;
}

export async function getMembers(): Promise<Member[]> {
  if (!process.env.MEMBER_SPREADSHEET_ID) {
    return [];
  }
  if (cache.has('members')) {
    console.log('Using cached members');
    return cache.get('members') as Member[];
  }

  const rawMembers: RawMember[] = await fetchSheet<RawMember>(
    process.env.MEMBER_SPREADSHEET_ID || '',
    "'フォームの回答 1'!C2:M100",
    [
      'name_ja',
      'name_en',
      'github',
      'twitter',
      'facebook',
      'image',
      'other',
      'profile_ja',
      'profile_en',
      'team',
      'path',
    ]
  );

  const members: Member[] = rawMembers.map(rawMember => ({
    name_ja: rawMember.name_ja,
    name_en: rawMember.name_en,
    github: rawMember.github,
    twitter: rawMember.twitter,
    facebook: rawMember.facebook,
    image: rawMember.image,
    other: rawMember.other,
    profile_ja: rawMember.profile_ja,
    profile_en: rawMember.profile_en,
    team: (() => {
      switch (rawMember.team) {
        case '座長チーム / Chair team':
          return 'chair';
        case 'プログラムチーム / Program team':
          return 'program';
        case '会場チーム / Venue team':
          return 'venue';
        case '広報チーム / Public relations team':
          return 'pr';
        case 'スポンサーチーム / Sponsor team':
          return 'sponsor';
        case '参加者管理チーム / Attendee management team':
          return 'attendee';
        default:
          return null;
      }
    })(),
    path: rawMember.path,
  }));

  cache.set('members', members);

  console.log('Members loaded');
  return members;
}

export async function getMember(path: string): Promise<Member | undefined> {
  return (await getMembers()).find(member => member.path === path);
}