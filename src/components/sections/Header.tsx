import {ActiveHeader} from "@/types/header";
import Image from "next/image";
import HeaderMenu from "@/components/elements/HeaderMenu";
import {Lang} from "@/types/lang";
import LangButton from "@/components/elements/LangButton";

export default function Header({active, lang}: { active?: ActiveHeader, lang: Lang }) {
  return (
    <header className="sticky top-0 bg-white h-24 mx-12 flex flex-row items-center justify-between">
      <div className='lg:w-60'>
        <Image src='/public/logo.png' alt='PyCon JP 2025 Logo' width={243} height={57}/>
      </div>
      <div className='flex flex-row justify-between items-center gap-12'>
        <HeaderMenu active={active} className='hidden lg:flex lg:flex-1 gap-8' lang={lang}/>
        <LangButton lang={lang}/>
      </div>
    </header>
  );
}