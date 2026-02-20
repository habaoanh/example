'use client';

import React from 'react';
import { ExamQuestion } from '../../types';
import { GeometryDiagram } from './GeometryDiagram';
import { Sparkles } from 'lucide-react';

interface ProblemStatementProps {
  question: ExamQuestion;
  showConfirm: boolean;
  setShowConfirm: (show: boolean) => void;
  onConfirmHint: () => void;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ question, showConfirm, setShowConfirm, onConfirmHint }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Content Column */}
        <div className={`p-8 lg:p-12 ${question.diagram ? 'w-full lg:w-3/5' : 'w-full'}`}>
          
          {/* Question Header (like multiple-choice) */}
          <div className="flex items-center justify-between mb-8">
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
                  className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-10 flex flex-col gap-3"
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
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-slate-200 rotate-45"></div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>{question.text}</p>
            
            {question.requirements && (
              <ul className="space-y-3 list-none">
                {question.requirements.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Diagram Column */}
        {question.diagram && (
          <div className="w-full lg:w-2/5 p-8 bg-slate-50 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-200">
            <GeometryDiagram />
          </div>
        )}
      </div>
    </div>
  );
};
