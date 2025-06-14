import {Geist, Geist_Mono} from "next/font/google";
import PageHead from "@/components/elements/PageHead";
import {GetStaticProps} from "next";
import {Lang} from "@/types/lang";

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
  return {
    props: {
      lang,
    },
  };
};

function Coc({lang}: { lang: Lang }) {
  return (
    <>
      <PageHead
        title={lang === "ja" ? '行動規範' : 'Code of Conduction'}
        description={lang === "ja" ? 'PyCon JP 2025の行動規範ページです' : 'This is the Code of Conduction page of PyCon JP 2025'}
        lang={lang}
        pagePath='/coc'
        imagePath='ogp/coc.jpg'
      />
      <div className={`${geistSans.className} ${geistMono.className}`}>
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {lang === "ja" ? "ここは日本語版のCoCページです" : "Welcome to the English CoC page"}
        </main>
      </div>
    </>
  );
}

Coc.activeHeader = 'about';

export default Coc;