import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  pagePath: string;
  imagePath?: string;
  lang: 'ja' | 'en';
}

export default function PageHead({ title, description, pagePath, imagePath = '/common/ogp/default.png', lang }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <Head>
      <title>{title ? (title + ' | PyCon JP 2025') : 'PyCon JP 2025'}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:image" content={`${baseUrl}${imagePath}`} />
      <meta property="og:url" content={`${baseUrl}${pagePath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PyCon JP 2025" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'ja_JP'} />
      {/* --- Twitter Card Tags --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pyconjapan" />
      <meta name="twitter:title" content={title ? (title + ' | PyCon JP 2025') : 'PyCon JP 2025'} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={`${baseUrl}${imagePath}`} />
    </Head>
  );
}