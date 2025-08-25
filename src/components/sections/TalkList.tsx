import React, { useState, useMemo } from 'react';
import { Talk, Track } from '@/types/pretalx';
import SessionCard from './SessionCard';
import { Lang } from '@/types/lang';
import Ja from '@/lang/ja';
import En from '@/lang/en';

interface TalkListProps {
  talks: Talk[];
  locale: Lang;
  showFilters?: boolean;
}

const TalkList: React.FC<TalkListProps> = ({ 
  talks, 
  locale,
  showFilters = true
}) => {
  const dictionary = locale === 'ja' ? Ja : En;
  const [selectedTrack, setSelectedTrack] = useState<Track | 'all'>('all');
  
  const allTracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];
  
  // トークをフィルタリング
  const filteredTalks = useMemo(() => {
    let filtered = talks;
    
    if (selectedTrack !== 'all') {
      filtered = filtered.filter(talk => talk.track === selectedTrack);
    }
    
    // 時間順にソート
    return filtered.sort((a, b) => {
      if (!a.slot?.start || !b.slot?.start) return 0;
      return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime();
    });
  }, [talks, selectedTrack]);
  

  return (
    <div className="space-y-6">
      {/* フィルター */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTrack === 'all'
                    ? 'bg-[#F34E6F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {locale === 'ja' ? 'すべて' : 'All'}
              </button>
              {allTracks.map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTrack === track
                      ? 'bg-[#F34E6F] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dictionary.timetable.track[track]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* セッション一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTalks.map((talk) => (
          <SessionCard 
            key={talk.code} 
            session={talk} 
            locale={locale}
          />
        ))}
      </div>
      
      {/* 空の状態 */}
      {filteredTalks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {locale === 'ja' 
            ? 'セッション情報は準備中です。'
            : 'Session information is coming soon.'}
        </div>
      )}
    </div>
  );
};

export default TalkList;