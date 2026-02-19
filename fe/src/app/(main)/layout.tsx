import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Layout này dành cho các trang chính của ứng dụng.
// Nó bao gồm Header và Footer chung cho toàn bộ các trang trong nhóm này.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
