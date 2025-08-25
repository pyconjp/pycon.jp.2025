import React from 'react';
import {Room, Talk} from '@/types/pretalx';
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


  const getRoomLabel = (room: Room) => {
    if (!room) return '';

    // TODO roomのidを入れる
    const roomLabels: { [key: string]: string } = {
      1: 'roomA',
      2: 'roomB',
      3: 'roomC',
      4: 'roomD',
      5: 'roomE',
    };
    
    return room.name?.[locale === 'ja' ? 'ja-jp' : 'en'] || 
           roomLabels[room.id] || 
           `Room ${room.id}`;
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
        <div className="flex-grow flex flex-col justify-end space-y-4">
          {/* 部屋と言語タグ */}
          {session.slot && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                {getRoomLabel(session.slot.room)}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                {getLanguageLabel(session.talk_language)}
              </span>
            </div>
          )}
          
          {/* 時間情報 */}
          {session.slot && (
            <div className="text-sm text-gray-600">
              <div className="font-medium">
                {formatTime(session.slot.start, session.slot.end)}
              </div>
            </div>
          )}
        </div>
        
        {/* スピーカー情報（右下配置） */}
        <div className="flex justify-end mt-4">
          <div className="flex flex-wrap gap-3">
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
    </Link>
  );
};

export default SessionCard;