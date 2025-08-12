import KeynotesSection from "@/components/sections/KeynotesSection";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Lang } from "@/types/lang";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import DisplayDate from "@/components/elements/DisplayDate";

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
      <div className="py-12">
        <KeynotesSection className='mx-auto lg:w-5/8 w-10/12 pb-20' lang={lang} />
        <div className='mx-auto lg:w-5/8 w-10/12 pb-20 mt-10'>
          <div className="flex max-lg:flex-col-reverse lg:justify-between items-center">
            <div className="flex flex-col lg:max-w-1/2">
              <div className="flex flex-col text-2xl font-extrabold mb-8">
                <h2>キーノート選定の理由──</h2>
                <h2>“いま求められるPython像”を映す二人</h2>
              </div>
              <ReasonKeynoteSelection />
            </div>
            <div className="max-lg:mb-16">
              <DisplayDate lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}