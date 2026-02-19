import React from 'react';
import { LucideIcon } from 'lucide-react';

// Props definition for the FeatureCard component
export interface FeatureCardProps {
  Icon: LucideIcon;       // The icon component to display (e.g., from lucide-react)
  title: string;           // The title of the feature
  description: string;     // The description of the feature
  bgColor: string;         // The background color class for the icon container (e.g., "bg-blue-50")
}

/**
 * FeatureCard is a reusable UI component that displays a feature with an icon, title, and description.
 * It is designed to be used in sections highlighting key features of a product or service.
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description, bgColor }) => (
  <div className="bg-white p-6 sm:p-10 4xl:p-16 rounded-[24px] sm:rounded-[32px] 4xl:rounded-[48px] shadow-sm border border-slate-100 hover:border-[#2463eb]/30 hover:shadow-xl hover:shadow-[#2463eb]/5 transition-all group">
    <div className={`w-12 h-12 sm:w-16 sm:h-16 4xl:w-24 4xl:h-24 ${bgColor} rounded-xl sm:rounded-2xl 4xl:rounded-3xl flex items-center justify-center text-[#2463eb] mb-6 sm:mb-8 group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6 sm:w-9 sm:h-9 4xl:w-14 4xl:h-14" />
    </div>
    <h3 className="text-xl sm:text-2xl 4xl:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">{title}</h3>
    <p className="text-sm sm:text-base 4xl:text-2xl text-slate-600 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

export default FeatureCard;
