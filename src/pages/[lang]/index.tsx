import {Geist, Geist_Mono} from "next/font/google";
import PageHead from "@/components/elements/PageHead";
import {getBloggerPosts} from "@/libs/blogger";
import {Blogger} from "@/types/blogger";
import {GetStaticProps} from "next";
import {Lang} from "@/types/lang";
import NewsSection from "@/components/sections/NewsSection";
import {dictionary} from "@/lang";
import dynamic from "next/dynamic";
import DefaultLayout from "@/components/layout/DefaultLayout";

// TODO: 実際のフォントを反映する
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const getStaticPaths = async () => {
  return {
    paths: [
      {params: {lang: 'ja'}},
      {params: {lang: 'en'}},
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const lang = params?.lang || 'ja';
  const posts = await getBloggerPosts();
  return {
    props: {
      lang,
      posts,
    },
    revalidate: 3600,
  };
};

function Home({lang, posts}: { lang: Lang, posts: Blogger[] }) {
  const dict = dictionary[lang];
  const MdxExample = dynamic(() => import(`@/components/markdown/${lang}/example.mdx`), {ssr: true});

  return (
    <DefaultLayout activeHeader='home' lang={lang}>
      <PageHead
        title={dict.top.title}
        description={dict.top.description}
        lang={lang}
        pagePath='/'
      />
      <div className={`${geistSans.className} ${geistMono.className}`}>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-11/12 lg:w-10/12 mx-auto">
          {lang === "ja" ? "ここは日本語版トップページです" : "Welcome to the English homepage"}
          <NewsSection posts={posts} lang={lang}/>
          <MdxExample/>
        </main>
      </div>
    </DefaultLayout>
  );
}

export default Home;