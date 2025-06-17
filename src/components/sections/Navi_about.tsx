import ExternalLink from "../elements/ExternalLink";

interface Navi_aboutProps {
  position: "venue" | "coc" | "sponsor" | "member" | "news";
}

export default function Navi_about({ position }: Navi_aboutProps) {
  return (
    <nav className="flex justify-center space-x-8 text-sm font-semibold my-6 overflow-hidden">
      {["会場案内", "行動規範", "メンバー", "スポンサー", "お知らせ"].map((item, index) => (
        <ExternalLink
          key={index}
          href="#"
          className={`relative pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-[2px] after:bg-black after:transition-opacity after:duration-300 ${item === "行動規範" ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-100"
            }`}
        >
          {item}
        </ExternalLink>
      ))}
    </nav>

  )
}