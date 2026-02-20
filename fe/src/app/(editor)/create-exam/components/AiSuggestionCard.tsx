'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';

export const AiSuggestionCard = () => {
  // TODO: Make suggestion content and action dynamic
  return (
    <div className="p-5 bg-gradient-to-br from-[#2463eb] to-blue-700 rounded-2xl text-white shadow-lg shadow-[#2463eb]/20">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={20} />
        <h4 className="font-bold text-sm">Gợi ý từ AI</h4>
      </div>
      <p className="text-xs text-blue-100 leading-relaxed mb-4">
        Đề thi hiện tại đang thiếu câu hỏi về "Khối tròn xoay" cấp độ Vận dụng cao. Bạn có muốn bổ sung 1 câu để cân bằng ma trận?
      </p>
      <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-bold transition-all">
        Tạo thêm câu hỏi
      </button>
    </div>
  );
};
