import ExternalLink from "@/components/elements/ExternalLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

type Props = {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function LinkButton({href, children, disabled, ...props}: Props) {
  const buttonStyle = 'w-full bg-gray-50 border-gray-300 border-2 flex justify-between items-center p-2 lg:p-4 rounded-lg lg:rounded-xl text-sm lg:text-base font-semibold';

  return (
    <div {...props}>
      {
        disabled ? (
          <span
            className={clsx(buttonStyle, 'opacity-50 cursor-not-allowed')}>
              {children}
          </span>
        ) : (
          <ExternalLink href={href}>
            <span
              className={buttonStyle}>
              {children}
              <FontAwesomeIcon icon={faArrowRight}/>
            </span>
          </ExternalLink>
        )
      }
    </div>
  )
}