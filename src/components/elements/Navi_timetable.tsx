import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Lang } from '@/types/lang';
import clsx from 'clsx';

interface NaviTimetableProps {
  currentDay: 'day1' | 'day2';
  currentRoom?: string;
  lang: Lang;
}

const NaviTimetable: React.FC<NaviTimetableProps> = ({ currentDay, currentRoom, lang }) => {
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

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
    { id: 'roomA', label: 'roomA' },
    { id: 'roomB', label: 'roomB' },
    { id: 'roomC', label: 'roomC' },
    { id: 'roomD', label: 'roomD' },
  ];

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
    <div className="bg-white px-4 py-4">
      <div className="max-w-6xl mx-auto relative">
        <nav className="border border-gray-300 rounded-lg overflow-hidden">
          <div 
            ref={navRef}
            className="flex items-center md:justify-center gap-8 px-6 py-3 overflow-x-auto scrollbar-hide"
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
                  className={clsx(
                    "px-2 py-2 text-sm font-medium transition-all text-black whitespace-nowrap",
                    {
                      "border-b-2 border-black": currentRoom === item.id,
                    }
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        {/* Blur effect when scrollable */}
        {canScrollRight && (
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none rounded-r-lg" />
        )}
      </div>
    </div>
  );
};

export default NaviTimetable;