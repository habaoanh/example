'use client';

import React, { useState } from 'react';
import withRoleAuth from '@/hocs/withRoleAuth';
import { saveQuestion } from '@/services/questionService';
import { Difficulty } from '@/types';
import {
  ArrowLeft,
  Save,
  FileJson,
  Upload,
  Wand2,
  Eye, // Add Eye icon
} from 'lucide-react';
import QuestionEditor, { EditorQuestionData } from '@/components/question/QuestionEditor';


const initialData: EditorQuestionData = {
    grade: 'Khối 12',
    topic: 'Hàm số & Đồ thị',
    difficulty: Difficulty.MEDIUM,
    tags: [],
    content: '',
    questionType: 'Trắc nghiệm',
    options: [
      { id: 'A', label: 'A.', value: '', isCorrect: false },
      { id: 'B', label: 'B.', value: '', isCorrect: false },
      { id: 'C', label: 'C.', value: '', isCorrect: false },
      { id: 'D', label: 'D.', value: '', isCorrect: false },
    ],
    solution: '',
    notes: '',
    imageUrl: null,
};


const CreateQuestionFromJsonPage: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false); // Add preview state
  const [jsonInput, setJsonInput] = useState('');
  const [data, setData] = useState<EditorQuestionData>(initialData);
  const [error, setError] = useState<string | null>(null);

  const handleParseJson = () => {
    if (!jsonInput.trim()) {
        setError('JSON input is empty.');
        return;
    }
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      
      if (typeof parsed !== 'object' || parsed === null) {
          setError('Invalid JSON structure. Must be an object.');
          return;
      }

      const newData: EditorQuestionData = {
        ...initialData,
        ...parsed,
        options: parsed.options && Array.isArray(parsed.options) 
          ? parsed.options.map((opt: any, index: number) => ({ 
              id: opt.id || String.fromCharCode(65 + index),
              label: opt.label || `${String.fromCharCode(65 + index)}. `,
              value: opt.value || '',
              isCorrect: opt.isCorrect || false,
            })) 
          : initialData.options,
      };
      setData(newData);
    } catch (err) {
      setError('Failed to parse JSON. Please check the format.');
      console.error(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const text = e.target?.result as string;
              setJsonInput(text);
          };
          reader.readAsText(file);
      }
  };

  const handleSaveQuestion = async (questionData: EditorQuestionData) => {
      setIsSaving(true);
      try {
          const savedQuestion = await saveQuestion(questionData);
          console.log('Question saved successfully!', savedQuestion);
          setData(initialData);
          setJsonInput('');
      } catch (error) {
          console.error('Failed to save question:', error);
      } finally {
          setIsSaving(false);
      }
  }

  return (
     <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 2k:py-6 4k:py-10 flex items-center justify-between">
        <div className="flex items-center gap-4 2k:gap-8">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="2k:w-8 2k:h-8" />
          </button>
          <h1 className="text-xl 2k:text-3xl 4k:text-5xl font-semibold text-slate-800">Tạo câu hỏi từ JSON</h1>
        </div>
        <div className="flex items-center gap-3 2k:gap-6">
          <button onClick={() => setIsPreview(!isPreview)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 2k:text-lg">
            <Eye size={18} className="2k:w-6 2k:h-6" />
            <span className="hidden sm:inline">{isPreview ? 'Chỉnh sửa' : 'Xem trước'}</span>
          </button>
          <button 
            onClick={() => handleSaveQuestion(data)}
            disabled={isSaving}
            className="bg-[#2463eb] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 2k:px-10 2k:py-4 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-sm shadow-[#2463eb]/20 2k:text-xl"
            >
            <Save size={18} className="2k:w-6 2k:h-6" />
            {isSaving ? 'Đang lưu...' : 'Lưu câu hỏi'}
          </button>
        </div>
      </header>

      <main>
        <QuestionEditor 
            initialData={data} 
            onSave={handleSaveQuestion} 
            isSaving={isSaving}
            isPreview={isPreview} // Pass the state down
        >
            <section>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 2k:p-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileJson className="text-slate-600" size={20} />
                    <h2 className="text-xs 2k:text-lg font-bold text-slate-800 uppercase tracking-tight">Trình nhập JSON</h2>
                  </div>
                </div>
                <div className="space-y-4">
                   <textarea 
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      className="w-full min-h-[120px] 2k:min-h-[200px] bg-slate-50 border-slate-200 rounded-xl p-3 focus:ring-[#2463eb] focus:border-[#2463eb] text-sm 2k:text-base placeholder:text-slate-400 resize-y transition-all font-mono tracking-tighter"
                      placeholder='Dán hoặc kéo thả tệp JSON vào đây...\n{\n  "content": "Nội dung câu hỏi...",\n  "difficulty": "Dễ",\n  "options": [ { "value": "Đáp án A", "isCorrect": true } ]\n}'
                    />
                    {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <label htmlFor="json-file-upload" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-4 rounded-xl inline-flex items-center gap-2">
                                <Upload size={16} />
                                <span>Tải lên .json</span>
                            </label>
                            <input id="json-file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".json"/>
                        </div>
                        <button 
                            onClick={handleParseJson}
                            className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-xl font-bold text-xs 2k:text-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
                        >
                            <Wand2 size={16} className="2k:w-6 2k:h-6" />
                            Phân tích JSON
                        </button>
                    </div>
                </div>
              </div>
            </section>
        </QuestionEditor>
      </main>
    </div>
  );
};

export default withRoleAuth(['admin', 'teacher'])(CreateQuestionFromJsonPage);
