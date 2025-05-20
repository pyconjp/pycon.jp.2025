import {Geist, Geist_Mono} from "next/font/google";
import {useRouter} from "next/router";
import PageHead from "@/components/PageHead";

// TODO: 実際のフォントを反映する
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Coc() {
  const {query} = useRouter();
  const lang = query.lang === 'en' ? 'en' : 'ja';

  return (
    <>
      <PageHead title={lang === 'en' ? 'Code of Conduction' : '行動規範'} description='' lang={lang} pagePath='/coc' imagePath='ogp/coc.jpg'/>
      <div className={`${geistSans.className} ${geistMono.className}`}>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {lang === "ja" ? "ここは日本語版のCoCページです" : "Welcome to the English CoC page"}
        </main>
      </div>
    </>
  );
}
