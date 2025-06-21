import { Lang } from "@/types/lang";
import { Sponsor } from "@/types/sponsor";
import React from "react";
import ImageWithFallback from "@/components/elements/ImageWithFallback";

type Props = {
  sponsors: Sponsor[];
  lang: Lang;
} & React.HTMLAttributes<HTMLElement>;

const platinum_len = 60;
const gold_len = 20;

export default function SponsorSection({ sponsors, lang, ...props }: Props) {
  return (
    <section {...props}>
      <div className="relative">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold">Platinum Sponsors</span><span className="lg:mx-24">プラチナムスポンサー</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-24 space-y-12 justify-center items-center">
          {sponsors.filter(sponsor => sponsor.plan === 'platinum').map((sponsor, index) => (
            <div key={index} className="max-w-[315px] max-h-[215px] lg:max-w-[480px] lg:max-h-[210px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <ImageWithFallback src={`/common/sponsor/${sponsor.logo_image}`}
                  fallback={`/common/no_image.jpg`}
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-72 h-42 object-contain" />
              </div>
              <div className="flex flex-col my-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? sponsor.name_ja : sponsor.name_en}</h3>
                <p className="lg:max-w-[480px] mt-4">
                  {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, platinum_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, platinum_len) + "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative py-2">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold">PSF</span><span className="lg:mx-24">PSF</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-24 space-y-12 justify-center items-center">
          {sponsors.filter(sponsor => sponsor.plan === 'psf').map((sponsor, index) => (
            <div key={index} className="max-w-[315px] max-h-[215px] lg:max-w-[480px] lg:max-h-[210px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <ImageWithFallback src={`/common/sponsor/${encodeURIComponent(sponsor.logo_image)}`}
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-72 h-42 object-contain p-7"
                  fallback={'/common/logo_pc.png'}
                />
              </div>
              <div className="flex flex-col my-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? sponsor.name_ja : sponsor.name_en}</h3>
                <p className="lg:max-w-[480px]">
                  {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, platinum_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, platinum_len) + "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative py-2">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold">Gold Sponsors</span><span className="lg:mx-24">ゴールドスポンサー</span>
        </h2>
        <div className="grid lg:grid-cols-4 gap-10 space-y-24 justify-center items-center">
          {sponsors.filter(sponsor => sponsor.plan === 'gold').map((sponsor, index) => (
            <div key={index} className="max-w-[225px] max-h-[220px] lg:max-w-[230px] lg:max-h-[220px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <ImageWithFallback src={`/common/sponsor/${encodeURIComponent(sponsor.logo_image)}`}
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-52 h-42 p-5 object-contain"
                  fallback={'/common/logo_pc.png'}
                />
              </div>
              <div className="flex flex-col my-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? sponsor.name_ja : sponsor.name_en}</h3>
                <p className="lg:max-w-[230px] pt-2">
                  {lang === 'ja' ? sponsor.pr_ja ? sponsor.pr_ja.substring(0, gold_len) + "..." : "" : sponsor.pr_en ? sponsor.pr_en.substring(0, gold_len) + "..." : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative py-2">
        <h2 className="flex max-lg:flex-col max-lg:gap-6 lg:items-center my-20">
          <span className="text-5xl font-bold">Silver Sponsors</span><span className="lg:mx-24">シルバースポンサー</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
          {sponsors.filter(sponsor => sponsor.plan === 'silver').map((sponsor, index) => (
            <div key={index} className="max-w-[145px] h-[220px] lg:max-w-[230px] lg:h-[160px]">
              <div className="flex flex-col items-center bg-white border border-[#0000001A] rounded-lg">
                <ImageWithFallback src={`/common/sponsor/${encodeURIComponent(sponsor.logo_image)}`}
                  alt={lang === 'ja' ? sponsor.name_ja : sponsor.name_en}
                  width={480}
                  height={210}
                  className="w-32 h-22 object-contain p-2"
                  fallback={'/common/logo_pc.png'}
                />
              </div>
              <div className="flex flex-col my-4">
                <h3 className="text-xl font-bold">{lang === 'ja' ? sponsor.name_ja : sponsor.name_en}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}