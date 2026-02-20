'use client';

import React from 'react';

export const GeometryDiagram = () => {
  return (
    <div className="mt-12 bg-slate-50 rounded-3xl p-10 border border-slate-200 flex flex-col items-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="w-full max-w-md aspect-[4/3] relative">
        <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-sm">
          {/* Triangle ABC */}
          <path
            d="M 60 240 L 340 240 L 60 40 Z"
            fill="none"
            stroke="#2463eb"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Right angle at A */}
          <path d="M 60 65 L 85 65 L 85 40" fill="none" stroke="#2463eb" strokeWidth="1.5" opacity="0.4" />

          {/* Altitude AH */}
          <line
            x1="60" y1="40" x2="160" y2="240"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* Right angle at H */}
          <g transform="rotate(-63 160 240)">
            <rect x="160" y="225" width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="1" />
          </g>

          {/* Labels */}
          <text x="45" y="35" className="fill-slate-900 font-bold text-xl font-serif">A</text>
          <text x="45" y="265" className="fill-slate-900 font-bold text-xl font-serif">B</text>
          <text x="350" y="265" className="fill-slate-900 font-bold text-xl font-serif">C</text>
          <text x="170" y="265" className="fill-slate-500 font-medium text-lg font-serif">H</text>

          {/* Dimensions */}
          <text x="30" y="145" className="fill-blue-600 italic font-medium text-sm">6cm</text>
          <text x="210" y="135" className="fill-blue-600 italic font-medium text-sm">8cm</text>
        </svg>
      </div>
      <p className="mt-6 text-sm text-slate-400 italic font-medium">Hình 1.1: Mô phỏng tam giác ABC vuông tại A</p>
    </div>
  );
};
