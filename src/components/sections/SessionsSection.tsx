import React from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/elements/CloudflareImage';
import { Lang } from '@/types/lang';

interface SessionsSectionProps {
  lang: Lang;
  className?: string;
}

const SessionsSection: React.FC<SessionsSectionProps> = ({ lang, className = '' }) => {
  const isJapanese = lang === 'ja';

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* タイムテーブル */}
        <Link href={`/${lang}/timetable`} className="group relative block overflow-hidden">
          <div className="aspect-[16/9] relative">
            <CloudflareImage
              category="common"
              fileName="session_section_talk"
              fallbackSrc="/common/session_section_talk.jpg"
              alt={isJapanese ? 'タイムテーブル' : 'Timetable'}
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {isJapanese ? 'タイムテーブル' : 'Timetable'}
              </h3>
              <p className="text-sm md:text-base mb-6">
                {isJapanese ? 'Day1・Day2 | ルーム別' : 'Day1・Day2 | By Room'}
              </p>
              <span className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-sm font-bold">
                {isJapanese ? 'すべて見る' : 'View All'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* ポスターセッション */}
        <Link href={`/${lang}/timetable#poster-section`} className="group relative block overflow-hidden">
          <div className="aspect-[16/9] relative">
            <CloudflareImage
              category="common"
              fileName="session_section_poster"
              fallbackSrc="/common/session_section_poster.jpg"
              alt={isJapanese ? 'ポスターセッション' : 'Poster Session'}
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 grayscale"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                {isJapanese ? 'ポスターセッション' : 'Poster Session'}
              </h3>
              <p className="text-sm md:text-base mb-6">
                {isJapanese ? '自由閲覧ポスター展示' : 'Free Viewing Poster Exhibition'}
              </p>
              <span className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-sm font-bold">
                {isJapanese ? 'すべて見る' : 'View All'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SessionsSection;