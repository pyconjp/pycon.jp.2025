import {Patron, SpecialSponsor, Sponsor} from "@/types/sponsor";
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
    return cache.get('sponsors') as Promise<Sponsor[]>;
  }

  const sponsorPromise = (async () => {
    return await fetchSheet<Sponsor>(
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
  })();

  cache.set('sponsors', sponsorPromise);
  return sponsorPromise;
}

export async function getPatrons(): Promise<Patron[]> {
  if (!process.env.PATRON_SPREADSHEET_ID) {
    return [];
  }

  if (cache.has('patrons')) {
    return cache.get('patrons') as Promise<Patron[]>;
  }

  const patronPromise = (async () => {
    return await fetchSheet<Patron>(
      process.env.PATRON_SPREADSHEET_ID || '',
      'Webサイト表示用!A2:B100',
      [
        'name',
        'image'
      ]
    );
  })();

  cache.set('patrons', patronPromise);
  return patronPromise;
}

export async function getMembers(): Promise<Member[]> {
  if (!process.env.MEMBER_SPREADSHEET_ID) {
    return [];
  }

  if (cache.has('members')) {
    return cache.get('members') as Promise<Member[]>;
  }

  const memberPromise = (async () => {
    const rawMembers: RawMember[] = await fetchSheet<RawMember>(
      process.env.MEMBER_SPREADSHEET_ID || '',
      "'フォームの回答 1'!C2:O100",
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
        'cover_image',
        'role_id',
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
      cover_image: rawMember.cover_image,
      role_id: (() => {
        switch (rawMember.role_id) {
          case '1':
            return 1;
          case '2':
            return 2;
          default:
            return 99;
        }
      })(),
    }));

    return members;
  })();

  cache.set('members', memberPromise);
  return memberPromise;
}

export async function getMember(path: string): Promise<Member | undefined> {
  return (await getMembers()).find(member => member.path === path);
}

export async function getSpecialSponsors(): Promise<SpecialSponsor[]> {
  if (!process.env.SPONSOR_SPREADSHEET_ID) {
    return [];
  }

  if (cache.has('special_sponsors')) {
    return cache.get('special_sponsors') as Promise<SpecialSponsor[]>;
  }

  const sponsorPromise = (async () => {
    return await fetchSheet<SpecialSponsor>(
      process.env.SPONSOR_SPREADSHEET_ID || '',
      '特別スポンサー_Webサイト掲載用!A2:I100',
      [
        'name_ja',
        'name_en',
        'url_ja',
        'url_en',
        'title_ja',
        'title_en',
        'logo_image',
        'plan',
        'path',
      ]
    );
  })();

  cache.set('special_sponsors', sponsorPromise);
  return sponsorPromise;
}