import ImageWithFallback from "@/components/elements/ImageWithFallback";
import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import SponsorLinkButton from "@/components/elements/SponsorLinkButton";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getSpecialSponsors } from "@/libs/spreadsheet";
import { Lang } from "@/types/lang";
import { SpecialSponsor } from "@/types/sponsor";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";

export const getStaticPaths: GetStaticPaths = async () => {
  const specialSponsors = await getSpecialSponsors();

  return {
    paths: specialSponsors
      .map(specialSponsor => specialSponsor.path)
      .reduce((acc: string[], path) => acc.includes(path) ? acc : [...acc, path], []) // 重複排除
      .map(path => [
        { params: { lang: 'ja', slug: path } },
        { params: { lang: 'en', slug: path } },
      ])
      .flat(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = (params?.lang as Lang) || 'ja';
  const path = params?.slug as string;
  const specialSponsors = await getSpecialSponsors();

  // pathが一致する最初の1件を取得
  const first = specialSponsors.find(specialSponsor => specialSponsor.path === path);
  if (!first) {
    return {
      notFound: true,
    };
  }

  // pathが一致する2件目以降を取得し、タイトルを結合
  const specialSponsor = specialSponsors
    .filter(specialSponsor => specialSponsor.path === path)
    .slice(1) // 最初の1件を除外
    .reduce((acc: SpecialSponsor, current: SpecialSponsor) => ({
      name_ja: acc.name_ja,
      name_en: acc.name_en,
      url_ja: acc.url_ja,
      url_en: acc.name_en,
      title_ja: acc.title_ja + '・' + current.title_ja,
      title_en: acc.title_en + ' / ' + current.title_en,
      logo_image: acc.logo_image,
      plan: acc.plan,
      path: acc.path,
    }), first);

  return {
    props: {
      lang,
      specialSponsor,
    },
    revalidate: 3600,
  };
};

type Props = {
  specialSponsor: SpecialSponsor;
  lang: Lang;
} & React.HTMLAttributes<HTMLElement>;

function SpecialSponsorPage({ specialSponsor, lang }: Props) {
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <PageHead
        title={lang === "ja" ? `${specialSponsor.name_ja} | スペシャルスポンサー` : `${specialSponsor.name_ja} | Special Sponsor`}
        description={lang === "ja" ? 'PyCon JP 2025のスペシャルスポンサーページです' : 'This is the special sponsor page of PyCon JP 2025'}
        lang={lang}
        pagePath={`/sponsors/special/${specialSponsor.path}`}
      />
      <div>
        <Navi_about position="sponsor" lang={lang} />
        <main className="relative flex justify-center !bg-[#FAFAFA] min-h-screen">
          <Link href="/sponsors">
            <div className='relative before:absolute before:left-[305] before:top-14 lg:before:left-[620] lg:before:top-14 before:h-12 before:w-12 before:rounded-full before:bg-black before:content-["×"] before:text-white before:flex before:justify-center before:items-center before:font-bold before:text-2xl' />
          </Link>
          <div className="flex flex-col lg:min-w-[640px]">
            <div className="bg-white rounded-3xl border border-[#0000001A] my-20 pt-20 p-8 lg:p-20 lg:max-w-[640px] max-w-[335px]">
              <div className="flex flex-col">
                <div className="mb-4">
                  <h1 className="flex flex-col text-4xl font-bold">
                    SPECIAL Sponsors
                  </h1>
                  <h3 className="text-base text-[#808080] mt-2">
                    {lang === 'ja' ? `スペシャルスポンサー・${specialSponsor.title_ja}` : `Special Sponsors / ${specialSponsor.title_en}`}
                  </h3>
                </div>
                <SponsorLinkButton
                  href={lang === 'ja' ? specialSponsor.url_ja : specialSponsor.url_en}
                  title={lang === 'ja' ? specialSponsor.name_ja : specialSponsor.name_en}
                  className="mt-6 w-full"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
}

export default SpecialSponsorPage;