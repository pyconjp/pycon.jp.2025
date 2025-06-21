import {Blogger} from "@/types/blogger";
import {Lang} from "@/types/lang";
import ExternalLink from "@/components/elements/ExternalLink";

type Props = {
  posts: Blogger[],
  lang: Lang,
} & React.HTMLAttributes<HTMLElement>;

export default function NewsSection({lang, posts, ...props}: Props) {
  return (
    <section {...props}>
      <h1 className='flex items-center gap-10'>
        <span className='text-6xl font-bold font-jost'>Topics</span><span className='my-auto text-base'>お知らせ</span>
      </h1>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 mt-11'>
        {posts.map((post) => (
          <div key={post.url} className="flex flex-col justify-between p-5 border-gray-100 border-2 rounded-2xl min-h-36">
            <h2 className="text-lg font-semibold">
              <ExternalLink href={post.url}>
                {post.title}
              </ExternalLink>
            </h2>
            <time className="text-sm text-gray-500" dateTime={post.published}>
              {new Date(post.published).toLocaleDateString(lang === 'ja' ? "ja-JP" : "en-US")}
            </time>
          </div>
        ))}
        <div className='bg-gray-50 border-gray-300 border-2 flex items-center justify-center rounded-2xl min-h-36'>
          <ExternalLink href='https://pyconjp.blogspot.com/search/label/pyconjp2025'>
            <span className="text-lg font-semibold">
              すべて
            </span>
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}