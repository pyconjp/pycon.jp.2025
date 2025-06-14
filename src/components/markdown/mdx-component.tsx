import MdxLayout from "@/components/layout/MdxLayout";
import ExternalLink from "@/components/elements/ExternalLink";

export const mdxComponents = {
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <MdxLayout>{children}</MdxLayout>
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <ExternalLink href={props.href as string} {...props}/>
  ),
};
