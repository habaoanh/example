'use client';

import React from 'react';
import {
  Book, 
  PenSquare, 
  Users, 
  Plus, 
  TrendingUp, 
  FileCheck, 
  FileText, 
  UserCheck, 
  ChevronRight
} from 'lucide-react';

// --- Prop Types ---
interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    color: string;
}

interface ActivityItemProps {
    icon: React.ElementType;
    color: string;
    title: string;
    time: string;
}

// --- Helper Components ---
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, change, changeType, color }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  return (
    <div className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex-1`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm">
        <TrendingUp className={changeColor} size={16} />
        <span className={changeColor}>{change}</span>
        <span className="text-slate-500">so với tháng trước</span>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<ActivityItemProps> = ({ icon: Icon, color, title, time }) => (
  <div className="flex items-center gap-4 py-3">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
      <Icon className="text-white" size={20} />
    </div>
    <div className="flex-1">
      <p className="font-medium text-slate-800 text-sm">{title}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
    <ChevronRight className="text-slate-400" size={18} />
  </div>
);


// --- Main Component ---
export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Chào buổi sáng, Admin!</h1>
            <p className="text-slate-500 mt-1">Đây là tổng quan nhanh về hệ thống của bạn.</p>
          </div>
          <button className="bg-blue-600 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition">
            <Plus size={18} />
            <span>Tạo mới</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <StatCard 
            icon={Book} 
            label="Tổng số câu hỏi"
            value="1,284"
            change="+12%"
            changeType="increase"
            color="bg-blue-500"
          />
          <StatCard 
            icon={PenSquare}
            label="Tổng số đề thi"
            value="128"
            change="+8"
            changeType="increase"
            color="bg-indigo-500"
          />
          <StatCard 
            icon={Users}
            label="Học sinh"
            value="2,405"
            change="-2.5%"
            changeType="decrease"
            color="bg-emerald-500"
          />
        </div>

        {/* Recent Activity & Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Hoạt động gần đây</h2>
            <div className="divide-y divide-slate-100">
              <ActivityItem 
                icon={FileCheck}
                color="bg-green-500"
                title="Đề thi #KT-11-02 đã được duyệt bởi GV. Minh Anh"
                time="2 giờ trước"
              />
              <ActivityItem 
                icon={FileText}
                color="bg-sky-500"
                title="Bạn đã tạo một đề thi mới: Chuyên đề khảo sát hàm số"
                time="1 ngày trước"
              />
              <ActivityItem 
                icon={UserCheck}
                color="bg-fuchsia-500"
                title="Học sinh Lê Văn Thịnh đã hoàn thành bài thi giữa kỳ"
                time="1 ngày trước"
              />
                <ActivityItem 
                icon={FileCheck}
                color="bg-green-500"
                title="Đề thi #KT-10-05 đã được duyệt bởi GV. Trần Hùng"
                time="3 ngày trước"
              />
            </div>
             <button className="text-sm font-semibold text-blue-600 mt-4 hover:underline">Xem tất cả hoạt động</button>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Truy cập nhanh</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition">
                <Book size={18} className="text-blue-600"/>
                <span className="font-medium text-sm text-slate-800">Tạo câu hỏi mới</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition">
                <PenSquare size={18} className="text-indigo-600"/>
                <span className="font-medium text-sm text-slate-800">Soạn đề thi từ ngân hàng câu hỏi</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition">
                <Users size={18} className="text-emerald-600"/>
                <span className="font-medium text-sm text-slate-800">Quản lý danh sách học sinh</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
