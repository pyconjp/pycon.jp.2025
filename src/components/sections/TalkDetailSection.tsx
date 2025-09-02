import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import DateArea from '@/components/elements/DateArea';
import MarkdownContent from '@/components/elements/MarkdownContent';
import ResourceSection from '@/components/sections/ResourceSection';
import { Talk } from '@/types/pretalx';
import { Lang } from '@/types/lang';

interface TalkDetailCardProps {
  talk: Talk;
  lang: Lang;
  onClose?: () => void;
}

const getLanguageLabel = (langCode: Lang): string => {
  return langCode === 'ja' ? '日本語' : 'EN';
};


const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dayOfWeek = date.getDay() === 5 ? 'FRI' : 'SAT';
  
  return {
    date: `${month}/${day}`,
    time: `${hours}:${minutes}`,
    dayOfWeek,
  };
};

const calculateDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.round(diffMs / 60000);
};

const TalkDetailSection: React.FC<TalkDetailCardProps> = ({ talk, lang, onClose }) => {
  const isJapanese = lang === 'ja';
  const startTime = talk.slot?.start ? formatDateTime(talk.slot.start) : null;
  const endTime = talk.slot?.end ? new Date(talk.slot.end).toTimeString().slice(0, 5) : null;

  return (
    <div className="bg-white rounded-lg border border-gray-300 pt-14 relative">
      {/* 閉じるボタン */}
      {onClose ? (
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 z-[5] bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      ) : (
        <Link 
          href={`/${lang}/timetable/${startTime?.date === '9/26' ? 'day1' : 'day2'}`}
          className="absolute -top-5 -right-5 z-[5] bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </Link>
      )}
      
      {/* カード内容 */}
      <div className="px-6 py-6 md:px-12 md:py-8">
        {/* タイトルと日付の横並び（PCのみ） / 縦並び（SP） */}
        <div className="flex flex-col md:flex-row mb-6">
          {/* 日付表示（PC） */}
          <div className="hidden md:block w-48 flex-shrink-0 font-jost font-semibold pr-6">
            <DateArea 
              day={`DAY ${startTime?.date === '9/26' ? '1' : '2'}`}
              month="09"
              date={startTime?.date === '9/26' ? '26' : '27'}
              weekday={startTime?.dayOfWeek || 'FRI'}
              className='text-black'
            />
          </div>
          
          {/* 縦線 */}
          <div className="hidden md:block border-l border-gray-300 mr-6"></div>
          
          {/* タイトルとメタ情報 */}
          <div className="flex-1 flex flex-col justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {talk.title}
            </h1>
            
            <div>
              {/* ラベル情報 */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {talk.slot?.room && talk.slot.room.name && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                    {lang === 'ja' 
                      ? (talk.slot.room.name['ja-jp'] || talk.slot.room.name.en || `Room ${talk.slot.room.id}`)
                      : (talk.slot.room.name.en || talk.slot.room.name['ja-jp'] || `Room ${talk.slot.room.id}`)}
                  </span>
                )}
                
                {talk.talk_language && !talk.is_special && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-900 text-sm font-bold rounded-full">
                    {getLanguageLabel(talk.talk_language)}
                  </span>
                )}
              </div>
              
              {/* 時間情報 */}
              {startTime && (
                <div className="text-sm flex items-center justify-between">
                  <span className="text-gray-900 font-bold">
                    {startTime.time} - {endTime || ''}
                  </span>
                  {talk.slot?.start && talk.slot?.end && (
                    <span className="text-gray-600">
                      {calculateDuration(talk.slot.start, talk.slot.end)}min
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* SP版の日付表示 */}
        <div className="md:hidden border-t border-gray-200 pt-4 font-jost mb-6">
          <div className="flex items-start justify-between">
            <div className="text-sm font-bold">DAY {startTime?.date === '9/26' ? '1' : '2'}</div>
            <div className="flex items-start gap-2">
              <div className="flex items-start">
                <span className="text-3xl font-bold">09</span>
                <span className="text-5xl font-bold">/{startTime?.date === '9/26' ? '26' : '27'}</span>
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                {startTime?.dayOfWeek || 'FRI'}
              </div>
            </div>
          </div>
        </div>
        
        <hr className="md:hidden border-gray-200 mb-6"/>
        
        {/* 概要 */}
        {talk.abstract && (
          <div className="mb-8">
            <hr className="hidden md:block border-gray-200 mb-6"/>
            <h2 className="hidden md:hidden text-lg font-bold mb-4">
              {isJapanese ? '概要' : 'Abstract'}
            </h2>
            <MarkdownContent 
              content={talk.abstract}
              className="text-gray-700 text-sm md:text-base break-all"
            />
          </div>
        )}
        
        {/* リソースセクション */}
        {talk.resource && talk.resource.length > 0 && (
          <div className="mb-8">
            <hr className="border-gray-200 mb-6"/>
            <ResourceSection resources={talk.resource} className="" />
          </div>
        )}
        
        {/* 詳細説明 */}
        {talk.description && (
          <div className="mb-8">
            <hr className="border-gray-200 mb-6"/>
            <h2 className="text-lg font-bold mb-4">
              {isJapanese ? 'トーク詳細 / Description' : 'Description'}
            </h2>
            <MarkdownContent 
              content={talk.description}
              className="text-gray-700 text-sm md:text-base break-all"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TalkDetailSection;