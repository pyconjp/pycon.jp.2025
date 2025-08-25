import React, { useState, useEffect, useRef } from 'react';
import KeynotesSection from "@/components/sections/KeynotesSection";
import PageHead from "@/components/elements/PageHead";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { Lang } from "@/types/lang";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import DisplayDate from "@/components/elements/DisplayDate";
import Link from 'next/link';
import { Track } from '@/types/pretalx';
import Ja from '@/lang/ja';
import En from '@/lang/en';

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
  const dictionary = lang === 'ja' ? Ja : En;
  const allTracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];
  
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScroll();
    const nav = navRef.current;
    if (nav) {
      nav.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        nav.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

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
        <div className="py-4 mb-8 -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="border border-gray-300 rounded-lg overflow-hidden relative bg-white">
              <div ref={navRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center md:justify-center gap-6 px-6 py-3 min-w-max">
                  {/* キーノート */}
                  <Link
                    href={`/${lang}/speakers`}
                    className="px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 border-b-2 border-black"
                  >
                    {lang === 'ja' ? 'キーノート' : 'Keynote'}
                  </Link>
                  
                  {/* 縦線 */}
                  <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
                  
                  {/* トラック一覧 */}
                  {allTracks.map((t) => (
                    <Link
                      key={t}
                      href={`/${lang}/speakers/${t}`}
                      className="px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 hover:text-gray-600"
                    >
                      {dictionary.timetable.track[t]}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Blur effect when scrollable - inside the border */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
              )}
            </nav>
          </div>
        </div>

        <div className="mb-8">
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