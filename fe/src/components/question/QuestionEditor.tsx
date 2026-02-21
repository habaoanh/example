'use client';

import React, { useState, useEffect } from 'react';
import { QuestionData, Difficulty } from '@/types';
import {
  Bold,
  Italic,
  ImagePlus,
  Maximize2,
  CheckCircle2,
  FileText,
  Lightbulb,
  Settings,
  PlusCircle,
  X,
  Type,
  Sigma,
  Variable,
  Sparkles,
} from 'lucide-react';
import LatexRenderer from '@/components/LatexRenderer';

const Tag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#2463eb]/10 text-[#2463eb] text-xs 2k:text-sm font-semibold rounded-full border border-[#2463eb]/10">
    {label}
    <button onClick={onRemove} className="hover:text-blue-800 transition-colors">
      <X size={14} className="2k:w-4 2k:h-4" />
    </button>
  </span>
);

// Add "Câu hỏi chùm" to the QuestionType union
export type QuestionType = 'Trắc nghiệm' | 'Tự luận' | 'Câu hỏi chùm';

export type EditorQuestionData = Omit<QuestionData, 'id'> & {
  imageUrl?: string | null;
  questionType: QuestionType;
};

interface QuestionEditorProps {
  initialData: EditorQuestionData;
  onSave: (data: EditorQuestionData) => Promise<void>;
  isSaving: boolean;
  isPreview: boolean;
  children?: React.ReactNode;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ initialData, onSave, isSaving, isPreview, children }) => {
  const [data, setData] = useState<EditorQuestionData>(initialData);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSave = () => {
    onSave(data);
  };

  const updateOption = (id: string, field: 'value' | 'isCorrect', val: any) => {
    setData((prev) => ({
      ...prev,
      options: prev.options.map((opt) =>
        opt.id === id
          ? { ...opt, [field]: val }
          : field === 'isCorrect' && val === true
          ? { ...opt, isCorrect: false }
          : opt
      ),
    }));
  };

  return (
    <>
      <div className="max-w-[1440px] 2k:max-w-[2000px] 4k:max-w-[3200px] mx-auto p-4 md:p-6 lg:p-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 2k:space-y-10">
            {children}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 pr-4 border-r border-slate-300">
                    <button className="p-2 hover:bg-white rounded transition-colors"><Bold size={18} /></button>
                    <button className="p-2 hover:bg-white rounded transition-colors"><Italic size={18} /></button>
                  </div>
                  <div className="flex items-center gap-1 pr-4 border-r border-slate-300">
                    <button className="p-2 hover:bg-white rounded transition-colors text-[#2463eb] font-bold"><Sigma size={18} /></button>
                    <button className="p-2 hover:bg-white rounded transition-colors text-[#2463eb] font-bold"><Variable size={18} /></button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white rounded-lg text-sm font-medium transition-colors">
                    <ImagePlus size={18} />
                    <span>Chèn ảnh</span>
                  </button>
              </div>
              <div className="p-6 2k:p-10">
                <label className="block text-[10px] 2k:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Nội dung câu hỏi</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center min-h-[350px] 2k:min-h-[500px] hover:border-[#2463eb]/50 transition-colors overflow-hidden">
                    {data.imageUrl ? (
                      <img src={data.imageUrl} alt="Minh họa câu hỏi" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center text-slate-400 p-8">
                        <ImagePlus size={48} className="mx-auto mb-4 text-slate-300" />
                        <p className="font-semibold">Hình ảnh minh họa</p>
                        <p className="text-sm">AI sẽ tự động thêm hoặc bạn có thể tải ảnh lên.</p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white/90 backdrop-blur shadow-sm border border-slate-200 p-2 rounded-xl text-slate-400 hover:text-[#2463eb] transition-all">
                        <Maximize2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col h-full">
                    {isPreview ? (
                      <div className="flex-grow min-h-[350px] 2k:min-h-[500px] text-base 2k:text-2xl leading-relaxed bg-slate-50/30 p-5 rounded-2xl border border-slate-200 custom-scrollbar overflow-y-auto">
                        <LatexRenderer content={data.content} />
                      </div>
                    ) : (
                      <textarea
                        value={data.content}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                        className="flex-grow min-h-[350px] 2k:min-h-[500px] focus:outline-none text-base 2k:text-2xl leading-relaxed bg-slate-50/30 p-5 rounded-2xl border border-slate-200 focus:border-[#2463eb]/40 focus:ring-4 focus:ring-[#2463eb]/5 custom-scrollbar overflow-y-auto resize-none"
                      />
                    )}
                    <div className="mt-3 flex items-center justify-between px-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Type size={12} />
                        <span className="text-[10px] 2k:text-xs font-medium italic">Hỗ trợ LaTeX ($...$)</span>
                      </div>
                      <span className="text-[10px] 2k:text-xs text-slate-400 uppercase font-bold tracking-tighter">{data.content.length} characters</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.questionType === 'Trắc nghiệm' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 2k:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg 2k:text-2xl font-semibold flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-[#2463eb]" />
                    Phương án lựa chọn
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {data.options.map((opt) => (
                    <div key={opt.id} className="flex items-center gap-4 group">
                      <input
                        checked={opt.isCorrect}
                        onChange={() => updateOption(opt.id, 'isCorrect', true)}
                        className="w-6 h-6 text-[#2463eb] border-slate-300 focus:ring-[#2463eb] rounded-full cursor-pointer"
                        name="correct-ans"
                        type="radio"
                      />
                      <div className={`flex-grow flex items-center bg-slate-50 border-2 rounded-2xl px-5 py-4 transition-all ${opt.isCorrect ? 'border-[#2463eb] bg-[#2463eb]/5' : 'border-slate-200'}`}>
                        <span className={`font-bold mr-4 text-lg ${opt.isCorrect ? 'text-[#2463eb]' : 'text-slate-400'}`}>{opt.label}</span>
                        {isPreview ? (
                          <div className="bg-transparent p-0 w-full text-sm 2k:text-xl font-medium">
                            <LatexRenderer content={opt.value} />
                          </div>
                        ) : (
                          <input
                            value={opt.value}
                            onChange={(e) => updateOption(opt.id, 'value', e.target.value)}
                            className="bg-transparent border-none p-0 w-full focus:ring-0 text-sm 2k:text-xl font-medium"
                            placeholder="Nội dung đáp án..."
                            type="text"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                  <FileText size={18} className="text-slate-500" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Lời giải chi tiết</h2>
                </div>
                <div className="p-6">
                  {isPreview ? (
                    <div className="w-full min-h-[150px] 2k:min-h-[250px] bg-slate-50 rounded-xl p-4 text-sm 2k:text-xl leading-relaxed custom-scrollbar">
                      <LatexRenderer content={data.solution} />
                    </div>
                  ) : (
                    <textarea
                      value={data.solution}
                      onChange={(e) => setData({ ...data, solution: e.target.value })}
                      className="w-full min-h-[150px] 2k:min-h-[250px] bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#2463eb]/20 text-sm 2k:text-xl leading-relaxed resize-none custom-scrollbar"
                    />
                  )}
                </div>
              </div>
              <div className="bg-blue-50/30 rounded-2xl shadow-sm border border-[#2463eb]/20 overflow-hidden ai-glow">
                <div className="p-4 border-b border-[#2463eb]/10 flex items-center gap-2">
                  <Lightbulb size={18} className="text-[#2463eb]" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#2463eb]">Ghi chú quan trọng</h2>
                </div>
                <div className="p-6">
                  {isPreview ? (
                    <div className="w-full min-h-[150px] 2k:min-h-[250px] bg-white/60 rounded-xl p-4 text-sm 2k:text-xl leading-relaxed text-slate-700 custom-scrollbar">
                      <LatexRenderer content={data.notes} />
                    </div>
                  ) : (
                    <textarea
                      value={data.notes}
                      onChange={(e) => setData({ ...data, notes: e.target.value })}
                      className="w-full min-h-[150px] 2k:min-h-[250px] bg-white/60 border-none rounded-xl p-4 focus:ring-2 focus:ring-[#2463eb]/20 text-sm 2k:text-xl leading-relaxed text-slate-700 resize-none custom-scrollbar"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 2k:p-10 space-y-8">
              <div>
                <h3 className="text-sm 2k:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Settings size={22} className="text-[#2463eb]" />
                  Thuộc tính & Phân loại
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loại câu hỏi</label>
                    <select 
                      value={data.questionType}
                      onChange={(e) => setData({...data, questionType: e.target.value as QuestionType})}
                      className="w-full bg-slate-50 border-slate-200 rounded-xl py-3 px-4 text-sm 2k:text-xl focus:ring-[#2463eb]"
                    >
                      <option>Trắc nghiệm</option>
                      <option>Tự luận</option>
                      <option>Câu hỏi chùm</option> {/* Added new option */}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Khối lớp</label>
                    <select
                      value={data.grade}
                      onChange={(e) => setData({ ...data, grade: e.target.value })}
                      className="w-full bg-slate-50 border-slate-200 rounded-xl py-3 px-4 text-sm 2k:text-xl focus:ring-[#2463eb]"
                    >
                       <option>Khối 6</option>
                       <option>Khối 7</option>
                       <option>Khối 8</option>
                       <option>Khối 9</option>
                       <option>Khối 10</option>
                       <option>Khối 11</option>
                       <option>Khối 12</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chuyên đề</label>
                    <select
                      value={data.topic}
                      onChange={(e) => setData({ ...data, topic: e.target.value })}
                      className="w-full bg-slate-50 border-slate-200 rounded-xl py-3 px-4 text-sm 2k:text-xl focus:ring-[#2463eb]"
                    >
                      <option>Hàm số & Đồ thị</option>
                      <option>Hình học không gian</option>
                      <option>Số phức</option>
                      <option>Giải tích & Giải thuật</option>
                      <option>Phân tích đa thức thành nhân tử</option> {/* Added for consistency */}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Độ khó</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD].map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setData({ ...data, difficulty: diff })}
                          className={`py-3 text-xs 2k:text-lg font-bold rounded-xl border-2 transition-all ${
                            data.difficulty === diff
                              ? 'border-[#2463eb] text-white bg-[#2463eb] shadow-lg shadow-[#2463eb]/20 scale-105'
                              : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thẻ nhận diện</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {data.tags.map(tag => (
                        <Tag
                          key={tag}
                          label={tag}
                          onRemove={() => setData({ ...data, tags: data.tags.filter(t => t !== tag) })}
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newTag.trim()) {
                            setData({ ...data, tags: [...data.tags, newTag.trim()] });
                            setNewTag('');
                          }
                        }}
                        className="w-full bg-slate-50 border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm 2k:text-xl focus:ring-[#2463eb] focus:border-[#2463eb]"
                        placeholder="Thêm tag..."
                        type="text"
                      />
                      <button
                        onClick={() => { if (newTag.trim()) { setData({ ...data, tags: [...data.tags, newTag.trim()] }); setNewTag(''); } }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2463eb] transition-colors"
                      >
                        <PlusCircle size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                  <Sparkles size={24} className="text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-sm 2k:text-xl font-bold text-indigo-900 mb-2">Hệ thống gợi ý</h4>
                  <p className="text-xs 2k:text-lg text-indigo-700/80 leading-relaxed">
                    MathEd AI vừa cập nhật tính năng nhận diện đồ thị qua hình ảnh. Thử kéo thả một ảnh đồ thị vào vùng biên tập!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 flex gap-4 z-50">
        <button onClick={() => isPreview} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-bold text-sm">{isPreview ? 'Sửa' : 'Xem trước'}</button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 py-4 bg-[#2463eb] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#2463eb]/20">
          {isSaving ? 'Đang lưu...' : 'Lưu vào ngân hàng'}
        </button>
      </div>
    </>
  );
};

export default QuestionEditor;
