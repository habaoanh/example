import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles: common to all variants
  "inline-flex items-center justify-center gap-3 rounded-xl font-bold transition-all active:scale-[0.98] 2k:rounded-3xl",
  {
    variants: {
      variant: {
        // Variant for the primary button
        default:
          "bg-[#2463eb] text-white shadow-2xl shadow-[#2463eb]/40 hover:bg-blue-700",
        // Variant for the outline/secondary button
        outline:
          "border-2 border-slate-100 bg-white text-slate-700 shadow-sm hover:border-[#2463eb]/20 hover:text-[#2463eb]",
        // Variant for ghost/text-only buttons
        ghost: "text-slate-700 hover:text-[#2463eb]",
      },
      size: {
        // Default button size, can be used for generic buttons
        default: "px-6 py-3 text-base",
        // Small button size, used in the Header for 'Bắt đầu ngay'
        sm: "px-6 py-2.5 text-sm 4xl:px-10 4xl:py-4 4xl:text-2xl",
        // Large button size, matching the one in Hero section
        lg: "text-base sm:text-lg 4xl:text-3xl px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl",
      },
    },
    compoundVariants: [
      // The primary button in Hero has slightly different horizontal padding on small screens
      {
        variant: "default",
        size: "lg",
        className: "sm:px-12 4xl:px-20 4xl:py-8",
      },
      // The outline button in Hero also has its own padding specifics
      {
        variant: "outline",
        size: "lg",
        className: "sm:px-10 4xl:px-16 4xl:py-8",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
