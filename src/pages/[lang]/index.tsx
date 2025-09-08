import PageHead from "@/components/elements/PageHead";
import { getBloggerPosts } from "@/libs/blogger";
import { Blogger } from "@/types/blogger";
import { GetStaticProps } from "next";
import { Lang } from "@/types/lang";
import NewsSection from "@/components/sections/NewsSection";
import { dictionary } from "@/lang";
import HeroSection from "@/components/sections/HeroSection";
import Header from "@/components/sections/Header";
import FixedMenu from "@/components/elements/FixedMenu";
import Footer from "@/components/sections/Footer";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import KeynotesSection from "@/components/sections/KeynotesSection";
import OverviewSection from "@/components/sections/OverviewSection";
import SessionsSection from "@/components/sections/SessionsSection";
import { getPatrons, getSpecialSponsors, getSponsors } from "@/libs/spreadsheet";
import { Patron, SpecialSponsor, Sponsor } from "@/types/sponsor";
import SponsorSection from "@/components/sections/Sponsor";
import ImageSlideSection from "@/components/sections/ImageSlideSection";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: 'ja' } },
      { params: { lang: 'en' } },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang || 'ja';
  const posts = await getBloggerPosts();
  const sponsors = await getSponsors();
  const patrons = await getPatrons();
  const specialSponsor = await getSpecialSponsors();
  return {
    props: {
      lang,
      posts,
      sponsors,
      specialSponsor,
      patrons,
    },
    revalidate: 3600,
  };
};

function Home({ lang, posts, sponsors, specialSponsor, patrons }: { lang: Lang, posts: Blogger[], sponsors: Sponsor[], specialSponsor: SpecialSponsor[], patrons: Patron[] }) {
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
      <Header active={'home'} lang={lang} className='lg:hidden' />
      <PageHead
        title=""
        description={dict.top.description}
        lang={lang}
        pagePath='/'
      />
      <div>
        <Header active={'home'} lang={lang} isTop={true} className='hidden lg:block' />
        <HeroSection lang={lang} />
      </div>
      <div>
        <div ref={sentinelRef} className='h-1' />
        <Header active={'home'} lang={lang} className={clsx('hidden lg:block', {
          'opacity-100': isStickyVisible,
          'opacity-0 pointer-events-none': !isStickyVisible
        })} />
        <KeynotesSection className='mx-auto lg:w-5/8 w-10/12 mt-20' lang={lang} />
        <NewsSection className='mx-auto lg:w-5/8 w-10/12 mt-20' posts={posts} lang={lang} />
        <ImageSlideSection className='w-full my-20 lg:my-36' />
        <OverviewSection lang={lang} className='mx-auto lg:w-5/8 w-10/12 mt-20' />
        <SessionsSection lang={lang} className='my-20' />
        <div className="bg-[#FAFAFA] py-2 pb-10">
          <SponsorSection className="mx-auto lg:w-5/8 w-10/12" sponsors={sponsors} lang={lang} patron={patrons} specialSponsors={specialSponsor} />
        </div>
      </div>
      <FixedMenu lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}

export default Home;