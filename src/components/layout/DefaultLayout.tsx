import Footer from "@/components/sections/Footer";
import FixedMenu from "@/components/elements/FixedMenu";
import {Lang} from "@/types/lang";
import Header from "@/components/sections/Header";
import {MenuKey} from "@/types/menu";

type DefaultLayoutProps = {
  children: React.ReactNode;
  activeHeader?: MenuKey;
  lang: Lang;
}

export default function DefaultLayout({children, activeHeader, lang}: DefaultLayoutProps) {
  return (
    <div>
      <Header active={activeHeader} lang={lang}/>
      <div className='min-h-dvh'>
        {children}
      </div>
      <FixedMenu lang={lang}/>
      <Footer lang={lang}/>
    </div>
  );
}