'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

interface TakeExamFooterProps {
  answeredCount: number;
  totalQuestions: number;
  onPrev: () => void; // Add appropriate handlers later
  onNext: () => void;
  onSubmit: () => void;
}

export const TakeExamFooter: React.FC<TakeExamFooterProps> = ({ 
  answeredCount,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 p-6 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Câu trước
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <button 
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-all"
          >
            Câu tiếp theo
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Submission Area */}
        <div className="flex items-center gap-6">
          <p className="hidden sm:block text-slate-500 text-sm font-medium">
            Bạn đã trả lời {answeredCount}/{totalQuestions} câu hỏi
          </p>
          <button 
            onClick={onSubmit}
            className="bg-[#2463eb] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#2463eb]/25 transition-all flex items-center gap-2 active:scale-95"
          >
            Nộp bài
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
