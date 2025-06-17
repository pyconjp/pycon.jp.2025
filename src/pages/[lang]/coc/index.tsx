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
        title={lang === "ja" ? '行動規範' : 'Code of Conduction'}
        description={lang === "ja" ? 'PyCon JP 2025の行動規範ページです' : 'This is the Code of Conduction page of PyCon JP 2025'}
        lang={lang}
        pagePath='/coc'
        imagePath='ogp/coc.jpg'
      />
      <div>
        <Navi_about position="coc" />
        <main className="flex justify-center items-center">
          <CocContent />
        </main>
      </div>
    </>
  );
}

Coc.activeHeader = 'about';

export default Coc;