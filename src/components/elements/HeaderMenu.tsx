import {ActiveHeader} from "@/types/header";
import clsx from "clsx";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";

const menu: { key: ActiveHeader, href: string }[] = [
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
  },
  {
    'key': 'speakers',
    'href': '/speakers',
  },
  {
    'key': 'map',
    'href': '/map',
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
            <a
              href={item.href}
              className={clsx('font-bold', {'border-b-1 pb-1.5': active === item.key, 'text-white': isTop})}
            >
              {dict.menu[item.key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}