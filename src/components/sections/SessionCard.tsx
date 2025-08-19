import React from 'react';
import {Room, Talk} from '@/types/pretalx';
import Image from 'next/image';

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

  const formatDay = (start: string) => {
    const date = new Date(start);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dayNumber = day === 26 ? 1 : 2;
    return `Day ${dayNumber} - ${month}/${day}`;
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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-base font-bold mb-6 line-clamp-2">
        {session.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          {session.slot && (
            <>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium">
                  {getRoomLabel(session.slot.room)}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium">
                  {getLanguageLabel(session.talk_language)}
                </span>
              </div>
              <div className="text-base font-semibold">
                {formatTime(session.slot.start, session.slot.end)}
              </div>
              <div className="text-sm text-gray-600">
                {formatDay(session.slot.start)}
              </div>
            </>
          )}
        </div>

        <div className="flex items-end gap-4">
          {session.speakers.map((speaker) => (
            <div key={speaker.code} className="flex items-center gap-3">
              <span className="text-sm font-bold">{speaker.name}</span>
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-blue-500">
                {speaker.avatar_url ? (
                  <Image
                    src={speaker.avatar_url}
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
  );
};

export default SessionCard;