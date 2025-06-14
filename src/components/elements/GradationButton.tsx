import ExternalLink from "@/components/elements/ExternalLink";

type Props = {
  label: string;
  link: string;
}

export default function GradationButton({label, link}: Props) {
  return (
    <ExternalLink href={link}>
      <button className="bg-gradient-to-br from-primary from-[76.92%] to-secondary to-[100%] text-white font-bold min-w-[140px] min-h-[50px] flex items-center justify-center rounded-full cursor-pointer">
        {label}
      </button>
    </ExternalLink>
  );
}