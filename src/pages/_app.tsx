import "@/styles/globals.css";
import {ActiveHeader} from "@/types/header";
import DefaultLayout from "@/components/layout/DefaultLayout";
import {MDXProvider} from "@mdx-js/react";
import {mdxComponents} from "@/components/markdown/mdx-component";
import { Noto_Sans_JP } from "next/font/google";

type CustomAppProps = {
  Component: React.ComponentType & { activeHeader?: ActiveHeader };
  pageProps: Record<string, unknown>;
}

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function App({Component, pageProps}: CustomAppProps) {
  return (
    <div className={`${NotoSansJP.className}`}>
      <MDXProvider components={mdxComponents}>
        <DefaultLayout activeHeader={Component.activeHeader}>
          <Component {...pageProps} />
        </DefaultLayout>
      </MDXProvider>
    </div>
  );
}
