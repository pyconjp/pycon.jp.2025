import React, {useState, useEffect, useMemo} from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import TrackSessionList from '@/components/sections/TrackSessionList';
import TrackNavigation from '@/components/sections/TrackNavigation';
import {SUBMISSION_TYPES} from '@/libs/pretalx';
import {getSessionsByType} from '@/libs/pretalxCache';
import {Talk, Track} from '@/types/pretalx';
import {Lang} from '@/types/lang';
import DefaultLayout from "@/components/layout/DefaultLayout";
import PageHead from '@/components/elements/PageHead';
import Ja from '@/lang/ja';
import En from '@/lang/en';

interface TrackPageProps {
  allSessions: Talk[];  // 全セッションデータ
  track: Track;
  locale: Lang;
}


const TrackPage: React.FC<TrackPageProps> = ({allSessions, track, locale}) => {
  const router = useRouter();
  const currentLocale = (router.locale || locale) as 'ja' | 'en';
  const dictionary = currentLocale === 'ja' ? Ja : En;
  
  // stateで現在のトラックを管理
  const [currentTrack, setCurrentTrack] = useState<Track>(track);
  
  // 現在のトラックに基づいてセッションをフィルタリング
  const filteredSessions = useMemo(
    () => allSessions.filter(session => session.track === currentTrack),
    [allSessions, currentTrack]
  );
  
  const trackName = dictionary.timetable.track[currentTrack];
  
  // onTrackChangeハンドラー
  const handleTrackChange = (newTrack: Track | 'keynote') => {
    if (newTrack === 'keynote') {
      // キーノートページへ遷移
      router.push(`/${currentLocale}/speakers`);
    } else {
      // stateを更新してURLを変更
      setCurrentTrack(newTrack);
      router.push(`/${currentLocale}/speakers/${newTrack}`, undefined, { shallow: true });
    }
  };
  
  // URL変更を監視
  useEffect(() => {
    const slug = router.query.slug as Track;
    if (slug && slug !== currentTrack) {
      setCurrentTrack(slug);
    }
  }, [router.query.slug, currentTrack]);

  return (
    <DefaultLayout lang={currentLocale} activeHeader="speakers">
      <PageHead
        title={`${trackName} - ${currentLocale === 'ja' ? 'スピーカー' : 'Speakers'}`}
        description={`PyCon JP 2025 ${trackName} ${currentLocale === 'ja' ? 'トラックのセッション一覧' : 'track sessions'}`}
        lang={currentLocale}
        pagePath={`/speakers/${currentTrack}`}
      />
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-12">
        {/* Track navigation */}
        <TrackNavigation 
          currentTrack={currentTrack} 
          locale={currentLocale}
          onTrackChange={handleTrackChange}
        />

        <div className="mb-8 px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-4">
            #{trackName}
          </h1>
        </div>

        <div className="px-4 md:px-8">
          <TrackSessionList
            sessions={filteredSessions}
            trackName={trackName}
            locale={currentLocale}
          />
        </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];
  const langs = ['ja', 'en'];

  const paths = [];
  for (const lang of langs) {
    for (const track of tracks) {
      paths.push({params: {lang, slug: track}});
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TrackPageProps> = async ({params}) => {
  const locale = (params?.lang as Lang) || 'ja';
  const track = params?.slug as Track;

  try {
    // TALK、POSTER、COMMUNITY_POSTERのセッションを取得
    const [talkSessions, posterSessions, communityPosterSessions] = await Promise.all([
      getSessionsByType(SUBMISSION_TYPES.TALK),
      getSessionsByType(SUBMISSION_TYPES.POSTER),
      getSessionsByType(SUBMISSION_TYPES.COMMUNITY_POSTER),
    ]);

    const allSessions = [...talkSessions, ...posterSessions, ...communityPosterSessions];

    return {
      props: {
        allSessions,  // 全セッションデータを渡す
        track,
        locale,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch sessions:', error);

    return {
      props: {
        allSessions: [],
        track,
        locale,
      },
      revalidate: 60,
    };
  }
};

export default TrackPage;