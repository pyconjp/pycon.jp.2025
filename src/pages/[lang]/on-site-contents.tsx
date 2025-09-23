import { GetStaticPaths, GetStaticProps } from 'next';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Lang } from '@/types/lang';
import { getOnSiteContents } from '@/libs/spreadsheet';
import PageHead from '@/components/elements/PageHead';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import OnSiteContentCard from '@/components/sections/OnSiteContentCard';
import { OnSiteContents } from '@/types/onSiteContents';
import { dictionary } from '@/lang';

dayjs.extend(utc);
dayjs.extend(timezone);

interface OnSiteContentsPageProps {
  lang: Lang;
  onSiteContents: OnSiteContents[];
}

export default function OnSiteContentsPage({ lang, onSiteContents }: OnSiteContentsPageProps) {
  const isJapanese = lang === 'ja';
  const dict = dictionary[lang];
  return (
    <DefaultLayout lang={lang} activeHeader="on_site_contents">
      <PageHead
        title={isJapanese ? '当日企画' : 'On-Site Contents'}
        description={isJapanese
          ? 'PyCon JP 2025 当日企画情報'
          : 'PyCon JP 2025 On-Site Contents Information'
        }
        lang={lang}
        pagePath='/related-events'
      />
      <div className="container mx-auto px-4 pt-20 pb-12 max-w-7xl font-jost">
        <div className="mb-12 lg:mb-[96px]">
          <h1 className="text-5xl font-bold mb-2">On-site Contents</h1>
          <p className="text-2xl text-gray-600 font-bold">当日企画</p>
        </div>
        <div className="flex flex-wrap justify-center gap-20">
          {onSiteContents.map((content, index) => (
            <OnSiteContentCard
              key={index}
              title={isJapanese ? content.title_ja : content.title_en}
              location={dict.places[content.location_type]}
              datetime={{
                start: content.datetime_start,
                end: content.datetime_end
              }}
              details={isJapanese ? content.description_ja : content.description_en}
              thumbnail={`/common/on-site-contents/${content.thumbnail_url}`}
              link={content.link_url}
              linkText={isJapanese ? content.link_text_ja || '詳細を見る' : content.link_text_en || 'See Details'}
            />
          ))}
        </div>
      </div>
    </DefaultLayout>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as Lang;
  const onSiteContents = await getOnSiteContents();

  return {
    props: {
      lang,
      onSiteContents,
    },
  };
};