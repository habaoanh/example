'use client';

import React from 'react';
import { CheckCircle2, Bold, Italic, Sigma, Camera } from 'lucide-react';

const mathSymbols = [
  { label: '√', value: '\\sqrt{}' },
  { label: '∑', value: '\\sum' },
  { label: '∫', value: '\\int' },
  { label: 'Δ', value: '\\Delta' },
  { label: '≠', value: '\\neq' },
  { label: '≤', value: '\\leq' },
  { label: '≥', value: '\\geq' },
  { label: '×', value: '\\times' },
  { label: '÷', value: '\\div' },
  { label: '±', value: '\\pm' },
  { label: '∞', value: '\\infty' },
];

interface SolutionEditorProps {
  solution: string;
  setSolution: (value: string) => void;
}

export const SolutionEditor: React.FC<SolutionEditorProps> = ({ solution, setSolution }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col flex-1 min-h-[400px]">
      <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/50">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] px-3">Lời giải của bạn</label>
        <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Đã lưu</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-slate-100 p-3 flex flex-wrap gap-1.5">
        {mathSymbols.map((sym) => (
          <button
            key={sym.label}
            onClick={() => setSolution(solution + sym.value)}
            className="w-9 h-9 rounded-xl flex items-center justify-center font-serif font-bold text-[#2463eb] hover:bg-slate-100 transition-all active:scale-95"
          >
            {sym.label}
          </button>
        ))}
        <div className="w-px h-6 bg-slate-200 mx-2 self-center" />
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"><Bold className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"><Italic className="w-4 h-4" /></button>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"><Sigma className="w-4 h-4" /></button>
      </div>

      <textarea
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
        className="flex-1 p-6 w-full resize-none border-none focus:ring-0 bg-transparent text-slate-800 placeholder-slate-300 font-sans leading-relaxed text-lg"
        placeholder="Nhập lời giải chi tiết tại đây..."
      />

      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center hover:border-[#2463eb] hover:bg-blue-50/50 transition-all group">
          <Camera className="w-5 h-5 text-slate-400 group-hover:text-[#2463eb] mb-1.5 transition-colors" />
          <span className="text-xs font-bold text-slate-500 group-hover:text-[#2463eb] transition-colors">Tải ảnh bài làm</span>
        </button>
      </div>
    </div>
  );
};
