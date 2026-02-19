'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import UserPopover from '@/components/ui/UserPopover';
import { useAuth } from '@/context/AuthContext';
import { USER_DATA } from '@/lib/mock'; // Import mock data from the new location

const UserNav = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  // Use data from the imported constant for UI display
  const levelProgress = (USER_DATA.currentXP / USER_DATA.nextLevelXP) * 100;
  const defaultAvatar = 'https://ui-avatars.com/api/?name=' + user.fullName + '&background=random';

  return (
    <div className="flex items-center gap-4">
      <button className="p-2.5 text-slate-400 hover:text-[#2463eb] hover:bg-[#2463eb]/5 rounded-full transition-all relative">
        <Bell />
        <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      <div className="relative" ref={popoverRef}>
        <button 
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className={`flex items-center gap-3 p-1 pl-1.5 pr-4 bg-slate-50 border ${isPopoverOpen ? 'border-[#2463eb] ring-2 ring-[#2463eb]/10' : 'border-slate-200'} rounded-full hover:border-[#2463eb]/50 transition-all cursor-pointer`}
        >
          <div className="relative size-9">
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
              <path 
                className="text-slate-200 stroke-current" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                strokeWidth="2.5"
              ></path>
              <path 
                className="text-[#2463eb] stroke-current" 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                strokeDasharray={`${levelProgress}, 100`} 
                strokeLinecap="round" 
                strokeWidth="2.5"
              ></path>
            </svg>
            <div 
              className="absolute inset-[3.5px] rounded-full bg-cover bg-center border border-white" 
              style={{ backgroundImage: `url("${USER_DATA.avatarUrl || defaultAvatar}")` }}
            ></div>
            <div className="absolute -bottom-1 -right-1 bg-[#2463eb] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
              {USER_DATA.level || 1}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-800 text-sm font-bold truncate max-w-[120px]">{user.fullName}</span>
            <ChevronDown className={`text-slate-400 text-base transition-transform duration-200 ${isPopoverOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
        
        <UserPopover isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)} />
      </div>
    </div>
  );
}

export default UserNav;
