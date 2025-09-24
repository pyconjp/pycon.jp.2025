export type Sponsor = {
  name_ja: string;
  name_en: string;
  url_ja: string;
  url_en: string;
  pr_ja: string;
  pr_en: string;
  logo_image: string;
  plan: 'platinum' | 'gold' | 'silver' | 'flower' | 'psf' | 'streaming';
  path: string;
}

export type SpecialSponsor = {
  name_ja: string;
  name_en: string;
  url_ja: string;
  url_en: string;
  title_ja: string;
  title_en: string;
  logo_image: string;
  plan: 'psf' | 'advertising' | 'special' | 'streaming';
  path: string;
}

export type Patron = {
  name: string;
  image: string;
}