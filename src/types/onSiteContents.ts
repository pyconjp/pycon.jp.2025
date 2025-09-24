export interface OnSiteContents {
  location_type: 'phoenix' | 'ran' | 'himawari' | 'dahlia_1' | 'dahlia_2' | 'sakura' | 'open_space' | 'poster_session' | 'entrance';
  title_ja: string;
  description_ja: string;
  title_en: string;
  description_en: string;
  link_url: string;
  link_text_ja: string;
  link_text_en: string;
  datetime_start: string; // ISO 8601 format
  datetime_end: string;   // ISO 8601 format
  thumbnail_url: string;
}