import {Blogger} from "@/types/blogger";
import {Lang} from "@/types/lang";
import ExternalLink from "@/components/elements/ExternalLink";

type Props = {
  posts: Blogger[],
  lang: Lang,
}

export default function NewsSection({posts, lang}: Props) {
  return (
    <section>
      {posts.map((post) => (
        <div key={post.url} className="flex flex-col gap-4">
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
    </section>
  );
}