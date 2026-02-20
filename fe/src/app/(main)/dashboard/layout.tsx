import React from 'react';
import FilterSidebar from './components/FilterSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <FilterSidebar />
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
}
