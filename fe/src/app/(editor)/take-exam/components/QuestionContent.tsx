'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { ExamQuestion } from '../types';

interface QuestionContentProps {
  question: ExamQuestion;
  showConfirm: boolean;
  setShowConfirm: (show: boolean) => void;
  onConfirmHint: () => void;
}

export const QuestionContent: React.FC<QuestionContentProps> = ({ 
  question, 
  showConfirm, 
  setShowConfirm, 
  onConfirmHint 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2463eb]"></div>
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#2463eb]/10 text-[#2463eb] text-sm font-bold rounded-lg uppercase">
              Câu hỏi {question.id}
            </span>
            <span className="text-slate-400 text-sm italic">• {question.topic}</span>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowConfirm(!showConfirm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2463eb] text-white rounded-full font-semibold text-sm cursor-pointer hover:bg-blue-700 transition-all shadow-md shadow-[#2463eb]/20 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              <span>Gợi ý từ AI (-10 XP)</span>
            </button>
            
            {/* Confirmation Popover */}
            {showConfirm && (
              <div 
                className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-[60] flex flex-col gap-3"
              >
                <p className="text-sm text-slate-700">
                  Sử dụng gợi ý sẽ trừ 10 XP của bạn. Bạn có muốn tiếp tục?
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={onConfirmHint}
                    className="flex-1 text-center py-2 bg-[#2463eb] hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    Tiếp tục
                  </button>
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 text-center py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
                <div className="absolute -top-2 right-10 w-4 h-4 bg-white border-l border-t border-slate-200 rotate-45"></div>
              </div>
            )}
          </div>
        </div>

        {/* Question Body */}
        <h2 className="text-2xl font-medium text-slate-800 leading-relaxed">
          {question.text}
        </h2>
        <div className="flex justify-center py-10 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-4xl math-font italic text-slate-900">{question.equation}</span>
        </div>
      </div>
    </div>
  );
};
