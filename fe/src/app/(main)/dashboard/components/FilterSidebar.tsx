'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Database, 
    ClipboardList, 
    Users, 
    School, 
    Signal, 
    Type as IconType, 
    ChevronDown, 
    ListFilter, 
    CheckSquare
} from 'lucide-react';

// --- Prop Types ---
interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RadioButtonProps {
    label: string;
    name: string;
    value: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterSectionProps {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

interface SidebarLinkProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    href?: string;
}

// --- Helper Components ---

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange = () => {} }) => (
    <label className="flex items-center space-x-2 cursor-pointer w-full">
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={onChange}
            className="form-checkbox h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 transition"
        />
        <span className="text-sm text-slate-700 font-medium select-none">{label}</span>
    </label>
);

const RadioButton: React.FC<RadioButtonProps> = ({ label, name, value, checked = false, onChange = () => {} }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
        <input 
            type="radio" 
            name={name} 
            value={value} 
            checked={checked} 
            onChange={onChange}
            className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500 transition"
        />
        <span className="text-sm text-slate-700 font-medium select-none">{label}</span>
    </label>
);

const FilterSection: React.FC<FilterSectionProps> = ({ icon: Icon, title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="py-1">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-800">{title}</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pt-3 pl-5 space-y-2">
                    {children}
                </div>
            )}
        </div>
    );
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon: Icon, label, active = false, href = "#" }) => (
     <Link href={href} className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors font-semibold ${
        active 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}>
        <Icon className="h-5 w-5" />
        <span className="text-sm">{label}</span>
    </Link>
);

// --- Main Sidebar Component ---

const FilterSidebar = () => {
    const pathname = usePathname();

    const icons = {
        dashboard: LayoutDashboard,
        database: Database,
        assignment: ClipboardList,
        group: Users,
        school: School,
        signal: Signal,
        type: IconType,
        listFilter: ListFilter,
        checkSquare: CheckSquare,
    };
    
    const isExamsPage = pathname === '/dashboard/exams';

    return (
        <aside className="w-72 border-r border-slate-200 h-screen sticky top-0 bg-white">
            <nav className="p-4 space-y-6">
                {/* Main Navigation */}
                <div className="space-y-1">
                    <SidebarLink icon={icons.dashboard} label="Bảng điều khiển" href="/dashboard" active={pathname === '/dashboard'} />
                    <SidebarLink icon={icons.database} label="Ngân hàng câu hỏi" href="/dashboard/questions" active={pathname === '/dashboard/questions'}/>
                    <SidebarLink icon={icons.assignment} label="Ngân hàng đề thi" href="/dashboard/exams" active={isExamsPage} />
                    <SidebarLink icon={icons.group} label="Học sinh" />
                </div>

                <hr className="border-slate-200" />

                {/* Detailed Filters */}
                <div className="space-y-1">
                    <h3 className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Bộ lọc chi tiết</h3>
                    
                    <FilterSection title="Khối lớp" icon={icons.school} defaultOpen>
                        <div className="space-y-2">
                            <Checkbox label="Lớp 12" />
                            <Checkbox label="Lớp 11" />
                            <Checkbox label="Lớp 10" />
                        </div>
                    </FilterSection>

                    {isExamsPage ? (
                        // Filters for Exams Page
                        <>
                            <FilterSection title="Loại đề thi" icon={icons.listFilter} defaultOpen>
                                <div className="space-y-2">
                                    <Checkbox label="Tất cả" checked />
                                    <Checkbox label="Cuối kỳ" />
                                    <Checkbox label="Thi thử" />
                                    <Checkbox label="Kiểm tra tuần" />
                                </div>
                            </FilterSection>
                            <FilterSection title="Trạng thái" icon={icons.checkSquare} defaultOpen>
                                <div className="space-y-2">
                                    <Checkbox label="Tất cả" checked />
                                    <Checkbox label="Đang sử dụng" />
                                    <Checkbox label="Bản nháp" />
                                    <Checkbox label="Lưu trữ" />
                                </div>
                            </FilterSection>
                        </>
                    ) : (
                        // Filters for Questions Page (and others)
                        <>
                             <FilterSection title="Độ khó" icon={icons.signal} defaultOpen>
                                <div className="space-y-2">
                                    <Checkbox label="Nhận biết" />
                                    <Checkbox label="Thông hiểu" />
                                    <Checkbox label="Vận dụng" />
                                    <Checkbox label="Vận dụng cao" />
                                </div>
                            </FilterSection>

                            <FilterSection title="Loại câu hỏi" icon={icons.type} defaultOpen>
                                <div className="space-y-2">
                                    <RadioButton name="questionType" value="all" label="Tất cả" checked/>
                                    <RadioButton name="questionType" value="multiple_choice" label="Trắc nghiệm" />
                                    <RadioButton name="questionType" value="essay" label="Tự luận" />
                                </div>
                            </FilterSection>
                        </>
                    )}
                </div>
            </nav>
        </aside>
    );
};

export default FilterSidebar;
