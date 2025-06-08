import "@/styles/globals.css";
import {ActiveHeader} from "@/types/header";
import DefaultLayout from "@/components/DefaultLayout";

type CustomAppProps = {
  Component: React.ComponentType & { activeHeader?: ActiveHeader };
  pageProps: Record<string, unknown>;
}

export default function App({Component, pageProps}: CustomAppProps) {
  return (
    <DefaultLayout activeHeader={Component.activeHeader}>
      <Component {...pageProps} />
    </DefaultLayout>);
}
