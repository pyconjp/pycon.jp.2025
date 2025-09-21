import CloudflareImage from "@/components/elements/CloudflareImage";
import HeaderMenu from "@/components/elements/HeaderMenu";
import { Lang } from "@/types/lang";
import LangButton from "@/components/elements/LangButton";
import clsx from "clsx";
import Link from "next/link";
import { dictionary } from "@/lang";
import { MenuKey } from "@/types/menu";

type Props = {
  active?: MenuKey;
  lang: Lang;
  isTop?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function Header({ active, lang, isTop, ...props }: Props) {
  const dict = dictionary[lang];

  return (
    <header
      {...props}
      className={clsx("sticky z-50 top-0 pt-4 lg:pt-0 lg:px-12 text-xs lg:text-base", props.className, {
        'lg:h-24 bg-white': !isTop,
        'lg:h-96 bg-gradient-to-b from-blur to-transparent pointer-events-none': isTop
      })}>
      <div className={clsx('flex flex-row justify-between h-10 px-6 lg:px-0 pointer-events-auto', {
        'items-center lg:h-full': !isTop,
        'items-start lg:h-24 pt-7': isTop
      })}>
        <div className={clsx({ 'lg:w-60': !isTop, 'lg:w-96 pt-3': isTop })}>
          <Link href={`/${lang}`}>
            <CloudflareImage
              category='common'
              fileName='logo_pc.svg'
              fallbackSrc='/common/logo_pc.svg'
              alt='PyCon JP 2025 Logo'
              width={243}
              height={57}
              className={clsx('hidden', { 'lg:block': !isTop })} />
            <CloudflareImage
              category='common'
              fileName='logo_sp.png'
              fallbackSrc='/common/logo_sp.png'
              alt='PyCon JP 2025 Logo'
              width={112.44}
              height={38.29}
              className='lg:hidden' />
            <CloudflareImage
              category='common'
              fileName='logo_pc_top.png'
              fallbackSrc='/common/logo_pc_top.png'
              alt='PyCon JP 2025 Logo'
              width={372}
              height={144}
              className={clsx('hidden', { 'lg:block': isTop })} />
          </Link>
        </div>
        <div className='flex flex-row justify-between items-center lg:gap-12 gap-4'>
          <HeaderMenu active={active} className='hidden lg:block' lang={lang} isTop={isTop} />
          <div className='block lg:hidden text-gray-500 text-xs font-bold text-right'>{dict.header.venue}</div>
          <LangButton lang={lang} isTop={isTop} />
        </div>
      </div>
      <div className="relative overflow-x-scroll whitespace-nowrap scrollbar-hide lg:hidden px-6 pointer-events-auto">
        <HeaderMenu active={active} className="py-4 lg:hidden" lang={lang} isTop={isTop} />
      </div>
    </header>
  );
}