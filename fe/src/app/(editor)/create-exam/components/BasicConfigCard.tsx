'use client';

import React from 'react';
import { Settings2, ChevronDown } from 'lucide-react';

interface BasicConfigCardProps {
  examName: string;
  setExamName: (name: string) => void;
  grade: string;
  setGrade: (grade: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
}

export const BasicConfigCard: React.FC<BasicConfigCardProps> = ({ 
  examName, 
  setExamName, 
  grade, 
  setGrade, 
  duration, 
  setDuration 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="font-bold flex items-center gap-2">
          <Settings2 className="text-[#2463eb]" size={20} />
          Cấu hình cơ bản
        </h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 ml-1">Tên đề thi</label>
          <input 
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2463eb]/20 focus:border-[#2463eb] outline-none transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 ml-1">Khối lớp</label>
            <div className="relative">
              <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2463eb]/20 focus:border-[#2463eb] outline-none transition-all cursor-pointer"
              >
                {[6,7,8,9,10,11,12].map(g => (
                  <option key={g} value={g}>Lớp {g}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 ml-1">Thời gian (phút)</label>
            <div className="relative">
              <input 
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2463eb]/20 focus:border-[#2463eb] outline-none transition-all pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
