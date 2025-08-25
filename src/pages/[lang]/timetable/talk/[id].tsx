import { Lang } from "@/types/lang";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";
import PageHead from "@/components/elements/PageHead";
import { fetchTalks } from "@/libs/pretalx";
import { Talk } from "@/types/pretalx";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DateArea from "@/components/elements/DateArea";
import MarkdownContent from "@/components/elements/MarkdownContent";

// ヘルパー関数
const getLanguageLabel = (langCode: Lang): string => {
  return langCode === 'ja' ? '日本語' : 'English';
};

export const getStaticPaths: GetStaticPaths = async () => {
  const talks = await fetchTalks();
  
  const paths = talks.flatMap(talk => [
    { params: { lang: 'ja', id: talk.code } },
    { params: { lang: 'en', id: talk.code } },
  ]);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as Lang || 'ja';
  const id = params?.id as string;
  
  const talks = await fetchTalks();
  const talk = talks.find(t => t.code === id);
  
  if (!talk) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      lang,
      talk,
    },
  };
};

interface TalkDetailPageProps {
  lang: Lang;
  talk: Talk;
}

function TalkDetailPage({ lang, talk }: TalkDetailPageProps) {
  const isJapanese = lang === 'ja';
  
  // 日時のフォーマット
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
  
  const startTime = talk.slot?.start ? formatDateTime(talk.slot.start) : null;
  const endTime = talk.slot?.end ? new Date(talk.slot.end).toTimeString().slice(0, 5) : null;
  
  // スピーカー情報の取得
  const speakers = talk.speakers || [];
  
  return (
    <DefaultLayout lang={lang} activeHeader="timetable">
      <PageHead
        title={talk.title}
        description={talk.abstract || `${talk.title} - PyCon JP 2025`}
        lang={lang}
        pagePath={`/timetable/talk/${talk.code}`}
      />
      
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="relative mx-0 md:mx-0 sm:mx-4">
          {/* スピーカーアバター（枠上に配置） */}
          <div className="flex justify-center -mb-14 relative z-[5]">
            <div className="flex gap-4">
              {speakers.map((speaker, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white p-1 shadow-lg">
                    {speaker.avatar_url ? (
                      <Image
                        src={speaker.avatar_url}
                        alt={speaker.name}
                        width={100}
                        height={100}
                        className="object-cover w-24 h-24"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">
                          {speaker.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-bold text-gray-700">{speaker.name}</p>
                </div>
              ))}
            </div>
          </div>
        
          <div className="bg-white rounded-lg border border-gray-300 pt-14 relative">
            {/* 閉じるボタン（グレー枠線の右上角） */}
            <Link 
              href={`/${lang}/timetable/${startTime?.date === '9/26' ? 'day1' : 'day2'}`}
              className="absolute -top-5 -right-5 z-[5] bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </Link>
            
            {/* カード内容 */}
            <div className="px-6 py-6 md:px-12 md:py-8">
              {/* タイトルと日付の横並び（PCのみ） / 縦並び（SP） */}
              <div className="flex flex-col md:flex-row mb-6">
                {/* 日付表示（SPでは下部に移動） */}
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
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                      {talk.slot?.room && (
                        <span className="px-3 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                          {talk.slot.room.name?.en || talk.slot.room.name?.['en'] || `Room ${talk.slot.room.id}`}
                        </span>
                      )}
                      
                      {talk.talk_language && (
                        <span className="px-3 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                          {getLanguageLabel(talk.talk_language)}
                        </span>
                      )}
                    </div>
                    
                    {/* 時間情報 */}
                    {startTime && (
                      <div className="text-sm text-gray-600 mb-6 md:mb-0">
                        <span className="font-medium">
                          {startTime.time} - {endTime || ''}
                        </span>
                        <span className="ml-4 text-gray-500">
                          {talk.duration}min
                        </span>
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
                  <hr className="border-gray-200 mb-6"/>
                  <h2 className="hidden md:hidden text-lg font-bold mb-4">
                    {isJapanese ? '概要' : 'Abstract'}
                  </h2>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {talk.abstract}
                  </p>
                </div>
              )}
              
              {/* スライドやリソース */}
              {talk.resource && talk.resource.length > 0 && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-bold mb-3 text-gray-600">
                    {isJapanese ? 'スライド概要' : 'Slide Summary'}
                  </h3>
                  <ul className="space-y-2">
                    {talk.resource.map((res, index) => (
                      <li key={index}>
                        <a
                          href={res.resource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-sm"
                        >
                          {res.description || res.resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* プレゼン録画 */}
              {talk.resource && talk.resource.length > 0 && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-bold mb-3 text-gray-600">
                    {isJapanese ? 'プレゼン録画' : 'Presentation Recording'}
                  </h3>
                  <div className="space-y-2">
                    {talk.resource.map((res, index) => (
                      <div key={index}>
                        <a 
                          href={res.resource} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-sm"
                        >
                          {res.description || res.resource}
                        </a>
                      </div>
                    ))}
                  </div>
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
                    className="text-gray-700 text-sm md:text-base"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* スピーカー情報（別枠） */}
          {speakers.length > 0 && (
            <div className="mt-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-300 px-6 py-6 md:px-12 md:py-8 mb-4">
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* アバター */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      {speaker.avatar_url ? (
                        <Image
                          src={speaker.avatar_url}
                          alt={speaker.name}
                          width={120}
                          height={120}
                          className="object-cover w-[120px] h-[120px] rounded-lg"
                        />
                      ) : (
                        <div className="w-[120px] h-[120px] bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center rounded-lg">
                          <span className="text-white text-4xl font-bold">
                            {speaker.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* スピーカー情報 */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {isJapanese ? 'プロフィール' : 'Profile'}
                      </p>
                      {speaker.biography && (
                        <MarkdownContent 
                          content={speaker.biography}
                          className="text-gray-700 text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default TalkDetailPage;