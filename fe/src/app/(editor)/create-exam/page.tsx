'use client';
import React, { useState } from 'react';
import { 
  Sparkles, 
  FileDown, 
  Save, 
  Settings, 
  CheckCircle2, 
  LayoutGrid,
  ListOrdered
} from 'lucide-react';
import { Question, MatrixRow } from './types';
import { QuestionCard } from './components/QuestionCard';
import { BasicConfigCard } from './components/BasicConfigCard';
import { ExamMatrixCard } from './components/ExamMatrixCard';
import { AiSuggestionCard } from './components/AiSuggestionCard';

const INITIAL_QUESTIONS: Question[] = [
  {
    id: '1',
    number: '01',
    topic: 'Giải tích',
    level: 'Vận dụng',
    type: 'multiple-choice',
    content: 'Tìm tất cả các giá trị thực của tham số m để hàm số y = 1/3x³ - mx² + (m² - m + 1)x + 1 đạt cực đại tại x = 1.',
    options: [
      { label: 'A', text: 'm = 1' },
      { label: 'B', text: 'm = 2', isCorrect: true },
      { label: 'C', text: 'm ∈ {1; 2}' },
      { label: 'D', text: 'm ∈ ∅' },
    ]
  },
  {
    id: '2',
    number: '02',
    topic: 'Hình học không gian',
    level: 'Thông hiểu',
    type: 'multiple-choice',
    content: 'Cho khối chóp S.ABC có đáy ABC là tam giác vuông cân tại B, AB = a. Cạnh bên SA vuông góc với mặt phẳng đáy và SA = a√2. Thể tích của khối chóp đã cho bằng:',
    options: [
      { label: 'A', text: 'a³√2 / 6', isCorrect: true },
      { label: 'B', text: 'a³√2 / 3' },
      { label: 'C', text: 'a³√2 / 2' },
      { label: 'D', text: 'a³√2' },
    ]
  },
  {
    id: '3',
    number: '03',
    topic: 'Hình học không gian',
    level: 'Vận dụng cao',
    type: 'essay',
    content: 'Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a. Cạnh bên SA vuông góc với đáy, SA = a√2. Gọi M là trung điểm của BC. Tính khoảng cách từ điểm M đến mặt phẳng (SCD).',
  }
];

const MATRIX_DATA: MatrixRow[] = [
  { topic: 'Hàm số', nb: 4, th: 3, vd: 2, vdc: 1 },
  { topic: 'Mũ & Lo-ga', nb: 3, th: 2, vd: 1, vdc: 0 },
  { topic: 'Nguyên hàm', nb: 3, th: 3, vd: 1, vdc: 1 },
  { topic: 'Số phức', nb: 2, th: 2, vd: 1, vdc: 0 },
  { topic: 'Hình không gian', nb: 3, th: 2, vd: 1, vdc: 1 },
];

// Main Page Component
export default function CreateExamPage() {
  const [examName, setExamName] = useState('Đề thi thử Toán THPTQG số 1');
  const [grade, setGrade] = useState('12');
  const [duration, setDuration] = useState(90);

  return (
    <div className="min-h-screen bg-slate-50">
      <ExamEditorHeader />
      <main className="max-w-[1800px] mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <QuestionList />
        <Sidebar 
          examName={examName}
          setExamName={setExamName}
          grade={grade}
          setGrade={setGrade}
          duration={duration}
          setDuration={setDuration}
        />
      </main>
      <MobileBottomBar />
    </div>
  );
}

// Sub-components for better organization

const ExamEditorHeader = () => (
  <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3">
    <div className="max-w-[1800px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-[#2463eb]/10 p-2 rounded-lg text-[#2463eb]">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold leading-tight text-slate-900">Kiểm tra & Hoàn thiện đề thi AI</h1>
          <p className="text-xs text-slate-500">Toán học THPT • Mã đề: AI-2024-MATH</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-all">
          <FileDown size={18} />
          <span className="hidden lg:inline">Tải file PDF</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2 bg-[#2463eb] hover:bg-[#2463eb]/90 text-white rounded-lg text-sm font-semibold shadow-sm transition-all">
          <Save size={18} />
          <span className="hidden sm:inline">Lưu & Xuất bản</span>
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </div>
  </header>
);

const QuestionList = () => (
  <div className="lg:col-span-7 xl:col-span-8 space-y-6">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <ListOrdered className="text-[#2463eb]" size={24} />
        Danh sách câu hỏi (50 câu)
      </h2>
      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
        <CheckCircle2 size={14} />
        Đã kiểm tra 48/50
      </div>
    </div>
    <div>
      {INITIAL_QUESTIONS.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  </div>
);

const Sidebar: React.FC<any> = ({ examName, setExamName, grade, setGrade, duration, setDuration }) => (
  <div className="lg:col-span-5 xl:col-span-4 space-y-6">
    <div className="sticky top-24 space-y-6">
      <BasicConfigCard 
        examName={examName}
        setExamName={setExamName}
        grade={grade}
        setGrade={setGrade}
        duration={duration}
        setDuration={setDuration}
      />
      <ExamMatrixCard matrixData={MATRIX_DATA} />
      <AiSuggestionCard />
    </div>
  </div>
);

const MobileBottomBar = () => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex gap-3 z-40 shadow-2xl">
    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold">
      <LayoutGrid size={20} />
      Ma trận
    </button>
    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#2463eb] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#2463eb]/30">
      <Save size={20} />
      Lưu đề thi
    </button>
  </div>
);
