import Link from "next/link";

type Props = {
  label: string;
  link: string;
}

export default function GradationButton({label, link}: Props) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer nofollow">
      <button className="bg-gradient-to-br from-primary from-[76.92%] to-secondary to-[100%] text-white font-bold min-w-[140px] min-h-[50px] py-2 px-4 rounded-full">
        {label}
      </button>
    </Link>
  );
}