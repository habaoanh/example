'use client';
import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UserPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserPopover: React.FC<UserPopoverProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
      <div className="p-2">
        <button className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 rounded-lg hover:bg-slate-50">
          <User size={18} />
          <span>Thông tin tài khoản</span>
        </button>
        <button className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 rounded-lg hover:bg-slate-50">
          <Settings size={18} />
          <span>Cài đặt</span>
        </button>
        <div className="h-px bg-slate-100 my-2"></div>
        <button 
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 font-semibold"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default UserPopover;
