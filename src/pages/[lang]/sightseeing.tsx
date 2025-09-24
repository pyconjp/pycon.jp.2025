import { GetStaticPaths, GetStaticProps } from 'next';
import { Lang } from '@/types/lang';
import { dictionary } from '@/lang';
import DefaultLayout from '@/components/layout/DefaultLayout';
import PageHead from '@/components/elements/PageHead';
import ContentsHeader from '@/components/sections/ContentsHeader';
import CloudflareImage from '@/components/elements/CloudflareImage';
import { SightseeingPlace } from '@/types/sightseeing';
import { getSightseeingPlaces } from '@/libs/spreadsheet';

interface SightseeingPageProps {
  locale: Lang;
  places: SightseeingPlace[];
}

const SightseeingPage = ({ locale, places }: SightseeingPageProps) => {
  const dict = dictionary[locale];

  return (
    <DefaultLayout lang={locale} activeHeader="sightseeing">
      <PageHead
        title={locale === "ja" ? '周辺施設' : 'Sightseeing'}
        description={locale === "ja" ? 'PyCon JP 2025の会場周辺の観光施設をご紹介します' : 'Discover tourist attractions around the PyCon JP 2025 venue'}
        lang={locale}
        pagePath="/sightseeing"
      />

      <ContentsHeader
        title={dict.sightseeing.title}
        subtitle={dict.sightseeing.subtitle}
        cloudflareImages={{
          category: 'common',
          fileNames: ['venue_header_1', 'venue_header_2'],
          fallbackSrcs: ['/common/venue_header_1.png', '/common/venue_header_2.png']
        }}
      />

      {/* Table of Contents - 目次 */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#FAFAFA] border border-[#0000001A] rounded-2xl p-5 max-w-5xl mx-auto">
          <div className="lg:grid grid-cols-2 gap-x-4 gap-y-2">
            {places.map((place, index) => (
              <a
                key={index}
                href={`#place-${index}`}
                className="flex justify-between items-center border-b border-gray-300 py-3 pr-2 no-underline hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold">{locale === 'ja' ? place.name_ja : place.name_en}</span>
                <span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">{dict.sightseeing.updateComing}</h2>
          <p className="text-lg leading-relaxed">{dict.sightseeing.description}</p>
        </div>

        {/* Places List - すべての場所を1カラムで表示 */}
        <div className="max-w-5xl mx-auto mb-16">
          {places.map((place, index) => (
            <div key={index}>
              {/* 観光地カード */}
              <div id={`place-${index}`} className="mb-12 scroll-mt-32">
                {/* 画像 - 横幅100% */}
                {place.image && (
                  <div className="relative w-full h-64 md:h-96 mb-6 overflow-hidden rounded-lg">
                    <CloudflareImage
                      category="sightseeing"
                      fileName={place.image}
                      fallbackSrc={`/common/sightseeing/${place.image}`}
                      alt={locale === 'ja' ? place.name_ja : place.name_en}
                      width={1200}
                      height={600}
                      className="w-full h-full object-contain md:object-cover"
                    />
                  </div>
                )}

                {/* タイトル */}
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'ja' ? place.name_ja : place.name_en}
                </h3>

                {/* 説明文 */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {locale === 'ja' ? place.description_ja : place.description_en}
                </p>

                {/* Google Mapボタン */}
                {place.google_map_url && (
                  <a
                    href={place.google_map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <span>{dict.sightseeing.googleMapButton}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>

              {/* 区切り線（最後の要素以外） */}
              {index < places.length - 1 && (
                <hr className="border-gray-200 mb-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'ja' } },
      { params: { lang: 'en' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SightseeingPageProps> = async ({ params }) => {
  const locale = (params?.lang as Lang) || 'ja';

  try {
    const places = await getSightseeingPlaces();

    return {
      props: {
        locale,
        places,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch sightseeing places:', error);

    return {
      props: {
        locale,
        places: [],
      },
      revalidate: 60,
    };
  }
};

export default SightseeingPage;