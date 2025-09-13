import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { Lang } from '@/types/lang';
import { getRelatedEvents } from '@/libs/spreadsheet';
import { RelatedEvent } from '@/types/relatedEvents';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navi_about from '@/components/elements/Navi_about';
import PageHead from '@/components/elements/PageHead';

interface RelatedEventsPageProps {
  lang: Lang;
  relatedEvents: RelatedEvent[];
}

const EventCard = ({ event, lang }: { event: RelatedEvent; lang: Lang }) => {
  const isJapanese = lang === 'ja';

  // 日時のフォーマット
  const formatDateTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateStr = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
    const startTime = `${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    const endTime = `${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    return `${dateStr} ${startTime} - ${endTime}`;
  };

  // 金額のフォーマット
  const formatFee = (fee: string) => {
    if (!fee) return '';
    // 数字以外を除去
    const numStr = fee.replace(/[^\d]/g, '');
    if (!numStr) return fee; // 数字がない場合は元の文字列を返す
    // 3桁ごとにカンマを追加
    const formatted = parseInt(numStr).toLocaleString('ja-JP');
    return `¥${formatted}`;
  };

  return (
    <Link href={event.detailsUrl} target="_blank" rel="noopener noreferrer">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col relative">
        {/* Event Tag - positioned in the top-left corner */}
        <span className="absolute top-0 left-0 z-10 inline-block px-3 py-1 text-xs font-semibold text-white rounded-tl-xl rounded-br-xl bg-primary">
          {event.detailType}
        </span>

        {/* Content */}
        <div className="flex flex-1 px-6 pt-12 pb-6">
          {/* Left side - Event details */}
          <div className="flex-1 pr-6">
            <h3 className="font-bold text-base mb-1 line-clamp-2">{event.eventName}</h3>

            {/* Participation Requirements */}
            {event.participationRequirements && (
              <p className="text-xs text-gray-500 mb-3">{event.participationRequirements}</p>
            )}

            <div className="space-y-1.5 text-sm mt-3">
              {/* Date and Time */}
              <div className="text-gray-700 font-semibold">
                {formatDateTime(event.startDateTime, event.endDateTime)}
              </div>

              {/* Fee and Capacity */}
              <div className="flex items-center gap-2">
                {event.capacity && (
                  <span className="inline-block px-3 py-1 bg-gray-200 text-black text-xs font-bold rounded-full">
                    {event.capacity}
                  </span>
                )}
                {event.fee && (
                  <span className="inline-block px-3 py-1 bg-gray-200 text-black text-xs font-bold rounded-full">
                    {formatFee(event.fee)}
                  </span>
                )}
              </div>

              {/* Venue */}
              <div className="flex items-start gap-1 mt-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  {isJapanese ? (
                    <>
                      <div className="font-bold text-gray-800">{event.venueJa}</div>
                      {event.venueEn && (
                        <div className="text-gray-500">{event.venueEn}</div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-bold text-gray-800">{event.venueEn}</div>
                      {event.venueJa && (
                        <div className="text-gray-500">{event.venueJa}</div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Sponsored by */}
              {event.sponsoredByName && (
                <div className="text-xs text-gray-500 mt-3">
                  {event.sponsoredByName}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative flex-shrink-0" style={{ width: '128px', height: '72px' }}>
            {event.imageUrl ? (
              <Image
                src={`/common/events/${event.imageUrl}`}
                alt={event.eventName}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function RelatedEventsPage({ lang, relatedEvents }: RelatedEventsPageProps) {
  const isJapanese = lang === 'ja';
  const parties = relatedEvents.filter(e => e.type === 'Party');
  const pythonEvents = relatedEvents.filter(e => e.type === 'Python Event');
  
  return (
    <DefaultLayout lang={lang} activeHeader="about">
      <Navi_about position="related_events" lang={lang} />
      <PageHead
        title={isJapanese ? '関連イベント' : 'Related Events'}
        description={isJapanese 
          ? 'PyCon JP 2025 関連イベント・パーティー情報' 
          : 'PyCon JP 2025 Related Events and Parties'
        }
        lang={lang}
        pagePath='/related-events'
      />
      <div className="container mx-auto px-4 pt-20 pb-12 max-w-7xl font-jost">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">Related Events</h1>
          <p className="text-2xl text-gray-600 font-bold">関連イベント</p>
        </div>
        
        {/* Parties Section */}
        {parties.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Parties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {parties.map((event, index) => (
                <EventCard key={index} event={event} lang={lang} />
              ))}
            </div>
          </section>
        )}
        
        {/* Python Events Section */}
        {pythonEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-4">Python Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {pythonEvents.map((event, index) => (
                <EventCard key={index} event={event} lang={lang} />
              ))}
            </div>
          </section>
        )}
        
        {/* Empty State */}
        {parties.length === 0 && pythonEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {isJapanese 
                ? 'イベント情報は準備中です。' 
                : 'Event information is being prepared.'}
            </p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'ja' } },
      { params: { lang: 'en' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as Lang;
  const relatedEvents = await getRelatedEvents();

  return {
    props: {
      lang,
      relatedEvents,
    },
  };
};