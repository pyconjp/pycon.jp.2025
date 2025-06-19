import {ActiveHeader} from "@/types/header";
import Image from "next/image";
import HeaderMenu from "@/components/elements/HeaderMenu";
import {Lang} from "@/types/lang";
import LangButton from "@/components/elements/LangButton";
import clsx from "clsx";

type Props = {
  active?: ActiveHeader;
  lang: Lang;
} & React.HTMLAttributes<HTMLElement>;

export default function Header({active, lang, ...props}: Props) {
  return (
    <header
      {...props}
      className={clsx("sticky z-10 top-0 bg-white pt-14 lg:pt-0 lg:h-24 lg:mx-12 text-xs lg:text-base", props.className)}>
      <div className='flex flex-row items-center justify-between h-10 lg:h-full px-6 lg:px-0'>
        <div className='lg:w-60'>
          <Image src='/common/logo_pc.png' alt='PyCon JP 2025 Logo' width={243} height={57}
                 className='hidden lg:block'/>
          <Image src='/common/logo_sp.png' alt='PyCon JP 2025 Logo' width={112.44} height={38.29}
                 className='lg:hidden'/>
        </div>
        <div className='flex flex-row justify-between items-center lg:gap-12 gap-4'>
          <HeaderMenu active={active} className='hidden lg:block' lang={lang}/>
          <div className='block lg:hidden text-gray-500 text-xs font-bold'>広島国際会議場</div>
          <LangButton lang={lang}/>
        </div>
      </div>
      <div className="relative overflow-x-scroll whitespace-nowrap scrollbar-hide lg:hidden px-6">
        <HeaderMenu active={active} className="py-4 lg:hidden" lang={lang}/>
      </div>
    </header>
  );
}