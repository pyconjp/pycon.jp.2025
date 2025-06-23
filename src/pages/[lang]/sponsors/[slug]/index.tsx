import Navi_about from "@/components/elements/Navi_about";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { getSponsors } from "@/libs/spreadsheet";
import { Lang } from "@/types/lang";
import { Sponsor } from "@/types/sponsor";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import ImageWithFallback from "@/components/elements/ImageWithFallback";
import SponsorLinkButton from "@/components/elements/SponsorLinkButton";
import Link from "next/link";

type SponsorPlan = 'platinum' | 'gold' | 'silver' | 'psf';
const sponsorLabel_en: Record<SponsorPlan, string> = {
  platinum: 'Platinum Sponsor',
  gold: 'Gold Sponsor',
  silver: 'Silver Sponsor',
  psf: 'PSF Sponsor',
};

const sponsorLabel_ja: Record<SponsorPlan, string> = {
  platinum: 'プラチナスポンサー',
  gold: 'ゴールドスポンサー',
  silver: 'シルバースポンサー',
  psf: 'PSF',
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sponsors = await getSponsors();
  const langs: Lang[] = ['ja', 'en'];
  const paths = [];
  for (const lang of langs) {
    for (const sponsor of sponsors) {
      if (sponsor.path) {
        paths.push({
          params: {
            lang,
            slug: sponsor.path,
          },
        });
      }
    }
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = (params?.lang as Lang) || 'ja';
  const sponsor = params?.slug as string;
  const sponsors = await getSponsors();

  return {
    props: {
      lang,
      sponsor,
      sponsors: sponsors.filter(s => s.path === sponsor),
    },
    revalidate: 3600,
  };
};

type Props = {
  sponsors: Sponsor[];
  lang: Lang;
} & React.HTMLAttributes<HTMLElement>;

function SponsorPage({ sponsors, lang }: Props) {
  const currentSponsor = sponsors[0];
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <PageHead
        title={lang === "ja" ? `${currentSponsor.name_ja} | スポンサー` : `${currentSponsor.name_ja} | Sponsor`}
        description={lang === "ja" ? 'PyCon JP 2025のスポンサーページです' : 'This is the sponsor page of PyCon JP 2025'}
        lang={lang}
        pagePath={`/sponsors/${currentSponsor.path}`}
        imagePath='ogp/spnsor.jpg'
      />
      <div>
        <Navi_about position="sponsor" lang={lang} />
        <main className="relative flex justify-center !bg-[#FAFAFA] w-full min-h-screen">
          <div className="relative before:absolute before:left-[-12] lg:before:left-[-26] before:top-12 lg:before:top-6 before:h-[79px] before:w-[128px] lg:before:w-[250px] lg:before:h-[150px] before:bg-[url('/common/pink_snake.png')] before:bg-contain before:bg-no-repeat"></div>
          <Link href="/sponsors">
            <div className='relative before:absolute before:left-[305] before:top-14 lg:before:left-[620] lg:before:top-12 before:h-12 before:w-12 before:rounded-full before:bg-black before:content-["×"] before:text-white before:flex before:justify-center before:items-center before:font-bold before:text-2xl'/>
          </Link>
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl border border-[#0000001A] my-20 pt-20 p-8 lg:p-20 lg:max-w-[640px] max-w-[335px]">
              <div className="flex flex-col">
                <div className="mb-4">
                  <h1 className="flex flex-col text-4xl font-bold">
                    {sponsorLabel_en[currentSponsor.plan] || 'Sponsor'}
                  </h1>
                  <h3 className="text-base text-[#808080] mt-2">
                    {sponsorLabel_ja[currentSponsor.plan] || 'Sponsor'}
                  </h3>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <div className="rounded-xl border border-[#0000001A] w-[195px] h-[115px] lg:w-[400px] lg:h-[175px] flex justify-center items-center">
                    <ImageWithFallback src={`/common/sponsor/${currentSponsor.logo_image}`}
                      alt={lang === 'ja' ? currentSponsor.name_ja : currentSponsor.name_en}
                      width={480}
                      height={210}
                      className="w-92 h-42 p-2 lg:p-5 object-contain"
                      fallback={'/common/logo_pc.png'}
                    />
                  </div>
                  <div className="rounded-xl border border-[#0000001A] w-[85px] h-[115px] lg:w-[160px] lg:h-[175px] flex justify-center items-center">
                    <Image src={`/common/pyconjp2025_item_logo_sq2.png`}
                      alt="PyCon JP 2025 Logo"
                      width={880}
                      height={410}
                      className="w-full h-full object-contain" />
                  </div>
                </div>
                <h2 className="my-6 text-xl font-bold">
                  {lang === 'ja' ? currentSponsor.name_ja : currentSponsor.name_en}
                </h2>
                {currentSponsor.plan !== 'silver' && (
                  <p className="text-base">
                    {lang === 'ja' ? currentSponsor.pr_ja : currentSponsor.pr_en}
                  </p>
                )}
                <SponsorLinkButton
                  href={lang === 'ja' ? currentSponsor.url_ja : currentSponsor.url_en}
                  title={lang === 'ja' ? currentSponsor.name_ja : currentSponsor.name_en}
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
export default SponsorPage;