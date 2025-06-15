import "@/styles/globals.css";
import {MDXProvider} from "@mdx-js/react";
import {mdxComponents} from "@/components/markdown/mdx-component";

type CustomAppProps = {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}


export default function App({Component, pageProps}: CustomAppProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
