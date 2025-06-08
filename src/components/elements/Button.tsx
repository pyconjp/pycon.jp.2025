import ExternalLink from "@/components/elements/ExternalLink";

type Props = {
  label: string;
  link: string;
}

export default function Button({ label, link }: Props) {
  return (
    <ExternalLink href={link} as='a'>
      <button className="border-[1px] border-black/20 font-bold min-w-[140px] min-h-[50px] py-2 px-4 rounded-full flex items-center justify-center cursor-pointer">
        {label}
      </button>
    </ExternalLink>
  );
}