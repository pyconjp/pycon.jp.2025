import React from 'react';
import { Talk } from '@/types/pretalx';
import SessionCard from './SessionCard';

interface TrackSessionListProps {
  sessions: Talk[];
  trackName: string;
  locale: 'ja' | 'en';
}

const TrackSessionList: React.FC<TrackSessionListProps> = ({ 
  sessions, 
  locale
}) => {
  const sortedSessions = sessions.sort((a, b) => {
    if (!a.slot || !b.slot) return 0;
    return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime();
  });


  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedSessions.map((session) => (
          <SessionCard 
            key={session.code} 
            session={session} 
            locale={locale}
          />
        ))}
      </div>
      
      {sortedSessions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {locale === 'ja' 
            ? 'このトラックのセッションは現在準備中です。'
            : 'Sessions for this track are currently being prepared.'}
        </div>
      )}
    </div>
  );
};

export default TrackSessionList;