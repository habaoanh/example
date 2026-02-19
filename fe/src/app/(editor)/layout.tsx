import React from 'react';

// Layout này dành cho các trang soạn thảo hoặc các trang cần không gian tập trung.
// Nó KHÔNG có Header và Footer, chỉ hiển thị nội dung chính của trang.
export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      {children}
    </main>
  );
}
