import Link from "next/link";

type Props = {
  label: string;
  link: string;
}

export default function Button({ label, link }: Props) {
  return (
    <Link as="a" href={link} target="_blank" rel="noopener noreferrer nofollow">
      <button className="border-[1px] border-black/20 font-bold min-w-[140px] min-h-[50px] py-2 px-4 rounded-full">
        {label}
      </button>
    </Link>
  );
}