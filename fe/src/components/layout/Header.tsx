'use client';
import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import NavLink from '@/components/ui/NavLink'; // Import the new NavLink component
import { useAuth } from '@/context/AuthContext';
import UserNav from '@/components/layout/UserNav';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-50 bg-white/80 backdrop-blur-lg">
      <nav className="px-4 sm:px-8">
        <div className="max-w-[1440px] 3xl:max-w-[1800px] 4xl:max-w-[2400px] mx-auto">
          <div className="flex justify-between items-center h-20 4xl:h-28">
            <Logo />
            
            <div className="hidden md:flex items-center space-x-8 4xl:space-x-12">
              <NavLink href="#">Chương trình học</NavLink>
              <NavLink href="#">Lộ trình</NavLink>
              <NavLink href="#">Bảng giá</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserNav />
              ) : (
                <>
                  {/* Login button has been removed as per request */}
                  <div className="h-6 w-px bg-slate-200"></div>
                  <Link href="/dang-ky">
                    {/* Using the new 'sm' size for this button */}
                    <Button size="sm" className="whitespace-nowrap">Bắt đầu ngay</Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              {user ? (
                <UserNav />
              ) : (
                // Mobile menu now links to registration page
                <Link href="/dang-ky">
                  <Button variant="ghost" className="p-2 text-[#2463eb]">
                    <Menu size={24} />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
