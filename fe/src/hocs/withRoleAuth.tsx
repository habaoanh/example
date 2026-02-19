'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

// This HOC takes an array of allowed roles
const withRoleAuth = (allowedRoles: string[]) => <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { user, loading: isAuthLoading } = useAuth(); // Renamed loading for clarity
    const router = useRouter();

    useEffect(() => {
      // Wait for the authentication state to be determined
      if (isAuthLoading) {
        return;
      }

      // If user is not logged in, redirect to login page
      if (!user) {
        router.replace('/dang-nhap');
        return;
      }

      // If user's role is not in the allowed list, redirect to the main page
      if (!user.role || !allowedRoles.includes(user.role.toLowerCase())) {
        router.replace('/'); // Or a dedicated 'unauthorized' page
      }

    }, [user, isAuthLoading, router]);

    // Render a loading state while checking auth or if the role is not (yet) confirmed
    if (isAuthLoading || !user || !user.role || !allowedRoles.includes(user.role.toLowerCase())) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <p>Đang tải hoặc xác thực quyền truy cập...</p>
        </div>
      );
    }

    // If everything is fine, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithRoleAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withRoleAuth;
