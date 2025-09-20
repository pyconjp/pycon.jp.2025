import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Lang} from '@/types/lang';
import clsx from 'clsx';

interface NaviTimetableProps {
  currentDay: 'day1' | 'day2';
  currentRoom?: string;
  lang: Lang;
  onRoomChange?: (room: string | undefined) => void;
}

const NaviTimetable: React.FC<NaviTimetableProps> = ({currentDay, currentRoom, lang, onRoomChange}) => {
  const router = useRouter();
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navDesktopRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(currentRoom);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const dayItems = [
    {
      id: 'day1',
      label: 'DAY 1',
      href: `/timetable/day1`
    },
    {
      id: 'day2',
      label: 'DAY 2',
      href: `/timetable/day2`
    },
  ];

  const roomItems = [
    {
      id: '4739',
      label: lang === 'ja' ? 'フェニックスホール' : 'Phoenix Hall'
    },
    {
      id: '4740',
      label: lang === 'ja' ? 'ダリア1' : 'Dahlia 1'
    },
    {
      id: '4741',
      label: lang === 'ja' ? 'ダリア2' : 'Dahlia 2'
    },
    {
      id: '4742',
      label: lang === 'ja' ? 'ラン' : 'Ran'
    },
    {
      id: '4811',
      label: lang === 'ja' ? 'サクラ' : 'Sakura'
    },
    ...(currentDay === 'day2' ? [{
      id: '4838',
      label: lang === 'ja' ? 'コスモス' : 'Cosmos',
    }] : [])
  ];

  // URLのクエリパラメータが変更されたときにStateを更新
  useEffect(() => {
    setSelectedRoom(currentRoom);
  }, [currentRoom]);

  // Day1に切り替えた際、コスモスが選択されていたら未選択にする
  useEffect(() => {
    if (currentDay === 'day1' && selectedRoom === '4838') {
      setSelectedRoom(undefined);
      // 親コンポーネントに通知
      if (onRoomChange) {
        onRoomChange(undefined);
      }
      // URLからもroomパラメータを削除
      const query = {...router.query};
      delete query.room;
      router.replace({
        pathname: router.pathname,
        query,
      }, undefined, {shallow: true});
    }
  }, [currentDay, selectedRoom, onRoomChange, router]);

  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const {scrollLeft, scrollWidth, clientWidth} = navRef.current;
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

  // ドラッグスクロール機能（デスクトップ用）
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navDesktopRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - navDesktopRef.current.offsetLeft);
    setScrollLeft(navDesktopRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !navDesktopRef.current) return;
    e.preventDefault();
    const x = e.pageX - navDesktopRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // スクロール速度の調整
    navDesktopRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white px-4 py-4">
      <div className="max-w-6xl mx-auto relative">
        <nav className="border border-gray-300 rounded-lg overflow-hidden">
          {/* モバイル版 */}
          <div
            ref={navRef}
            className="flex md:hidden items-center gap-8 px-6 py-3 overflow-x-auto scrollbar-hide"
          >
            {/* Day selector */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {dayItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/${lang}${item.href}`}
                  className={clsx(
                    "px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap",
                    {
                      "border-b-2 border-black": currentDay === item.id,
                    }
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>

            {/* Room tabs */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {roomItems.map((item) => (
                <button
                  key={item.id}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    const newRoom = selectedRoom === item.id ? undefined : item.id;
                    setSelectedRoom(newRoom);

                    // 親コンポーネントにState変更を通知
                    if (onRoomChange) {
                      onRoomChange(newRoom);
                    }

                    // URLの書き換え（ページ遷移なし）
                    const query = {...router.query};
                    if (newRoom === undefined) {
                      delete query.room;
                    } else {
                      query.room = newRoom;
                    }
                    router.replace({
                      pathname: router.pathname,
                      query,
                    }, undefined, {shallow: true});
                  }}
                  className={clsx(
                    "px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap hover:text-gray-600 cursor-pointer",
                    {
                      "border-b-2 border-black hover:text-black": selectedRoom === item.id,
                    }
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>

            {/* Poster session button */}
            <div className="flex items-center flex-shrink-0">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => {
                  // ポスターセッションセクションまでスクロール
                  const posterSection = document.getElementById('poster-section');
                  if (posterSection) {
                    posterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap hover:text-gray-600 cursor-pointer"
              >
                {lang === 'ja' ? 'ポスターセッション' : 'Poster Session'}
              </button>
            </div>
          </div>

          {/* デスクトップ版（ドラッグスクロール対応） */}
          <div
            ref={navDesktopRef}
            className="hidden md:flex items-center lg:justify-center gap-8 px-6 py-3 overflow-x-auto scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* Day selector */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {dayItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/${lang}${item.href}`}
                  className={clsx(
                    "px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap",
                    {
                      "border-b-2 border-black": currentDay === item.id,
                    }
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>

            {/* Room tabs */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {roomItems.map((item) => (
                <button
                  key={item.id}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    const newRoom = selectedRoom === item.id ? undefined : item.id;
                    setSelectedRoom(newRoom);

                    // 親コンポーネントにState変更を通知
                    if (onRoomChange) {
                      onRoomChange(newRoom);
                    }

                    // URLの書き換え（ページ遷移なし）
                    const query = {...router.query};
                    if (newRoom === undefined) {
                      delete query.room;
                    } else {
                      query.room = newRoom;
                    }
                    router.replace({
                      pathname: router.pathname,
                      query,
                    }, undefined, {shallow: true});
                  }}
                  className={clsx(
                    "px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap hover:text-gray-600 cursor-pointer",
                    {
                      "border-b-2 border-black hover:text-black": selectedRoom === item.id,
                    }
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 flex-shrink-0"></div>

            {/* Poster session button */}
            <div className="flex items-center flex-shrink-0">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => {
                  // ポスターセッションセクションまでスクロール
                  const posterSection = document.getElementById('poster-section');
                  if (posterSection) {
                    posterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap hover:text-gray-600 cursor-pointer"
              >
                {lang === 'ja' ? 'ポスターセッション' : 'Poster Session'}
              </button>
            </div>
          </div>
        </nav>
        {/* Blur effect when scrollable */}
        {canScrollRight && (
          <div
            className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none rounded-r-lg"/>
        )}
      </div>
    </div>
  );
};

export default NaviTimetable;