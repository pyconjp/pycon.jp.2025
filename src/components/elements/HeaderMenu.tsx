import clsx from "clsx";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import Link from "next/link";
import {MenuKey} from "@/types/menu";
import {menu} from "@/data/menu";
import Tooltip from "rc-tooltip";

export default function HeaderMenu({active, lang, isTop, ...props}: {
  active?: MenuKey,
  lang: Lang
  isTop?: boolean
} & React.HTMLAttributes<HTMLElement>) {
  const dict = dictionary[lang];

  return (
    <nav className={clsx(props?.className)} {...props}>
      <ul className='flex flex-row items-center justify-between lg:gap-8 gap-3'>
        {menu.map((item) => (
          <li key={item.key} className='list-none'>
            {
              item.isComingSoon ?
                <Tooltip overlay={<span>{dict.menu.coming_soon}</span>} trigger={['hover', 'click']} placement='bottom'>
                  <span className={clsx('font-bold cursor-pointer', {'border-b-2 pb-1.5': active === item.key, 'text-white': isTop})}>
                    {dict.menu[item.key]}
                  </span>
                </Tooltip>
                : <Link href={`/${lang}${item.href}`}
                        className={clsx('font-bold', {'border-b-2 pb-1.5': active === item.key, 'text-white': isTop})}>
                  {dict.menu[item.key]}
                </Link>
            }
          </li>
        ))}
      </ul>
    </nav>
  );
}