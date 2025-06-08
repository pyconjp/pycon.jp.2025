import Link from "next/link";

type ExternalLinkProps = React.ComponentProps<typeof Link>;

export default function ExternalLink({children, ...props}: ExternalLinkProps) {
  return <Link target="_blank" rel="noopener noreferrer nofollow" {...props}>{children}</Link>
}