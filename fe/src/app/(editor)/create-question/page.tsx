'use client';

import React, { useState } from 'react';
import withRoleAuth from '@/hocs/withRoleAuth';
import { analyzeQuestionByAI, analyzeQuestionByFile, saveQuestion } from '@/services/questionService';
import { Difficulty, GeminiResponse } from '@/types';
import {
  ArrowLeft,
  Save,
  Sparkles,
  Wand2,
  Upload,
  ArrowRight,
  Eye, // Add Eye icon back
} from 'lucide-react';
import QuestionEditor, { EditorQuestionData } from '@/components/question/QuestionEditor';


type AIResponse = GeminiResponse & {
    imageUrl?: string;
}

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


const CreateQuestionPage: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false); // State for preview mode is back
  const [rawInput, setRawInput] = useState('');
  const [data, setData] = useState<EditorQuestionData>(initialData);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [questions, setQuestions] = useState<AIResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const mapDifficulty = (diffString: string | undefined): Difficulty => {
      if (!diffString) return Difficulty.MEDIUM;
      const lowerCaseDiff = diffString.toLowerCase();
      if (lowerCaseDiff.includes('dễ')) return Difficulty.EASY;
      if (lowerCaseDiff.includes('khó')) return Difficulty.HARD;
      return Difficulty.MEDIUM;
  }

  const setQuestionData = (result: AIResponse) => {
    setData(prev => ({
      ...prev,
      content: result.content || '',
      options: result.options
        ? result.options.map((o, idx) => ({
            id: String.fromCharCode(65 + idx),
            label: `${String.fromCharCode(65 + idx)}. `,
            value: o.value || '',
            isCorrect: o.isCorrect || false,
          }))
        : initialData.options,
      solution: result.solution || '',
      notes: result.notes || '',
      grade: result.grade || prev.grade,
      topic: result.topic || prev.topic,
      difficulty: mapDifficulty(result.difficulty),
      tags: result.tags || [],
      imageUrl: result.imageUrl || null,
      questionType: prev.questionType,
    }));
  }

  const handleAIAnalyze = async () => {
    if (!rawInput.trim() && !uploadedFile) return;
    setIsAnalyzing(true);
    try {
        let results: AIResponse[];
        if (uploadedFile) {
            results = await analyzeQuestionByFile(uploadedFile);
        } else {
            const result = await analyzeQuestionByAI(rawInput);
            results = [result] 
        }

        if(results && results.length > 0){
            setQuestions(results);
            setCurrentQuestionIndex(0);
            setQuestionData(results[0]);
        }

    } catch (err) {
      console.error('AI Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setQuestionData(questions[nextIndex]);
    }
  }
  
  const handleSaveQuestion = async (questionData: EditorQuestionData) => {
      setIsSaving(true);
      try {
          const savedQuestion = await saveQuestion(questionData);
          console.log('Question saved successfully!', savedQuestion);
          
          if (currentQuestionIndex < questions.length - 1) {
            handleNextQuestion();
          } else {
            setData(initialData);
            setRawInput('');
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setUploadedFile(null);
          }

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
          <h1 className="text-xl 2k:text-3xl 4k:text-5xl font-semibold text-slate-800">MathEd AI Smart Editor</h1>
        </div>
        <div className="flex items-center gap-3 2k:gap-6">
           {/* Preview button is back in the header */}
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
              <div className="bg-white rounded-2xl shadow-sm border-2 border-[#2463eb]/20 p-4 2k:p-8 ai-glow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-[#2463eb]" size={20} />
                    <h2 className="text-xs 2k:text-lg font-bold text-slate-800 uppercase tracking-tight">Trình soạn thảo AI</h2>
                    <span className="px-1.5 py-0.5 bg-blue-100 text-[#2463eb] text-[9px] 2k:text-xs font-bold rounded uppercase">Thông minh</span>
                  </div>
                </div>
                <div className="space-y-4">
                   <textarea 
                      value={rawInput}
                      onChange={(e) => setRawInput(e.target.value)}
                      className="w-full min-h-[80px] 2k:min-h-[140px] bg-slate-50 border-slate-200 rounded-xl p-3 focus:ring-[#2463eb] focus:border-[#2463eb] text-sm 2k:text-xl placeholder:text-slate-400 resize-none transition-all" 
                      placeholder="Dán nội dung từ PDF, ảnh hoặc text thô..."
                    />
                    <div className="flex items-center gap-4">
                      <label htmlFor="file-upload" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-4 rounded-xl inline-flex items-center gap-2">
                          <Upload size={16} />
                          <span>Tải lên file Word/LaTeX</span>
                      </label>
                      <input id="file-upload" type="file" className="hidden" onChange={(e) => setUploadedFile(e.target.files ? e.target.files[0] : null)} accept=".docx,.tex"/>
                      {uploadedFile && <p className="text-sm text-slate-500">{uploadedFile.name}</p>}
                  </div>
                  <div className="flex justify-between items-center">
                  {questions.length > 1 && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-slate-600">
                                Câu hỏi: {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <button
                                onClick={handleNextQuestion}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl font-bold text-xs 2k:text-lg flex items-center gap-2 transition-all"
                                >
                                Câu kế tiếp
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                    <div className="flex justify-end flex-grow">
                      <button 
                        onClick={handleAIAnalyze}
                        disabled={isAnalyzing}
                        className="bg-[#2463eb] hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-xl font-bold text-xs 2k:text-lg flex items-center gap-2 transition-all shadow-md shadow-[#2463eb]/30 active:scale-95"
                      >
                        <Wand2 size={16} className="2k:w-6 2k:h-6" />
                        {isAnalyzing ? 'Đang xử lý...' : 'Phân tích thông minh'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </QuestionEditor>
      </main>
    </div>
  );
};

export default withRoleAuth(['admin', 'teacher'])(CreateQuestionPage);
