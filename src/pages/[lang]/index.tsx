import PageHead from "@/components/elements/PageHead";
import {getBloggerPosts} from "@/libs/blogger";
import {Blogger} from "@/types/blogger";
import {GetStaticProps} from "next";
import {Lang} from "@/types/lang";
import NewsSection from "@/components/sections/NewsSection";
import {dictionary} from "@/lang";
import HeroSection from "@/components/sections/HeroSection";
import Header from "@/components/sections/Header";
import FixedMenu from "@/components/elements/FixedMenu";
import Footer from "@/components/sections/Footer";
import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import KeynoteSection from "@/components/sections/KeynoteSection";
import ImageSlideSection from "@/components/sections/ImageSlideSection";
import OverviewSection from "@/components/sections/OverviewSection";

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
  const sentinelRef = useRef(null);
  const [isStickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Header active={'home'} lang={lang} className='lg:hidden'/>
      <PageHead
        title={dict.top.title}
        description={dict.top.description}
        lang={lang}
        pagePath='/'
      />
      <div>
        <Header active={'home'} lang={lang} isTop={true} className='hidden lg:block'/>
        <HeroSection/>
      </div>
      <div>
        <div ref={sentinelRef} className='h-1'/>
        <Header active={'home'} lang={lang} className={clsx('hidden lg:block', {
          'opacity-100': isStickyVisible,
          'opacity-0 pointer-events-none': !isStickyVisible
        })}/>
        <KeynoteSection className='mx-auto lg:w-5/8 w-10/12 mt-20' lang={lang}/>
        <NewsSection className='mx-auto lg:w-5/8 w-10/12 mt-20' posts={posts} lang={lang}/>
        <OverviewSection lang={lang} className='mx-auto lg:w-5/8 w-10/12 mt-20'/>
      </div>
      <FixedMenu/>
      <Footer/>
    </main>
  );
}

export default Home;