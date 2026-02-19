"use client";

import React, { useState, useEffect } from 'react';
import FooterLink from '@/components/ui/FooterLink';
import Logo from '@/components/ui/Logo'; // Import the Logo component

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="mt-20 2k:mt-40 py-12 2k:py-24 border-t border-slate-200 bg-white">
      <div className="max-w-7xl 2k:max-w-[1800px] 4k:max-w-[2800px] mx-auto px-4 sm:px-6 lg:px-8 2k:px-16 4k:px-32 flex justify-between items-center">
        {/* Left side: Logo and Copyright */}
        <div>
          <Logo />
          <p className="text-slate-500 text-sm 2k:text-xl 4k:text-3xl mt-2">
            © {isClient ? new Date().getFullYear() : '2024'} MathMaster. Tất cả quyền được bảo lưu.
          </p>
        </div>

        {/* Right side: Links */}
        <div className="flex flex-wrap justify-end gap-6 2k:gap-16 text-sm 2k:text-xl 4k:text-3xl">
          <FooterLink href="#">Điều khoản dịch vụ</FooterLink>
          <FooterLink href="#">Chính sách bảo mật</FooterLink>
          <FooterLink href="#">Hướng dẫn thanh toán</FooterLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
