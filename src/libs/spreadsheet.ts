import {Sponsor} from "@/types/sponsor";
import {google} from "googleapis";
import {Member, RawMember} from "@/types/member";

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
  return await fetchSheet<Sponsor>(
    process.env.SPONSOR_SPREADSHEET_ID || '',
    'Webサイト掲載用!A2:H100',
    [
      'name_ja',
      'name_en',
      'url_ja',
      'url_en',
      'pr_ja',
      'pr_en',
      'logo_image',
      'plan',
    ]
  );
}

export async function getMembers(): Promise<Member[]> {
  if (!process.env.MEMBER_SPREADSHEET_ID) {
    return [];
  }
  const members: RawMember[] = await fetchSheet<RawMember>(
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

  return members.map(member => ({
    name_ja: member.name_ja,
    name_en: member.name_en,
    github: member.github,
    twitter: member.twitter,
    facebook: member.facebook,
    image: member.image,
    other: member.other,
    profile_ja: member.profile_ja,
    profile_en: member.profile_en,
    team: (() => {
      switch (member.team) {
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
    path: member.path,
  }))
}

export async function getMember(path: string): Promise<Member | undefined> {
  return (await getMembers()).find(member => member.path === path);
}