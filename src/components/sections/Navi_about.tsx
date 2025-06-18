import Link from "next/link";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import clsx from "clsx";

type Position = "venue" | "coc" | "sponsor" | "member";

interface Navi_aboutProps {
  position: Position;
  lang: Lang,
}

const navItems: { key: Position, href: string }[] = [
  {key: "venue", href: "/venue"},
  {key: "coc", href: "/coc"},
  {key: "sponsor", href: "/sponsors"},
  {key: "member", href: "/members"},
];

export default function Navi_about({position, lang}: Navi_aboutProps) {
  const dict = dictionary[lang];

  return (
    <nav className="flex justify-center space-x-8 text-sm font-semibold my-6 overflow-x-scroll flex-nowrap px-4">
      {navItems.map(({key, href}) => (
        <Link
          key={key}
          href={href}
          className={clsx(
            "relative pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-0.5 after:bg-black after:transition-opacity after:duration-300 whitespace-nowrap",
            {"after:opacity-100": position === key},
            {"after:opacity-0 hover:after:opacity-100": position !== key},
          )}
        >
          {dict.NavBar_About[key]}
        </Link>
      ))}
    </nav>
  )
}