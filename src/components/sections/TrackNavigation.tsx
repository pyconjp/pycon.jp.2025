import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Track } from '@/types/pretalx';
import { Lang } from '@/types/lang';
import Ja from '@/lang/ja';
import En from '@/lang/en';

interface TrackNavigationProps {
  currentTrack?: Track;
  locale: Lang;
  isKeynote?: boolean;
  onTrackChange?: (track: Track | 'keynote') => void;
}

const TrackNavigation: React.FC<TrackNavigationProps> = ({ currentTrack, locale, isKeynote = false, onTrackChange }) => {
  const dictionary = locale === 'ja' ? Ja : En;
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
      const nav = navRef.current || navDesktopRef.current;
      if (nav) {
        const { scrollLeft, scrollWidth, clientWidth } = nav;
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScroll();
    const nav = navRef.current || navDesktopRef.current;
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
              {onTrackChange ? (
                <button
                  onClick={() => onTrackChange('keynote')}
                  className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    isKeynote ? 'border-b-2 border-black' : 'hover:text-gray-600'
                  }`}
                >
                  {locale === 'ja' ? 'キーノート' : 'Keynote'}
                </button>
              ) : (
                <Link
                  href={`/${locale}/speakers`}
                  className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 ${
                    isKeynote ? 'border-b-2 border-black' : 'hover:text-gray-600'
                  }`}
                >
                  {locale === 'ja' ? 'キーノート' : 'Keynote'}
                </Link>
              )}
              
              {/* 縦線 */}
              <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
              
              {/* トラック一覧 */}
              {allTracks.map((t) => (
                onTrackChange ? (
                  <button
                    key={t}
                    onClick={() => onTrackChange(t)}
                    className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 cursor-pointer ${
                      t === currentTrack
                        ? 'border-b-2 border-black'
                        : 'hover:text-gray-600'
                    }`}
                  >
                    {dictionary.timetable.track[t]}
                  </button>
                ) : (
                  <Link
                    key={t}
                    href={`/${locale}/speakers/${t}`}
                    className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 ${
                      t === currentTrack
                        ? 'border-b-2 border-black'
                        : 'hover:text-gray-600'
                    }`}
                  >
                    {dictionary.timetable.track[t]}
                  </Link>
                )
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
              {onTrackChange ? (
                <button
                  onClick={() => onTrackChange('keynote')}
                  className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    isKeynote ? 'border-b-2 border-black' : 'hover:text-gray-600'
                  }`}
                >
                  {locale === 'ja' ? 'キーノート' : 'Keynote'}
                </button>
              ) : (
                <Link
                  href={`/${locale}/speakers`}
                  className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 ${
                    isKeynote ? 'border-b-2 border-black' : 'hover:text-gray-600'
                  }`}
                >
                  {locale === 'ja' ? 'キーノート' : 'Keynote'}
                </Link>
              )}
              
              {/* 縦線 */}
              <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>
              
              {/* トラック一覧 */}
              {allTracks.map((t) => (
                onTrackChange ? (
                  <button
                    key={t}
                    onClick={() => onTrackChange(t)}
                    className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 cursor-pointer ${
                      t === currentTrack
                        ? 'border-b-2 border-black'
                        : 'hover:text-gray-600'
                    }`}
                  >
                    {dictionary.timetable.track[t]}
                  </button>
                ) : (
                  <Link
                    key={t}
                    href={`/${locale}/speakers/${t}`}
                    className={`px-3 py-2 text-sm font-medium transition-all text-black whitespace-nowrap flex-shrink-0 ${
                      t === currentTrack
                        ? 'border-b-2 border-black'
                        : 'hover:text-gray-600'
                    }`}
                  >
                    {dictionary.timetable.track[t]}
                  </Link>
                )
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
  );
};

export default TrackNavigation;