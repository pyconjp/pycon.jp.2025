// このページは next.config.ts のリダイレクト設定により /timetable/day1 にリダイレクトされます
// フォールバック用のページとして残しています

import {GetStaticProps} from "next";

export const getStaticPaths = async () => {
  return {
    paths: [
      {params: {lang: 'ja'}},
      {params: {lang: 'en'}},
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  // next.config.ts でリダイレクトされるため、このページは実際には表示されません
  return {
    redirect: {
      destination: '/ja/timetable/day1',
      permanent: false,
    },
  };
};

function TimetablePage() {
  // このページは表示されません（リダイレクトされるため）
  return null;
}

export default TimetablePage;
