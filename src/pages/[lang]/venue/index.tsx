import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Lang } from "@/types/lang";
import { GetStaticProps } from "next";
import ContentsHeader from "@/components/sections/ContentsHeader";
import VenueSection from "@/components/sections/VenueSection";
import VenueDetailSection from "@/components/sections/VenueDetailSection";

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
  return {
    props: {
      lang,
    },
    revalidate: 3600,
  };
};

function VenuePage({ lang }: { lang: Lang}) {
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <Navi_about position="venue" lang={lang} />
      <PageHead
        title={lang === "ja" ? '会場案内' : 'Venue Information'}
        description={lang === "ja" ? 'PyCon JP 2025の会場案内ページです' : 'This is the Venue Information page of PyCon JP 2025'}
        lang={lang}
        pagePath='/venue'
      />
      <ContentsHeader 
        title="Venue" 
        subtitle="会場案内"
        cloudflareImages={{
          category: 'common',
          fileNames: ['venue_header_1', 'venue_header_2'],
          fallbackSrcs: ['/common/venue_header_1.png', '/common/venue_header_2.png']
        }} 
      />
      <VenueSection lang={lang} className="relative mx-auto lg:w-5/8 w-10/12 mt-20 scroll-mt-20" />
      <VenueDetailSection lang={lang} className="relative mx-auto lg:w-5/8 w-10/12 mt-20 scroll-mt-20" />
    </DefaultLayout>
  )
}

export default VenuePage;