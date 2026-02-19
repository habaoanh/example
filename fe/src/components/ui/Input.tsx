import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endElement?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endElement, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {startIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 2k:left-5 4k:left-6">
            <span className="inline-block 2k:scale-150 4k:scale-[2.5]">{startIcon}</span>
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none",
            "2k:py-6 2k:text-xl 4k:py-10 4k:text-3xl 4k:rounded-3xl", // Custom responsive styles
            startIcon ? "pl-12 2k:pl-16 4k:pl-24" : "px-4",
            endElement ? "pr-12 2k:pr-16 4k:pr-24" : "pr-4",
            className
          )}
          ref={ref}
          {...props}
        />
        {endElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 2k:right-5 4k:right-6">
            {endElement}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
