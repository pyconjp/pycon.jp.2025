import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';

const REDIRECT_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSLmzleVj9TjOiDkAI82c6o_U609ZN37Z98o69M10ZtebYvbK2FBE1TKLSXrv7iPUqgBpwOENEAL0N/pubhtml?gid=0&single=true';

export default function RelatedEvents() {
  useEffect(() => {
    // クライアントサイドでのリダイレクト
    window.location.replace(REDIRECT_URL);
  }, []);

  return (
    <>
      <Head>
        <title>Related Events - PyCon JP 2025</title>
        <meta name="description" content="PyCon JP 2025 Related Events" />
        {/* HTML meta refresh as fallback */}
        <meta httpEquiv="refresh" content={`0; url=${REDIRECT_URL}`} />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">Redirecting to related events...</p>
          <p className="text-sm mt-2 text-gray-600">関連イベントページへリダイレクトしています...</p>
          <p className="text-xs mt-4 text-gray-500">
            If you are not redirected automatically, 
            <a href={REDIRECT_URL} className="text-blue-600 underline ml-1">click here</a>.
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'ja' } },
      { params: { lang: 'en' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  // SSGではredirectを使用できないため、通常のpropsを返す
  return {
    props: {},
  };
};