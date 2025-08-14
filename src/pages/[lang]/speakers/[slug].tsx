import React from 'react';
import {GetStaticPaths, GetStaticProps} from 'next';
import {useRouter} from 'next/router';
import Link from 'next/link';
import TrackSessionList from '@/components/sections/TrackSessionList';
import {fetchTalks} from '@/libs/pretalx';
import {Talk, Track} from '@/types/pretalx';
import {Lang} from '@/types/lang';
import DefaultLayout from "@/components/layout/DefaultLayout";
import Ja from '@/lang/ja';
import En from '@/lang/en';

interface TrackPageProps {
  sessions: Talk[];
  track: Track;
  locale: Lang;
}


const TrackPage: React.FC<TrackPageProps> = ({sessions, track, locale}) => {
  const router = useRouter();
  const currentLocale = (router.locale || locale) as 'ja' | 'en';
  const dictionary = currentLocale === 'ja' ? Ja : En;
  const trackName = dictionary.timetable.track[track];
  
  const allTracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'media', 'iot', 'other'];

  return (
    <DefaultLayout lang={currentLocale}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            #{trackName}
          </h1>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {allTracks.map((t) => (
              <Link
                key={t}
                href={`/${currentLocale}/speakers/${t}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  t === track
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{dictionary.timetable.track[t]}
              </Link>
            ))}
          </div>
        </div>

        <TrackSessionList
          sessions={sessions}
          track={track}
          trackName={`#${trackName}`}
          locale={currentLocale}
        />
      </div>
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tracks: Track[] = ['ai', 'practice', 'edu', 'devops', 'web', 'libs', 'core', 'other', 'media', 'iot'];
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
    const sessions = await fetchTalks();

    return {
      props: {
        sessions,
        track,
        locale,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch sessions:', error);

    return {
      props: {
        sessions: [],
        track,
        locale,
      },
      revalidate: 60,
    };
  }
};

export default TrackPage;