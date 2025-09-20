import { Lang } from "@/types/lang";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";
import PageHead from "@/components/elements/PageHead";
import { fetchSession, fetchSessions, SUBMISSION_TYPES } from "@/libs/pretalx";
import { Talk } from "@/types/pretalx";
import SpeakerAvatar from "@/components/elements/SpeakerAvatar";
import TalkDetailSection from "@/components/sections/TalkDetailSection";
import SpeakerInfoSection from "@/components/sections/SpeakerInfoSection";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const talks = await fetchSessions(SUBMISSION_TYPES.TALK);
    const specials = await fetchSessions(SUBMISSION_TYPES.SPECIAL);
    const posters = await fetchSessions(SUBMISSION_TYPES.POSTER);
    const communityPosters = await fetchSessions(SUBMISSION_TYPES.COMMUNITY_POSTER);

    // 全てのセッションを結合
    const allSessions = [...talks, ...specials, ...posters, ...communityPosters];

    const paths = allSessions.flatMap(session => [
      { params: { lang: 'ja', id: session.code } },
      { params: { lang: 'en', id: session.code } },
    ]);

    return {
      paths,
      fallback: false, // 静的ビルドのため、事前生成されたパスのみ対応
    };
  } catch (error) {
    console.error('Failed to fetch sessions for static paths:', error);
    // APIエラーの場合は空の配列で最小限のビルドを実行
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as Lang || 'ja';
  const id = params?.id as string;

  try {
    // 単体のトークを直接取得
    const talk = await fetchSession(id);

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
      revalidate: 3600, // 1時間（3600秒）ごとに再生成
    };
  } catch (error) {
    console.error(`Failed to fetch session ${id}:`, error);
    // APIエラーの場合は404として扱う
    return {
      notFound: true,
    };
  }
};

interface TalkDetailPageProps {
  lang: Lang;
  talk: Talk;
}

function TalkDetailPage({ lang, talk }: TalkDetailPageProps) {
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
          {speakers.length > 0 ? (
            <div className="flex justify-center -mb-14 relative z-[5]">
              <div className="flex gap-4">
                {speakers.map((speaker, index) => (
                  <SpeakerAvatar
                    key={index}
                    name={speaker.name}
                    avatarUrl={speaker.avatar_url}
                    size="small"
                    showName={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            // スピーカーがいない場合は適切な余白を確保
            <div className="pb-14"></div>
          )}
        
          {/* メインのトークカード */}
          <TalkDetailSection talk={talk} lang={lang} />
          
          {/* スピーカー情報（別枠） */}
          {speakers.length > 0 && (
            <div className="mt-6">
              {speakers.map((speaker, index) => (
                <SpeakerInfoSection
                  key={index}
                  speaker={speaker}
                  lang={lang}
                  className="mb-4"
                />
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