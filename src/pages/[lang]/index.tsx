import PageHead from "@/components/elements/PageHead";
import {getBloggerPosts} from "@/libs/blogger";
import {Blogger} from "@/types/blogger";
import {GetStaticProps} from "next";
import {Lang} from "@/types/lang";
import NewsSection from "@/components/sections/NewsSection";
import {dictionary} from "@/lang";
import DefaultLayout from "@/components/layout/DefaultLayout";
import HeroSection from "@/components/sections/HeroSection";
import Header from "@/components/sections/Header";

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

  return (
    <>
      <DefaultLayout activeHeader='home' lang={lang}>
        <PageHead
          title={dict.top.title}
          description={dict.top.description}
          lang={lang}
          pagePath='/'
        />
        <HeroSection/>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-11/12 lg:w-10/12 mx-auto">
          <NewsSection posts={posts} lang={lang}/>
        </main>
      </DefaultLayout>
    </>
  );
}

export default Home;