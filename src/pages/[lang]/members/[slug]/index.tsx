import DefaultLayout from "@/components/layout/DefaultLayout";
import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import {GetStaticProps} from "next";
import {getMember, getMembers} from "@/libs/spreadsheet";
import {Lang} from "@/types/lang";
import {Member} from "@/types/member";
import MemberSection from "@/components/sections/MemberSection";
import KeynotesSection from "@/components/sections/KeynotesSection";
import ImageSlideSection from "@/components/sections/ImageSlideSection";

export const getStaticPaths = async () => {
  const members = await getMembers();

  return {
    paths: members
      .filter((member: Member) => member.path !== '')
      .filter((member: Member) => member.name_ja !== '' || member.name_en !== '')
      .map((member: Member) => [
        {params: {lang: 'ja', slug: member.path}},
        {params: {lang: 'en', slug: member.path}},
      ]).flat(),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const lang = params?.lang || 'ja';
  const member = await getMember(params?.slug as string);

  if (!member) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      lang,
      member,
    },
    revalidate: 3600,
  };
};

export default function MemberPage({lang, member}: { lang: Lang, member: Member }) {
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <Navi_about position="member" lang={lang}/>
      <PageHead
        title={lang === "ja" ? member.name_ja + ' | 主催メンバー' : member.name_en + ' | Organizing Members'}
        description={lang === "ja" ? 'PyCon JP 2025の主催メンバーページです' : 'This is the Organizing Members page of PyCon JP 2025'}
        lang={lang}
        pagePath={'/members/' + member.path}
      />
      <div className="pt-2 pb-36 bg-gray-50">
        <MemberSection member={member} lang={lang} className='mx-auto lg:w-1/3 w-10/12 lg:mt-20 mt-12'/>
        <ImageSlideSection className='w-full my-20 lg:my-36'/>
        <KeynotesSection className='mx-auto lg:w-5/8 w-10/12 mt-20' lang={lang}/>
      </div>
    </DefaultLayout>
  );
}