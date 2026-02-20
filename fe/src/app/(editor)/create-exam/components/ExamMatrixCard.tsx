'use client';

import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { MatrixRow } from '../types';

interface ExamMatrixCardProps {
  matrixData: MatrixRow[];
}

export const ExamMatrixCard: React.FC<ExamMatrixCardProps> = ({ matrixData }) => {
  // TODO: Calculate totals dynamically
  const totals = {
    nb: 15,
    th: 12,
    vd: 12,
    vdc: 3,
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="font-bold flex items-center gap-2">
          <LayoutGrid className="text-[#2463eb]" size={20} />
          Ma trận đề thi
        </h3>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-slate-500 border-b border-slate-100">
              <th className="py-3 font-medium">Chủ đề</th>
              <th className="py-3 font-medium text-center">NB</th>
              <th className="py-3 font-medium text-center">TH</th>
              <th className="py-3 font-medium text-center">VD</th>
              <th className="py-3 font-medium text-center">VDC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {matrixData.map((row, i) => (
              <tr key={i}>
                <td className="py-3 font-medium text-slate-800">{row.topic}</td>
                <td className={`py-3 text-center ${row.topic === 'Hình không gian' ? 'font-bold text-[#2463eb] bg-[#2463eb]/5' : 'text-slate-600'}`}>{row.nb}</td>
                <td className="py-3 text-center text-slate-600">{row.th}</td>
                <td className={`py-3 text-center ${row.topic === 'Hàm số' ? 'font-bold text-[#2463eb] bg-[#2463eb]/5' : 'text-slate-600'}`}>{row.vd}</td>
                <td className="py-3 text-center text-slate-600">{row.vdc}</td>
              </tr>
            ))}
            <tr className="bg-slate-50/70">
              <td className="py-3 font-bold text-slate-900">Tổng cộng</td>
              <td className="py-3 text-center font-bold text-slate-900">{totals.nb}</td>
              <td className="py-3 text-center font-bold text-slate-900">{totals.th}</td>
              <td className="py-3 text-center font-bold text-slate-900">{totals.vd}</td>
              <td className="py-3 text-center font-bold text-slate-900">{totals.vdc}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-slate-100 space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Độ khó: Trung bình</span>
            <span className="font-bold text-slate-800">6.8/10</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              style={{width: '68%'}}
              className="h-full bg-[#2463eb]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
