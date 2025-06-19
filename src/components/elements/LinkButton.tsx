import ExternalLink from "@/components/elements/ExternalLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

type Props = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function LinkButton({href, children, ...props}: Props) {
  return (
    <div {...props}>
      <ExternalLink href={href}>
      <span
        className='w-full bg-gray-50 border-gray-300 border-2 flex justify-between items-center p-5 lg:p-6 rounded-2xl text-sm lg:text-xl font-semibold'>
        {children}
        <FontAwesomeIcon icon={faArrowRight}/>
      </span>
      </ExternalLink>
    </div>
  )
}