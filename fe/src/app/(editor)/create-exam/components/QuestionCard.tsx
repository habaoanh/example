'use client';

import React from 'react';
import { Question } from '../types';
import { CheckCircle2, RotateCw, Eye, Flag, BookOpen, FileText } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group mb-6">
      {/* Question Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-start">
        <div className="flex gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2463eb] text-white font-bold text-sm shrink-0">
            {question.number}
          </span>
          <div>
            <span className="text-xs font-semibold text-[#2463eb] uppercase tracking-wider">
              {question.topic} • {question.level}
            </span>
            <p className="mt-2 text-slate-800 leading-relaxed">
              {question.content}
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-[#2463eb] hover:bg-[#2463eb]/5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border border-transparent hover:border-[#2463eb]/20 shrink-0">
          <RotateCw size={16} />
          Đổi câu hỏi
        </button>
      </div>

      {/* Question Body */}
      {question.type === 'multiple-choice' ? (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50">
          {question.options?.map((opt) => (
            <div
              key={opt.label}
              className={`flex items-center gap-3 p-3 bg-white border rounded-lg cursor-pointer transition-all ${
                opt.isCorrect
                  ? 'border-2 border-[#2463eb]'
                  : 'border-slate-200 hover:border-[#2463eb]'
              }`}
            >
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                opt.isCorrect ? 'bg-[#2463eb] text-white' : 'border border-slate-300'
              }`}>
                {opt.label}
              </span>
              <span>{opt.text}</span>
              {opt.isCorrect && <CheckCircle2 className="text-[#2463eb] ml-auto" size={18} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5 bg-slate-50/50 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white border border-dashed border-slate-300 rounded-xl">
            <div className="flex items-center gap-2">
              <FileText className="text-amber-500" size={20} />
              <span className="text-sm font-bold text-slate-600">LOẠI CÂU HỎI: TỰ LUẬN</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#2463eb] text-[#2463eb] hover:bg-[#2463eb] hover:text-white rounded-lg text-sm font-semibold transition-all">
              <BookOpen size={18} />
              Xem hướng dẫn chấm & Lời giải mẫu
            </button>
          </div>
        </div>
      )}

      {/* Question Footer */}
      <div className="px-5 py-3 bg-white border-t border-slate-100 flex items-center gap-4">
        {question.type === 'multiple-choice' && (
          <button className="text-xs text-slate-500 hover:text-[#2463eb] flex items-center gap-1 transition-colors">
            <Eye size={14} /> Xem lời giải chi tiết
          </button>
        )}
        <button className="text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors">
          <Flag size={14} /> Báo lỗi AI
        </button>
      </div>
    </div>
  );
};
