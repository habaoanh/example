import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation'; // Import the Server Component

// This layout is for the main pages of the application.
// It includes the shared Header and Footer for all pages in this group.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Pass the Navigation server component as a child to the Header client component */}
      <Header>
        <Navigation />
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
