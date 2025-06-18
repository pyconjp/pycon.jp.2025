import PageHead from "@/components/elements/PageHead";
import {GetStaticProps} from "next";
import {Lang} from "@/types/lang";
import dynamic from "next/dynamic";
import Navi_about from "@/components/sections/Navi_about";

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
  const CocContent = dynamic(() => import(`@/components/markdown/${lang}/coc.mdx`), {ssr: true});
  return (
    <>
      <PageHead
        title={lang === "ja" ? '行動規範' : 'Code of Conduct'}
        description={lang === "ja" ? 'PyCon JP 2025の行動規範ページです' : 'This is the Code of Conduct page of PyCon JP 2025'}
        lang={lang}
        pagePath='/coc'
        imagePath='ogp/coc.jpg'
      />
      <div>
        <Navi_about position="coc" lang={lang}/>
        <main className="flex justify-center items-center">
          <div className=' m-4 mx-12 lg:mx-4 my-10 prose-h2:scroll-mt-20 prose-h3:scroll-mt-20'>
            <CocContent/>
          </div>
        </main>
      </div>
    </>
  );
}

Coc.activeHeader = 'about';

export default Coc;