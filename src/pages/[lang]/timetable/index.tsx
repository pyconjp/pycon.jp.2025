// このページは next.config.ts のリダイレクト設定により /timetable/day1 にリダイレクトされます
// フォールバック用のページとして残しています

import {GetStaticProps} from "next";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PageHead from "@/components/elements/PageHead";
import { Lang } from "@/types/lang";

export const getStaticPaths = async () => {
  return {
    paths: [
      {params: {lang: 'ja'}},
      {params: {lang: 'en'}},
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 静的生成時はリダイレクトできないため、propsのみ返す
  return {
    props: {
      lang: params?.lang || 'ja',
    },
    revalidate: 3600, // 1時間（3600秒）ごとに再生成
  };
};

interface TimetablePageProps {
  lang: Lang;
}

function TimetablePage({ lang }: TimetablePageProps) {
  const router = useRouter();
  
  useEffect(() => {
    // ハッシュフラグメントを保持しながらリダイレクト
    const hash = window.location.hash;
    void router.replace(`/${lang}/timetable/day1${hash}`);
  }, [lang, router]);
  
  // リダイレクト中の表示
  return (
    <>
      <PageHead
        title={lang === "ja" ? 'タイムテーブル' : 'Timetable'}
        description={lang === "ja" ? 'PyCon JP 2025のタイムテーブル' : 'Timetable for PyCon JP 2025'}
        lang={lang}
        pagePath='/timetable'
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    </>
  );
}

export default TimetablePage;
