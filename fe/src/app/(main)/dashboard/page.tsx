'use client';

import withAuth from '@/hocs/withAuth';
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Bảng điều khiển</h1>
      <p className="mt-4">Chào mừng bạn đã trở lại! Đây là khu vực được bảo vệ.</p>
      {/* Thêm các component của dashboard tại đây */}
    </div>
  );
};

export default withAuth(DashboardPage);
