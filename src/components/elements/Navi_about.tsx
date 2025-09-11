import Link from "next/link";
import {Lang} from "@/types/lang";
import {dictionary} from "@/lang";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import {useState, useEffect, useRef} from "react";

type Position = "venue" | "coc" | "sponsor" | "member" | "nursery" | "related_events";

interface Navi_aboutProps {
  position: Position;
  lang: Lang,
}

const navItems: { key: Position, href: string, isComingSoon?: boolean, isExternal?: boolean }[] = [
  {key: "venue", href: "/venue"},
  {key: "coc", href: "/coc"},
  {key: "sponsor", href: "/sponsors"},
  {key: "member", href: "/members"},
  {key: "nursery", href: "/nursery"},
  {key: "related_events", href: "/related-events", isExternal: true},
];

export default function Navi_about({position, lang}: Navi_aboutProps) {
  const dict = dictionary[lang];
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (navRef.current) {
        const {scrollLeft, scrollWidth, clientWidth} = navRef.current;
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScroll();
    const nav = navRef.current;
    if (nav) {
      nav.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        nav.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <div className="relative">
      <nav
        ref={navRef}
        className="bg-[#FAFAFA] flex md:justify-center space-x-8 text-xs md:text-sm font-semibold py-4 border-b border-[#E4E7EB] overflow-x-auto flex-nowrap px-4 scrollbar-hide">
        {navItems.map(({key, href, isComingSoon, isExternal}) => (
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
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
      {canScrollRight && (
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
      )}
    </div>
  )
}