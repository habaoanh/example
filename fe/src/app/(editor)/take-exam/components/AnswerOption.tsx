'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AnswerOption as AnswerOptionType } from '../types';

interface AnswerOptionProps {
  option: AnswerOptionType;
  isSelected: boolean;
  onClick: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({ option, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-6 p-6 bg-white rounded-xl border-2 transition-all ${
        isSelected 
          ? 'border-[#2463eb] shadow-md shadow-[#2463eb]/5' 
          : 'border-transparent hover:border-slate-200 shadow-sm'
      }`}
    >
      <div className={`w-12 h-12 flex items-center justify-center font-bold rounded-lg shadow-sm text-xl transition-colors ${
        isSelected 
          ? 'bg-[#2463eb] text-white' 
          : 'bg-slate-100 text-slate-600 group-hover:bg-[#2463eb] group-hover:text-white'
      }`}>
        {option.label}
      </div>
      <div className="text-left">
        <span className="text-xl math-font font-medium text-slate-900">{option.value}</span>
      </div>
      {isSelected && (
        <div className="absolute top-4 right-4 text-[#2463eb]">
          <CheckCircle2 className="w-6 h-6 fill-[#2463eb] text-white" />
        </div>
      )}
    </button>
  );
};
