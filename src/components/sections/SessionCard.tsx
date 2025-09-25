import React from 'react';
import {Talk, Level} from '@/types/pretalx';
import Image from 'next/image';
import Link from 'next/link';
import { SUBMISSION_TYPES, shouldShowRoom, shouldShowLevel, getLevelLabel, getRoomHashtag } from '@/libs/pretalx';
import { Lang } from '@/types/lang';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

interface SessionCardProps {
  session: Talk;
  locale: Lang;
  showDate?: boolean; // スピーカーページで日付を表示するかどうか
}

const SessionCard: React.FC<SessionCardProps> = ({ session, locale, showDate = false }) => {
  const formatTime = (start: string | null, end: string | null) => {
    if (!start || !end) return '';

    const startTime = dayjs(start).tz('Asia/Tokyo').format('HH:mm');
    const endTime = dayjs(end).tz('Asia/Tokyo').format('HH:mm');

    return `${startTime} - ${endTime}`;
  };

  const calculateDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return 0;
    const startDate = dayjs(start).tz('Asia/Tokyo');
    const endDate = dayjs(end).tz('Asia/Tokyo');
    return endDate.diff(startDate, 'minute');
  };

  const getLanguageLabel = (lang: string, currentLocale: Lang) => {
    if (currentLocale === 'ja') {
      return lang === 'ja' ? '日本語' : '英語';
    } else {
      return lang === 'ja' ? 'JA' : 'EN';
    }
  };

  const getDateInfo = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = dayjs(dateStr).tz('Asia/Tokyo');
    const day = date.date();
    const month = date.month() + 1;
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
          {/* 下部情報：ラベルと時間情報 */}
          <div className="flex flex-col gap-4">
            {/* ラベルと時間情報 */}
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
                      {shouldShowLevel(session.code) && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full whitespace-nowrap">
                          {getLevelLabel(session.level as Level, locale)}
                        </span>
                      )}
                      {session.slot.room && session.slot.room.name && shouldShowRoom(session.code) && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full whitespace-nowrap">
                          {locale === 'ja'
                            ? (session.slot.room.name['ja-jp'] || session.slot.room.name.en || `Room ${session.slot.room.id}`)
                            : (session.slot.room.name.en || session.slot.room.name['ja-jp'] || `Room ${session.slot.room.id}`)}
                        </span>
                      )}
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full whitespace-nowrap">
                        {getLanguageLabel(session.talk_language, locale)}
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
                    {/* ハッシュタグラベル */}
                    {session.slot.room && getRoomHashtag(session.slot.room.id, session.code) && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                        {getRoomHashtag(session.slot.room.id, session.code)}
                      </span>
                    )}
                    {/* レベルラベル */}
                    {shouldShowLevel(session.code) && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                        {getLevelLabel(session.level as Level, locale)}
                      </span>
                    )}
                    {/* 言語ラベル */}
                    {session.submission_type_id !== SUBMISSION_TYPES.SPECIAL && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                        {getLanguageLabel(session.talk_language, locale)}
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

            {/* スピーカー情報（別の段として配置） */}
            <div className="flex justify-end">
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
      </div>
    </Link>
  );
};

export default SessionCard;