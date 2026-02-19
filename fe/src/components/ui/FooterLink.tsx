import React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

interface FooterLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FooterLink is a reusable UI component for links in the footer.
 * It standardizes the styling and uses Next.js Link for optimized navigation.
 */
const FooterLink: React.FC<FooterLinkProps> = ({ children, className, ...props }) => (
  <Link
    {...props}
    className={cn(
      'text-slate-400 hover:text-[#2463eb] transition-colors underline-offset-4 hover:underline',
      className
    )}
  >
    {children}
  </Link>
);

export default FooterLink;
