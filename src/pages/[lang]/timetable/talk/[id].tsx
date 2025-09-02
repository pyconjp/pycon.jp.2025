import { Lang } from "@/types/lang";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@/components/layout/DefaultLayout";
import PageHead from "@/components/elements/PageHead";
import { fetchTalks, fetchSpecial } from "@/libs/pretalx";
import { Talk } from "@/types/pretalx";
import SpeakerAvatar from "@/components/elements/SpeakerAvatar";
import TalkDetailSection from "@/components/sections/TalkDetailSection";
import SpeakerInfoSection from "@/components/sections/SpeakerInfoSection";

export const getStaticPaths: GetStaticPaths = async () => {
  const talks = await fetchTalks();
  const specials = await fetchSpecial();
  
  // talksとspecialsを結合
  const allTalks = [...talks, ...specials];
  
  const paths = allTalks.flatMap(talk => [
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
  const specials = await fetchSpecial();
  
  // talksとspecialsの両方から検索
  const allTalks = [...talks, ...specials];
  const talk = allTalks.find(t => t.code === id);
  
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