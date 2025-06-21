import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Sponsor from "@/components/sections/Sponsor";
import { getSponsors } from "@/libs/spreadsheet";
import { Lang } from "@/types/lang";
import { Sponsor as SponsorType } from "@/types/sponsor";
import { GetStaticProps } from "next";

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
  const sponsors = await getSponsors();
  return {
    props: {
      lang,
      sponsors,
    },
    revalidate: 3600,
  };
};

function SponsorPage({ lang, sponsors }: { lang: Lang, sponsors: SponsorType[] }) {
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <Navi_about position="sponsor" lang={lang}/>
      <PageHead
        title={lang === "ja" ? 'スポンサー' : 'Sponsors'}
        description={lang === "ja" ? 'PyCon JP 2025のスポンサーページです' : 'This is the Sponsors page of PyCon JP 2025'}
        lang={lang}
        pagePath='/sponsor'
      />
      <div className="bg-[#FAFAFA] py-2 pb-10">
        <Sponsor className="mx-auto lg:w-5/8 w-10/12" sponsors={sponsors} lang={lang} />
      </div>
    </DefaultLayout>
  )
};

export default SponsorPage;