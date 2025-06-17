import Link from "next/link";

interface Navi_aboutProps {
  position: "会場案内" | "行動規範" | "スポンサー" | "メンバー" | "お知らせ";
}

export default function Navi_about({ position }: Navi_aboutProps) {
  return (
    <nav className="flex justify-center space-x-8 text-sm font-semibold my-6 overflow-x-scroll">
      {["会場案内", "行動規範", "メンバー", "スポンサー", "お知らせ"].map((item, index) => (
        <Link
          key={index}
          href="#"
          className={`relative pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-[2px] after:bg-black after:transition-opacity after:duration-300 ${position === item ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"
}`}
        >
          {item}
        </Link>
      ))}
    </nav>

  )
}