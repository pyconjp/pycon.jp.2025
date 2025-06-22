import { Sponsor } from "@/types/sponsor";
import { google } from "googleapis";

const auth = new google.auth.JWT(
  {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

const fetchSheet: <T extends object>(spreadSheetId: string, range: string, keys: (keyof T)[]) => Promise<T[]>
  = async <T extends object>(spreadSheetId: string, range: string, keys: (keyof T)[]): Promise<T[]> => {
    const sheets = google.sheets({ version: 'v4', auth });
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
  const sponsors: Sponsor[] = await fetchSheet<Sponsor>(
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
  return sponsors;
}