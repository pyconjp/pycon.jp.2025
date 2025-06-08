import {ActiveHeader} from "@/types/header";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

type DefaultLayoutProps = {
  children: React.ReactNode;
  activeHeader?: ActiveHeader;
}

export default function DefaultLayout({children, activeHeader}: DefaultLayoutProps) {
  return (
    <div>
      <Header active={activeHeader}/>
      <main className='min-h-dvh'>
        {children}
      </main>
      <Footer/>
    </div>
  );
}