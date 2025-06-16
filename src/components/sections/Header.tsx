import {ActiveHeader} from "@/types/header";
import Image from "next/image";
import HeaderMenu from "@/components/elements/HeaderMenu";
import {Lang} from "@/types/lang";
import LangButton from "@/components/elements/LangButton";

export default function Header({active, lang}: { active?: ActiveHeader, lang: Lang }) {
  return (
    <header
      className="sticky top-0 bg-white pt-14 lg:pt-0 lg:h-24 lg:mx-12">
      <div className='flex flex-row items-center justify-between h-10 lg:h-full px-6 lg:px-0'>
        <div className='lg:w-60'>
          <Image src='/common/logo_pc.png' alt='PyCon JP 2025 Logo' width={243} height={57}
                 className='hidden lg:block'/>
          <Image src='/common/logo_sp.png' alt='PyCon JP 2025 Logo' width={112.44} height={38.29}
                 className='lg:hidden'/>
        </div>
        <div className='flex flex-row justify-between items-center gap-12'>
          <HeaderMenu active={active} className='flex-row items-center justify-between hidden lg:flex lg:flex-1 gap-8'
                      lang={lang}/>
          <div></div>
          <LangButton lang={lang}/>
        </div>
      </div>
      <div className="relative overflow-x-scroll whitespace-nowrap scrollbar-hide lg:hidden px-6">
        <HeaderMenu active={active} className="flex flex-row items-center justify-between min-w-fit gap-3 py-4"
                    lang={lang}/>
      </div>
    </header>
  );
}