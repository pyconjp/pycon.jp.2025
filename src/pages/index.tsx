import {Geist, Geist_Mono} from "next/font/google";
import {useRouter} from "next/router";
import PageHead from "@/components/PageHead";
import { getBloggerPosts } from "@/libs/blogger";
import { Blogger } from "@/types/blogger";
import {GetStaticProps} from "next";
import Link from "next/link";

// TODO: 実際のフォントを反映する
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ posts }: { posts: Blogger[] }) {
  const {query} = useRouter();
  const lang = query.lang === 'en' ? 'en' : 'ja';

  return (
    <>
      <PageHead title='トップページ' description='' lang={lang} pagePath='/'/>
      <div className={`${geistSans.className} ${geistMono.className}`}>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {lang === "ja" ? "ここは日本語版トップページです" : "Welcome to the English homepage"}
          {posts.map((post) => (
            <div key={post.url} className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">
                <Link href={post.url}>
                  {post.title}
                </Link>
              </h2>
              <time className="text-sm text-gray-500" dateTime={post.published}>
                {new Date(post.published).toLocaleDateString()}
              </time>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBloggerPosts();
  return {
    props: {
      posts,
    },
  };
};