import "@/styles/globals.css";
import {MDXProvider} from "@mdx-js/react";
import {mdxComponents} from "@/components/markdown/mdx-component";
import {Noto_Sans_JP} from "next/font/google";

type CustomAppProps = {
  Component: React.ComponentType;
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
        <Component {...pageProps} />
      </MDXProvider>
    </div>
  );
}
