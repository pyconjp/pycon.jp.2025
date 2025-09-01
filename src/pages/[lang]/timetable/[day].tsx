import {Lang} from "@/types/lang";
import {GetStaticProps, GetStaticPaths} from "next";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DefaultLayout from "@/components/layout/DefaultLayout";
import NaviTimetable from "@/components/elements/Navi_timetable";
import PageHead from "@/components/elements/PageHead";
import { fetchTalks } from "@/libs/pretalx";
import { Talk } from "@/types/pretalx";
import TalkList from "@/components/sections/TalkList";
import DateArea from "@/components/elements/DateArea";
import ContentsHeader from "@/components/sections/ContentsHeader";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {lang: 'ja', day: 'day1'}},
      {params: {lang: 'en', day: 'day1'}},
      {params: {lang: 'ja', day: 'day2'}},
      {params: {lang: 'en', day: 'day2'}},
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const lang = params?.lang || 'ja';
  const day = params?.day || 'day1';
  const talks = await fetchTalks();
  
  // 日付でフィルタリング（9/26はday1、9/27はday2）
  const filteredTalks = talks.filter(talk => {
    if (!talk.slot?.start) return false;
    const date = new Date(talk.slot.start);
    const dayNumber = date.getDate() === 26 ? 'day1' : 'day2';
    return dayNumber === day;
  });
  
  // 時間順にソート
  const sortedTalks = filteredTalks.sort((a, b) => {
    if (!a.slot?.start || !b.slot?.start) return 0;
    return new Date(a.slot.start).getTime() - new Date(b.slot.start).getTime();
  });
  
  return {
    props: {
      lang,
      day,
      talks: sortedTalks,
    },
    revalidate: 3600, // 1時間（3600秒）ごとに再生成
  };
};

interface TimetablePageProps {
  lang: Lang;
  day: string;
  talks: Talk[];
}

function TimetableDayPage({lang, day, talks}: TimetablePageProps) {
  const router = useRouter();
  const dayNumber = day === 'day1' ? 1 : 2;
  const dateStr = day === 'day1' ? '9/26' : '9/27';
  
  // URLからの初期値を取得
  const initialRoom = router.query.room as string | undefined;
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(initialRoom);
  
  // URLパラメータが変更されたときにStateを更新（直アクセス対応）
  useEffect(() => {
    setSelectedRoom(router.query.room as string | undefined);
  }, [router.query.room]);
  
  // ルームでフィルタリング
  const filteredTalks = selectedRoom 
    ? talks.filter(talk => talk.slot?.room?.id === parseInt(selectedRoom))
    : talks;
  
  return (
    <DefaultLayout lang={lang} activeHeader="timetable">
      <PageHead
        title={lang === "ja" ? `タイムテーブル Day ${dayNumber}` : `Timetable Day ${dayNumber}`}
        description={lang === "ja" ? `PyCon JP 2025のDay ${dayNumber} (${dateStr})のタイムテーブル` : `Timetable for Day ${dayNumber} (${dateStr}) of PyCon JP 2025`}
        lang={lang}
        pagePath={`/timetable/${day}`}
      />
      <ContentsHeader title="Timetable" subtitle="タイムテーブル"
        images={['/common/timetable_header_1.png', '/common/timetable_header_2.png']} 
        grayscale={true} />
      
      {/* ナビゲーションタブ */}
      <NaviTimetable 
        currentDay={day as 'day1' | 'day2'} 
        currentRoom={selectedRoom} 
        lang={lang}
        onRoomChange={setSelectedRoom}
      />
      
      <div className="relative">
        {/* デスクトップ: 左側の余白に日付表示 */}
        <div className="hidden md:block absolute left-8 top-0 w-48 font-jost font-semibold">
          <DateArea 
            day={`DAY ${dayNumber}`}
            month="09"
            date={day === 'day1' ? '26' : '27'}
            weekday={day === 'day1' ? 'FRI' : 'SAT'}
            className='text-black'
          />
        </div>
        
        {/* モバイル: 上部に日付表示 */}
        <div className="md:hidden px-4 py-6 font-jost">
          <div className="flex items-start justify-between max-w-sm mx-auto">
            <div className="text-sm font-bold">DAY {dayNumber}</div>
            <div className="flex items-start gap-2">
              <div className="flex items-start">
                <span className="text-3xl font-bold">09</span>
                <span className="text-5xl font-bold">/{day === 'day1' ? '26' : '27'}</span>
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                {day === 'day1' ? 'FRI' : 'SAT'}
              </div>
            </div>
          </div>
        </div>
        
        {/* 中央のトークリスト */}
        <div className="max-w-screen-xl mx-auto px-4 md:pl-56 lg:pl-64 md:pr-8 md:pt-0 md:pb-8">
          <TalkList 
            talks={filteredTalks} 
            locale={lang}
            showFilters={false}
            groupByTime={true}
          />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default TimetableDayPage;