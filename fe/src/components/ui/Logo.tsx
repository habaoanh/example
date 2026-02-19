import Link from 'next/link';
import { Sigma } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div className="w-10 h-10 bg-[#2463eb] rounded-lg flex items-center justify-center shadow-lg shadow-[#2463eb]/20 2k:w-16 2k:h-16 4k:w-24 4k:h-24">
        <Sigma className="text-white 2k:scale-150 4k:scale-[2.5]" size={24} />
      </div>
      <span className="text-2xl font-bold text-slate-800 tracking-tight 2k:text-4xl 4k:text-6xl">MathPro</span>
    </Link>
  );
};

export default Logo;
