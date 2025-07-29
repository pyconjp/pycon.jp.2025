import {Lang} from "@/types/lang";
import {GetStaticProps} from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import {Member} from "@/types/member";
import { fetchTalks } from "@/libs/pretalx";

export const getStaticPaths = async () => {
  return {
    paths: [
      {params: {lang: 'ja'}},
      {params: {lang: 'en'}},
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const lang = params?.lang || 'ja';
  const talks = await fetchTalks();
  return {
    props: {
      lang,
      talks,
    },
    // revalidate: 3600,
  };
};

function TimetablePage({lang, talks}: { lang: Lang, talks: any }) {
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <Navi_about position="member" lang={lang}/>
      <PageHead
        title={lang === "ja" ? 'タイムテーブル' : 'Timetable'}
        description={lang === "ja" ? 'PyCon JP 2025のタイムテーブルページです' : 'This is the Timetable page of PyCon JP 2025'}
        lang={lang}
        pagePath='/timetable'
      />
      <div className="pb-36">
        {JSON.stringify(talks)}
      </div>
    </DefaultLayout>
  )
}

export default TimetablePage;
