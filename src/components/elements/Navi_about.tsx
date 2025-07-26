import Link from "next/link";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import clsx from "clsx";
import Tooltip from "rc-tooltip";

type Position = "venue" | "coc" | "sponsor" | "member" | "nursery";

interface Navi_aboutProps {
  position: Position;
  lang: Lang,
}

const navItems: { key: Position, href: string, isComingSoon?: boolean }[] = [
  {key: "venue", href: "/venue"},
  {key: "coc", href: "/coc"},
  {key: "sponsor", href: "/sponsors"},
  {key: "member", href: "/members"},
  {key: "nursery", href: "/nursery"},
];

export default function Navi_about({position, lang}: Navi_aboutProps) {
  const dict = dictionary[lang];

  return (
    <nav
      className="bg-[#FAFAFA] flex justify-center space-x-8 text-sm font-semibold py-4 border-b border-[#E4E7EB] overflow-x-scroll flex-nowrap px-4 scrollbar-hide">
      {navItems.map(({key, href, isComingSoon}) => (
        isComingSoon ? (
          <Tooltip key={key} overlay={<span>{dict.menu.coming_soon}</span>} trigger={['hover', 'click']}
                   placement='bottom'>
            <span
              className={clsx(
                "cursor-pointer relative pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-0.5 after:bg-black after:transition-opacity after:duration-300 whitespace-nowrap",
                {"after:opacity-100": position === key},
                {"after:opacity-0 hover:after:opacity-100": position !== key},
              )}
            >
              {dict.NavBar_About[key]}
            </span>
          </Tooltip>
        ) : (
          <Link
            key={key}
            href={`/${lang}${href}`}
            className={clsx(
              "relative pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-0.5 after:bg-black after:transition-opacity after:duration-300 whitespace-nowrap",
              {"after:opacity-100": position === key},
              {"after:opacity-0 hover:after:opacity-100": position !== key},
            )}
          >
            {dict.NavBar_About[key]}
          </Link>
        )
      ))}
    </nav>
  )
}