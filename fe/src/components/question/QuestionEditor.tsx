"use client";

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { analyzeQuestionByAI } from '@/services/questionService';
import { QuestionData, Difficulty, GeminiResponse } from '@/types';
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Eye,
  FileText,
  Lightbulb,
  PlusCircle,
  Save,
  Settings,
  Sparkles,
  Wand2,
  X,
  Zap
} from 'lucide-react';

// Child Components
const DynamicGraph = dynamic(() => import('@/components/ui/QuestionGraph'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full"><p className="text-slate-400">Đang tải...</p></div>
});

const Tag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#2463eb]/10 text-[#2463eb] text-xs 2k:text-sm font-semibold rounded-full border border-[#2463eb]/10">
        {label}
        <button onClick={onRemove} className="hover:text-blue-800 transition-colors"><X size={14} /></button>
    </span>
);

// Default state
const defaultQuestionState: QuestionData = {
    grade: 'Khối 12', topic: 'Hàm số & Đồ thị', difficulty: Difficulty.MEDIUM, tags: ['THPT Quốc gia'], content: '',
    options: [
        { id: 'A', label: 'A.', value: '', isCorrect: true }, { id: 'B', label: 'B.', value: '', isCorrect: false },
        { id: 'C', label: 'C.', value: '', isCorrect: false }, { id: 'D', label: 'D.', value: '', isCorrect: false },
    ],
    solution: '', notes: '', functionString: ''
};

// Props
interface QuestionEditorProps {
  initialData?: Partial<QuestionData>;
  onSave: (data: QuestionData) => Promise<void>;
  isSaving: boolean;
  pageTitle: string;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({ initialData, onSave, isSaving, pageTitle }) => {
  const [isClient, setIsClient] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const [data, setData] = useState<QuestionData>({ ...defaultQuestionState, ...initialData });
  const [newTag, setNewTag] = useState('');

  useEffect(() => { setIsClient(true); }, []);
  useEffect(() => { if (initialData) setData({ ...defaultQuestionState, ...initialData }); }, [initialData]);

  const getGraphData = useCallback(() => {
    if (!isClient || !data.functionString) return [];
    const plot = [];
    try {
        for (let x = -10; x <= 10; x += 0.2) {
            const fx = new Function('x', `return ${data.functionString.replace(/\^/g, '**')}`)(x);
            if (isFinite(fx)) plot.push({ x: Number(x.toFixed(1)), y: fx });
        }
    } catch (e) { console.error("Function eval error:", e); return []; }
    return plot;
  }, [data.functionString, isClient]);

  const handleAIAnalyze = async () => { /* ... AI logic ... */ };
  const updateOption = (id: string, field: 'value' | 'isCorrect', val: any) => {
    setData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id === id ? { ...opt, [field]: val } : (field === 'isCorrect' && val === true ? { ...opt, isCorrect: false } : opt))
    }));
  };

  if (!isClient) return <div className="w-full h-screen flex items-center justify-center"><p>Đang tải trình soạn thảo...</p></div>; // Or a loading spinner

  return (
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6 2k:space-y-10">
            {/* AI Editor Section - Re-add if needed */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 2k:p-10">
              <h2 className="text-lg 2k:text-2xl font-semibold flex items-center gap-3 mb-8"><FileText size={24} className="text-slate-500" /> Nội dung & Đồ thị</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="border-2 border-dashed rounded-2xl min-h-[350px] p-4"><DynamicGraph data={getGraphData()} /></div>
                        <div className="p-4 bg-blue-50/50 border border-[#2463eb]/10 rounded-2xl space-y-3">
                            <div className="flex items-center gap-2"><Zap size={16} className="text-[#2463eb]" /><span className="text-xs font-bold text-[#2463eb] uppercase">Hàm số f(x)</span></div>
                            <div className="flex gap-2"><input value={data.functionString} onChange={e => setData({...data, functionString: e.target.value})} className="w-full rounded-xl p-3 text-sm" type="text" placeholder="Ví dụ: sin(x) / x" /></div>
                        </div>
                    </div>
                    <textarea value={data.content} onChange={e => setData({...data, content: e.target.value})} className="min-h-[400px] bg-slate-50 rounded-xl p-4 text-base" placeholder="Nội dung câu hỏi..." />
                </div>
            </div>

            {/* Options Section */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 2k:p-10"> 
                <h2 className="text-lg font-semibold flex items-center gap-3 mb-6"><CheckCircle2 size={24} className="text-[#2463eb]" /> Phương án</h2>
                {/* ... Options mapping ... */}
            </div>
            
            {/* Solution & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
              {/* ... Solution & Notes textareas ... */}
            </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                <h1 className="text-xl 2k:text-2xl font-bold text-slate-800">{pageTitle}</h1>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/questions" passHref className="flex-1">
                        <button className="w-full px-4 py-2 text-slate-600 font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2 2k:text-lg">
                            <ArrowLeft size={18} /> Quay lại
                        </button>
                    </Link>
                    <button 
                        onClick={() => onSave(data)} 
                        disabled={isSaving}
                        className="flex-1 bg-[#2463eb] hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all 2k:text-lg"
                    >
                        <Save size={18} /> {isSaving ? 'Đang lưu...' : 'Lưu'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6 2k:p-10 space-y-6">
                <h3 className="text-base font-bold flex items-center gap-3"><Settings size={20} className="text-[#2463eb]" /> Thuộc tính</h3>
                {/* ... Properties mapping ... */}
            </div>
        </div>
    </div>
  );
};
