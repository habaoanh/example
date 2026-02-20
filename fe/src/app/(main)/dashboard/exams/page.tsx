'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Plus,
  Search,
  FilterX,
  Eye,
  Copy,
  Edit3,
  Trash2,
  ChevronLeft,
  FileText,
  CheckCircle2,
  FileEdit,
  MoreVertical
} from 'lucide-react';

// --- Types ---
interface Exam {
  id: string;
  name: string;
  type: string;
  creator: {
    name: string;
    initials: string;
    color: string;
  };
  questions: number;
  duration: number;
  attempts: number;
  status: 'active' | 'draft' | 'archived';
}

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    colorClass: {
        bg: string;
        text: string;
    };
}

interface StatusBadgeProps {
    status: Exam['status'];
}

// --- Mock Data (TODO: Replace with data from API) ---
const EXAMS: Exam[] = [
  {
    id: 'EXAM-2024-001',
    name: 'Kiểm tra Giữa kỳ I - Toán 12',
    type: 'Thi thử',
    creator: { name: 'Trần Hùng', initials: 'TH', color: 'bg-blue-100 text-blue-600' },
    questions: 50,
    duration: 90,
    attempts: 1240,
    status: 'active'
  },
  {
    id: 'EXAM-2024-042',
    name: 'Chuyên đề Hàm số - Ôn tập tuần 12',
    type: 'Weekly Quiz',
    creator: { name: 'Lê An', initials: 'LA', color: 'bg-purple-100 text-purple-600' },
    questions: 20,
    duration: 30,
    attempts: 85,
    status: 'draft'
  },
  {
    id: 'ARCH-2023-089',
    name: 'Đề thi Học sinh giỏi cấp Tỉnh 2023',
    type: 'Final Exam',
    creator: { name: 'Phan Minh', initials: 'PM', color: 'bg-orange-100 text-orange-600' },
    questions: 10,
    duration: 180,
    attempts: 3500,
    status: 'archived'
  },
  {
    id: 'EXAM-2024-112',
    name: 'Kiểm tra Hình học chương III - Lớp 11',
    type: 'Mock Test',
    creator: { name: 'Trần Hùng', initials: 'TH', color: 'bg-blue-100 text-blue-600' },
    questions: 40,
    duration: 60,
    attempts: 520,
    status: 'active'
  }
];

// --- Sub-components ---

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const configs = {
    active: { label: 'Đang sử dụng', classes: 'bg-emerald-100 text-emerald-700' },
    draft: { label: 'Bản nháp', classes: 'bg-slate-100 text-slate-600' },
    archived: { label: 'Lưu trữ', classes: 'bg-amber-100 text-amber-700' }
  };
  const config = configs[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${config.classes}`}>
      {config.label}
    </span>
  );
};

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, colorClass }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className={`size-12 rounded-lg flex items-center justify-center ${colorClass.bg} shrink-0`}>
            <Icon size={24} className={colorClass.text} />
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
            <p className={`text-3xl font-bold text-slate-900`}>{value}</p>
        </div>
    </div>
);


// --- Main Page Component ---
export default function ExamsPage() {

  return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Ngân hàng đề thi</h2>
                <p className="mt-1 text-base text-slate-500">Quản lý, tìm kiếm và tạo mới đề thi trong hệ thống.</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative flex-1 md:min-w-60">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all outline-none shadow-sm" 
                    placeholder="Tìm kiếm đề thi..." 
                    type="text"
                    />
                </div>
                <Link href="/create-exam" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all whitespace-nowrap">
                    <Plus size={18} />
                    <span>Tạo đề thi mới</span>
                </Link>
            </div>
        </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard 
                icon={FileText} 
                label="Tổng số đề thi"
                value="128"
                colorClass={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
            />
            <StatCard 
                icon={CheckCircle2} 
                label="Đang hoạt động"
                value="94"
                colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
            />
            <StatCard 
                icon={FileEdit} 
                label="Bản nháp"
                value="34"
                colorClass={{ bg: 'bg-slate-100', text: 'text-slate-600' }}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="border-b border-slate-200">
                  <tr className="bg-slate-50/50">
                    <th className="p-4 w-12 text-center">
                      <input type="checkbox" className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-700">Thông tin đề thi</th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-700">Người tạo</th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-700 text-center">Cấu trúc</th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-700 text-center">Lượt thi</th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-700">Trạng thái</th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-700 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EXAMS.map((exam) => (
                    <tr 
                      key={exam.id}
                      className="hover:bg-slate-50/50 transition-colors group cursor-default"
                    >
                      <td className="p-4 text-center">
                        <input type="checkbox" className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-base">
                            {exam.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 font-mono">
                              {exam.id}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              • {exam.type}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm ${exam.creator.color}`}>
                            {exam.creator.initials}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{exam.creator.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">{exam.questions} câu</span>
                          <span className="text-xs text-slate-500">{exam.duration} phút</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-800">{exam.attempts.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={exam.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem trước">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sao chép">
                            <Copy size={18} />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa">
                            <Edit3 size={18} />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-4 flex items-center justify-between gap-4 border-t border-slate-200">
              <p className="text-sm text-slate-500 font-medium">
                Hiển thị <span className="font-bold text-slate-800">1 - 4</span> của <span className="font-bold text-slate-800">128</span> kết quả
              </p>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors" disabled>
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1">
                  <button className="size-8 rounded-lg flex items-center justify-center text-sm font-bold bg-blue-600 text-white">1</button>
                  <button className="size-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">2</button>
                  <button className="size-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">3</button>
                  <span className="px-1 text-slate-400">...</span>
                  <button className="size-8 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">12</button>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

      </div>
  );
}
