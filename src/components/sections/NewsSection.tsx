import {Blogger} from "@/types/blogger";
import {Lang} from "@/types/lang";
import ExternalLink from "@/components/elements/ExternalLink";
import {dictionary} from "@/lang";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  posts: Blogger[],
  lang: Lang,
} & React.HTMLAttributes<HTMLElement>;

export default function NewsSection({lang, posts, ...props}: Props) {
  const dict = dictionary[lang];

  return (
    <section {...props}>
      <h1 className='flex items-center gap-10'>
        <span className='text-6xl font-bold font-jost'>Topics</span><span className='my-auto text-base'>お知らせ</span>
      </h1>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 mt-11'>
        {posts.map((post) => (
          <ExternalLink key={post.url} href={post.url} className="block">
            <article key={post.url}
                  className="flex flex-col justify-between p-5 border-gray-100 border-2 rounded-2xl min-h-36">
              <h2 className="text-lg font-semibold">
                {post.title}
              </h2>
              <time className="text-sm text-gray-500" dateTime={post.published}>
                {dayjs(post.published).tz('Asia/Tokyo').format('YYYY/MM/DD')}
              </time>
            </article>
          </ExternalLink>
        ))}
        <ExternalLink href='https://pyconjp.blogspot.com/search/label/pyconjp2025'>
          <span className='bg-gray-50 border-gray-300 border-2 flex items-center justify-center rounded-2xl min-h-36'>
            <span className="text-lg font-semibold">
              {dict.top.see_all}
            </span>
          </span>
        </ExternalLink>
      </div>
    </section>
  );
}