import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getMembers } from "@/libs/spreadsheet";
import { Lang } from "@/types/lang";
import { GetStaticProps } from "next";
import { Member } from "@/types/member";
import ContentsHeader from "@/components/sections/ContentsHeader";
import MembersSection from "@/components/sections/MembersSection";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'ja' } },
      { params: { lang: 'en' } },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang || 'ja';
  const members = (await getMembers()).filter((member: Member) => member.name_ja !== '' || member.name_en !== '');
  return {
    props: {
      lang,
      members,
    },
    revalidate: 3600,
  };
};

function MembersPage({ lang, members }: { lang: Lang, members: Member[] }) {
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <Navi_about position="member" lang={lang} />
      <PageHead
        title={lang === "ja" ? '主催メンバー' : 'Organizing Members'}
        description={lang === "ja" ? 'PyCon JP 2025の主催メンバーページです' : 'This is the Organizing Members page of PyCon JP 2025'}
        lang={lang}
        pagePath='/members'
      />
      <div className="pb-36">
        <ContentsHeader
          grayscale
          title="Members"
          subtitle="メンバー"
          cloudflareImages={{
            category: 'common',
            fileNames: ['member_header_1', 'member_header_2'],
            fallbackSrcs: ['/common/member_header_1.png', '/common/member_header_2.png']
          }}
        />
        <MembersSection members={members} lang={lang} className='mx-auto lg:w-5/8 w-10/12 mt-20' />
      </div>
    </DefaultLayout>
  )
}

export default MembersPage;