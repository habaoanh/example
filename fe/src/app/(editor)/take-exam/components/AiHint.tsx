'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface AiHintProps {
  onClose: () => void;
}

export const AiHint: React.FC<AiHintProps> = ({ onClose }) => {
  return (
    <aside 
      className="bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="bg-[#2463eb]/5 p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#2463eb] font-bold">
          <Sparkles className="w-5 h-5" />
          <span>Gợi ý từ AI</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-200 rounded-full cursor-pointer transition-colors text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 overflow-y-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2463eb] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
          <div className="bg-slate-50 p-4 rounded-xl rounded-tl-none border border-slate-100">
            <p className="text-slate-700 text-sm leading-relaxed mb-3">
              Chào bạn! Đừng quá lo lắng nhé, bài toán này có thể giải quyết nhanh chóng bằng hai cách:
            </p>
            <ul className="space-y-4 text-sm text-slate-800">
              <li className="flex gap-2">
                <span className="font-bold text-[#2463eb]">1.</span>
                <span>Hãy thử phân tích đa thức thành nhân tử theo dạng <span className="math-font italic font-semibold">(x-a)(x-b) = 0</span>. Bạn hãy tìm hai số có tổng là 5 và tích là 6.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#2463eb]">2.</span>
                <span>Hoặc dùng công thức biệt thức <span className="math-font italic font-semibold">Δ = b^2 - 4ac</span>. Với bài này: <span className="math-font italic">Δ = (-5)^2 - 4.1.6 = 1</span>.</span>
              </li>
            </ul>
            <p className="mt-4 text-xs font-medium text-[#2463eb] bg-[#2463eb]/5 p-2 rounded-lg text-center">
              Cố gắng lên, bạn sắp tìm ra đáp án rồi! 🚀
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
