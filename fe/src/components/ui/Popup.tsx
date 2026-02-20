'use client';

import React, { ReactNode } from 'react';
import { X, Hourglass } from 'lucide-react';

// Define the types for the component's props

/**
 * Represents a single action button in the popup.
 */
type PopupAction = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
};

/**
 * Props for the Popup component.
 */
interface PopupProps {
  /** Controls whether the popup is visible. */
  isOpen: boolean;
  /** Function to call when the popup should be closed (e.g., by clicking the backdrop or 'X' button). */
  onClose?: () => void;
  /** The main icon to display at the top of the popup. */
  icon?: ReactNode;
  /** The title of the popup. */
  title: string;
  /** The main description or message of the popup. */
  description: ReactNode;
  /** An array of action buttons to display. */
  actions?: PopupAction[];
  /** A slot for custom content, like progress bars or stats. */
  children?: ReactNode;
  /** A slot for footer content, like security notes. */
  footer?: ReactNode;
}

/**
 * A reusable, full-screen popup component for showing confirmations, notifications, and status updates.
 * It is highly customizable through props.
 */
export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  actions,
  children,
  footer,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm animate-in fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[95%] sm:max-w-lg 2xl:max-w-xl min-[2560px]:max-w-2xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-12 2xl:p-14 min-[2560px]:p-16 text-center border border-slate-100 transition-all animate-in zoom-in-95 duration-300">
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {icon && (
          <div className="mb-6 sm:mb-8 flex justify-center">
            {icon}
          </div>
        )}

        <div className="space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl min-[2560px]:text-6xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <div className="text-slate-600 text-sm sm:text-base md:text-lg 2xl:text-xl leading-relaxed max-w-sm 2xl:max-w-md mx-auto">
            {description}
          </div>
        </div>

        {children && (
          <div className="mb-8 sm:mb-10">
            {children}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            {actions.map((action, index) => {
              const isPrimary = action.variant === 'primary';
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 sm:py-3.5 2xl:py-4 px-4 sm:px-6 rounded-xl transition-all cursor-pointer text-sm sm:text-base 2xl:text-lg
                    ${isPrimary
                      ? 'bg-[#2463eb] hover:bg-[#2463eb]/90 text-white shadow-lg shadow-[#2463eb]/25'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
        
        {footer && (
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 sm:gap-2 text-slate-400 text-[10px] sm:text-xs 2xl:text-sm font-medium">
            {footer}
          </div>
        )}

      </div>
    </div>
  );
};

/**
 * A helper component to easily create the specific animated loading spinner 
 * from your provided HTML snippet.
 */
export const LoadingSpinnerIcon = () => (
  <div className="relative w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28 flex items-center justify-center bg-[#2463eb]/10 rounded-full">
      <Hourglass className="text-[#2463eb] w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12" strokeWidth={1.5} />
      <div className="absolute inset-0 border-[3px] sm:border-4 border-[#2463eb] border-t-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>
  </div>
);
