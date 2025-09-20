import React from 'react';
import {Talk} from '@/types/pretalx';
import Image from 'next/image';
import Link from 'next/link';
import { SUBMISSION_TYPES, shouldShowRoom } from '@/libs/pretalx';

interface SessionCardProps {
  session: Talk;
  locale: 'ja' | 'en';
  showDate?: boolean; // スピーカーページで日付を表示するかどうか
}

const SessionCard: React.FC<SessionCardProps> = ({ session, locale, showDate = false }) => {
  const formatTime = (start: string | null, end: string | null) => {
    if (!start || !end) return '';
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    
    const startTime = startDate.toLocaleTimeString(locale === 'ja' ? 'ja-JP' : 'en-US', timeOptions);
    const endTime = endDate.toLocaleTimeString(locale === 'ja' ? 'ja-JP' : 'en-US', timeOptions);
    
    return `${startTime} - ${endTime}`;
  };

  const calculateDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    return Math.round(diffMs / 60000);
  };

  const getLanguageLabel = (lang: string) => {
    return lang === 'ja' ? '日本語' : 'EN';
  };

  const getDateInfo = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayNumber = day === 26 ? '1' : '2';
    return `DAY ${dayNumber} - ${month}/${day}`;
  };

  // Lunchの特別な表示
  if (session.submission_type_id === SUBMISSION_TYPES.LUNCH) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 relative flex flex-col h-full">
        {/* タイトル */}
        <h3 className="text-lg font-bold text-center text-gray-700">
          {session.title}
        </h3>

        {/* 時間情報 */}
        {session.slot && (
          <div className="text-center mt-4 text-sm text-gray-600 font-bold">
            {formatTime(session.slot.start, session.slot.end)}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={`/${locale}/timetable/talk/${session.code}`} className="block scroll-mt-32 md:scroll-mt-24" id={`session-${session.code}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-[0_0px_40px_0px_rgba(0,0,0,0.1)] cursor-pointer relative flex flex-col h-full">
        {/* タイトル */}
        <h3 className="text-lg font-bold pb-8 transition-colors leading-[1.3]">
          {session.title}
        </h3>
      
        {/* メイン情報 - flexboxで下揃え */}
        <div className="flex-grow flex flex-col justify-end">
          {/* 下部情報：左側にラベルと時間、右側にスピーカー */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
            {/* 左側：ラベルと時間情報（縦並び） */}
            {session.slot ? (
              <div className="flex flex-col gap-2">
                {/* ポスターの場合は2段構成 */}
                {(session.submission_type_id === SUBMISSION_TYPES.POSTER ||
                  session.submission_type_id === SUBMISSION_TYPES.COMMUNITY_POSTER) ? (
                  <>
                    {/* 1段目：ポスター分類ラベル */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full whitespace-nowrap">
                        {session.submission_type_id === SUBMISSION_TYPES.POSTER
                          ? (locale === 'ja' ? 'ポスター' : 'Poster')
                          : (locale === 'ja' ? 'コミュニティポスター' : 'Community Poster')}
                      </span>
                    </div>
                    {/* 2段目：ルームと言語ラベル */}
                    <div className="flex flex-wrap items-center gap-2">
                      {session.slot.room && session.slot.room.name && shouldShowRoom(session.code) && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full whitespace-nowrap">
                          {locale === 'ja'
                            ? (session.slot.room.name['ja-jp'] || session.slot.room.name.en || `Room ${session.slot.room.id}`)
                            : (session.slot.room.name.en || session.slot.room.name['ja-jp'] || `Room ${session.slot.room.id}`)}
                        </span>
                      )}
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full whitespace-nowrap">
                        {getLanguageLabel(session.talk_language)}
                      </span>
                    </div>
                  </>
                ) : (
                  /* 通常のトークは1段構成 */
                  <div className="flex flex-wrap items-center gap-2">
                    {/* ルーム情報（特殊コードの場合は非表示） */}
                    {session.slot.room && session.slot.room.name && shouldShowRoom(session.code) && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                        {locale === 'ja'
                          ? (session.slot.room.name['ja-jp'] || session.slot.room.name.en || `Room ${session.slot.room.id}`)
                          : (session.slot.room.name.en || session.slot.room.name['ja-jp'] || `Room ${session.slot.room.id}`)}
                      </span>
                    )}
                    {/* 言語ラベル */}
                    {session.submission_type_id !== SUBMISSION_TYPES.SPECIAL && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                        {getLanguageLabel(session.talk_language)}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {session.slot.start && session.slot.end && (
                    <div className="text-sm flex items-center gap-2">
                      <span className="text-gray-900 font-bold">{formatTime(session.slot.start, session.slot.end)}</span>
                      <span className="text-gray-600">{calculateDuration(session.slot.start, session.slot.end)}min</span>
                    </div>
                  )}
                  {showDate && session.slot.start && (
                    <div className="text-xs text-gray-500 font-bold">
                      {getDateInfo(session.slot.start)}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1">
                {/* slotがない場合でもポスターラベルを表示 */}
                <div className="flex flex-wrap items-center gap-2">
                  {session.submission_type_id === SUBMISSION_TYPES.POSTER && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                      {locale === 'ja' ? 'ポスター' : 'Poster'}
                    </span>
                  )}
                  {session.submission_type_id === SUBMISSION_TYPES.COMMUNITY_POSTER && (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                      {locale === 'ja' ? 'コミュニティポスター' : 'Community Poster'}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 右側：スピーカー情報 */}
            <div className="flex flex-col gap-2 items-end">
              {session.speakers.map((speaker) => (
                <div key={speaker.code} className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 text-right leading-none">{speaker.name}</span>
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-200 flex-shrink-0 rounded">
                    {speaker.avatar_url ? (
                      <Image
                        src={speaker.avatar_url}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SessionCard;