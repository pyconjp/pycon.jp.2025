import React, { useState, useEffect, useRef } from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import Link from 'next/link';
import TrackSessionList from '@/components/sections/TrackSessionList';
import {fetchTalks} from '@/libs/pretalx';
import {Talk, Track} from '@/types/pretalx';
import {Lang} from '@/types/lang';
import DefaultLayout from "@/components/layout/DefaultLayout";
import PageHead from '@/components/elements/PageHead';
import Ja from '@/lang/ja';
import En from '@/lang/en';

interface TrackPageProps {
  sessions: Talk[];
  track: Track;
  locale: Lang;
}


const TrackPage: React.FC<TrackPageProps> = ({sessions, track, locale}) => {
  const router = useRouter();
  const currentLocale = (router.locale || locale) as 'ja' | 'en';
  const dictionary = currentLocale === 'ja' ? Ja : En;
  const trackName = dictionary.timetable.track[track];
  
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navDesktopRef = useRef<HTMLDivElement>(null);
  
  // ドラッグスクロール用のstate
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [clickStart, setClickStart] = useState(0);

  const allTracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];

  // マウスイベントハンドラー
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navDesktopRef.current) return;
    // リンクの上でクリックした場合はドラッグしない
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) {
      return;
    }
    
    setIsDragging(true);
    setClickStart(e.pageX);
    setStartX(e.pageX - navDesktopRef.current.offsetLeft);
    setScrollLeft(navDesktopRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      // クリック位置がほとんど動いていない場合はクリックと判定
      const moved = Math.abs(e.pageX - clickStart);
      if (moved < 5) {
        // クリックとして扱う
      }
    }
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !navDesktopRef.current) return;
    e.preventDefault();
    const x = e.pageX - navDesktopRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // スクロール速度を調整
    navDesktopRef.current.scrollLeft = scrollLeft - walk;
  };

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

  // ページ遷移時の初期状態で現在のトラックが表示されるようにスクロール
  useEffect(() => {
    // 少し遅延させてDOMが完全にレンダリングされるのを待つ
    const timer = setTimeout(() => {
      if (navRef.current && track) {
        const activeLink = navRef.current.querySelector('.border-b-2.border-black') as HTMLElement;
        if (activeLink) {
          const containerWidth = navRef.current.clientWidth;
          const elementLeft = activeLink.offsetLeft;
          const elementWidth = activeLink.offsetWidth;
          // 要素を中央に配置するためのスクロール位置を計算
          const scrollPosition = elementLeft - (containerWidth / 2) + (elementWidth / 2);
          navRef.current.scrollLeft = Math.max(0, scrollPosition);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [track]); // trackが変わった時だけ実行

  return (
    <DefaultLayout lang={currentLocale} activeHeader="speakers">
      <PageHead
        title={`${trackName} - ${currentLocale === 'ja' ? 'スピーカー' : 'Speakers'}`}
        description={`PyCon JP 2025 ${trackName} ${currentLocale === 'ja' ? 'トラックのセッション一覧' : 'track sessions'}`}
        lang={currentLocale}
        pagePath={`/speakers/${track}`}
      />
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-12">
        {/* Track navigation */}
        <div className="py-4 mb-8 -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="border border-gray-300 rounded-lg overflow-hidden relative bg-white">
              {/* モバイル用：ドラッグ機能なし */}
              <div 
                ref={navRef} 
                className="overflow-x-auto scrollbar-hide md:hidden"
              >
                <div className="flex items-center gap-6 px-6 py-3 min-w-max">
                  {/* キーノート */}
                  <Link
                    href={`/${currentLocale}/speakers`}
                    className="px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 hover:text-gray-600"
                  >
                    {currentLocale === 'ja' ? 'キーノート' : 'Keynote'}
                  </Link>
                  
                  {/* 縦線 */}
                  <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
                  
                  {/* トラック一覧 */}
                  {allTracks.map((t) => (
                    <Link
                      key={t}
                      href={`/${currentLocale}/speakers/${t}`}
                      className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 ${
                        t === track
                          ? 'border-b-2 border-black'
                          : 'hover:text-gray-600'
                      }`}
                    >
                      {dictionary.timetable.track[t]}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* デスクトップ用：ドラッグ機能あり */}
              <div 
                ref={navDesktopRef}
                className={`hidden md:block overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div className="flex items-center md:justify-center gap-6 px-6 py-3 min-w-max select-none">
                  {/* キーノート */}
                  <Link
                    href={`/${currentLocale}/speakers`}
                    className="px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 hover:text-gray-600"
                  >
                    {currentLocale === 'ja' ? 'キーノート' : 'Keynote'}
                  </Link>
                  
                  {/* 縦線 */}
                  <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
                  
                  {/* トラック一覧 */}
                  {allTracks.map((t) => (
                    <Link
                      key={t}
                      href={`/${currentLocale}/speakers/${t}`}
                      className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 ${
                        t === track
                          ? 'border-b-2 border-black'
                          : 'hover:text-gray-600'
                      }`}
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

        <div className="mb-8 px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-4">
            #{trackName}
          </h1>
        </div>

        <div className="px-4 md:px-8">
          <TrackSessionList
            sessions={sessions}
            trackName={trackName}
            locale={currentLocale}
          />
        </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];
  const langs = ['ja', 'en'];

  const paths = [];
  for (const lang of langs) {
    for (const track of tracks) {
      paths.push({params: {lang, slug: track}});
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TrackPageProps> = async ({params}) => {
  const locale = (params?.lang as Lang) || 'ja';
  const track = params?.slug as Track;

  try {
    const allSessions = await fetchTalks();
    const trackSessions = allSessions.filter(session => session.track === track);

    return {
      props: {
        sessions: trackSessions,
        track,
        locale,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch sessions:', error);

    return {
      props: {
        sessions: [],
        track,
        locale,
      },
      revalidate: 60,
    };
  }
};

export default TrackPage;