import ExternalLink from "@/components/elements/ExternalLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

type Props = {
  href: string;
  title: string;
} & React.HTMLAttributes<HTMLElement>;

const getDomainFromUrl = (url: string): string | null => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch (error) {
    console.error("Invalid URL:", url, error);
    return url;
  }
};

export default function SponsorLinkButton({href, title, ...props}: Props) {
  return (
    <div {...props}>
      <ExternalLink href={href}>
      <span className='w-full bg-gray-50 border-gray-300 border-1 flex items-center justify-between p-5 lg:p-6 rounded-2xl'>
        <span className="flex flex-col gap-2">
          <span className="font-semibold">{title}</span>
          {getDomainFromUrl(href)}
        </span>
        <FontAwesomeIcon icon={faArrowRight} className="rotate-315"/>
      </span>
      </ExternalLink>
    </div>
  )
}