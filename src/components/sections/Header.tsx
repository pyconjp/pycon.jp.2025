import {ActiveHeader} from "@/types/header";
import Image from "next/image";
import HeaderMenu from "@/components/elements/HeaderMenu";
import {Lang} from "@/types/lang";
import LangButton from "@/components/elements/LangButton";
import clsx from "clsx";

type Props = {
  active?: ActiveHeader;
  lang: Lang;
  isTop?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function Header({active, lang, isTop, ...props}: Props) {
  return (
    <header
      {...props}
      className={clsx("sticky z-10 top-0 pt-4 lg:pt-0 lg:px-12 text-xs lg:text-base", props.className, {
        'lg:h-24 bg-white': !isTop,
        'lg:h-96 bg-gradient-to-b from-blur to-transparent pointer-events-none': isTop
      })}>
      <div className={clsx('flex flex-row justify-between h-10 px-6 lg:px-0 pointer-events-auto', {
        'items-center lg:h-full': !isTop,
        'items-start lg:h-24 pt-7': isTop
      })}>
        <div className={clsx({'lg:w-60': !isTop, 'lg:w-96 pt-3': isTop})}>
          <Image src='/common/logo_pc.png' alt='PyCon JP 2025 Logo' width={243} height={57}
                 className={clsx('hidden', {'lg:block': !isTop})}/>
          <Image src='/common/logo_sp.png' alt='PyCon JP 2025 Logo' width={112.44} height={38.29}
                 className='lg:hidden'/>
          <Image src='/common/logo_pc_top.png' alt='PyCon JP 2025 Logo' width={372} height={144}
                 className={clsx('hidden', {'lg:block': isTop})}/>
        </div>
        <div className='flex flex-row justify-between items-center lg:gap-12 gap-4'>
          <HeaderMenu active={active} className='hidden lg:block' lang={lang} isTop={isTop}/>
          <div className='block lg:hidden text-gray-500 text-xs font-bold'>広島国際会議場</div>
          <LangButton lang={lang} isTop={isTop}/>
        </div>
      </div>
      <div className="relative overflow-x-scroll whitespace-nowrap scrollbar-hide lg:hidden px-6 pointer-events-auto">
        <HeaderMenu active={active} className="py-4 lg:hidden" lang={lang} isTop={isTop}/>
      </div>
    </header>
  );
}