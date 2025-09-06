import React from 'react';
import KeynotesSection from "@/components/sections/KeynotesSection";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Lang } from "@/types/lang";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import DisplayDate from "@/components/elements/DisplayDate";
import TrackNavigation from '@/components/sections/TrackNavigation';

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
    revalidate: 3600, // 1時間（3600秒）ごとに再生成
  };
};

type Props = { lang: Lang };

export default function Speaker({ lang }: Props) {
  const ReasonKeynoteSelection = dynamic(() => import(`@/components/markdown/${lang}/reasons_selection_keynotes.mdx`), { ssr: true });

  return (
    <DefaultLayout lang={lang} activeHeader="speakers">
      <PageHead
        title={lang === "ja" ? 'キーノートスピーカー' : 'Keynote Speakers'}
        description={lang === "ja" ? 'PyCon JP 2025のキーノートスピーカーページです' : 'This is the Keynote Speakers page of PyCon JP 2025'}
        lang={lang}
        pagePath='/speaker'
      />
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-12">
        {/* Track navigation */}
        <TrackNavigation locale={lang} isKeynote={true} />

          <div className="mb-8 px-4 md:px-8">
            <h1 className="text-4xl font-bold mb-4">
              #{lang === 'ja' ? 'キーノート' : 'Keynote'}
            </h1>
          </div>

          <KeynotesSection className='mx-auto lg:w-5/8 w-10/12 pb-20' lang={lang} />
          <div className='mx-auto lg:w-5/8 w-10/12 pb-20 mt-10'>
            <div className="flex max-lg:flex-col-reverse lg:justify-between items-center">
              <div className="flex flex-col lg:max-w-1/2">
                <div className="flex flex-col text-2xl font-extrabold mb-8">
                  <h2>キーノート選定の理由──</h2>
                  <h2>&ldquo;いま求められるPython像&rdquo;を映す二人</h2>
                </div>
                <ReasonKeynoteSelection />
              </div>
              <div className="max-lg:mb-16">
                <DisplayDate lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}