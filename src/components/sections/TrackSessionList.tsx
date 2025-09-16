import React from 'react';
import { Talk } from '@/types/pretalx';
import { isTalkSession } from '@/libs/pretalx';
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
  const sortedSessions = sessions
    .filter(session => session.slot !== null) // slotがnullのものを除外
    .sort((a, b) => {
      // Type guard を使用して型安全にアクセス
      const aIsTalk = isTalkSession(a);
      const bIsTalk = isTalkSession(b);

      // 両方がTalkSessionの場合
      if (aIsTalk && bIsTalk && a.slot && b.slot) {
        return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime();
      }

      // 片方だけがTalkSessionの場合、TalkSessionを先に
      if (aIsTalk && !bIsTalk) return -1;
      if (!aIsTalk && bIsTalk) return 1;

      // 両方がPosterSessionの場合
      if (!aIsTalk && !bIsTalk) {
        if (!a.slot || !b.slot || !a.slot.start || !b.slot.start) return 0;
        return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime();
      }

      return 0;
    });


  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedSessions.map((session) => (
          <SessionCard 
            key={session.code} 
            session={session} 
            locale={locale}
            showDate={true}
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