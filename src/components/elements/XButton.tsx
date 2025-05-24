import Link from "next/link";

export default function XButton() {
  return (
    <Link href={"https://x.com/pyconjapan"} target="_blank" rel="noopener noreferrer nofollow">
      <button className="border-[1px] border-black/30 font-bold min-w-[140px] min-h-[50px] py-2 px-4 rounded-full flex items-center justify-center space-x-2">
        <span className="text-black">X</span>
        <span className="text-black/60">@pyconjapan</span>
      </button>
    </Link>
  );
}