import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  pagePath: string;
  imagePath?: string;
  lang: 'ja' | 'en';
}

export default function PageHead({title, description, pagePath, imagePath = 'ogp/default.jpg', lang}: Props) {
  const baseUrl = process.env.PRODUCTION_URL || process.env.CF_PAGES_URL || 'http://localhost:3000';

  return (
    <Head>
      <title>{title ? title + ' | PyCon JP 2025' : 'PyCon JP 2025'}</title>
      <meta httpEquiv="Content-Language" content={lang}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description || ''}/>
      <meta property="og:image" content={`${baseUrl}/${imagePath}`}/>
      <meta property="og:url" content={`${baseUrl}/${pagePath}`}/>
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'ja_JP'}/>
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
  );
}