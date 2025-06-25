import {ActiveHeader} from "@/types/header";
import clsx from "clsx";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import Link from "next/link";
import Tooltip from 'rc-tooltip';

const menu: { key: ActiveHeader, href: string, isComingSoon?: boolean }[] = [
  {
    'key': 'home',
    'href': '/',
  },
  {
    'key': 'about',
    'href': '/coc',
  },
  {
    'key': 'timetable',
    'href': '/timetable',
    'isComingSoon': true,
  },
  {
    'key': 'speakers',
    'href': '/speakers',
    'isComingSoon': true,
  },
  {
    'key': 'map',
    'href': '/map',
    'isComingSoon': true,
  }
];

export default function HeaderMenu({active, lang, isTop, ...props}: {
  active?: ActiveHeader,
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