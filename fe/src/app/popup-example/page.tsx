'use client';

import React, { useState } from 'react';
import { BarChart2, LayoutDashboard, CloudUpload, Lock } from 'lucide-react';
import { Popup, LoadingSpinnerIcon } from '@/components/ui/Popup';

/**
 * A page to demonstrate the usage of the Popup component.
 */
const PopupExamplePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleViewResults = () => {
    console.log("Navigate to results page...");
    setIsPopupOpen(false);
  };

  const handleGoToDashboard = () => {
    console.log("Navigate to dashboard...");
    setIsPopupOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-200 flex items-center justify-center">
      
      {!isPopupOpen && (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-[#2463eb] text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Show 'End of Quiz' Popup
        </button>
      )}

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        icon={<LoadingSpinnerIcon />}
        title="Hết giờ làm bài!"
        description="Hệ thống đang tự động ghi nhận và nộp bài làm của bạn..."
        actions={[
          {
            label: 'Xem kết quả',
            onClick: handleViewResults,
            variant: 'primary',
            icon: <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5" />
          },
          {
            label: 'Về bảng điều khiển',
            onClick: handleGoToDashboard,
            variant: 'secondary',
            icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
          }
        ]}
        footer={(
          <div className="flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            <span>Kết nối bảo mật mã hóa SSL</span>
          </div>
        )}
      >
        
        <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-100 flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">Kết quả tạm tính</span>
          <div className="flex items-baseline gap-1">
            <span className="text-slate-900 text-4xl sm:text-5xl font-bold tracking-tight">48</span>
            <span className="text-slate-400 text-xl sm:text-2xl font-semibold">/ 50</span>
          </div>
          <p className="text-slate-600 font-medium text-xs sm:text-sm mt-1">Số câu đã hoàn thành</p>
        </div>

        <div className="h-8"></div>

        <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="w-full bg-slate-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#2463eb] h-full w-[85%] rounded-full"></div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#2463eb] font-medium">
              <CloudUpload className="animate-pulse w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm">Đang tải dữ liệu lên máy chủ...</span>
            </div>
        </div>
      </Popup>

    </div>
  );
};

export default PopupExamplePage;
