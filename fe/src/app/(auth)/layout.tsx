import React from 'react';

// This is a pass-through layout that doesn't add any styling.
// It allows the nested pages (e.g., login, register) to control their own full-page layouts.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
