import { Lang } from "@/types/lang";
import { Patron, SpecialSponsor, Sponsor } from "@/types/sponsor";
import React from "react";
import CloudflareImage from "@/components/elements/CloudflareImage";
import Link from "next/link";

type Props = {
  sponsors: Sponsor[];
  specialSponsors: SpecialSponsor[];
  patron: Patron[];
  lang: Lang;
} & React.HTMLAttributes<HTMLElement>;

const platinum_len = 60;
const gold_len = 20;

export default function SponsorSection({ sponsors, specialSponsors, patron, lang, ...props }: Props) {
  return (
    <section {...props}>
      {sponsors.filter(sponsor => sponsor.plan === 'platinum').length > 0 &&
        <div className="relative py-2 mb-12">
          <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
            <span className="text-5xl font-bold font-jost">Platinum Sponsors</span><span className="lg:mx-24 text-[##808080]">プラチナスポンサー</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-24 gap-y-48 justify-center items-center">
            {sponsors.filter(sponsor => sponsor.plan === 'platinum').map((sponsor, index) => (
              <Link href={`/${lang}/sponsors/${sponsor.path}`} key={index} className="max-w-[315px] max-h-[215px] lg:max-w-[480px] lg:max-h-[210px]">
                <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                  <CloudflareImage
                    category="sponsors"
                    fileName={sponsor.logo_image}
                    fallbackSrc="/common/no_image_sponsor.png"
                    alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                    width={480}
                    height={210}
                    className="w-72 h-42 object-contain" />
                </div>
                <div className="flex flex-col my-4">
                  <h3 className="text-xl font-bold">{lang === 'ja' ? (sponsor.name_ja || sponsor.name_en) : (sponsor.name_en || sponsor.name_ja)}</h3>
                  <p className="lg:max-w-[480px] mt-4">
                    {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, platinum_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, platinum_len) + "..." : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      }
      {sponsors.filter(sponsor => sponsor.plan === 'psf').length > 0 &&
        <div className="relative py-2">
          <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
            <span className="text-5xl font-bold font-jost">PSF</span><span className="lg:mx-24 text-[##808080]">PSF</span>
          </h2>
          <div className="grid lg:grid-cols-2 gap-24 space-y-12 justify-center items-center">
            {sponsors.filter(sponsor => sponsor.plan === 'psf').map((sponsor, index) => (
              <Link href={`/${lang}/sponsors/${sponsor.path}}`} key={index} className="max-w-[315px] max-h-[215px] lg:max-w-[480px] lg:max-h-[210px]">
                <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                  <CloudflareImage
                    category="sponsors"
                    fileName={sponsor.logo_image}
                    fallbackSrc="/common/no_image_sponsor.png"
                    alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                    width={480}
                    height={210}
                    className="w-72 h-42 object-contain p-7"
                  />
                </div>
                <div className="flex flex-col my-4">
                  <h3 className="text-xl font-bold">{lang === 'ja' ? (sponsor.name_ja || sponsor.name_en) : (sponsor.name_en || sponsor.name_ja)}</h3>
                  <p className="lg:max-w-[480px]">
                    {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, platinum_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, platinum_len) + "..." : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      }
      <div className="relative py-2">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold font-jost">Gold Sponsors</span><span className="lg:mx-24 text-[##808080]">ゴールドスポンサー</span>
        </h2>
        <div className="grid lg:grid-cols-4 gap-6 gap-y-24 justify-center items-center">
          {sponsors.filter(sponsor => sponsor.plan === 'gold').map((sponsor, index) => (
            <Link href={`/${lang}/sponsors/${sponsor.path}`} key={index} className="max-w-[225px] max-h-[220px] lg:max-w-[220px] lg:h-[225px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <CloudflareImage
                  category="sponsors"
                  fileName={sponsor.logo_image}
                  fallbackSrc="/common/no_image_sponsor.png"
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-[220px] h-[130px] p-4 object-contain"
                />
              </div>
              <div className="flex flex-col my-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? (sponsor.name_ja || sponsor.name_en) : (sponsor.name_en || sponsor.name_ja)}</h3>
                <p className="lg:max-w-[230px] pt-2">
                  {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, gold_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, gold_len) + "..." : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {sponsors.filter(sponsor => sponsor.plan === 'flower').length > 0 &&
        <div className="relative py-2">
          <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
            <span className="text-5xl font-bold font-jost">Flower Sponsors</span><span className="lg:mx-24 text-[##808080]">フラワースポンサー</span>
          </h2>
          <div className="grid lg:grid-cols-4 gap-6 gap-y-24 justify-center items-center">
            {sponsors.filter(sponsor => sponsor.plan === 'flower').map((sponsor, index) => (
              <Link href={`/${lang}/sponsors/${sponsor.path}`} key={index} className="max-w-[225px] max-h-[220px] lg:max-w-[220px] lg:h-[225px]">
                <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                  <CloudflareImage
                    category="sponsors"
                    fileName={sponsor.logo_image}
                    fallbackSrc="/common/no_image_sponsor.png"
                    alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                    width={480}
                    height={210}
                    className="w-[220px] h-[130px] p-4 object-contain"
                  />
                </div>
                <div className="flex flex-col my-4">
                  <h3 className="text-xl font-bold">{lang === 'ja' ? (sponsor.name_ja || sponsor.name_en) : (sponsor.name_en || sponsor.name_ja)}</h3>
                  <p className="lg:max-w-[230px] pt-2">
                    {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, gold_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, gold_len) + "..." : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      }
      <div className="relative py-2">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold font-jost">Silver Sponsors</span><span className="lg:mx-24 text-[##808080]">シルバースポンサー</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 gap-y-14 lg:gap-y-10 place-items-center">
          {sponsors.filter(sponsor => sponsor.plan === 'silver').map((sponsor, index) => (
            <Link href={`/${lang}/sponsors/${sponsor.path}`} key={index} className="max-w-[145px] h-[165px] lg:max-w-[180px] lg:h-[210px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <CloudflareImage
                  category="sponsors"
                  fileName={sponsor.logo_image}
                  fallbackSrc="/common/no_image_sponsor.png"
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-[180px] h-[105px] object-contain p-4"
                />
              </div>
              <div className="flex flex-col py-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? (sponsor.name_ja || sponsor.name_en) : (sponsor.name_en || sponsor.name_ja)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative py-2 mb-10">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold font-jost">Special Sponsors</span><span className="lg:mx-24 text-[##808080]">特別スポンサー</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 gap-y-14 lg:gap-y-10 place-items-center">
          {specialSponsors.filter(sponsor => sponsor.plan === 'special').map((sponsor, index) => (
            <Link href={`/${lang}/sponsors/special/${sponsor.path}`} key={index} className="max-w-[145px] h-[165px] lg:max-w-[180px] lg:h-[210px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <CloudflareImage
                  category="sponsors"
                  fileName={sponsor.logo_image}
                  fallbackSrc="/common/no_image_sponsor.png"
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-[180px] h-[105px] object-contain p-4"
                />
              </div>
              <div className="flex flex-col py-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? (sponsor.name_ja || sponsor.name_en) : (sponsor.name_en || sponsor.name_ja)}</h3>
                <p className="text-[#808080]">{lang === 'ja' ? (sponsor.title_ja || sponsor.title_en) : (sponsor.title_en || sponsor.title_ja)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative py-2 mb-10">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold font-jost">Patron Sponsors</span><span className="lg:mx-24 text-[##808080]">パトロンスポンサー</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-[24px] gap-y-12 lg:gap-y-10 place-items-center">
          {patron.map((patron, index) => (
            <div key={index} className="w-[145px] h-[165px] lg:w-[180px] lg:h-[210px]">
              <div className="flex flex-col items-center bg-[#9A9A9A] rounded-lg">
                <CloudflareImage
                  category="patron"
                  fileName={patron.image}
                  fallbackSrc="/common/no_image_sponsor.png"
                  alt={patron.name}
                  width={500}
                  height={500}
                  className="w-[105px] h-[105px] object-cover rounded-full p-4"
                />
              </div>
              <div className="flex flex-col py-4">
                <h3 className="text-[15px] font-bold">{patron.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}