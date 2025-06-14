import "@/styles/globals.css";
import {ActiveHeader} from "@/types/header";
import DefaultLayout from "@/components/layout/DefaultLayout";
import {MDXProvider} from "@mdx-js/react";
import {mdxComponents} from "@/components/markdown/mdx-component";

type CustomAppProps = {
  Component: React.ComponentType & { activeHeader?: ActiveHeader };
  pageProps: Record<string, unknown>;
}


export default function App({Component, pageProps}: CustomAppProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <DefaultLayout activeHeader={Component.activeHeader}>
        <Component {...pageProps} />
      </DefaultLayout>
    </MDXProvider>
  );
}
