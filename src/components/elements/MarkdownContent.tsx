import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import ReactMarkdown from 'react-markdown';
import ExternalLink from '@/components/elements/ExternalLink';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

interface ComponentProps {
  children?: React.ReactNode;
  href?: string;
  [key: string]: unknown;
}

const components = {
  a: ({ children, href, ...props }: ComponentProps) => (
    <ExternalLink href={href || ''} className="text-blue-600 hover:text-blue-800 underline" {...props}>
      {children}
    </ExternalLink>
  ),
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
  return (
    <MDXProvider components={components}>
      <div className={`prose prose-gray max-w-none ${className}`}>
        <ReactMarkdown components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </MDXProvider>
  );
};

export default MarkdownContent;