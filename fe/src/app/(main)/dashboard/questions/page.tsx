'use client';

import React, { useState } from 'react';
import {
  ChevronRight, Plus, Search, Edit, Trash2, 
  ChevronsLeft, ChevronsRight, ChevronLeft, CheckCircle, Edit2,
  FilePlus2
} from 'lucide-react';
import LatexRenderer from '@/components/LatexRenderer';

// --- TYPES ---
interface Question {
  id: string;
  code: string;
  grade: string;
  subject: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  content: string;
  options?: { label: string; text: string; isCorrect?: boolean }[];
  type: 'Trắc nghiệm' | 'Tự luận';
  lastUpdated: string;
  updatedBy: string;
}

// --- MOCK DATA (to be replaced with API call) ---
const QUESTIONS: Question[] = [
  {
    id: '1',
    code: '#Q-7721',
    grade: 'Lớp 12',
    subject: 'Giải tích',
    difficulty: 'Trung bình',
    content: 'Cho hàm số $f(x) = \\frac{x^2 - 4}{x - 2}$. Tính giá trị của giới hạn $\\lim_{x \\to 2} f(x)$.',
    type: 'Trắc nghiệm',
    options: [
      { label: 'A', text: '$\\lim_{x \\to 2} f(x) = 0$' },
      { label: 'B', text: '$\\lim_{x \\to 2} f(x) = 4$', isCorrect: true },
      { label: 'C', text: '$\\lim_{x \\to 2} f(x) = 2$' },
      { label: 'D', text: 'Giới hạn không tồn tại' }
    ],
    lastUpdated: '12/10/2023',
    updatedBy: 'Admin'
  },
  {
    id: '2',
    code: '#Q-8109',
    grade: 'Lớp 11',
    subject: 'Hình học',
    difficulty: 'Khó',
    content: 'Trong không gian với hệ tọa độ Oxyz, cho mặt phẳng $(P): 2x - y + 2z - 3 = 0$ và điểm $A(1; 2; -1)$. Viết phương trình mặt cầu tâm A và tiếp xúc với mặt phẳng (P).',
    type: 'Tự luận',
    lastUpdated: '05/11/2023',
    updatedBy: 'GV. Lê Thu'
  },
  {
    id: '3',
    code: '#Q-4491',
    grade: 'Lớp 10',
    subject: 'Đại số',
    difficulty: 'Dễ',
    content: 'Giải bất phương trình: $x^2 - 5x + 6 > 0$',
    type: 'Tự luận',
    lastUpdated: '01/12/2023',
    updatedBy: 'Admin'
  }
];

// --- SUB-COMPONENTS PROPS INTERFACES ---

interface StatCardProps {
  label: string;
  value: string;
  color?: string;
}

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onToggle: () => void;
}

interface PaginationButtonProps {
  icon: React.ElementType;
  disabled?: boolean;
  onClick?: () => void;
}

// --- SUB-COMPONENTS ---

const StatCard: React.FC<StatCardProps> = ({ label, value, color = "text-slate-900" }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isSelected, onToggle }) => {
  const difficultyMap = {
    'Dễ': 'bg-green-100 text-green-700 border-green-200',
    'Trung bình': 'bg-amber-100 text-amber-700 border-amber-200',
    'Khó': 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className={`bg-white rounded-xl border-2 transition-all group overflow-hidden shadow-sm ${isSelected ? 'border-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>
       <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
             <input 
              checked={isSelected}
              onChange={onToggle}
              className="form-checkbox rounded-md border-slate-400 text-blue-600 focus:ring-blue-500 h-5 w-5 cursor-pointer" 
              type="checkbox" 
            />
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              {question.grade} - {question.subject}
            </span>
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${difficultyMap[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <span className="text-xs text-slate-500 font-mono">{question.code}</span>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa"><Edit size={18} /></button>
            <button className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa"><Trash2 size={18} /></button>
          </div>
        </div>
        
        <div className="text-slate-800 mb-5 pl-8">
           <LatexRenderer content={question.content} />
        </div>

        {question.options && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8">
            {question.options.map((opt) => (
              <div key={opt.label} className={`flex items-center gap-3 p-3 rounded-lg border ${opt.isCorrect ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${opt.isCorrect ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {opt.label}
                </span>
                <span className={`text-sm flex-1 ${opt.isCorrect ? 'font-semibold text-green-800' : 'text-slate-700'}`}>
                  <LatexRenderer content={opt.text} />
                </span>
                {opt.isCorrect && <CheckCircle className="text-green-600 text-lg ml-auto" size={18} />}
              </div>
            ))}
          </div>
        )}

        {question.type === 'Tự luận' && (
          <div className="italic text-sm text-slate-500 flex items-center gap-2 mt-4 pl-8">
            <Edit2 size={16} />
            <span>Đây là câu hỏi tự luận.</span>
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50/70">
        <span className="text-xs text-slate-500">Cập nhật lần cuối: {question.lastUpdated} bởi <strong>{question.updatedBy}</strong></span>
        <button className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1.5">
          Xem chi tiết & lịch sử
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ icon: Icon, disabled = false, onClick = () => {} }) => (
  <button 
    onClick={onClick}
    className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors" 
    disabled={disabled}>
    <Icon size={18} />
  </button>
);

// --- MAIN PAGE COMPONENT ---
export default function DashboardPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const toggleSelectAll = () => {
    if (selectedIds.length === QUESTIONS.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(QUESTIONS.map(q => q.id));
    }
  }

  const filteredQuestions = QUESTIONS.filter(q => 
    q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Ngân hàng câu hỏi</h2>
                <p className="mt-1 text-base text-slate-500">Quản lý, tìm kiếm và tạo mới câu hỏi trong hệ thống.</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative flex-1 md:min-w-60">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all outline-none shadow-sm" 
                    placeholder="Tìm kiếm câu hỏi..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                 <button 
                    disabled={selectedIds.length === 0}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-green-500/20 hover:bg-green-700 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                    <FilePlus2 size={18} />
                    <span>Tạo bài thi ({selectedIds.length})</span>
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all">
                    <Plus size={18} />
                    <span>Thêm câu hỏi</span>
                </button>
            </div>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-2">
        <StatCard label="Tổng câu hỏi" value="1,284" />
        <StatCard label="Câu hỏi mới" value="+142" color="text-green-600" />
        <StatCard label="Đã sử dụng" value="85%" />
        <StatCard label="Cần xem lại" value="12" color="text-amber-600" />
      </div>

      {/* Question List */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center bg-slate-100 rounded-lg p-3 text-sm font-semibold text-slate-600">
            <input 
              type="checkbox"
              checked={selectedIds.length === QUESTIONS.length && QUESTIONS.length > 0}
              onChange={toggleSelectAll}
              className="form-checkbox rounded-md border-slate-400 text-blue-600 focus:ring-blue-500 h-5 w-5 mr-5"
            />
            <span>{selectedIds.length > 0 ? `${selectedIds.length} câu hỏi đã chọn` : `Hiển thị ${filteredQuestions.length} câu hỏi`}</span>
        </div>

        {filteredQuestions.map((q) => (
          <QuestionCard 
            key={q.id}
            question={q} 
            isSelected={selectedIds.includes(q.id)}
            onToggle={() => toggleSelect(q.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end py-6 border-t border-slate-200 mt-4">
        <div className="flex items-center gap-1">
          <PaginationButton icon={ChevronsLeft} disabled />
          <PaginationButton icon={ChevronLeft} disabled />
          <button className="w-10 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">1</button>
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-bold">2</button>
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-bold">3</button>
          <span className="px-2 text-slate-400">...</span>
          <button className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-bold">129</button>
          <PaginationButton icon={ChevronRight} />
          <PaginationButton icon={ChevronsRight} />
        </div>
      </div>

    </div>
  );
}
