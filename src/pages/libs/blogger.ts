import { Blogger } from "../types/blogger";

export async function getBloggerPosts(): Promise<Blogger[]> {
  if (!process.env.BLOGGER_API_KEY) {
    return [];
  }
  const baseUrl= "https://www.googleapis.com/blogger/v3/blogs/1711203921350230994/posts";
  const apiUrl = `${baseUrl}?key=${process.env.BLOGGER_API_KEY}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return(
    data.items.slice(0,5).map((item: any) => ({ // ひとまず5件表示
      url: item.url,
      title: item.title,
      published: item.published,
    })) as Blogger[]
  )
};