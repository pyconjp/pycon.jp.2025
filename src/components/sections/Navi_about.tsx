import Link from "next/link";

interface Navi_aboutProps {
  position: "venue" | "coc" | "sponsor" | "member" | "news";
}

const navItems = {
  venue: "会場案内",
  coc: "行動規範",
  member: "メンバー",
  sponsor: "スポンサー",
  news: "お知らせ",
};

export default function Navi_about_JP({ position }: Navi_aboutProps) {
  return (
    <nav className="flex sm:justify-center space-x-8 text-sm font-semibold my-6 overflow-x-scroll flex-nowrap px-4">
      {Object.entries(navItems).map(([item, label]) => (
        <Link
          key={item}
          href={`/${item}`}
          className={`relative pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-[2px] after:bg-black after:transition-opacity after:duration-300 ${position === item ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"} whitespace-nowrap`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}