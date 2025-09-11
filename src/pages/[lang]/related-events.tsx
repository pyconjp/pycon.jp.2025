import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';

const REDIRECT_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSSLmzleVj9TjOiDkAI82c6o_U609ZN37Z98o69M10ZtebYvbK2FBE1TKLSXrv7iPUqgBpwOENEAL0N/pubhtml?gid=0&single=true';

export default function RelatedEvents() {
  useEffect(() => {
    // クライアントサイドでのリダイレクト
    window.location.href = REDIRECT_URL;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Redirecting to related events...</p>
        <p className="text-sm mt-2 text-gray-600">関連イベントページへリダイレクトしています...</p>
      </div>
    </div>
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
  // サーバーサイドでのリダイレクト (SSGビルド時は機能しないが、SSR時に有効)
  return {
    redirect: {
      destination: REDIRECT_URL,
      statusCode: 302,
    },
  };
};