import React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * NavLink is a reusable UI component for navigation links in the header.
 * It wraps Next.js's Link component and applies consistent styling for reuse.
 */
const NavLink: React.FC<NavLinkProps> = ({ children, className, ...props }) => (
  <Link
    {...props}
    className={cn(
      'font-semibold text-slate-600 hover:text-[#2463eb] transition-colors 4xl:text-2xl whitespace-nowrap',
      className
    )}
  >
    {children}
  </Link>
);

export default NavLink;
