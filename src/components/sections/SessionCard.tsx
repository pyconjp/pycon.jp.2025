import React from 'react';
import {Talk} from '@/types/pretalx';
import Image from 'next/image';
import Link from 'next/link';

interface SessionCardProps {
  session: Talk;
  locale: 'ja' | 'en';
}

const SessionCard: React.FC<SessionCardProps> = ({ session, locale }) => {
  const formatTime = (start: string, end: string) => {
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

  const getLanguageLabel = (lang: string) => {
    return lang === 'ja' ? '日本語' : 'EN';
  };

  return (
    <Link href={`/${locale}/timetable/talk/${session.code}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer relative flex flex-col h-full">
        {/* タイトル */}
        <h3 className="text-lg font-bold mb-4 line-clamp-2 transition-colors">
          {session.title}
        </h3>
      
        {/* メイン情報 - flexboxで下揃え */}
        <div className="flex-grow flex flex-col justify-end">
          {/* 下部情報：左側にラベルと時間、右側にスピーカー */}
          <div className="flex justify-between items-end gap-4">
            {/* 左側：ラベルと時間情報（縦並び） */}
            {session.slot && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                    {session.slot.room && session.slot.room.name && (
                      locale === 'ja' 
                        ? (session.slot.room.name['ja-jp'] || session.slot.room.name.en || `Room ${session.slot.room.id}`)
                        : (session.slot.room.name.en || session.slot.room.name['ja-jp'] || `Room ${session.slot.room.id}`)
                    )}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                    {getLanguageLabel(session.talk_language)}
                  </span>
                </div>
                <div className="text-sm flex items-center gap-2">
                  <span className="text-gray-900 font-bold">{formatTime(session.slot.start, session.slot.end)}</span>
                  <span className="text-gray-600">{session.duration}min</span>
                </div>
              </div>
            )}
            
            {/* 右側：スピーカー情報 */}
            <div className="flex flex-col gap-2">
              {session.speakers.map((speaker) => (
                <div key={speaker.code} className="flex items-center gap-2">
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
                  <span className="text-sm font-bold text-gray-900">{speaker.name}</span>
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