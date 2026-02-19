'use client';

import withRoleAuth from '@/hocs/withRoleAuth';
import React from 'react';

const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-red-600">Trang Quản Trị</h1>
      <p className="mt-4">Chỉ những người dùng có vai trò 'admin' hoặc 'teacher' mới thấy được trang này.</p>
      {/* Thêm các component quản trị tại đây */}
    </div>
  );
};

// Protect this page and only allow users with 'admin' or 'teacher' roles
export default withRoleAuth(['admin', 'teacher'])(AdminPage);
