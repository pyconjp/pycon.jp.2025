import React, { useState, useMemo } from 'react';
import { Talk, Track, TalkSession } from '@/types/pretalx';
import SessionCard from './SessionCard';
import { Lang } from '@/types/lang';
import Ja from '@/lang/ja';
import En from '@/lang/en';
import { SUBMISSION_TYPES } from '@/libs/pretalx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

interface TalkListProps {
  talks: Talk[];
  locale: Lang;
  showFilters?: boolean;
  groupByTime?: boolean;
  day?: 'day1' | 'day2'; // 日付を追加
}

const TalkList: React.FC<TalkListProps> = ({
  talks,
  locale,
  showFilters = true,
  groupByTime = false,
  day
}) => {
  const dictionary = locale === 'ja' ? Ja : En;
  const [selectedTrack, setSelectedTrack] = useState<Track | 'all'>('all');

  const allTracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];

  // Lunchの擬似トークを生成
  const createLunchTalk = (dayStr: string, startTime: string, endTime: string): TalkSession => {
    return {
      code: `LUNCH-${dayStr}`,
      title: 'Lunch',
      speakers: [],
      track: 'other' as Track,
      abstract: '',
      description: '',
      duration: 60,
      talk_language: 'en' as Lang,
      slide_language: 'en' as Lang,
      level: 'beginner',
      resource: [],
      slot: {
        room: { id: 0, name: { en: '', 'ja-jp': '' } },
        start: startTime,
        end: endTime,
      },
      submission_type_id: SUBMISSION_TYPES.LUNCH, // 特殊な値でLunchを識別
    };
  };

  // dayに応じてLunchを追加
  const talksWithLunch = useMemo(() => {
    const allTalks = [...talks];

    if (day === 'day1') {
      // Day1: 12:30-13:30
      allTalks.push(createLunchTalk('DAY1', '2025-09-26T12:30:00+09:00', '2025-09-26T13:30:00+09:00'));
    } else if (day === 'day2') {
      // Day2: 12:20-13:20
      allTalks.push(createLunchTalk('DAY2', '2025-09-27T12:20:00+09:00', '2025-09-27T13:20:00+09:00'));
    }

    return allTalks;
  }, [talks, day]);

  // トークをフィルタリング
  const filteredTalks = useMemo(() => {
    let filtered = talksWithLunch;
    
    if (selectedTrack !== 'all') {
      filtered = filtered.filter(talk => talk.track === selectedTrack);
    }
    
    // 時間順にソート
    return filtered.sort((a, b) => {
      if (!a.slot?.start || !b.slot?.start) return 0;
      const timeComparison = dayjs(a.slot.start).valueOf() - dayjs(b.slot.start).valueOf();
      
      // 同じ時刻の場合はroom.idでソート
      if (timeComparison === 0 && a.slot.room && b.slot.room) {
        return a.slot.room.id - b.slot.room.id;
      }
      return timeComparison;
    });
  }, [talksWithLunch, selectedTrack]);
  
  // 時刻ごとにグルーピング
  const groupedTalks = useMemo(() => {
    if (!groupByTime) return null;
    
    const groups = new Map<string, Talk[]>();
    
    filteredTalks.forEach(talk => {
      if (talk.slot?.start) {
        const startTime = dayjs(talk.slot.start).tz('Asia/Tokyo');
        const timeKey = startTime.format('HH:mm');
        
        if (!groups.has(timeKey)) {
          groups.set(timeKey, []);
        }
        groups.get(timeKey)!.push(talk);
      }
    });
    
    return Array.from(groups.entries());
  }, [filteredTalks, groupByTime, locale]);

  return (
    <div className="space-y-6">
      {/* フィルター */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
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
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
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
      {groupByTime && groupedTalks ? (
        <div className="space-y-8">
          {groupedTalks.map(([time, talksInGroup]) => (
            <div key={time}>
              <h2 className="text-xl font-bold text-center mb-4">{time}</h2>
              <div className={talksInGroup.length === 1 
                ? "max-w-2xl mx-auto" 
                : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                {talksInGroup.map((talk) => (
                  <SessionCard 
                    key={talk.code} 
                    session={talk} 
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTalks.map((talk) => (
            <SessionCard 
              key={talk.code} 
              session={talk} 
              locale={locale}
            />
          ))}
        </div>
      )}
      
      {/* 空の状態 */}
      {filteredTalks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {locale === 'ja'
            ? 'セッションはありません。'
            : 'No sessions available.'}
        </div>
      )}
    </div>
  );
};

export default TalkList;