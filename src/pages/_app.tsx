import "@/styles/globals.css";
import {MDXProvider} from "@mdx-js/react";
import {mdxComponents} from "@/components/markdown/mdx-component";
import {Noto_Sans_JP, Jost} from "next/font/google";
import {GoogleAnalytics} from "@next/third-parties/google";

type CustomAppProps = {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const JostFont = Jost({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-jost',
});

export default function App({Component, pageProps}: CustomAppProps) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <>
      <div className={`${NotoSansJP.className} ${JostFont.variable}`}>
        <MDXProvider components={mdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </div>
      {gaId && (<GoogleAnalytics gaId={gaId}/>)}
    </>
  );
}
