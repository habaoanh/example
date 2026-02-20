'use client';

import React from 'react';
import { ArrowLeft, Star, Timer } from 'lucide-react';

interface TakeExamHeaderProps {
  title: string;
  course: string;
  progress: number;
  xp: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
}

export const TakeExamHeader: React.FC<TakeExamHeaderProps> = ({ 
  title,
  course,
  progress,
  xp,
  timeLeft,
  formatTime 
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Title and Back Button */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{course}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md mx-8 flex flex-col gap-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>Tiến độ hoàn thành: {progress}/10 câu</span>
            <span>{progress * 10}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#2463eb] h-full rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
              style={{ width: `${progress * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Stats: XP and Timer */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-amber-700 font-bold tabular-nums">{xp.toLocaleString()} XP</span>
          </div>
          <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
            <Timer className="w-5 h-5 text-red-500" />
            <span className="text-red-600 font-bold tabular-nums text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
